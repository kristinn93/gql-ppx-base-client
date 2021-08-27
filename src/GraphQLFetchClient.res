// module type QueryConfig = {
//   let query: string
//   type t
//   let parse: Js.Json.t => t
// }

module type QueryConfig = {
  module Raw: {
    type t
  }
  type t
  let query: string
  /* this just makes sure it's just a type conversion, and no function have
   to be called */
  external unsafe_fromJson: Js.Json.t => Raw.t = "%identity"
  let parse: Raw.t => t
}

module type GraphQLClientBase = {
  let graphQLUrl: unit => string
  module Query: QueryConfig
}

let makeQueryHeaders = (~maybeAccessToken) => {
  let headers = Js.Dict.empty()

  Js.Dict.set(headers, "content-type", "application/json")

  switch maybeAccessToken {
  | Some(token) => Js.Dict.set(headers, "authorization", "Bearer " ++ token)
  | _ => ()
  }

  headers
}

let makeQueryBody = (~maybeVariables=None, ~maybeOperationName=None, query) =>
  Js.Dict.fromList(
    List.concatMany([
      list{("query", Js.Json.string(query))},
      Option.mapWithDefault(maybeVariables, list{}, variables => list{("variables", variables)}),
      Option.mapWithDefault(maybeOperationName, list{}, operationName => list{
        ("operationName", Js.Json.string(operationName)),
      }),
    ]),
  )
  |> Js.Json.object_
  |> Js.Json.stringify

type responseJson = {"data": option<Js.Json.t>, "errors": option<array<Js.Json.t>>}

let rawJson = json => json
let parseResponseJson = json => {
  open Json.Decode
  {
    "data": (json |> optional(field("data", nullable(rawJson))))->Option.flatMap(Js.Null.toOption),
    "errors": json |> optional(field("errors", array(rawJson))),
  }
}

type abstractReasonResponse<'a> = [
  | #Data('a)
  | #DataWithError('a, list<SharedTypes.Errors.graphQLerror>)
  | #Error(list<SharedTypes.Errors.graphQLerror>)
]

module MakeQuery = (T: GraphQLClientBase) => {
  let makeClient = (maybeAccessToken, maybeVariables, maybeOperationName) => {
    open Bs_fetch
    fetchWithInit(
      T.graphQLUrl(),
      RequestInit.make(
        ~method_=Post,
        ~body=makeQueryBody(~maybeVariables, ~maybeOperationName, T.Query.query) |> BodyInit.make,
        ~headers=makeQueryHeaders(~maybeAccessToken) |> HeadersInit.makeWithDict,
        (),
      ),
    )
  }

  type rescriptResponse = abstractReasonResponse<T.Query.t>
  type networkResponse = [
    | #Data(T.Query.t)
    | #DataWithError(T.Query.t, list<SharedTypes.Errors.graphQLerror>)
    | #Error(list<SharedTypes.Errors.graphQLerror>)
  ]
  let parse = (response): networkResponse =>
    try switch (response["data"], response["errors"]) {
    | (Some(data), Some(errors)) =>
      #DataWithError(
        data->T.Query.unsafe_fromJson->T.Query.parse,
        errors->Array.map(SharedTypes.Errors.graphQLerrorDecoder)->List.fromArray,
      )
    | (Some(data), None) => #Data(data->T.Query.unsafe_fromJson->T.Query.parse)
    | (None, Some(errors)) =>
      #Error(errors->Array.map(SharedTypes.Errors.graphQLerrorDecoder)->List.fromArray)
    | (None, None) =>
      #Error(list{
        (
          {
            message: "No data",
            locations: list{},
            extensions: {
              code: None,
              messageUser: None,
              type_: "",
            },
          }: SharedTypes.Errors.graphQLerror
        ),
      })
    } catch {
    | _ =>
      #Error(list{
        (
          {
            message: "Could not parse data",
            locations: list{},
            extensions: {
              code: None,
              messageUser: None,
              type_: "",
            },
          }: SharedTypes.Errors.graphQLerror
        ),
      })
    }

  //   @ocaml.deprecated("Use queryAndParse instead")
  //   let query = (~token=?, ~variables=?, ~operationName=?, ()) =>
  //     makeClient(token, variables, operationName)
  //     |> Js.Promise.then_(Bs_fetch.Response.json)
  //     |> Js.Promise.then_(json => parseResponseJson(json) |> Js.Promise.resolve)
  //     |> Js.Promise.then_(response => parse(response) |> Js.Promise.resolve)

  let queryAndParse = (~token=?, ~variables=?, ~operationName=?, ()) => {
    let fetch = makeClient(token, variables, operationName)
    let fetchResponse = fetch |> Js.Promise.then_(response => {
      if Bs_fetch.Response.ok(response) {
        Bs_fetch.Response.json(response)
      } else {
        Js.Promise.reject(SharedTypes.Errors.FetchError(Bs_fetch.Response.statusText(response)))
      }
    })

    let returnValue = fetchResponse |> Js.Promise.then_(json => {
      let response = json
      Js.Promise.resolve(response)
    })
    returnValue
  }
  // |> Js.Promise.then_(parsedResponse => parse(parsedResponse)->Js.Promise.resolve)

  // |> Js.Promise.then_(Bs_fetch.Response.json)
  // |> Js.Promise.then_(json => parseResponseJson(json) |> Js.Promise.resolve)
  // |> Js.Promise.then_(response => parse(response) |> Js.Promise.resolve)

  //   let queryAndParse = (~token=?, ~variables=?, ~operationName=?, ()) =>
  //     makeClient(token, variables, operationName)
  //     |> Js.Promise.then_(Bs_fetch.Response.json)
  //     |> Js.Promise.then_(json => parseResponseJson(json) |> Js.Promise.resolve)
  //     |> Js.Promise.then_(response => parse(response) |> Js.Promise.resolve)

  //   let queryAndParseFuture = (~token=?, ~variables=?, ~operationName=?, ()) =>
  //     queryAndParse(~token?, ~variables?, ~operationName?, ())->FutureJs.fromPromise(error =>
  //       #UnknownError(Js.String.make(error))
  //     )

  //   let queryWithoutParse = (~token=?, ~variables=?, ~operationName=?, ()) =>
  //     makeClient(token, variables, operationName)
  //     |> Js.Promise.then_(Bs_fetch.Response.json)
  //     |> Js.Promise.then_(json => json->parseResponseJson->Js.Promise.resolve)
}
