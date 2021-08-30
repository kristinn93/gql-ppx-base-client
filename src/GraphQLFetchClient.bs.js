// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as Fetch from "bs-fetch/src/Fetch.bs.js";
import * as Js_dict from "rescript/lib/es6/js_dict.js";
import * as Belt_List from "rescript/lib/es6/belt_List.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as SharedTypes from "./SharedTypes.bs.js";

function makeQueryHeaders(maybeAccessToken) {
  var headers = {};
  headers["content-type"] = "application/json";
  if (maybeAccessToken !== undefined) {
    headers["authorization"] = "Bearer " + maybeAccessToken;
  }
  return headers;
}

function makeQueryBody(maybeVariablesOpt, maybeOperationNameOpt, query) {
  var maybeVariables = maybeVariablesOpt !== undefined ? Caml_option.valFromOption(maybeVariablesOpt) : undefined;
  var maybeOperationName = maybeOperationNameOpt !== undefined ? Caml_option.valFromOption(maybeOperationNameOpt) : undefined;
  return JSON.stringify(Js_dict.fromList(Belt_List.concatMany([
                      {
                        hd: [
                          "query",
                          query
                        ],
                        tl: /* [] */0
                      },
                      Belt_Option.mapWithDefault(maybeVariables, /* [] */0, (function (variables) {
                              return {
                                      hd: [
                                        "variables",
                                        variables
                                      ],
                                      tl: /* [] */0
                                    };
                            })),
                      Belt_Option.mapWithDefault(maybeOperationName, /* [] */0, (function (operationName) {
                              return {
                                      hd: [
                                        "operationName",
                                        operationName
                                      ],
                                      tl: /* [] */0
                                    };
                            }))
                    ])));
}

function rawJson(json) {
  return json;
}

function parseResponseJson(json) {
  return {
          data: Belt_Option.flatMap(Json_decode.optional((function (param) {
                      return Json_decode.field("data", (function (param) {
                                    return Json_decode.nullable(rawJson, param);
                                  }), param);
                    }), json), (function (prim) {
                  if (prim === null) {
                    return ;
                  } else {
                    return Caml_option.some(prim);
                  }
                })),
          errors: Json_decode.optional((function (param) {
                  return Json_decode.field("errors", (function (param) {
                                return Json_decode.array(rawJson, param);
                              }), param);
                }), json)
        };
}

function MakeQuery(T) {
  var makeClient = function (maybeAccessToken, maybeVariables, maybeOperationName) {
    return fetch(Curry._1(T.graphQLUrl, undefined), Fetch.RequestInit.make(/* Post */2, Caml_option.some(makeQueryHeaders(maybeAccessToken)), Caml_option.some(makeQueryBody(Caml_option.some(maybeVariables), Caml_option.some(maybeOperationName), T.Query.query)), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(undefined));
  };
  var parse = function (responseJson) {
    var response = parseResponseJson(responseJson);
    try {
      var match = response.data;
      var match$1 = response.errors;
      if (match === undefined) {
        if (match$1 !== undefined) {
          return {
                  NAME: "Error",
                  VAL: Belt_List.fromArray(Belt_Array.map(match$1, SharedTypes.Errors.graphQLerrorDecoder))
                };
        } else {
          return {
                  NAME: "Error",
                  VAL: {
                    hd: {
                      message: "No data",
                      locations: /* [] */0,
                      extensions: {
                        code: undefined,
                        messageUser: undefined,
                        type_: ""
                      }
                    },
                    tl: /* [] */0
                  }
                };
        }
      }
      var data = Caml_option.valFromOption(match);
      if (match$1 !== undefined) {
        return {
                NAME: "DataWithError",
                VAL: [
                  Curry._1(T.Query.parse, data),
                  Belt_List.fromArray(Belt_Array.map(match$1, SharedTypes.Errors.graphQLerrorDecoder))
                ]
              };
      } else {
        return {
                NAME: "Data",
                VAL: Curry._1(T.Query.parse, data)
              };
      }
    }
    catch (exn){
      return {
              NAME: "Error",
              VAL: {
                hd: {
                  message: "Could not parse data",
                  locations: /* [] */0,
                  extensions: {
                    code: undefined,
                    messageUser: undefined,
                    type_: ""
                  }
                },
                tl: /* [] */0
              }
            };
    }
  };
  var queryAndParse = function (token, variables, operationName, param) {
    var $$fetch = makeClient(token, variables, operationName);
    var fetchResponse = $$fetch.then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject({
                        RE_EXN_ID: SharedTypes.Errors.FetchError,
                        _1: response.statusText
                      });
          }
        });
    return fetchResponse.then(function (json) {
                return Promise.resolve(parse(json));
              });
  };
  return {
          makeClient: makeClient,
          parse: parse,
          queryAndParse: queryAndParse
        };
}

export {
  makeQueryHeaders ,
  makeQueryBody ,
  rawJson ,
  parseResponseJson ,
  MakeQuery ,
  
}
/* No side effect */
