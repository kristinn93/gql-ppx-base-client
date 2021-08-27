module Errors = {
  type extensions = {
    code: option<int>,
    messageUser: option<string>,
    type_: string,
  }
  type location = {
    column: option<int>,
    line: option<int>,
  }
  type graphQLerror = {
    message: string,
    locations: list<location>,
    extensions: extensions,
  }

  let extensionsDecoder: Js.Json.t => extensions = json => {
    open Json.Decode
    {
      code: json |> field("code", optional(int)),
      messageUser: json |> field("messageUser", optional(string)),
      type_: json |> field("type", string),
    }
  }
  let locationDecoder: Js.Json.t => location = json => {
    open Json.Decode
    {
      column: json |> field("column", optional(int)),
      line: json |> field("line", optional(int)),
    }
  }
  let graphQLerrorDecoder: Js.Json.t => graphQLerror = json => {
    open Json.Decode
    {
      message: json |> field("message", string),
      locations: (json |> optional(field("locations", list(locationDecoder))))
        ->Option.getWithDefault(list{}),
      extensions: json |> field("extensions", extensionsDecoder),
    }
  }

  exception AuthenticationException
  exception FetchError(string)
  exception NotFound(string)
  exception GraphQLError(list<graphQLerror>)
}

module ClientApi = {
  type algoliaSearchKey = {
    key: string,
    timeToLive: string,
  }
  type algoliaSearchKeyResponse = {
    data: option<algoliaSearchKey>,
    errors: option<list<Errors.graphQLerror>>,
  }
  let algoliaSearchKeyDecoder: Js.Json.t => algoliaSearchKey = json => {
    open Json.Decode
    {
      key: json |> field("key", string),
      timeToLive: json |> field("timeToLive", string),
    }
  }

  let algoliaSearchKeyResponseDecoder: Js.Json.t => algoliaSearchKeyResponse = json => {
    let decoderWithError: Js.Json.t => algoliaSearchKeyResponse = json => {
      open Json.Decode
      {
        data: json |> field(
          "data",
          optional(Json.Decode.field("algoliaSearchKey", algoliaSearchKeyDecoder)),
        ),
        errors: json |> field("errors", optional(list(Errors.graphQLerrorDecoder))),
      }
    }
    let decoderWithNoneError: Js.Json.t => algoliaSearchKeyResponse = json => {
      open Json.Decode
      {
        data: json |> field(
          "data",
          optional(Json.Decode.field("algoliaSearchKey", algoliaSearchKeyDecoder)),
        ),
        errors: None,
      }
    }
    json |> Json.Decode.oneOf(list{decoderWithError, decoderWithNoneError})
  }

  type bidIncrements = {
    from: int,
    increment: int,
  }

  let bidIncrementsDecoder = json => {
    open Json.Decode
    {
      from: json |> field("from", int),
      increment: json |> field("increment", int),
    }
  }
}

type departmentHit = {
  objectID: string,
  title: string,
}

type objectTypeHit = {
  objectID: string,
  title: string,
  deleted: bool,
}

type saleLocationHit = {
  objectID: string,
  name: string,
}

@deriving(jsConverter)
type currency = [#EUR | #USD | #GBP | #HKD | #CNY | #CHF | #QAR | #JPY]
