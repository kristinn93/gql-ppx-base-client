Js.Promise.then_((response: TestQuery.Test.Query.response) => {
  //   Why is this not working ??
  switch response {
  | Data(data) => Js.log(data.algoliaSearchKey.key)
  | _ => ()
  }

  Js.Promise.resolve()
}, TestQuery.Test.Query.queryAndParse())->ignore
