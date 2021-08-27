module Make = (Query: GraphQLFetchClient.QueryConfig) => {
  let graphQLUrl = () => "https://clientapi.staging.sothelabs.com/graphql"
  module Query = Query
}
