// Generated by ReScript, PLEASE EDIT WITH CARE

import * as BaseClient from "./BaseClient.bs.js";
import * as GraphQLFetchClient from "./GraphQLFetchClient.bs.js";

var Raw = {};

var query = "query test  {\nalgoliaSearchKey  {\nkey  \ntimeToLive  \n}\n\n}\n";

function parse(value) {
  var value$1 = value.algoliaSearchKey;
  return {
          algoliaSearchKey: {
            key: value$1.key,
            timeToLive: value$1.timeToLive
          }
        };
}

function serialize(value) {
  var value$1 = value.algoliaSearchKey;
  var value$2 = value$1.timeToLive;
  var value$3 = value$1.key;
  var algoliaSearchKey = {
    key: value$3,
    timeToLive: value$2
  };
  return {
          algoliaSearchKey: algoliaSearchKey
        };
}

function serializeVariables(param) {
  
}

function makeVariables(param) {
  
}

function makeDefaultVariables(param) {
  
}

var MakeQuery = {
  Raw: Raw,
  query: query,
  parse: parse,
  serialize: serialize,
  serializeVariables: serializeVariables,
  makeVariables: makeVariables,
  makeDefaultVariables: makeDefaultVariables
};

var Query = GraphQLFetchClient.MakeQuery(BaseClient.Make({
          Raw: Raw,
          query: query,
          unsafe_fromJson: (function (prim) {
              return prim;
            }),
          parse: parse,
          toJson: (function (prim) {
              return prim;
            })
        }));

var Test = {
  MakeQuery: MakeQuery,
  Query: Query
};

export {
  Test ,
  
}
/* Query Not a pure module */
