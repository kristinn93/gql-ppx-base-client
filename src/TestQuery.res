module Test = {
  module MakeQuery = %graphql(`
        query test {
            algoliaSearchKey {
                key
                timeToLive
            }
        }
        `)

  module Query = GraphQLFetchClient.MakeQuery(BaseClient.Make(MakeQuery))
}
