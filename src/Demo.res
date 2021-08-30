let fetchTest = () => {
  TestQuery.Test.Query.queryAndParse()
}

Js.Promise.then_((response: TestQuery.Test.Query.rescriptResponse) => {
  Js.log2("response", response)

  // Why is this not working ??
  //   switch response {
  //   | #Data(data) => Js.log(data["algoliaSearchKeys"])
  //   | _ => ()
  //   }

  Js.Promise.resolve()
}, fetchTest())->ignore
