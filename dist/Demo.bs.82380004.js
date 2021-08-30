// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/rescript/lib/es6/caml_array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dup = dup;
exports.sub = sub;
exports.concat = concat;
exports.make = make;
exports.make_float = make_float;
exports.blit = blit;
exports.get = get;
exports.set = set;

function sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;

  while (j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }

  ;
  return result;
}

function len(_acc, _l) {
  while (true) {
    var l = _l;
    var acc = _acc;

    if (!l) {
      return acc;
    }

    _l = l.tl;
    _acc = l.hd.length + acc | 0;
    continue;
  }

  ;
}

function fill(arr, _i, _l) {
  while (true) {
    var l = _l;
    var i = _i;

    if (!l) {
      return;
    }

    var x = l.hd;
    var l$1 = x.length;
    var k = i;
    var j = 0;

    while (j < l$1) {
      arr[k] = x[j];
      k = k + 1 | 0;
      j = j + 1 | 0;
    }

    ;
    _l = l.tl;
    _i = k;
    continue;
  }

  ;
}

function concat(l) {
  var v = len(0, l);
  var result = new Array(v);
  fill(result, 0, l);
  return result;
}

function set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "index out of bounds",
      Error: new Error()
    };
  }

  xs[index] = newval;
}

function get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "index out of bounds",
      Error: new Error()
    };
  }

  return xs[index];
}

function make(len, init) {
  var b = new Array(len);

  for (var i = 0; i < len; ++i) {
    b[i] = init;
  }

  return b;
}

function make_float(len) {
  var b = new Array(len);

  for (var i = 0; i < len; ++i) {
    b[i] = 0;
  }

  return b;
}

function blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for (var j = 0; j < len; ++j) {
      a2[j + i2 | 0] = a1[j + i1 | 0];
    }

    return;
  }

  for (var j$1 = len - 1 | 0; j$1 >= 0; --j$1) {
    a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
  }
}

function dup(prim) {
  return prim.slice(0);
}
/* No side effect */
},{}],"../node_modules/rescript/lib/es6/curry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = app;
exports._1 = _1;
exports.__1 = __1;
exports._2 = _2;
exports.__2 = __2;
exports._3 = _3;
exports.__3 = __3;
exports._4 = _4;
exports.__4 = __4;
exports._5 = _5;
exports.__5 = __5;
exports._6 = _6;
exports.__6 = __6;
exports._7 = _7;
exports.__7 = __7;
exports._8 = _8;
exports.__8 = __8;

var Caml_array = _interopRequireWildcard(require("./caml_array.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function app(_f, _args) {
  while (true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;

    if (d === 0) {
      return f.apply(null, args);
    }

    if (d >= 0) {
      return function (f, args) {
        return function (x) {
          return app(f, args.concat([x]));
        };
      }(f, args);
    }

    _args = Caml_array.sub(args, arity, -d | 0);
    _f = f.apply(null, Caml_array.sub(args, 0, arity));
    continue;
  }

  ;
}

function _1(o, a0) {
  var arity = o.length;

  if (arity === 1) {
    return o(a0);
  } else {
    switch (arity) {
      case 1:
        return o(a0);

      case 2:
        return function (param) {
          return o(a0, param);
        };

      case 3:
        return function (param, param$1) {
          return o(a0, param, param$1);
        };

      case 4:
        return function (param, param$1, param$2) {
          return o(a0, param, param$1, param$2);
        };

      case 5:
        return function (param, param$1, param$2, param$3) {
          return o(a0, param, param$1, param$2, param$3);
        };

      case 6:
        return function (param, param$1, param$2, param$3, param$4) {
          return o(a0, param, param$1, param$2, param$3, param$4);
        };

      case 7:
        return function (param, param$1, param$2, param$3, param$4, param$5) {
          return o(a0, param, param$1, param$2, param$3, param$4, param$5);
        };

      default:
        return app(o, [a0]);
    }
  }
}

function __1(o) {
  var arity = o.length;

  if (arity === 1) {
    return o;
  } else {
    return function (a0) {
      return _1(o, a0);
    };
  }
}

function _2(o, a0, a1) {
  var arity = o.length;

  if (arity === 2) {
    return o(a0, a1);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1]);

      case 2:
        return o(a0, a1);

      case 3:
        return function (param) {
          return o(a0, a1, param);
        };

      case 4:
        return function (param, param$1) {
          return o(a0, a1, param, param$1);
        };

      case 5:
        return function (param, param$1, param$2) {
          return o(a0, a1, param, param$1, param$2);
        };

      case 6:
        return function (param, param$1, param$2, param$3) {
          return o(a0, a1, param, param$1, param$2, param$3);
        };

      case 7:
        return function (param, param$1, param$2, param$3, param$4) {
          return o(a0, a1, param, param$1, param$2, param$3, param$4);
        };

      default:
        return app(o, [a0, a1]);
    }
  }
}

function __2(o) {
  var arity = o.length;

  if (arity === 2) {
    return o;
  } else {
    return function (a0, a1) {
      return _2(o, a0, a1);
    };
  }
}

function _3(o, a0, a1, a2) {
  var arity = o.length;

  if (arity === 3) {
    return o(a0, a1, a2);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1, a2]);

      case 2:
        return app(o(a0, a1), [a2]);

      case 3:
        return o(a0, a1, a2);

      case 4:
        return function (param) {
          return o(a0, a1, a2, param);
        };

      case 5:
        return function (param, param$1) {
          return o(a0, a1, a2, param, param$1);
        };

      case 6:
        return function (param, param$1, param$2) {
          return o(a0, a1, a2, param, param$1, param$2);
        };

      case 7:
        return function (param, param$1, param$2, param$3) {
          return o(a0, a1, a2, param, param$1, param$2, param$3);
        };

      default:
        return app(o, [a0, a1, a2]);
    }
  }
}

function __3(o) {
  var arity = o.length;

  if (arity === 3) {
    return o;
  } else {
    return function (a0, a1, a2) {
      return _3(o, a0, a1, a2);
    };
  }
}

function _4(o, a0, a1, a2, a3) {
  var arity = o.length;

  if (arity === 4) {
    return o(a0, a1, a2, a3);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1, a2, a3]);

      case 2:
        return app(o(a0, a1), [a2, a3]);

      case 3:
        return app(o(a0, a1, a2), [a3]);

      case 4:
        return o(a0, a1, a2, a3);

      case 5:
        return function (param) {
          return o(a0, a1, a2, a3, param);
        };

      case 6:
        return function (param, param$1) {
          return o(a0, a1, a2, a3, param, param$1);
        };

      case 7:
        return function (param, param$1, param$2) {
          return o(a0, a1, a2, a3, param, param$1, param$2);
        };

      default:
        return app(o, [a0, a1, a2, a3]);
    }
  }
}

function __4(o) {
  var arity = o.length;

  if (arity === 4) {
    return o;
  } else {
    return function (a0, a1, a2, a3) {
      return _4(o, a0, a1, a2, a3);
    };
  }
}

function _5(o, a0, a1, a2, a3, a4) {
  var arity = o.length;

  if (arity === 5) {
    return o(a0, a1, a2, a3, a4);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1, a2, a3, a4]);

      case 2:
        return app(o(a0, a1), [a2, a3, a4]);

      case 3:
        return app(o(a0, a1, a2), [a3, a4]);

      case 4:
        return app(o(a0, a1, a2, a3), [a4]);

      case 5:
        return o(a0, a1, a2, a3, a4);

      case 6:
        return function (param) {
          return o(a0, a1, a2, a3, a4, param);
        };

      case 7:
        return function (param, param$1) {
          return o(a0, a1, a2, a3, a4, param, param$1);
        };

      default:
        return app(o, [a0, a1, a2, a3, a4]);
    }
  }
}

function __5(o) {
  var arity = o.length;

  if (arity === 5) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4) {
      return _5(o, a0, a1, a2, a3, a4);
    };
  }
}

function _6(o, a0, a1, a2, a3, a4, a5) {
  var arity = o.length;

  if (arity === 6) {
    return o(a0, a1, a2, a3, a4, a5);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1, a2, a3, a4, a5]);

      case 2:
        return app(o(a0, a1), [a2, a3, a4, a5]);

      case 3:
        return app(o(a0, a1, a2), [a3, a4, a5]);

      case 4:
        return app(o(a0, a1, a2, a3), [a4, a5]);

      case 5:
        return app(o(a0, a1, a2, a3, a4), [a5]);

      case 6:
        return o(a0, a1, a2, a3, a4, a5);

      case 7:
        return function (param) {
          return o(a0, a1, a2, a3, a4, a5, param);
        };

      default:
        return app(o, [a0, a1, a2, a3, a4, a5]);
    }
  }
}

function __6(o) {
  var arity = o.length;

  if (arity === 6) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5) {
      return _6(o, a0, a1, a2, a3, a4, a5);
    };
  }
}

function _7(o, a0, a1, a2, a3, a4, a5, a6) {
  var arity = o.length;

  if (arity === 7) {
    return o(a0, a1, a2, a3, a4, a5, a6);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1, a2, a3, a4, a5, a6]);

      case 2:
        return app(o(a0, a1), [a2, a3, a4, a5, a6]);

      case 3:
        return app(o(a0, a1, a2), [a3, a4, a5, a6]);

      case 4:
        return app(o(a0, a1, a2, a3), [a4, a5, a6]);

      case 5:
        return app(o(a0, a1, a2, a3, a4), [a5, a6]);

      case 6:
        return app(o(a0, a1, a2, a3, a4, a5), [a6]);

      case 7:
        return o(a0, a1, a2, a3, a4, a5, a6);

      default:
        return app(o, [a0, a1, a2, a3, a4, a5, a6]);
    }
  }
}

function __7(o) {
  var arity = o.length;

  if (arity === 7) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5, a6) {
      return _7(o, a0, a1, a2, a3, a4, a5, a6);
    };
  }
}

function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
  var arity = o.length;

  if (arity === 8) {
    return o(a0, a1, a2, a3, a4, a5, a6, a7);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1, a2, a3, a4, a5, a6, a7]);

      case 2:
        return app(o(a0, a1), [a2, a3, a4, a5, a6, a7]);

      case 3:
        return app(o(a0, a1, a2), [a3, a4, a5, a6, a7]);

      case 4:
        return app(o(a0, a1, a2, a3), [a4, a5, a6, a7]);

      case 5:
        return app(o(a0, a1, a2, a3, a4), [a5, a6, a7]);

      case 6:
        return app(o(a0, a1, a2, a3, a4, a5), [a6, a7]);

      case 7:
        return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);

      default:
        return app(o, [a0, a1, a2, a3, a4, a5, a6, a7]);
    }
  }
}

function __8(o) {
  var arity = o.length;

  if (arity === 8) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5, a6, a7) {
      return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
    };
  }
}
/* No side effect */
},{"./caml_array.js":"../node_modules/rescript/lib/es6/caml_array.js"}],"BaseClient.bs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Make = Make;

// Generated by ReScript, PLEASE EDIT WITH CARE
function Make(Query) {
  var graphQLUrl = function graphQLUrl(param) {
    return "https://clientapi.staging.sothelabs.com/graphql";
  };

  return {
    graphQLUrl: graphQLUrl,
    Query: Query
  };
}
/* No side effect */
},{}],"../node_modules/rescript/lib/es6/caml_option.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nullable_to_opt = nullable_to_opt;
exports.undefined_to_opt = undefined_to_opt;
exports.null_to_opt = null_to_opt;
exports.valFromOption = valFromOption;
exports.some = some;
exports.isNested = isNested;
exports.option_get = option_get;
exports.option_unwrap = option_unwrap;

function isNested(x) {
  return x.BS_PRIVATE_NESTED_SOME_NONE !== undefined;
}

function some(x) {
  if (x === undefined) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: 0
    };
  } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
    };
  } else {
    return x;
  }
}

function nullable_to_opt(x) {
  if (x == null) {
    return;
  } else {
    return some(x);
  }
}

function undefined_to_opt(x) {
  if (x === undefined) {
    return;
  } else {
    return some(x);
  }
}

function null_to_opt(x) {
  if (x === null) {
    return;
  } else {
    return some(x);
  }
}

function valFromOption(x) {
  if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined)) {
    return x;
  }

  var depth = x.BS_PRIVATE_NESTED_SOME_NONE;

  if (depth === 0) {
    return;
  } else {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
    };
  }
}

function option_get(x) {
  if (x === undefined) {
    return;
  } else {
    return valFromOption(x);
  }
}

function option_unwrap(x) {
  if (x !== undefined) {
    return x.VAL;
  } else {
    return x;
  }
}
/* No side effect */
},{}],"../node_modules/bs-fetch/src/Fetch.bs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$$FormData = exports.$$Response = exports.$$Request = exports.RequestInit = exports.Body = exports.BodyInit = exports.$$Headers = exports.HeadersInit = exports.$$AbortController = void 0;

var Curry = _interopRequireWildcard(require("rescript/lib/es6/curry.js"));

var Caml_option = _interopRequireWildcard(require("rescript/lib/es6/caml_option.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var $$AbortController = {};
exports.$$AbortController = $$AbortController;

function encodeRequestMethod(method_) {
  if (typeof method_ !== "number") {
    return method_._0;
  }

  switch (method_) {
    case
    /* Get */
    0:
      return "GET";

    case
    /* Head */
    1:
      return "HEAD";

    case
    /* Post */
    2:
      return "POST";

    case
    /* Put */
    3:
      return "PUT";

    case
    /* Delete */
    4:
      return "DELETE";

    case
    /* Connect */
    5:
      return "CONNECT";

    case
    /* Options */
    6:
      return "OPTIONS";

    case
    /* Trace */
    7:
      return "TRACE";

    case
    /* Patch */
    8:
      return "PATCH";
  }
}

function encodeReferrerPolicy(param) {
  switch (param) {
    case
    /* None */
    0:
      return "";

    case
    /* NoReferrer */
    1:
      return "no-referrer";

    case
    /* NoReferrerWhenDowngrade */
    2:
      return "no-referrer-when-downgrade";

    case
    /* SameOrigin */
    3:
      return "same-origin";

    case
    /* Origin */
    4:
      return "origin";

    case
    /* StrictOrigin */
    5:
      return "strict-origin";

    case
    /* OriginWhenCrossOrigin */
    6:
      return "origin-when-cross-origin";

    case
    /* StrictOriginWhenCrossOrigin */
    7:
      return "strict-origin-when-cross-origin";

    case
    /* UnsafeUrl */
    8:
      return "unsafe-url";
  }
}

function encodeRequestMode(param) {
  switch (param) {
    case
    /* Navigate */
    0:
      return "navigate";

    case
    /* SameOrigin */
    1:
      return "same-origin";

    case
    /* NoCORS */
    2:
      return "no-cors";

    case
    /* CORS */
    3:
      return "cors";
  }
}

function encodeRequestCredentials(param) {
  switch (param) {
    case
    /* Omit */
    0:
      return "omit";

    case
    /* SameOrigin */
    1:
      return "same-origin";

    case
    /* Include */
    2:
      return "include";
  }
}

function encodeRequestCache(param) {
  switch (param) {
    case
    /* Default */
    0:
      return "default";

    case
    /* NoStore */
    1:
      return "no-store";

    case
    /* Reload */
    2:
      return "reload";

    case
    /* NoCache */
    3:
      return "no-cache";

    case
    /* ForceCache */
    4:
      return "force-cache";

    case
    /* OnlyIfCached */
    5:
      return "only-if-cached";
  }
}

function encodeRequestRedirect(param) {
  switch (param) {
    case
    /* Follow */
    0:
      return "follow";

    case
    /* Error */
    1:
      return "error";

    case
    /* Manual */
    2:
      return "manual";
  }
}

var HeadersInit = {};
exports.HeadersInit = HeadersInit;
var $$Headers = {};
exports.$$Headers = $$Headers;
var BodyInit = {};
exports.BodyInit = BodyInit;

function map(f, v) {
  if (v !== undefined) {
    return Caml_option.some(Curry._1(f, Caml_option.valFromOption(v)));
  }
}

function make(method_, headers, body, referrer, referrerPolicyOpt, mode, credentials, cache, redirect, integrityOpt, keepalive, signal) {
  var referrerPolicy = referrerPolicyOpt !== undefined ? referrerPolicyOpt :
  /* None */
  0;
  var integrity = integrityOpt !== undefined ? integrityOpt : "";
  var partial_arg = integrity;
  var partial_arg$1 = map(encodeRequestRedirect, redirect);
  var partial_arg$2 = map(encodeRequestCache, cache);
  var partial_arg$3 = map(encodeRequestCredentials, credentials);
  var partial_arg$4 = map(encodeRequestMode, mode);
  var partial_arg$5 = encodeReferrerPolicy(referrerPolicy);
  var partial_arg$6 = map(encodeRequestMethod, method_);
  return function (param) {
    var tmp = {};

    if (partial_arg$6 !== undefined) {
      tmp.method = partial_arg$6;
    }

    if (headers !== undefined) {
      tmp.headers = Caml_option.valFromOption(headers);
    }

    if (body !== undefined) {
      tmp.body = Caml_option.valFromOption(body);
    }

    if (referrer !== undefined) {
      tmp.referrer = referrer;
    }

    if (partial_arg$5 !== undefined) {
      tmp.referrerPolicy = partial_arg$5;
    }

    if (partial_arg$4 !== undefined) {
      tmp.mode = partial_arg$4;
    }

    if (partial_arg$3 !== undefined) {
      tmp.credentials = partial_arg$3;
    }

    if (partial_arg$2 !== undefined) {
      tmp.cache = partial_arg$2;
    }

    if (partial_arg$1 !== undefined) {
      tmp.redirect = partial_arg$1;
    }

    if (partial_arg !== undefined) {
      tmp.integrity = partial_arg;
    }

    if (keepalive !== undefined) {
      tmp.keepalive = keepalive;
    }

    if (signal !== undefined) {
      tmp.signal = Caml_option.valFromOption(signal);
    }

    return tmp;
  };
}

function method_(self) {
  var method_$1 = self.method;

  switch (method_$1) {
    case "CONNECT":
      return (
        /* Connect */
        5
      );

    case "DELETE":
      return (
        /* Delete */
        4
      );

    case "GET":
      return (
        /* Get */
        0
      );

    case "HEAD":
      return (
        /* Head */
        1
      );

    case "OPTIONS":
      return (
        /* Options */
        6
      );

    case "PATCH":
      return (
        /* Patch */
        8
      );

    case "POST":
      return (
        /* Post */
        2
      );

    case "PUT":
      return (
        /* Put */
        3
      );

    case "TRACE":
      return (
        /* Trace */
        7
      );

    default:
      return (
        /* Other */
        {
          _0: method_$1
        }
      );
  }
}

function type_(self) {
  var e = self.type;

  switch (e) {
    case "":
      return (
        /* None */
        0
      );

    case "audio":
      return (
        /* Audio */
        1
      );

    case "font":
      return (
        /* Font */
        2
      );

    case "image":
      return (
        /* Image */
        3
      );

    case "script":
      return (
        /* Script */
        4
      );

    case "style":
      return (
        /* Style */
        5
      );

    case "track":
      return (
        /* Track */
        6
      );

    case "video":
      return (
        /* Video */
        7
      );

    default:
      throw {
        RE_EXN_ID: "Failure",
        _1: "Unknown requestType: " + e,
        Error: new Error()
      };
  }
}

function destination(self) {
  var e = self.destination;

  switch (e) {
    case "":
      return (
        /* None */
        0
      );

    case "document":
      return (
        /* Document */
        1
      );

    case "embed":
      return (
        /* Embed */
        2
      );

    case "font":
      return (
        /* Font */
        3
      );

    case "image":
      return (
        /* Image */
        4
      );

    case "manifest":
      return (
        /* Manifest */
        5
      );

    case "media":
      return (
        /* Media */
        6
      );

    case "object":
      return (
        /* Object */
        7
      );

    case "report":
      return (
        /* Report */
        8
      );

    case "script":
      return (
        /* Script */
        9
      );

    case "serviceworker":
      return (
        /* ServiceWorker */
        10
      );

    case "sharedworder":
      return (
        /* SharedWorker */
        11
      );

    case "style":
      return (
        /* Style */
        12
      );

    case "worker":
      return (
        /* Worker */
        13
      );

    case "xslt":
      return (
        /* Xslt */
        14
      );

    default:
      throw {
        RE_EXN_ID: "Failure",
        _1: "Unknown requestDestination: " + e,
        Error: new Error()
      };
  }
}

function referrerPolicy(self) {
  var e = self.referrerPolicy;

  switch (e) {
    case "":
      return (
        /* None */
        0
      );

    case "no-referrer":
      return (
        /* NoReferrer */
        1
      );

    case "no-referrer-when-downgrade":
      return (
        /* NoReferrerWhenDowngrade */
        2
      );

    case "origin":
      return (
        /* Origin */
        4
      );

    case "origin-when-cross-origin":
      return (
        /* OriginWhenCrossOrigin */
        6
      );

    case "same-origin":
      return (
        /* SameOrigin */
        3
      );

    case "strict-origin":
      return (
        /* StrictOrigin */
        5
      );

    case "strict-origin-when-cross-origin":
      return (
        /* StrictOriginWhenCrossOrigin */
        7
      );

    case "unsafe-url":
      return (
        /* UnsafeUrl */
        8
      );

    default:
      throw {
        RE_EXN_ID: "Failure",
        _1: "Unknown referrerPolicy: " + e,
        Error: new Error()
      };
  }
}

function mode(self) {
  var e = self.mode;

  switch (e) {
    case "cors":
      return (
        /* CORS */
        3
      );

    case "navigate":
      return (
        /* Navigate */
        0
      );

    case "no-cors":
      return (
        /* NoCORS */
        2
      );

    case "same-origin":
      return (
        /* SameOrigin */
        1
      );

    default:
      throw {
        RE_EXN_ID: "Failure",
        _1: "Unknown requestMode: " + e,
        Error: new Error()
      };
  }
}

function credentials(self) {
  var e = self.credentials;

  switch (e) {
    case "include":
      return (
        /* Include */
        2
      );

    case "omit":
      return (
        /* Omit */
        0
      );

    case "same-origin":
      return (
        /* SameOrigin */
        1
      );

    default:
      throw {
        RE_EXN_ID: "Failure",
        _1: "Unknown requestCredentials: " + e,
        Error: new Error()
      };
  }
}

function cache(self) {
  var e = self.cache;

  switch (e) {
    case "default":
      return (
        /* Default */
        0
      );

    case "force-cache":
      return (
        /* ForceCache */
        4
      );

    case "no-cache":
      return (
        /* NoCache */
        3
      );

    case "no-store":
      return (
        /* NoStore */
        1
      );

    case "only-if-cached":
      return (
        /* OnlyIfCached */
        5
      );

    case "reload":
      return (
        /* Reload */
        2
      );

    default:
      throw {
        RE_EXN_ID: "Failure",
        _1: "Unknown requestCache: " + e,
        Error: new Error()
      };
  }
}

function redirect(self) {
  var e = self.redirect;

  switch (e) {
    case "error":
      return (
        /* Error */
        1
      );

    case "follow":
      return (
        /* Follow */
        0
      );

    case "manual":
      return (
        /* Manual */
        2
      );

    default:
      throw {
        RE_EXN_ID: "Failure",
        _1: "Unknown requestRedirect: " + e,
        Error: new Error()
      };
  }
}

var $$Request = {
  method_: method_,
  type_: type_,
  destination: destination,
  referrerPolicy: referrerPolicy,
  mode: mode,
  credentials: credentials,
  cache: cache,
  redirect: redirect
};
exports.$$Request = $$Request;
var $$Response = {};
exports.$$Response = $$Response;

function classify(t) {
  if (typeof t === "string") {
    return {
      NAME: "String",
      VAL: t
    };
  } else {
    return {
      NAME: "File",
      VAL: t
    };
  }
}

var EntryValue = {
  classify: classify
};
var $$FormData = {
  EntryValue: EntryValue,
  Iterator: undefined
};
exports.$$FormData = $$FormData;
var Body = {};
exports.Body = Body;
var RequestInit = {
  make: make
};
/* No side effect */

exports.RequestInit = RequestInit;
},{"rescript/lib/es6/curry.js":"../node_modules/rescript/lib/es6/curry.js","rescript/lib/es6/caml_option.js":"../node_modules/rescript/lib/es6/caml_option.js"}],"../node_modules/rescript/lib/es6/js_dict.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.entries = entries;
exports.values = values;
exports.fromList = fromList;
exports.fromArray = fromArray;
exports.map = map;
exports.unsafeDeleteKey = void 0;

var Caml_option = _interopRequireWildcard(require("./caml_option.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function get(dict, k) {
  if (k in dict) {
    return Caml_option.some(dict[k]);
  }
}

var unsafeDeleteKey = function (dict, key) {
  delete dict[key];
};

exports.unsafeDeleteKey = unsafeDeleteKey;

function entries(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values = new Array(l);

  for (var i = 0; i < l; ++i) {
    var key = keys[i];
    values[i] = [key, dict[key]];
  }

  return values;
}

function values(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values$1 = new Array(l);

  for (var i = 0; i < l; ++i) {
    values$1[i] = dict[keys[i]];
  }

  return values$1;
}

function fromList(entries) {
  var dict = {};
  var _param = entries;

  while (true) {
    var param = _param;

    if (!param) {
      return dict;
    }

    var match = param.hd;
    dict[match[0]] = match[1];
    _param = param.tl;
    continue;
  }

  ;
}

function fromArray(entries) {
  var dict = {};
  var l = entries.length;

  for (var i = 0; i < l; ++i) {
    var match = entries[i];
    dict[match[0]] = match[1];
  }

  return dict;
}

function map(f, source) {
  var target = {};
  var keys = Object.keys(source);
  var l = keys.length;

  for (var i = 0; i < l; ++i) {
    var key = keys[i];
    target[key] = f(source[key]);
  }

  return target;
}
/* No side effect */
},{"./caml_option.js":"../node_modules/rescript/lib/es6/caml_option.js"}],"../node_modules/rescript/lib/es6/caml.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.caml_int_compare = caml_int_compare;
exports.caml_bool_compare = caml_bool_compare;
exports.caml_float_compare = caml_float_compare;
exports.caml_string_compare = caml_string_compare;
exports.caml_bool_min = caml_bool_min;
exports.caml_int_min = caml_int_min;
exports.caml_float_min = caml_float_min;
exports.caml_string_min = caml_string_min;
exports.caml_int32_min = caml_int32_min;
exports.caml_bool_max = caml_bool_max;
exports.caml_int_max = caml_int_max;
exports.caml_float_max = caml_float_max;
exports.caml_string_max = caml_string_max;
exports.caml_int32_max = caml_int32_max;
exports.i64_eq = i64_eq;
exports.i64_neq = i64_neq;
exports.i64_lt = i64_lt;
exports.i64_gt = i64_gt;
exports.i64_le = i64_le;
exports.i64_ge = i64_ge;
exports.i64_min = i64_min;
exports.i64_max = i64_max;

function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}

function caml_bool_compare(x, y) {
  if (x) {
    if (y) {
      return 0;
    } else {
      return 1;
    }
  } else if (y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_float_compare(x, y) {
  if (x === y) {
    return 0;
  } else if (x < y) {
    return -1;
  } else if (x > y || x === x) {
    return 1;
  } else if (y === y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_string_compare(s1, s2) {
  if (s1 === s2) {
    return 0;
  } else if (s1 < s2) {
    return -1;
  } else {
    return 1;
  }
}

function caml_bool_min(x, y) {
  if (x) {
    return y;
  } else {
    return x;
  }
}

function caml_int_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_float_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_string_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_int32_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_bool_max(x, y) {
  if (x) {
    return x;
  } else {
    return y;
  }
}

function caml_int_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_float_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_string_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_int32_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function i64_eq(x, y) {
  if (x[1] === y[1]) {
    return x[0] === y[0];
  } else {
    return false;
  }
}

function i64_ge(param, param$1) {
  var other_hi = param$1[0];
  var hi = param[0];

  if (hi > other_hi) {
    return true;
  } else if (hi < other_hi) {
    return false;
  } else {
    return param[1] >= param$1[1];
  }
}

function i64_neq(x, y) {
  return !i64_eq(x, y);
}

function i64_lt(x, y) {
  return !i64_ge(x, y);
}

function i64_gt(x, y) {
  if (x[0] > y[0]) {
    return true;
  } else if (x[0] < y[0]) {
    return false;
  } else {
    return x[1] > y[1];
  }
}

function i64_le(x, y) {
  return !i64_gt(x, y);
}

function i64_min(x, y) {
  if (i64_ge(x, y)) {
    return y;
  } else {
    return x;
  }
}

function i64_max(x, y) {
  if (i64_gt(x, y)) {
    return x;
  } else {
    return y;
  }
}
/* No side effect */
},{}],"../node_modules/rescript/lib/es6/js_int.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equal = equal;
exports.min = exports.max = void 0;

function equal(x, y) {
  return x === y;
}

var max = 2147483647;
exports.max = max;
var min = -2147483648;
/* No side effect */

exports.min = min;
},{}],"../node_modules/rescript/lib/es6/js_math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafe_ceil = unsafe_ceil;
exports.ceil_int = ceil_int;
exports.unsafe_floor = unsafe_floor;
exports.floor_int = floor_int;
exports.random_int = random_int;
exports.floor = exports.ceil = void 0;

var Js_int = _interopRequireWildcard(require("./js_int.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function unsafe_ceil(prim) {
  return Math.ceil(prim);
}

function ceil_int(f) {
  if (f > Js_int.max) {
    return Js_int.max;
  } else if (f < Js_int.min) {
    return Js_int.min;
  } else {
    return Math.ceil(f);
  }
}

function unsafe_floor(prim) {
  return Math.floor(prim);
}

function floor_int(f) {
  if (f > Js_int.max) {
    return Js_int.max;
  } else if (f < Js_int.min) {
    return Js_int.min;
  } else {
    return Math.floor(f);
  }
}

function random_int(min, max) {
  return floor_int(Math.random() * (max - min | 0)) + min | 0;
}

var ceil = ceil_int;
exports.ceil = ceil;
var floor = floor_int;
/* No side effect */

exports.floor = floor;
},{"./js_int.js":"../node_modules/rescript/lib/es6/js_int.js"}],"../node_modules/rescript/lib/es6/belt_Array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.getExn = getExn;
exports.set = set;
exports.setExn = setExn;
exports.shuffleInPlace = shuffleInPlace;
exports.shuffle = shuffle;
exports.reverseInPlace = reverseInPlace;
exports.reverse = reverse;
exports.make = make;
exports.range = range;
exports.rangeBy = rangeBy;
exports.makeByU = makeByU;
exports.makeBy = makeBy;
exports.makeByAndShuffleU = makeByAndShuffleU;
exports.makeByAndShuffle = makeByAndShuffle;
exports.zip = zip;
exports.zipByU = zipByU;
exports.zipBy = zipBy;
exports.unzip = unzip;
exports.concat = concat;
exports.concatMany = concatMany;
exports.slice = slice;
exports.sliceToEnd = sliceToEnd;
exports.fill = fill;
exports.blit = blit;
exports.blitUnsafe = blitUnsafe;
exports.forEachU = forEachU;
exports.forEach = forEach;
exports.mapU = mapU;
exports.map = map;
exports.getByU = getByU;
exports.getBy = getBy;
exports.getIndexByU = getIndexByU;
exports.getIndexBy = getIndexBy;
exports.keepU = keepU;
exports.keep = keep;
exports.keepWithIndexU = keepWithIndexU;
exports.keepWithIndex = keepWithIndex;
exports.keepMapU = keepMapU;
exports.keepMap = keepMap;
exports.forEachWithIndexU = forEachWithIndexU;
exports.forEachWithIndex = forEachWithIndex;
exports.mapWithIndexU = mapWithIndexU;
exports.mapWithIndex = mapWithIndex;
exports.partitionU = partitionU;
exports.partition = partition;
exports.reduceU = reduceU;
exports.reduce = reduce;
exports.reduceReverseU = reduceReverseU;
exports.reduceReverse = reduceReverse;
exports.reduceReverse2U = reduceReverse2U;
exports.reduceReverse2 = reduceReverse2;
exports.reduceWithIndexU = reduceWithIndexU;
exports.reduceWithIndex = reduceWithIndex;
exports.joinWithU = joinWithU;
exports.joinWith = joinWith;
exports.someU = someU;
exports.some = some;
exports.everyU = everyU;
exports.every = every;
exports.every2U = every2U;
exports.every2 = every2;
exports.some2U = some2U;
exports.some2 = some2;
exports.cmpU = cmpU;
exports.cmp = cmp;
exports.eqU = eqU;
exports.eq = eq;

var Caml = _interopRequireWildcard(require("./caml.js"));

var Curry = _interopRequireWildcard(require("./curry.js"));

var Js_math = _interopRequireWildcard(require("./js_math.js"));

var Caml_option = _interopRequireWildcard(require("./caml_option.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function get(arr, i) {
  if (i >= 0 && i < arr.length) {
    return Caml_option.some(arr[i]);
  }
}

function getExn(arr, i) {
  if (!(i >= 0 && i < arr.length)) {
    throw {
      RE_EXN_ID: "Assert_failure",
      _1: ["belt_Array.ml", 27, 4],
      Error: new Error()
    };
  }

  return arr[i];
}

function set(arr, i, v) {
  if (i >= 0 && i < arr.length) {
    arr[i] = v;
    return true;
  } else {
    return false;
  }
}

function setExn(arr, i, v) {
  if (!(i >= 0 && i < arr.length)) {
    throw {
      RE_EXN_ID: "Assert_failure",
      _1: ["belt_Array.ml", 33, 2],
      Error: new Error()
    };
  }

  arr[i] = v;
}

function swapUnsafe(xs, i, j) {
  var tmp = xs[i];
  xs[i] = xs[j];
  xs[j] = tmp;
}

function shuffleInPlace(xs) {
  var len = xs.length;

  for (var i = 0; i < len; ++i) {
    swapUnsafe(xs, i, Js_math.random_int(i, len));
  }
}

function shuffle(xs) {
  var result = xs.slice(0);
  shuffleInPlace(result);
  return result;
}

function reverseInPlace(xs) {
  var len = xs.length;
  var ofs = 0;

  for (var i = 0, i_finish = len / 2 | 0; i < i_finish; ++i) {
    swapUnsafe(xs, ofs + i | 0, ((ofs + len | 0) - i | 0) - 1 | 0);
  }
}

function reverse(xs) {
  var len = xs.length;
  var result = new Array(len);

  for (var i = 0; i < len; ++i) {
    result[i] = xs[(len - 1 | 0) - i | 0];
  }

  return result;
}

function make(l, f) {
  if (l <= 0) {
    return [];
  }

  var res = new Array(l);

  for (var i = 0; i < l; ++i) {
    res[i] = f;
  }

  return res;
}

function makeByU(l, f) {
  if (l <= 0) {
    return [];
  }

  var res = new Array(l);

  for (var i = 0; i < l; ++i) {
    res[i] = f(i);
  }

  return res;
}

function makeBy(l, f) {
  return makeByU(l, Curry.__1(f));
}

function makeByAndShuffleU(l, f) {
  var u = makeByU(l, f);
  shuffleInPlace(u);
  return u;
}

function makeByAndShuffle(l, f) {
  return makeByAndShuffleU(l, Curry.__1(f));
}

function range(start, finish) {
  var cut = finish - start | 0;

  if (cut < 0) {
    return [];
  }

  var arr = new Array(cut + 1 | 0);

  for (var i = 0; i <= cut; ++i) {
    arr[i] = start + i | 0;
  }

  return arr;
}

function rangeBy(start, finish, step) {
  var cut = finish - start | 0;

  if (cut < 0 || step <= 0) {
    return [];
  }

  var nb = (cut / step | 0) + 1 | 0;
  var arr = new Array(nb);
  var cur = start;

  for (var i = 0; i < nb; ++i) {
    arr[i] = cur;
    cur = cur + step | 0;
  }

  return arr;
}

function zip(xs, ys) {
  var lenx = xs.length;
  var leny = ys.length;
  var len = lenx < leny ? lenx : leny;
  var s = new Array(len);

  for (var i = 0; i < len; ++i) {
    s[i] = [xs[i], ys[i]];
  }

  return s;
}

function zipByU(xs, ys, f) {
  var lenx = xs.length;
  var leny = ys.length;
  var len = lenx < leny ? lenx : leny;
  var s = new Array(len);

  for (var i = 0; i < len; ++i) {
    s[i] = f(xs[i], ys[i]);
  }

  return s;
}

function zipBy(xs, ys, f) {
  return zipByU(xs, ys, Curry.__2(f));
}

function concat(a1, a2) {
  var l1 = a1.length;
  var l2 = a2.length;
  var a1a2 = new Array(l1 + l2 | 0);

  for (var i = 0; i < l1; ++i) {
    a1a2[i] = a1[i];
  }

  for (var i$1 = 0; i$1 < l2; ++i$1) {
    a1a2[l1 + i$1 | 0] = a2[i$1];
  }

  return a1a2;
}

function concatMany(arrs) {
  var lenArrs = arrs.length;
  var totalLen = 0;

  for (var i = 0; i < lenArrs; ++i) {
    totalLen = totalLen + arrs[i].length | 0;
  }

  var result = new Array(totalLen);
  totalLen = 0;

  for (var j = 0; j < lenArrs; ++j) {
    var cur = arrs[j];

    for (var k = 0, k_finish = cur.length; k < k_finish; ++k) {
      result[totalLen] = cur[k];
      totalLen = totalLen + 1 | 0;
    }
  }

  return result;
}

function slice(a, offset, len) {
  if (len <= 0) {
    return [];
  }

  var lena = a.length;
  var ofs = offset < 0 ? Caml.caml_int_max(lena + offset | 0, 0) : offset;
  var hasLen = lena - ofs | 0;
  var copyLength = hasLen < len ? hasLen : len;

  if (copyLength <= 0) {
    return [];
  }

  var result = new Array(copyLength);

  for (var i = 0; i < copyLength; ++i) {
    result[i] = a[ofs + i | 0];
  }

  return result;
}

function sliceToEnd(a, offset) {
  var lena = a.length;
  var ofs = offset < 0 ? Caml.caml_int_max(lena + offset | 0, 0) : offset;
  var len = lena - ofs | 0;
  var result = new Array(len);

  for (var i = 0; i < len; ++i) {
    result[i] = a[ofs + i | 0];
  }

  return result;
}

function fill(a, offset, len, v) {
  if (len <= 0) {
    return;
  }

  var lena = a.length;
  var ofs = offset < 0 ? Caml.caml_int_max(lena + offset | 0, 0) : offset;
  var hasLen = lena - ofs | 0;
  var fillLength = hasLen < len ? hasLen : len;

  if (fillLength <= 0) {
    return;
  }

  for (var i = ofs, i_finish = ofs + fillLength | 0; i < i_finish; ++i) {
    a[i] = v;
  }
}

function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
  if (srcofs2 <= srcofs1) {
    for (var j = 0; j < blitLength; ++j) {
      a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
    }

    return;
  }

  for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
    a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
  }
}

function blit(a1, ofs1, a2, ofs2, len) {
  var lena1 = a1.length;
  var lena2 = a2.length;
  var srcofs1 = ofs1 < 0 ? Caml.caml_int_max(lena1 + ofs1 | 0, 0) : ofs1;
  var srcofs2 = ofs2 < 0 ? Caml.caml_int_max(lena2 + ofs2 | 0, 0) : ofs2;
  var blitLength = Caml.caml_int_min(len, Caml.caml_int_min(lena1 - srcofs1 | 0, lena2 - srcofs2 | 0));

  if (srcofs2 <= srcofs1) {
    for (var j = 0; j < blitLength; ++j) {
      a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
    }

    return;
  }

  for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
    a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
  }
}

function forEachU(a, f) {
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    f(a[i]);
  }
}

function forEach(a, f) {
  return forEachU(a, Curry.__1(f));
}

function mapU(a, f) {
  var l = a.length;
  var r = new Array(l);

  for (var i = 0; i < l; ++i) {
    r[i] = f(a[i]);
  }

  return r;
}

function map(a, f) {
  return mapU(a, Curry.__1(f));
}

function getByU(a, p) {
  var l = a.length;
  var i = 0;
  var r;

  while (r === undefined && i < l) {
    var v = a[i];

    if (p(v)) {
      r = Caml_option.some(v);
    }

    i = i + 1 | 0;
  }

  ;
  return r;
}

function getBy(a, p) {
  return getByU(a, Curry.__1(p));
}

function getIndexByU(a, p) {
  var l = a.length;
  var i = 0;
  var r;

  while (r === undefined && i < l) {
    var v = a[i];

    if (p(v)) {
      r = i;
    }

    i = i + 1 | 0;
  }

  ;
  return r;
}

function getIndexBy(a, p) {
  return getIndexByU(a, Curry.__1(p));
}

function keepU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;

  for (var i = 0; i < l; ++i) {
    var v = a[i];

    if (f(v)) {
      r[j] = v;
      j = j + 1 | 0;
    }
  }

  r.length = j;
  return r;
}

function keep(a, f) {
  return keepU(a, Curry.__1(f));
}

function keepWithIndexU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;

  for (var i = 0; i < l; ++i) {
    var v = a[i];

    if (f(v, i)) {
      r[j] = v;
      j = j + 1 | 0;
    }
  }

  r.length = j;
  return r;
}

function keepWithIndex(a, f) {
  return keepWithIndexU(a, Curry.__2(f));
}

function keepMapU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;

  for (var i = 0; i < l; ++i) {
    var v = a[i];
    var v$1 = f(v);

    if (v$1 !== undefined) {
      r[j] = Caml_option.valFromOption(v$1);
      j = j + 1 | 0;
    }
  }

  r.length = j;
  return r;
}

function keepMap(a, f) {
  return keepMapU(a, Curry.__1(f));
}

function forEachWithIndexU(a, f) {
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    f(i, a[i]);
  }
}

function forEachWithIndex(a, f) {
  return forEachWithIndexU(a, Curry.__2(f));
}

function mapWithIndexU(a, f) {
  var l = a.length;
  var r = new Array(l);

  for (var i = 0; i < l; ++i) {
    r[i] = f(i, a[i]);
  }

  return r;
}

function mapWithIndex(a, f) {
  return mapWithIndexU(a, Curry.__2(f));
}

function reduceU(a, x, f) {
  var r = x;

  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = f(r, a[i]);
  }

  return r;
}

function reduce(a, x, f) {
  return reduceU(a, x, Curry.__2(f));
}

function reduceReverseU(a, x, f) {
  var r = x;

  for (var i = a.length - 1 | 0; i >= 0; --i) {
    r = f(r, a[i]);
  }

  return r;
}

function reduceReverse(a, x, f) {
  return reduceReverseU(a, x, Curry.__2(f));
}

function reduceReverse2U(a, b, x, f) {
  var r = x;
  var len = Caml.caml_int_min(a.length, b.length);

  for (var i = len - 1 | 0; i >= 0; --i) {
    r = f(r, a[i], b[i]);
  }

  return r;
}

function reduceReverse2(a, b, x, f) {
  return reduceReverse2U(a, b, x, Curry.__3(f));
}

function reduceWithIndexU(a, x, f) {
  var r = x;

  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = f(r, a[i], i);
  }

  return r;
}

function reduceWithIndex(a, x, f) {
  return reduceWithIndexU(a, x, Curry.__3(f));
}

function everyU(arr, b) {
  var len = arr.length;
  var _i = 0;

  while (true) {
    var i = _i;

    if (i === len) {
      return true;
    }

    if (!b(arr[i])) {
      return false;
    }

    _i = i + 1 | 0;
    continue;
  }

  ;
}

function every(arr, f) {
  return everyU(arr, Curry.__1(f));
}

function someU(arr, b) {
  var len = arr.length;
  var _i = 0;

  while (true) {
    var i = _i;

    if (i === len) {
      return false;
    }

    if (b(arr[i])) {
      return true;
    }

    _i = i + 1 | 0;
    continue;
  }

  ;
}

function some(arr, f) {
  return someU(arr, Curry.__1(f));
}

function everyAux2(arr1, arr2, _i, b, len) {
  while (true) {
    var i = _i;

    if (i === len) {
      return true;
    }

    if (!b(arr1[i], arr2[i])) {
      return false;
    }

    _i = i + 1 | 0;
    continue;
  }

  ;
}

function every2U(a, b, p) {
  return everyAux2(a, b, 0, p, Caml.caml_int_min(a.length, b.length));
}

function every2(a, b, p) {
  return every2U(a, b, Curry.__2(p));
}

function some2U(a, b, p) {
  var _i = 0;
  var len = Caml.caml_int_min(a.length, b.length);

  while (true) {
    var i = _i;

    if (i === len) {
      return false;
    }

    if (p(a[i], b[i])) {
      return true;
    }

    _i = i + 1 | 0;
    continue;
  }

  ;
}

function some2(a, b, p) {
  return some2U(a, b, Curry.__2(p));
}

function eqU(a, b, p) {
  var lena = a.length;
  var lenb = b.length;

  if (lena === lenb) {
    return everyAux2(a, b, 0, p, lena);
  } else {
    return false;
  }
}

function eq(a, b, p) {
  return eqU(a, b, Curry.__2(p));
}

function cmpU(a, b, p) {
  var lena = a.length;
  var lenb = b.length;

  if (lena > lenb) {
    return 1;
  } else if (lena < lenb) {
    return -1;
  } else {
    var _i = 0;

    while (true) {
      var i = _i;

      if (i === lena) {
        return 0;
      }

      var c = p(a[i], b[i]);

      if (c !== 0) {
        return c;
      }

      _i = i + 1 | 0;
      continue;
    }

    ;
  }
}

function cmp(a, b, p) {
  return cmpU(a, b, Curry.__2(p));
}

function partitionU(a, f) {
  var l = a.length;
  var i = 0;
  var j = 0;
  var a1 = new Array(l);
  var a2 = new Array(l);

  for (var ii = 0; ii < l; ++ii) {
    var v = a[ii];

    if (f(v)) {
      a1[i] = v;
      i = i + 1 | 0;
    } else {
      a2[j] = v;
      j = j + 1 | 0;
    }
  }

  a1.length = i;
  a2.length = j;
  return [a1, a2];
}

function partition(a, f) {
  return partitionU(a, Curry.__1(f));
}

function unzip(a) {
  var l = a.length;
  var a1 = new Array(l);
  var a2 = new Array(l);

  for (var i = 0; i < l; ++i) {
    var match = a[i];
    a1[i] = match[0];
    a2[i] = match[1];
  }

  return [a1, a2];
}

function joinWithU(a, sep, toString) {
  var l = a.length;

  if (l === 0) {
    return "";
  }

  var lastIndex = l - 1 | 0;
  var _i = 0;
  var _res = "";

  while (true) {
    var res = _res;
    var i = _i;

    if (i === lastIndex) {
      return res + toString(a[i]);
    }

    _res = res + (toString(a[i]) + sep);
    _i = i + 1 | 0;
    continue;
  }

  ;
}

function joinWith(a, sep, toString) {
  return joinWithU(a, sep, Curry.__1(toString));
}
/* No side effect */
},{"./caml.js":"../node_modules/rescript/lib/es6/caml.js","./curry.js":"../node_modules/rescript/lib/es6/curry.js","./js_math.js":"../node_modules/rescript/lib/es6/js_math.js","./caml_option.js":"../node_modules/rescript/lib/es6/caml_option.js"}],"../node_modules/rescript/lib/es6/belt_SortArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strictlySortedLengthU = strictlySortedLengthU;
exports.strictlySortedLength = strictlySortedLength;
exports.isSortedU = isSortedU;
exports.isSorted = isSorted;
exports.stableSortInPlaceByU = stableSortInPlaceByU;
exports.stableSortInPlaceBy = stableSortInPlaceBy;
exports.stableSortByU = stableSortByU;
exports.stableSortBy = stableSortBy;
exports.binarySearchByU = binarySearchByU;
exports.binarySearchBy = binarySearchBy;
exports.unionU = unionU;
exports.union = union;
exports.intersectU = intersectU;
exports.intersect = intersect;
exports.diffU = diffU;
exports.diff = diff;
exports.$$String = exports.Int = void 0;

var Curry = _interopRequireWildcard(require("./curry.js"));

var Belt_Array = _interopRequireWildcard(require("./belt_Array.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function sortedLengthAuxMore(xs, _prec, _acc, len, lt) {
  while (true) {
    var acc = _acc;
    var prec = _prec;

    if (acc >= len) {
      return acc;
    }

    var v = xs[acc];

    if (!lt(v, prec)) {
      return acc;
    }

    _acc = acc + 1 | 0;
    _prec = v;
    continue;
  }

  ;
}

function strictlySortedLengthU(xs, lt) {
  var len = xs.length;

  if (len === 0 || len === 1) {
    return len;
  }

  var x0 = xs[0];
  var x1 = xs[1];

  if (lt(x0, x1)) {
    var _prec = x1;
    var _acc = 2;

    while (true) {
      var acc = _acc;
      var prec = _prec;

      if (acc >= len) {
        return acc;
      }

      var v = xs[acc];

      if (!lt(prec, v)) {
        return acc;
      }

      _acc = acc + 1 | 0;
      _prec = v;
      continue;
    }

    ;
  } else if (lt(x1, x0)) {
    return -sortedLengthAuxMore(xs, x1, 2, len, lt) | 0;
  } else {
    return 1;
  }
}

function strictlySortedLength(xs, lt) {
  return strictlySortedLengthU(xs, Curry.__2(lt));
}

function isSortedU(a, cmp) {
  var len = a.length;

  if (len === 0) {
    return true;
  } else {
    var _i = 0;
    var last_bound = len - 1 | 0;

    while (true) {
      var i = _i;

      if (i === last_bound) {
        return true;
      }

      if (cmp(a[i], a[i + 1 | 0]) > 0) {
        return false;
      }

      _i = i + 1 | 0;
      continue;
    }

    ;
  }
}

function isSorted(a, cmp) {
  return isSortedU(a, Curry.__2(cmp));
}

function merge(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;

  while (true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;

    if (cmp(s1, s2) <= 0) {
      dst[d] = s1;
      var i1$1 = i1 + 1 | 0;

      if (i1$1 >= src1r) {
        return Belt_Array.blitUnsafe(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
      }

      _d = d + 1 | 0;
      _s1 = src[i1$1];
      _i1 = i1$1;
      continue;
    }

    dst[d] = s2;
    var i2$1 = i2 + 1 | 0;

    if (i2$1 >= src2r) {
      return Belt_Array.blitUnsafe(src, i1, dst, d + 1 | 0, src1r - i1 | 0);
    }

    _d = d + 1 | 0;
    _s2 = src2[i2$1];
    _i2 = i2$1;
    continue;
  }

  ;
}

function unionU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;

  while (true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    var c = cmp(s1, s2);

    if (c < 0) {
      dst[d] = s1;
      var i1$1 = i1 + 1 | 0;
      var d$1 = d + 1 | 0;

      if (i1$1 < src1r) {
        _d = d$1;
        _s1 = src[i1$1];
        _i1 = i1$1;
        continue;
      }

      Belt_Array.blitUnsafe(src2, i2, dst, d$1, src2r - i2 | 0);
      return (d$1 + src2r | 0) - i2 | 0;
    }

    if (c === 0) {
      dst[d] = s1;
      var i1$2 = i1 + 1 | 0;
      var i2$1 = i2 + 1 | 0;
      var d$2 = d + 1 | 0;

      if (!(i1$2 < src1r && i2$1 < src2r)) {
        if (i1$2 === src1r) {
          Belt_Array.blitUnsafe(src2, i2$1, dst, d$2, src2r - i2$1 | 0);
          return (d$2 + src2r | 0) - i2$1 | 0;
        } else {
          Belt_Array.blitUnsafe(src, i1$2, dst, d$2, src1r - i1$2 | 0);
          return (d$2 + src1r | 0) - i1$2 | 0;
        }
      }

      _d = d$2;
      _s2 = src2[i2$1];
      _i2 = i2$1;
      _s1 = src[i1$2];
      _i1 = i1$2;
      continue;
    }

    dst[d] = s2;
    var i2$2 = i2 + 1 | 0;
    var d$3 = d + 1 | 0;

    if (i2$2 < src2r) {
      _d = d$3;
      _s2 = src2[i2$2];
      _i2 = i2$2;
      continue;
    }

    Belt_Array.blitUnsafe(src, i1, dst, d$3, src1r - i1 | 0);
    return (d$3 + src1r | 0) - i1 | 0;
  }

  ;
}

function union(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  return unionU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, Curry.__2(cmp));
}

function intersectU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;

  while (true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    var c = cmp(s1, s2);

    if (c < 0) {
      var i1$1 = i1 + 1 | 0;

      if (i1$1 >= src1r) {
        return d;
      }

      _s1 = src[i1$1];
      _i1 = i1$1;
      continue;
    }

    if (c === 0) {
      dst[d] = s1;
      var i1$2 = i1 + 1 | 0;
      var i2$1 = i2 + 1 | 0;
      var d$1 = d + 1 | 0;

      if (!(i1$2 < src1r && i2$1 < src2r)) {
        return d$1;
      }

      _d = d$1;
      _s2 = src2[i2$1];
      _i2 = i2$1;
      _s1 = src[i1$2];
      _i1 = i1$2;
      continue;
    }

    var i2$2 = i2 + 1 | 0;

    if (i2$2 >= src2r) {
      return d;
    }

    _s2 = src2[i2$2];
    _i2 = i2$2;
    continue;
  }

  ;
}

function intersect(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  return intersectU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, Curry.__2(cmp));
}

function diffU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;

  while (true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    var c = cmp(s1, s2);

    if (c < 0) {
      dst[d] = s1;
      var d$1 = d + 1 | 0;
      var i1$1 = i1 + 1 | 0;

      if (i1$1 >= src1r) {
        return d$1;
      }

      _d = d$1;
      _s1 = src[i1$1];
      _i1 = i1$1;
      continue;
    }

    if (c === 0) {
      var i1$2 = i1 + 1 | 0;
      var i2$1 = i2 + 1 | 0;

      if (!(i1$2 < src1r && i2$1 < src2r)) {
        if (i1$2 === src1r) {
          return d;
        } else {
          Belt_Array.blitUnsafe(src, i1$2, dst, d, src1r - i1$2 | 0);
          return (d + src1r | 0) - i1$2 | 0;
        }
      }

      _s2 = src2[i2$1];
      _i2 = i2$1;
      _s1 = src[i1$2];
      _i1 = i1$2;
      continue;
    }

    var i2$2 = i2 + 1 | 0;

    if (i2$2 < src2r) {
      _s2 = src2[i2$2];
      _i2 = i2$2;
      continue;
    }

    Belt_Array.blitUnsafe(src, i1, dst, d, src1r - i1 | 0);
    return (d + src1r | 0) - i1 | 0;
  }

  ;
}

function diff(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  return diffU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, Curry.__2(cmp));
}

function insertionSort(src, srcofs, dst, dstofs, len, cmp) {
  for (var i = 0; i < len; ++i) {
    var e = src[srcofs + i | 0];
    var j = (dstofs + i | 0) - 1 | 0;

    while (j >= dstofs && cmp(dst[j], e) > 0) {
      dst[j + 1 | 0] = dst[j];
      j = j - 1 | 0;
    }

    ;
    dst[j + 1 | 0] = e;
  }
}

function sortTo(src, srcofs, dst, dstofs, len, cmp) {
  if (len <= 5) {
    return insertionSort(src, srcofs, dst, dstofs, len, cmp);
  }

  var l1 = len / 2 | 0;
  var l2 = len - l1 | 0;
  sortTo(src, srcofs + l1 | 0, dst, dstofs + l1 | 0, l2, cmp);
  sortTo(src, srcofs, src, srcofs + l2 | 0, l1, cmp);
  return merge(src, srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs, cmp);
}

function stableSortInPlaceByU(a, cmp) {
  var l = a.length;

  if (l <= 5) {
    return insertionSort(a, 0, a, 0, l, cmp);
  }

  var l1 = l / 2 | 0;
  var l2 = l - l1 | 0;
  var t = new Array(l2);
  sortTo(a, l1, t, 0, l2, cmp);
  sortTo(a, 0, a, l2, l1, cmp);
  return merge(a, l2, l1, t, 0, l2, a, 0, cmp);
}

function stableSortInPlaceBy(a, cmp) {
  return stableSortInPlaceByU(a, Curry.__2(cmp));
}

function stableSortByU(a, cmp) {
  var b = a.slice(0);
  stableSortInPlaceByU(b, cmp);
  return b;
}

function stableSortBy(a, cmp) {
  return stableSortByU(a, Curry.__2(cmp));
}

function binarySearchByU(sorted, key, cmp) {
  var len = sorted.length;

  if (len === 0) {
    return -1;
  }

  var lo = sorted[0];
  var c = cmp(key, lo);

  if (c < 0) {
    return -1;
  }

  var hi = sorted[len - 1 | 0];
  var c2 = cmp(key, hi);

  if (c2 > 0) {
    return -(len + 1 | 0) | 0;
  } else {
    var _lo = 0;

    var _hi = len - 1 | 0;

    while (true) {
      var hi$1 = _hi;
      var lo$1 = _lo;
      var mid = (lo$1 + hi$1 | 0) / 2 | 0;
      var midVal = sorted[mid];
      var c$1 = cmp(key, midVal);

      if (c$1 === 0) {
        return mid;
      }

      if (c$1 < 0) {
        if (hi$1 === mid) {
          if (cmp(sorted[lo$1], key) === 0) {
            return lo$1;
          } else {
            return -(hi$1 + 1 | 0) | 0;
          }
        }

        _hi = mid;
        continue;
      }

      if (lo$1 === mid) {
        if (cmp(sorted[hi$1], key) === 0) {
          return hi$1;
        } else {
          return -(hi$1 + 1 | 0) | 0;
        }
      }

      _lo = mid;
      continue;
    }

    ;
  }
}

function binarySearchBy(sorted, key, cmp) {
  return binarySearchByU(sorted, key, Curry.__2(cmp));
}

var Int;
exports.Int = Int;
var $$String;
/* No side effect */

exports.$$String = $$String;
},{"./curry.js":"../node_modules/rescript/lib/es6/curry.js","./belt_Array.js":"../node_modules/rescript/lib/es6/belt_Array.js"}],"../node_modules/rescript/lib/es6/belt_List.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.length = length;
exports.head = head;
exports.headExn = headExn;
exports.tail = tail;
exports.tailExn = tailExn;
exports.add = add;
exports.get = get;
exports.getExn = getExn;
exports.make = make;
exports.makeByU = makeByU;
exports.makeBy = makeBy;
exports.shuffle = shuffle;
exports.drop = drop;
exports.take = take;
exports.splitAt = splitAt;
exports.concat = concat;
exports.concatMany = concatMany;
exports.reverseConcat = reverseConcat;
exports.flatten = flatten;
exports.mapU = mapU;
exports.map = map;
exports.zip = zip;
exports.zipByU = zipByU;
exports.zipBy = zipBy;
exports.mapWithIndexU = mapWithIndexU;
exports.mapWithIndex = mapWithIndex;
exports.fromArray = fromArray;
exports.toArray = toArray;
exports.reverse = reverse;
exports.mapReverseU = mapReverseU;
exports.mapReverse = mapReverse;
exports.forEachU = forEachU;
exports.forEach = forEach;
exports.forEachWithIndexU = forEachWithIndexU;
exports.forEachWithIndex = forEachWithIndex;
exports.reduceU = reduceU;
exports.reduce = reduce;
exports.reduceWithIndexU = reduceWithIndexU;
exports.reduceWithIndex = reduceWithIndex;
exports.reduceReverseU = reduceReverseU;
exports.reduceReverse = reduceReverse;
exports.mapReverse2U = mapReverse2U;
exports.mapReverse2 = mapReverse2;
exports.forEach2U = forEach2U;
exports.forEach2 = forEach2;
exports.reduce2U = reduce2U;
exports.reduce2 = reduce2;
exports.reduceReverse2U = reduceReverse2U;
exports.reduceReverse2 = reduceReverse2;
exports.everyU = everyU;
exports.every = every;
exports.someU = someU;
exports.some = some;
exports.every2U = every2U;
exports.every2 = every2;
exports.some2U = some2U;
exports.some2 = some2;
exports.cmpByLength = cmpByLength;
exports.cmpU = cmpU;
exports.cmp = cmp;
exports.eqU = eqU;
exports.eq = eq;
exports.hasU = hasU;
exports.has = has;
exports.getByU = getByU;
exports.getBy = getBy;
exports.keepU = keepU;
exports.keep = keep;
exports.keepWithIndexU = keepWithIndexU;
exports.keepWithIndex = keepWithIndex;
exports.keepMapU = keepMapU;
exports.keepMap = keepMap;
exports.partitionU = partitionU;
exports.partition = partition;
exports.unzip = unzip;
exports.getAssocU = getAssocU;
exports.getAssoc = getAssoc;
exports.hasAssocU = hasAssocU;
exports.hasAssoc = hasAssoc;
exports.removeAssocU = removeAssocU;
exports.removeAssoc = removeAssoc;
exports.setAssocU = setAssocU;
exports.setAssoc = setAssoc;
exports.sortU = sortU;
exports.sort = sort;
exports.filterWithIndex = exports.filter = exports.size = void 0;

var Curry = _interopRequireWildcard(require("./curry.js"));

var Belt_Array = _interopRequireWildcard(require("./belt_Array.js"));

var Caml_option = _interopRequireWildcard(require("./caml_option.js"));

var Belt_SortArray = _interopRequireWildcard(require("./belt_SortArray.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function head(x) {
  if (x) {
    return Caml_option.some(x.hd);
  }
}

function headExn(x) {
  if (x) {
    return x.hd;
  }

  throw {
    RE_EXN_ID: "Not_found",
    Error: new Error()
  };
}

function tail(x) {
  if (x) {
    return x.tl;
  }
}

function tailExn(x) {
  if (x) {
    return x.tl;
  }

  throw {
    RE_EXN_ID: "Not_found",
    Error: new Error()
  };
}

function add(xs, x) {
  return {
    hd: x,
    tl: xs
  };
}

function get(x, n) {
  if (n < 0) {
    return;
  } else {
    var _x = x;
    var _n = n;

    while (true) {
      var n$1 = _n;
      var x$1 = _x;

      if (!x$1) {
        return;
      }

      if (n$1 === 0) {
        return Caml_option.some(x$1.hd);
      }

      _n = n$1 - 1 | 0;
      _x = x$1.tl;
      continue;
    }

    ;
  }
}

function getExn(x, n) {
  if (n < 0) {
    throw {
      RE_EXN_ID: "Not_found",
      Error: new Error()
    };
  }

  var _x = x;
  var _n = n;

  while (true) {
    var n$1 = _n;
    var x$1 = _x;

    if (x$1) {
      if (n$1 === 0) {
        return x$1.hd;
      }

      _n = n$1 - 1 | 0;
      _x = x$1.tl;
      continue;
    }

    throw {
      RE_EXN_ID: "Not_found",
      Error: new Error()
    };
  }

  ;
}

function partitionAux(p, _cell, _precX, _precY) {
  while (true) {
    var precY = _precY;
    var precX = _precX;
    var cell = _cell;

    if (!cell) {
      return;
    }

    var t = cell.tl;
    var h = cell.hd;
    var next = {
      hd: h,
      tl:
      /* [] */
      0
    };

    if (p(h)) {
      precX.tl = next;
      _precX = next;
      _cell = t;
      continue;
    }

    precY.tl = next;
    _precY = next;
    _cell = t;
    continue;
  }

  ;
}

function splitAux(_cell, _precX, _precY) {
  while (true) {
    var precY = _precY;
    var precX = _precX;
    var cell = _cell;

    if (!cell) {
      return;
    }

    var match = cell.hd;
    var nextA = {
      hd: match[0],
      tl:
      /* [] */
      0
    };
    var nextB = {
      hd: match[1],
      tl:
      /* [] */
      0
    };
    precX.tl = nextA;
    precY.tl = nextB;
    _precY = nextB;
    _precX = nextA;
    _cell = cell.tl;
    continue;
  }

  ;
}

function copyAuxCont(_cellX, _prec) {
  while (true) {
    var prec = _prec;
    var cellX = _cellX;

    if (!cellX) {
      return prec;
    }

    var next = {
      hd: cellX.hd,
      tl:
      /* [] */
      0
    };
    prec.tl = next;
    _prec = next;
    _cellX = cellX.tl;
    continue;
  }

  ;
}

function copyAuxWitFilter(f, _cellX, _prec) {
  while (true) {
    var prec = _prec;
    var cellX = _cellX;

    if (!cellX) {
      return;
    }

    var t = cellX.tl;
    var h = cellX.hd;

    if (f(h)) {
      var next = {
        hd: h,
        tl:
        /* [] */
        0
      };
      prec.tl = next;
      _prec = next;
      _cellX = t;
      continue;
    }

    _cellX = t;
    continue;
  }

  ;
}

function copyAuxWithFilterIndex(f, _cellX, _prec, _i) {
  while (true) {
    var i = _i;
    var prec = _prec;
    var cellX = _cellX;

    if (!cellX) {
      return;
    }

    var t = cellX.tl;
    var h = cellX.hd;

    if (f(h, i)) {
      var next = {
        hd: h,
        tl:
        /* [] */
        0
      };
      prec.tl = next;
      _i = i + 1 | 0;
      _prec = next;
      _cellX = t;
      continue;
    }

    _i = i + 1 | 0;
    _cellX = t;
    continue;
  }

  ;
}

function copyAuxWitFilterMap(f, _cellX, _prec) {
  while (true) {
    var prec = _prec;
    var cellX = _cellX;

    if (!cellX) {
      return;
    }

    var t = cellX.tl;
    var h = f(cellX.hd);

    if (h !== undefined) {
      var next = {
        hd: Caml_option.valFromOption(h),
        tl:
        /* [] */
        0
      };
      prec.tl = next;
      _prec = next;
      _cellX = t;
      continue;
    }

    _cellX = t;
    continue;
  }

  ;
}

function removeAssocAuxWithMap(_cellX, x, _prec, f) {
  while (true) {
    var prec = _prec;
    var cellX = _cellX;

    if (!cellX) {
      return false;
    }

    var t = cellX.tl;
    var h = cellX.hd;

    if (f(h[0], x)) {
      prec.tl = t;
      return true;
    }

    var next = {
      hd: h,
      tl:
      /* [] */
      0
    };
    prec.tl = next;
    _prec = next;
    _cellX = t;
    continue;
  }

  ;
}

function setAssocAuxWithMap(_cellX, x, k, _prec, eq) {
  while (true) {
    var prec = _prec;
    var cellX = _cellX;

    if (!cellX) {
      return false;
    }

    var t = cellX.tl;
    var h = cellX.hd;

    if (eq(h[0], x)) {
      prec.tl = {
        hd: [x, k],
        tl: t
      };
      return true;
    }

    var next = {
      hd: h,
      tl:
      /* [] */
      0
    };
    prec.tl = next;
    _prec = next;
    _cellX = t;
    continue;
  }

  ;
}

function copyAuxWithMap(_cellX, _prec, f) {
  while (true) {
    var prec = _prec;
    var cellX = _cellX;

    if (!cellX) {
      return;
    }

    var next = {
      hd: f(cellX.hd),
      tl:
      /* [] */
      0
    };
    prec.tl = next;
    _prec = next;
    _cellX = cellX.tl;
    continue;
  }

  ;
}

function zipAux(_cellX, _cellY, _prec) {
  while (true) {
    var prec = _prec;
    var cellY = _cellY;
    var cellX = _cellX;

    if (!cellX) {
      return;
    }

    if (!cellY) {
      return;
    }

    var next = {
      hd: [cellX.hd, cellY.hd],
      tl:
      /* [] */
      0
    };
    prec.tl = next;
    _prec = next;
    _cellY = cellY.tl;
    _cellX = cellX.tl;
    continue;
  }

  ;
}

function copyAuxWithMap2(f, _cellX, _cellY, _prec) {
  while (true) {
    var prec = _prec;
    var cellY = _cellY;
    var cellX = _cellX;

    if (!cellX) {
      return;
    }

    if (!cellY) {
      return;
    }

    var next = {
      hd: f(cellX.hd, cellY.hd),
      tl:
      /* [] */
      0
    };
    prec.tl = next;
    _prec = next;
    _cellY = cellY.tl;
    _cellX = cellX.tl;
    continue;
  }

  ;
}

function copyAuxWithMapI(f, _i, _cellX, _prec) {
  while (true) {
    var prec = _prec;
    var cellX = _cellX;
    var i = _i;

    if (!cellX) {
      return;
    }

    var next = {
      hd: f(i, cellX.hd),
      tl:
      /* [] */
      0
    };
    prec.tl = next;
    _prec = next;
    _cellX = cellX.tl;
    _i = i + 1 | 0;
    continue;
  }

  ;
}

function takeAux(_n, _cell, _prec) {
  while (true) {
    var prec = _prec;
    var cell = _cell;
    var n = _n;

    if (n === 0) {
      return true;
    }

    if (!cell) {
      return false;
    }

    var cell$1 = {
      hd: cell.hd,
      tl:
      /* [] */
      0
    };
    prec.tl = cell$1;
    _prec = cell$1;
    _cell = cell.tl;
    _n = n - 1 | 0;
    continue;
  }

  ;
}

function splitAtAux(_n, _cell, _prec) {
  while (true) {
    var prec = _prec;
    var cell = _cell;
    var n = _n;

    if (n === 0) {
      return cell;
    }

    if (!cell) {
      return;
    }

    var cell$1 = {
      hd: cell.hd,
      tl:
      /* [] */
      0
    };
    prec.tl = cell$1;
    _prec = cell$1;
    _cell = cell.tl;
    _n = n - 1 | 0;
    continue;
  }

  ;
}

function take(lst, n) {
  if (n < 0) {
    return;
  }

  if (n === 0) {
    return (
      /* [] */
      0
    );
  }

  if (!lst) {
    return;
  }

  var cell = {
    hd: lst.hd,
    tl:
    /* [] */
    0
  };
  var has = takeAux(n - 1 | 0, lst.tl, cell);

  if (has) {
    return cell;
  }
}

function drop(lst, n) {
  if (n < 0) {
    return;
  } else {
    var _l = lst;
    var _n = n;

    while (true) {
      var n$1 = _n;
      var l = _l;

      if (n$1 === 0) {
        return l;
      }

      if (!l) {
        return;
      }

      _n = n$1 - 1 | 0;
      _l = l.tl;
      continue;
    }

    ;
  }
}

function splitAt(lst, n) {
  if (n < 0) {
    return;
  }

  if (n === 0) {
    return [
    /* [] */
    0, lst];
  }

  if (!lst) {
    return;
  }

  var cell = {
    hd: lst.hd,
    tl:
    /* [] */
    0
  };
  var rest = splitAtAux(n - 1 | 0, lst.tl, cell);

  if (rest !== undefined) {
    return [cell, rest];
  }
}

function concat(xs, ys) {
  if (!xs) {
    return ys;
  }

  var cell = {
    hd: xs.hd,
    tl:
    /* [] */
    0
  };
  copyAuxCont(xs.tl, cell).tl = ys;
  return cell;
}

function mapU(xs, f) {
  if (!xs) {
    return (
      /* [] */
      0
    );
  }

  var cell = {
    hd: f(xs.hd),
    tl:
    /* [] */
    0
  };
  copyAuxWithMap(xs.tl, cell, f);
  return cell;
}

function map(xs, f) {
  return mapU(xs, Curry.__1(f));
}

function zipByU(l1, l2, f) {
  if (!l1) {
    return (
      /* [] */
      0
    );
  }

  if (!l2) {
    return (
      /* [] */
      0
    );
  }

  var cell = {
    hd: f(l1.hd, l2.hd),
    tl:
    /* [] */
    0
  };
  copyAuxWithMap2(f, l1.tl, l2.tl, cell);
  return cell;
}

function zipBy(l1, l2, f) {
  return zipByU(l1, l2, Curry.__2(f));
}

function mapWithIndexU(xs, f) {
  if (!xs) {
    return (
      /* [] */
      0
    );
  }

  var cell = {
    hd: f(0, xs.hd),
    tl:
    /* [] */
    0
  };
  copyAuxWithMapI(f, 1, xs.tl, cell);
  return cell;
}

function mapWithIndex(xs, f) {
  return mapWithIndexU(xs, Curry.__2(f));
}

function makeByU(n, f) {
  if (n <= 0) {
    return (
      /* [] */
      0
    );
  }

  var headX = {
    hd: f(0),
    tl:
    /* [] */
    0
  };
  var cur = headX;
  var i = 1;

  while (i < n) {
    var v = {
      hd: f(i),
      tl:
      /* [] */
      0
    };
    cur.tl = v;
    cur = v;
    i = i + 1 | 0;
  }

  ;
  return headX;
}

function makeBy(n, f) {
  return makeByU(n, Curry.__1(f));
}

function make(n, v) {
  if (n <= 0) {
    return (
      /* [] */
      0
    );
  }

  var headX = {
    hd: v,
    tl:
    /* [] */
    0
  };
  var cur = headX;
  var i = 1;

  while (i < n) {
    var v$1 = {
      hd: v,
      tl:
      /* [] */
      0
    };
    cur.tl = v$1;
    cur = v$1;
    i = i + 1 | 0;
  }

  ;
  return headX;
}

function length(xs) {
  var _x = xs;
  var _acc = 0;

  while (true) {
    var acc = _acc;
    var x = _x;

    if (!x) {
      return acc;
    }

    _acc = acc + 1 | 0;
    _x = x.tl;
    continue;
  }

  ;
}

function fillAux(arr, _i, _x) {
  while (true) {
    var x = _x;
    var i = _i;

    if (!x) {
      return;
    }

    arr[i] = x.hd;
    _x = x.tl;
    _i = i + 1 | 0;
    continue;
  }

  ;
}

function fromArray(a) {
  var _i = a.length - 1 | 0;

  var _res =
  /* [] */
  0;

  while (true) {
    var res = _res;
    var i = _i;

    if (i < 0) {
      return res;
    }

    _res = {
      hd: a[i],
      tl: res
    };
    _i = i - 1 | 0;
    continue;
  }

  ;
}

function toArray(x) {
  var len = length(x);
  var arr = new Array(len);
  fillAux(arr, 0, x);
  return arr;
}

function shuffle(xs) {
  var v = toArray(xs);
  Belt_Array.shuffleInPlace(v);
  return fromArray(v);
}

function reverseConcat(_l1, _l2) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (!l1) {
      return l2;
    }

    _l2 = {
      hd: l1.hd,
      tl: l2
    };
    _l1 = l1.tl;
    continue;
  }

  ;
}

function reverse(l) {
  return reverseConcat(l,
  /* [] */
  0);
}

function flattenAux(_prec, _xs) {
  while (true) {
    var xs = _xs;
    var prec = _prec;

    if (xs) {
      _xs = xs.tl;
      _prec = copyAuxCont(xs.hd, prec);
      continue;
    }

    prec.tl =
    /* [] */
    0;
    return;
  }

  ;
}

function flatten(_xs) {
  while (true) {
    var xs = _xs;

    if (!xs) {
      return (
        /* [] */
        0
      );
    }

    var match = xs.hd;

    if (match) {
      var cell = {
        hd: match.hd,
        tl:
        /* [] */
        0
      };
      flattenAux(copyAuxCont(match.tl, cell), xs.tl);
      return cell;
    }

    _xs = xs.tl;
    continue;
  }

  ;
}

function concatMany(xs) {
  var len = xs.length;

  if (len === 1) {
    return xs[0];
  }

  if (len === 0) {
    return (
      /* [] */
      0
    );
  }

  var len$1 = xs.length;
  var v = xs[len$1 - 1 | 0];

  for (var i = len$1 - 2 | 0; i >= 0; --i) {
    v = concat(xs[i], v);
  }

  return v;
}

function mapReverseU(l, f) {
  var _accu =
  /* [] */
  0;
  var _xs = l;

  while (true) {
    var xs = _xs;
    var accu = _accu;

    if (!xs) {
      return accu;
    }

    _xs = xs.tl;
    _accu = {
      hd: f(xs.hd),
      tl: accu
    };
    continue;
  }

  ;
}

function mapReverse(l, f) {
  return mapReverseU(l, Curry.__1(f));
}

function forEachU(_xs, f) {
  while (true) {
    var xs = _xs;

    if (!xs) {
      return;
    }

    f(xs.hd);
    _xs = xs.tl;
    continue;
  }

  ;
}

function forEach(xs, f) {
  return forEachU(xs, Curry.__1(f));
}

function forEachWithIndexU(l, f) {
  var _xs = l;
  var _i = 0;

  while (true) {
    var i = _i;
    var xs = _xs;

    if (!xs) {
      return;
    }

    f(i, xs.hd);
    _i = i + 1 | 0;
    _xs = xs.tl;
    continue;
  }

  ;
}

function forEachWithIndex(l, f) {
  return forEachWithIndexU(l, Curry.__2(f));
}

function reduceU(_l, _accu, f) {
  while (true) {
    var accu = _accu;
    var l = _l;

    if (!l) {
      return accu;
    }

    _accu = f(accu, l.hd);
    _l = l.tl;
    continue;
  }

  ;
}

function reduce(l, accu, f) {
  return reduceU(l, accu, Curry.__2(f));
}

function reduceReverseUnsafeU(l, accu, f) {
  if (l) {
    return f(reduceReverseUnsafeU(l.tl, accu, f), l.hd);
  } else {
    return accu;
  }
}

function reduceReverseU(l, acc, f) {
  var len = length(l);

  if (len < 1000) {
    return reduceReverseUnsafeU(l, acc, f);
  } else {
    return Belt_Array.reduceReverseU(toArray(l), acc, f);
  }
}

function reduceReverse(l, accu, f) {
  return reduceReverseU(l, accu, Curry.__2(f));
}

function reduceWithIndexU(l, acc, f) {
  var _l = l;
  var _acc = acc;
  var _i = 0;

  while (true) {
    var i = _i;
    var acc$1 = _acc;
    var l$1 = _l;

    if (!l$1) {
      return acc$1;
    }

    _i = i + 1 | 0;
    _acc = f(acc$1, l$1.hd, i);
    _l = l$1.tl;
    continue;
  }

  ;
}

function reduceWithIndex(l, acc, f) {
  return reduceWithIndexU(l, acc, Curry.__3(f));
}

function mapReverse2U(l1, l2, f) {
  var _l1 = l1;
  var _l2 = l2;
  var _accu =
  /* [] */
  0;

  while (true) {
    var accu = _accu;
    var l2$1 = _l2;
    var l1$1 = _l1;

    if (!l1$1) {
      return accu;
    }

    if (!l2$1) {
      return accu;
    }

    _accu = {
      hd: f(l1$1.hd, l2$1.hd),
      tl: accu
    };
    _l2 = l2$1.tl;
    _l1 = l1$1.tl;
    continue;
  }

  ;
}

function mapReverse2(l1, l2, f) {
  return mapReverse2U(l1, l2, Curry.__2(f));
}

function forEach2U(_l1, _l2, f) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (!l1) {
      return;
    }

    if (!l2) {
      return;
    }

    f(l1.hd, l2.hd);
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue;
  }

  ;
}

function forEach2(l1, l2, f) {
  return forEach2U(l1, l2, Curry.__2(f));
}

function reduce2U(_l1, _l2, _accu, f) {
  while (true) {
    var accu = _accu;
    var l2 = _l2;
    var l1 = _l1;

    if (!l1) {
      return accu;
    }

    if (!l2) {
      return accu;
    }

    _accu = f(accu, l1.hd, l2.hd);
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue;
  }

  ;
}

function reduce2(l1, l2, acc, f) {
  return reduce2U(l1, l2, acc, Curry.__3(f));
}

function reduceReverse2UnsafeU(l1, l2, accu, f) {
  if (l1 && l2) {
    return f(reduceReverse2UnsafeU(l1.tl, l2.tl, accu, f), l1.hd, l2.hd);
  } else {
    return accu;
  }
}

function reduceReverse2U(l1, l2, acc, f) {
  var len = length(l1);

  if (len < 1000) {
    return reduceReverse2UnsafeU(l1, l2, acc, f);
  } else {
    return Belt_Array.reduceReverse2U(toArray(l1), toArray(l2), acc, f);
  }
}

function reduceReverse2(l1, l2, acc, f) {
  return reduceReverse2U(l1, l2, acc, Curry.__3(f));
}

function everyU(_xs, p) {
  while (true) {
    var xs = _xs;

    if (!xs) {
      return true;
    }

    if (!p(xs.hd)) {
      return false;
    }

    _xs = xs.tl;
    continue;
  }

  ;
}

function every(xs, p) {
  return everyU(xs, Curry.__1(p));
}

function someU(_xs, p) {
  while (true) {
    var xs = _xs;

    if (!xs) {
      return false;
    }

    if (p(xs.hd)) {
      return true;
    }

    _xs = xs.tl;
    continue;
  }

  ;
}

function some(xs, p) {
  return someU(xs, Curry.__1(p));
}

function every2U(_l1, _l2, p) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (!l1) {
      return true;
    }

    if (!l2) {
      return true;
    }

    if (!p(l1.hd, l2.hd)) {
      return false;
    }

    _l2 = l2.tl;
    _l1 = l1.tl;
    continue;
  }

  ;
}

function every2(l1, l2, p) {
  return every2U(l1, l2, Curry.__2(p));
}

function cmpByLength(_l1, _l2) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (!l1) {
      if (l2) {
        return -1;
      } else {
        return 0;
      }
    }

    if (!l2) {
      return 1;
    }

    _l2 = l2.tl;
    _l1 = l1.tl;
    continue;
  }

  ;
}

function cmpU(_l1, _l2, p) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (!l1) {
      if (l2) {
        return -1;
      } else {
        return 0;
      }
    }

    if (!l2) {
      return 1;
    }

    var c = p(l1.hd, l2.hd);

    if (c !== 0) {
      return c;
    }

    _l2 = l2.tl;
    _l1 = l1.tl;
    continue;
  }

  ;
}

function cmp(l1, l2, f) {
  return cmpU(l1, l2, Curry.__2(f));
}

function eqU(_l1, _l2, p) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (!l1) {
      if (l2) {
        return false;
      } else {
        return true;
      }
    }

    if (!l2) {
      return false;
    }

    if (!p(l1.hd, l2.hd)) {
      return false;
    }

    _l2 = l2.tl;
    _l1 = l1.tl;
    continue;
  }

  ;
}

function eq(l1, l2, f) {
  return eqU(l1, l2, Curry.__2(f));
}

function some2U(_l1, _l2, p) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (!l1) {
      return false;
    }

    if (!l2) {
      return false;
    }

    if (p(l1.hd, l2.hd)) {
      return true;
    }

    _l2 = l2.tl;
    _l1 = l1.tl;
    continue;
  }

  ;
}

function some2(l1, l2, p) {
  return some2U(l1, l2, Curry.__2(p));
}

function hasU(_xs, x, eq) {
  while (true) {
    var xs = _xs;

    if (!xs) {
      return false;
    }

    if (eq(xs.hd, x)) {
      return true;
    }

    _xs = xs.tl;
    continue;
  }

  ;
}

function has(xs, x, eq) {
  return hasU(xs, x, Curry.__2(eq));
}

function getAssocU(_xs, x, eq) {
  while (true) {
    var xs = _xs;

    if (!xs) {
      return;
    }

    var match = xs.hd;

    if (eq(match[0], x)) {
      return Caml_option.some(match[1]);
    }

    _xs = xs.tl;
    continue;
  }

  ;
}

function getAssoc(xs, x, eq) {
  return getAssocU(xs, x, Curry.__2(eq));
}

function hasAssocU(_xs, x, eq) {
  while (true) {
    var xs = _xs;

    if (!xs) {
      return false;
    }

    if (eq(xs.hd[0], x)) {
      return true;
    }

    _xs = xs.tl;
    continue;
  }

  ;
}

function hasAssoc(xs, x, eq) {
  return hasAssocU(xs, x, Curry.__2(eq));
}

function removeAssocU(xs, x, eq) {
  if (!xs) {
    return (
      /* [] */
      0
    );
  }

  var l = xs.tl;
  var pair = xs.hd;

  if (eq(pair[0], x)) {
    return l;
  }

  var cell = {
    hd: pair,
    tl:
    /* [] */
    0
  };
  var removed = removeAssocAuxWithMap(l, x, cell, eq);

  if (removed) {
    return cell;
  } else {
    return xs;
  }
}

function removeAssoc(xs, x, eq) {
  return removeAssocU(xs, x, Curry.__2(eq));
}

function setAssocU(xs, x, k, eq) {
  if (!xs) {
    return {
      hd: [x, k],
      tl:
      /* [] */
      0
    };
  }

  var l = xs.tl;
  var pair = xs.hd;

  if (eq(pair[0], x)) {
    return {
      hd: [x, k],
      tl: l
    };
  }

  var cell = {
    hd: pair,
    tl:
    /* [] */
    0
  };
  var replaced = setAssocAuxWithMap(l, x, k, cell, eq);

  if (replaced) {
    return cell;
  } else {
    return {
      hd: [x, k],
      tl: xs
    };
  }
}

function setAssoc(xs, x, k, eq) {
  return setAssocU(xs, x, k, Curry.__2(eq));
}

function sortU(xs, cmp) {
  var arr = toArray(xs);
  Belt_SortArray.stableSortInPlaceByU(arr, cmp);
  return fromArray(arr);
}

function sort(xs, cmp) {
  return sortU(xs, Curry.__2(cmp));
}

function getByU(_xs, p) {
  while (true) {
    var xs = _xs;

    if (!xs) {
      return;
    }

    var x = xs.hd;

    if (p(x)) {
      return Caml_option.some(x);
    }

    _xs = xs.tl;
    continue;
  }

  ;
}

function getBy(xs, p) {
  return getByU(xs, Curry.__1(p));
}

function keepU(_xs, p) {
  while (true) {
    var xs = _xs;

    if (!xs) {
      return (
        /* [] */
        0
      );
    }

    var t = xs.tl;
    var h = xs.hd;

    if (p(h)) {
      var cell = {
        hd: h,
        tl:
        /* [] */
        0
      };
      copyAuxWitFilter(p, t, cell);
      return cell;
    }

    _xs = t;
    continue;
  }

  ;
}

function keep(xs, p) {
  return keepU(xs, Curry.__1(p));
}

function keepWithIndexU(xs, p) {
  var _xs = xs;
  var _i = 0;

  while (true) {
    var i = _i;
    var xs$1 = _xs;

    if (!xs$1) {
      return (
        /* [] */
        0
      );
    }

    var t = xs$1.tl;
    var h = xs$1.hd;

    if (p(h, i)) {
      var cell = {
        hd: h,
        tl:
        /* [] */
        0
      };
      copyAuxWithFilterIndex(p, t, cell, i + 1 | 0);
      return cell;
    }

    _i = i + 1 | 0;
    _xs = t;
    continue;
  }

  ;
}

function keepWithIndex(xs, p) {
  return keepWithIndexU(xs, Curry.__2(p));
}

function keepMapU(_xs, p) {
  while (true) {
    var xs = _xs;

    if (!xs) {
      return (
        /* [] */
        0
      );
    }

    var t = xs.tl;
    var h = p(xs.hd);

    if (h !== undefined) {
      var cell = {
        hd: Caml_option.valFromOption(h),
        tl:
        /* [] */
        0
      };
      copyAuxWitFilterMap(p, t, cell);
      return cell;
    }

    _xs = t;
    continue;
  }

  ;
}

function keepMap(xs, p) {
  return keepMapU(xs, Curry.__1(p));
}

function partitionU(l, p) {
  if (!l) {
    return [
    /* [] */
    0,
    /* [] */
    0];
  }

  var h = l.hd;
  var nextX = {
    hd: h,
    tl:
    /* [] */
    0
  };
  var nextY = {
    hd: h,
    tl:
    /* [] */
    0
  };
  var b = p(h);
  partitionAux(p, l.tl, nextX, nextY);

  if (b) {
    return [nextX, nextY.tl];
  } else {
    return [nextX.tl, nextY];
  }
}

function partition(l, p) {
  return partitionU(l, Curry.__1(p));
}

function unzip(xs) {
  if (!xs) {
    return [
    /* [] */
    0,
    /* [] */
    0];
  }

  var match = xs.hd;
  var cellX = {
    hd: match[0],
    tl:
    /* [] */
    0
  };
  var cellY = {
    hd: match[1],
    tl:
    /* [] */
    0
  };
  splitAux(xs.tl, cellX, cellY);
  return [cellX, cellY];
}

function zip(l1, l2) {
  if (!l1) {
    return (
      /* [] */
      0
    );
  }

  if (!l2) {
    return (
      /* [] */
      0
    );
  }

  var cell = {
    hd: [l1.hd, l2.hd],
    tl:
    /* [] */
    0
  };
  zipAux(l1.tl, l2.tl, cell);
  return cell;
}

var size = length;
exports.size = size;
var filter = keep;
exports.filter = filter;
var filterWithIndex = keepWithIndex;
/* No side effect */

exports.filterWithIndex = filterWithIndex;
},{"./curry.js":"../node_modules/rescript/lib/es6/curry.js","./belt_Array.js":"../node_modules/rescript/lib/es6/belt_Array.js","./caml_option.js":"../node_modules/rescript/lib/es6/caml_option.js","./belt_SortArray.js":"../node_modules/rescript/lib/es6/belt_SortArray.js"}],"../node_modules/rescript/lib/es6/belt_Option.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keepU = keepU;
exports.keep = keep;
exports.forEachU = forEachU;
exports.forEach = forEach;
exports.getExn = getExn;
exports.mapWithDefaultU = mapWithDefaultU;
exports.mapWithDefault = mapWithDefault;
exports.mapU = mapU;
exports.map = map;
exports.flatMapU = flatMapU;
exports.flatMap = flatMap;
exports.getWithDefault = getWithDefault;
exports.isSome = isSome;
exports.isNone = isNone;
exports.eqU = eqU;
exports.eq = eq;
exports.cmpU = cmpU;
exports.cmp = cmp;

var Curry = _interopRequireWildcard(require("./curry.js"));

var Caml_option = _interopRequireWildcard(require("./caml_option.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function keepU(opt, p) {
  if (opt !== undefined && p(Caml_option.valFromOption(opt))) {
    return opt;
  }
}

function keep(opt, p) {
  return keepU(opt, Curry.__1(p));
}

function forEachU(opt, f) {
  if (opt !== undefined) {
    return f(Caml_option.valFromOption(opt));
  }
}

function forEach(opt, f) {
  return forEachU(opt, Curry.__1(f));
}

function getExn(x) {
  if (x !== undefined) {
    return Caml_option.valFromOption(x);
  }

  throw {
    RE_EXN_ID: "Not_found",
    Error: new Error()
  };
}

function mapWithDefaultU(opt, $$default, f) {
  if (opt !== undefined) {
    return f(Caml_option.valFromOption(opt));
  } else {
    return $$default;
  }
}

function mapWithDefault(opt, $$default, f) {
  return mapWithDefaultU(opt, $$default, Curry.__1(f));
}

function mapU(opt, f) {
  if (opt !== undefined) {
    return Caml_option.some(f(Caml_option.valFromOption(opt)));
  }
}

function map(opt, f) {
  return mapU(opt, Curry.__1(f));
}

function flatMapU(opt, f) {
  if (opt !== undefined) {
    return f(Caml_option.valFromOption(opt));
  }
}

function flatMap(opt, f) {
  return flatMapU(opt, Curry.__1(f));
}

function getWithDefault(opt, $$default) {
  if (opt !== undefined) {
    return Caml_option.valFromOption(opt);
  } else {
    return $$default;
  }
}

function isSome(param) {
  return param !== undefined;
}

function isNone(x) {
  return x === undefined;
}

function eqU(a, b, f) {
  if (a !== undefined) {
    if (b !== undefined) {
      return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
    } else {
      return false;
    }
  } else {
    return b === undefined;
  }
}

function eq(a, b, f) {
  return eqU(a, b, Curry.__2(f));
}

function cmpU(a, b, f) {
  if (a !== undefined) {
    if (b !== undefined) {
      return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
    } else {
      return 1;
    }
  } else if (b !== undefined) {
    return -1;
  } else {
    return 0;
  }
}

function cmp(a, b, f) {
  return cmpU(a, b, Curry.__2(f));
}
/* No side effect */
},{"./curry.js":"../node_modules/rescript/lib/es6/curry.js","./caml_option.js":"../node_modules/rescript/lib/es6/caml_option.js"}],"../node_modules/rescript/lib/es6/caml_obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.caml_compare = caml_compare;
exports.caml_equal = caml_equal;
exports.caml_equal_null = caml_equal_null;
exports.caml_equal_undefined = caml_equal_undefined;
exports.caml_equal_nullable = caml_equal_nullable;
exports.caml_notequal = caml_notequal;
exports.caml_greaterequal = caml_greaterequal;
exports.caml_greaterthan = caml_greaterthan;
exports.caml_lessthan = caml_lessthan;
exports.caml_lessequal = caml_lessequal;
exports.caml_min = caml_min;
exports.caml_max = caml_max;
exports.update_dummy = exports.caml_obj_dup = void 0;

var Caml = _interopRequireWildcard(require("./caml.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var for_in = function (o, foo) {
  for (var x in o) {
    foo(x);
  }
};

var caml_obj_dup = function (x) {
  if (Array.isArray(x)) {
    var len = x.length;
    var v = new Array(len);

    for (var i = 0; i < len; ++i) {
      v[i] = x[i];
    }

    if (x.TAG !== undefined) {
      v.TAG = x.TAG; // TODO this can be removed eventually
    }

    return v;
  }

  return Object.assign({}, x);
};

exports.caml_obj_dup = caml_obj_dup;

var update_dummy = function (x, y) {
  var k;

  if (Array.isArray(y)) {
    for (k = 0; k < y.length; ++k) {
      x[k] = y[k];
    }

    if (y.TAG !== undefined) {
      x.TAG = y.TAG;
    }
  } else {
    for (var k in y) {
      x[k] = y[k];
    }
  }
};

exports.update_dummy = update_dummy;

function caml_compare(a, b) {
  if (a === b) {
    return 0;
  }

  var a_type = typeof a;
  var b_type = typeof b;

  switch (a_type) {
    case "boolean":
      if (b_type === "boolean") {
        return Caml.caml_bool_compare(a, b);
      }

      break;

    case "function":
      if (b_type === "function") {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "compare: functional value",
          Error: new Error()
        };
      }

      break;

    case "number":
      if (b_type === "number") {
        return Caml.caml_int_compare(a, b);
      }

      break;

    case "string":
      if (b_type === "string") {
        return Caml.caml_string_compare(a, b);
      } else {
        return 1;
      }

    case "undefined":
      return -1;

    default:
  }

  switch (b_type) {
    case "string":
      return -1;

    case "undefined":
      return 1;

    default:
      if (a_type === "boolean") {
        return 1;
      }

      if (b_type === "boolean") {
        return -1;
      }

      if (a_type === "function") {
        return 1;
      }

      if (b_type === "function") {
        return -1;
      }

      if (a_type === "number") {
        if (b === null || b.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return 1;
        } else {
          return -1;
        }
      }

      if (b_type === "number") {
        if (a === null || a.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return -1;
        } else {
          return 1;
        }
      }

      if (a === null) {
        if (b.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return 1;
        } else {
          return -1;
        }
      }

      if (b === null) {
        if (a.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return -1;
        } else {
          return 1;
        }
      }

      if (a.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
        if (b.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return aux_obj_compare(a, b);
        } else {
          return -1;
        }
      }

      var tag_a = a.TAG | 0;
      var tag_b = b.TAG | 0;

      if (tag_a === 248) {
        return Caml.caml_int_compare(a[1], b[1]);
      }

      if (tag_a === 251) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "equal: abstract value",
          Error: new Error()
        };
      }

      if (tag_a !== tag_b) {
        if (tag_a < tag_b) {
          return -1;
        } else {
          return 1;
        }
      }

      var len_a = a.length | 0;
      var len_b = b.length | 0;

      if (len_a === len_b) {
        if (Array.isArray(a)) {
          var _i = 0;

          while (true) {
            var i = _i;

            if (i === len_a) {
              return 0;
            }

            var res = caml_compare(a[i], b[i]);

            if (res !== 0) {
              return res;
            }

            _i = i + 1 | 0;
            continue;
          }

          ;
        } else if (a instanceof Date && b instanceof Date) {
          return a - b;
        } else {
          return aux_obj_compare(a, b);
        }
      } else if (len_a < len_b) {
        var _i$1 = 0;

        while (true) {
          var i$1 = _i$1;

          if (i$1 === len_a) {
            return -1;
          }

          var res$1 = caml_compare(a[i$1], b[i$1]);

          if (res$1 !== 0) {
            return res$1;
          }

          _i$1 = i$1 + 1 | 0;
          continue;
        }

        ;
      } else {
        var _i$2 = 0;

        while (true) {
          var i$2 = _i$2;

          if (i$2 === len_b) {
            return 1;
          }

          var res$2 = caml_compare(a[i$2], b[i$2]);

          if (res$2 !== 0) {
            return res$2;
          }

          _i$2 = i$2 + 1 | 0;
          continue;
        }

        ;
      }

  }
}

function aux_obj_compare(a, b) {
  var min_key_lhs = {
    contents: undefined
  };
  var min_key_rhs = {
    contents: undefined
  };

  var do_key = function (param, key) {
    var min_key = param[2];
    var b = param[1];

    if (!(!b.hasOwnProperty(key) || caml_compare(param[0][key], b[key]) > 0)) {
      return;
    }

    var mk = min_key.contents;

    if (mk !== undefined && key >= mk) {
      return;
    } else {
      min_key.contents = key;
      return;
    }
  };

  var partial_arg = [a, b, min_key_rhs];

  var do_key_a = function (param) {
    return do_key(partial_arg, param);
  };

  var partial_arg$1 = [b, a, min_key_lhs];

  var do_key_b = function (param) {
    return do_key(partial_arg$1, param);
  };

  for_in(a, do_key_a);
  for_in(b, do_key_b);
  var match = min_key_lhs.contents;
  var match$1 = min_key_rhs.contents;

  if (match !== undefined) {
    if (match$1 !== undefined) {
      return Caml.caml_string_compare(match, match$1);
    } else {
      return -1;
    }
  } else if (match$1 !== undefined) {
    return 1;
  } else {
    return 0;
  }
}

function caml_equal(a, b) {
  if (a === b) {
    return true;
  }

  var a_type = typeof a;

  if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
    return false;
  }

  var b_type = typeof b;

  if (a_type === "function" || b_type === "function") {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "equal: functional value",
      Error: new Error()
    };
  }

  if (b_type === "number" || b_type === "undefined" || b === null) {
    return false;
  }

  var tag_a = a.TAG | 0;
  var tag_b = b.TAG | 0;

  if (tag_a === 248) {
    return a[1] === b[1];
  }

  if (tag_a === 251) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "equal: abstract value",
      Error: new Error()
    };
  }

  if (tag_a !== tag_b) {
    return false;
  }

  var len_a = a.length | 0;
  var len_b = b.length | 0;

  if (len_a === len_b) {
    if (Array.isArray(a)) {
      var _i = 0;

      while (true) {
        var i = _i;

        if (i === len_a) {
          return true;
        }

        if (!caml_equal(a[i], b[i])) {
          return false;
        }

        _i = i + 1 | 0;
        continue;
      }

      ;
    } else if (a instanceof Date && b instanceof Date) {
      return !(a > b || a < b);
    } else {
      var result = {
        contents: true
      };

      var do_key_a = function (key) {
        if (!b.hasOwnProperty(key)) {
          result.contents = false;
          return;
        }
      };

      var do_key_b = function (key) {
        if (!a.hasOwnProperty(key) || !caml_equal(b[key], a[key])) {
          result.contents = false;
          return;
        }
      };

      for_in(a, do_key_a);

      if (result.contents) {
        for_in(b, do_key_b);
      }

      return result.contents;
    }
  } else {
    return false;
  }
}

function caml_equal_null(x, y) {
  if (y !== null) {
    return caml_equal(x, y);
  } else {
    return x === y;
  }
}

function caml_equal_undefined(x, y) {
  if (y !== undefined) {
    return caml_equal(x, y);
  } else {
    return x === y;
  }
}

function caml_equal_nullable(x, y) {
  if (y == null) {
    return x === y;
  } else {
    return caml_equal(x, y);
  }
}

function caml_notequal(a, b) {
  return !caml_equal(a, b);
}

function caml_greaterequal(a, b) {
  return caml_compare(a, b) >= 0;
}

function caml_greaterthan(a, b) {
  return caml_compare(a, b) > 0;
}

function caml_lessequal(a, b) {
  return caml_compare(a, b) <= 0;
}

function caml_lessthan(a, b) {
  return caml_compare(a, b) < 0;
}

function caml_min(x, y) {
  if (caml_compare(x, y) <= 0) {
    return x;
  } else {
    return y;
  }
}

function caml_max(x, y) {
  if (caml_compare(x, y) >= 0) {
    return x;
  } else {
    return y;
  }
}
/* No side effect */
},{"./caml.js":"../node_modules/rescript/lib/es6/caml.js"}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/rescript/lib/es6/caml_io.js":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.caml_ml_flush = caml_ml_flush;
exports.caml_ml_output = caml_ml_output;
exports.caml_ml_output_char = caml_ml_output_char;
exports.caml_ml_out_channels_list = caml_ml_out_channels_list;
exports.stderr = exports.stdout = exports.stdin = void 0;
var stdout = {
  buffer: "",
  output: function (param, s) {
    var v = s.length - 1 | 0;

    if (typeof process !== "undefined" && process.stdout && process.stdout.write) {
      return process.stdout.write(s);
    } else {
      if (s[v] === "\n") {
        console.log(s.slice(0, v));
      } else {
        console.log(s);
      }

      return;
    }
  }
};
exports.stdout = stdout;
var stderr = {
  buffer: "",
  output: function (param, s) {
    var v = s.length - 1 | 0;

    if (s[v] === "\n") {
      console.log(s.slice(0, v));
    } else {
      console.log(s);
    }
  }
};
exports.stderr = stderr;

function caml_ml_flush(oc) {
  if (oc.buffer !== "") {
    oc.output(oc, oc.buffer);
    oc.buffer = "";
    return;
  }
}

function caml_ml_output(oc, str, offset, len) {
  var str$1 = offset === 0 && len === str.length ? str : str.slice(offset, len);

  if (typeof process !== "undefined" && process.stdout && process.stdout.write && oc === stdout) {
    return process.stdout.write(str$1);
  }

  var id = str$1.lastIndexOf("\n");

  if (id < 0) {
    oc.buffer = oc.buffer + str$1;
  } else {
    oc.buffer = oc.buffer + str$1.slice(0, id + 1 | 0);
    caml_ml_flush(oc);
    oc.buffer = oc.buffer + str$1.slice(id + 1 | 0);
  }
}

function caml_ml_output_char(oc, $$char) {
  return caml_ml_output(oc, String.fromCharCode($$char), 0, 1);
}

function caml_ml_out_channels_list(param) {
  return {
    hd: stdout,
    tl: {
      hd: stderr,
      tl:
      /* [] */
      0
    }
  };
}

var stdin;
/* No side effect */

exports.stdin = stdin;
},{"process":"../node_modules/process/browser.js"}],"../node_modules/rescript/lib/es6/caml_sys.js":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.caml_sys_getenv = caml_sys_getenv;
exports.caml_sys_time = caml_sys_time;
exports.caml_sys_system_command = caml_sys_system_command;
exports.caml_sys_get_argv = caml_sys_get_argv;
exports.caml_sys_exit = caml_sys_exit;
exports.caml_sys_is_directory = caml_sys_is_directory;
exports.caml_sys_file_exists = caml_sys_file_exists;
exports.caml_sys_getcwd = exports.os_type = void 0;

function caml_sys_getenv(s) {
  if (typeof process === "undefined" || process.env === undefined) {
    throw {
      RE_EXN_ID: "Not_found",
      Error: new Error()
    };
  }

  var x = process.env[s];

  if (x !== undefined) {
    return x;
  }

  throw {
    RE_EXN_ID: "Not_found",
    Error: new Error()
  };
}

var os_type = function (_) {
  if (typeof process !== 'undefined' && process.platform === 'win32') {
    return "Win32";
  } else {
    return "Unix";
  }
};

exports.os_type = os_type;

function caml_sys_time(param) {
  if (typeof process === "undefined" || process.uptime === undefined) {
    return -1;
  } else {
    return process.uptime();
  }
}

function caml_sys_system_command(_cmd) {
  return 127;
}

var caml_sys_getcwd = function (param) {
  if (typeof process === "undefined" || process.cwd === undefined) {
    return "/";
  }

  return process.cwd();
};

exports.caml_sys_getcwd = caml_sys_getcwd;

function caml_sys_get_argv(param) {
  if (typeof process === "undefined") {
    return ["", [""]];
  }

  var argv = process.argv;

  if (argv == null) {
    return ["", [""]];
  } else {
    return [argv[0], argv];
  }
}

function caml_sys_exit(exit_code) {
  if (typeof process !== "undefined") {
    return process.exit(exit_code);
  }
}

function caml_sys_is_directory(_s) {
  throw {
    RE_EXN_ID: "Failure",
    _1: "caml_sys_is_directory not implemented",
    Error: new Error()
  };
}

function caml_sys_file_exists(_s) {
  throw {
    RE_EXN_ID: "Failure",
    _1: "caml_sys_file_exists not implemented",
    Error: new Error()
  };
}
/* No side effect */
},{"process":"../node_modules/process/browser.js"}],"../node_modules/rescript/lib/es6/caml_bytes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.caml_create_bytes = caml_create_bytes;
exports.caml_fill_bytes = caml_fill_bytes;
exports.get = get;
exports.set = set;
exports.bytes_to_string = bytes_to_string;
exports.caml_blit_bytes = caml_blit_bytes;
exports.caml_blit_string = caml_blit_string;
exports.bytes_of_string = bytes_of_string;
exports.caml_bytes_compare = caml_bytes_compare;
exports.caml_bytes_greaterthan = caml_bytes_greaterthan;
exports.caml_bytes_greaterequal = caml_bytes_greaterequal;
exports.caml_bytes_lessthan = caml_bytes_lessthan;
exports.caml_bytes_lessequal = caml_bytes_lessequal;
exports.caml_bytes_equal = caml_bytes_equal;

function set(s, i, ch) {
  if (i < 0 || i >= s.length) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "index out of bounds",
      Error: new Error()
    };
  }

  s[i] = ch;
}

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "index out of bounds",
      Error: new Error()
    };
  }

  return s[i];
}

function caml_fill_bytes(s, i, l, c) {
  if (l <= 0) {
    return;
  }

  for (var k = i, k_finish = l + i | 0; k < k_finish; ++k) {
    s[k] = c;
  }
}

function caml_create_bytes(len) {
  if (len < 0) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "String.create",
      Error: new Error()
    };
  }

  var result = new Array(len);

  for (var i = 0; i < len; ++i) {
    result[i] =
    /* '\000' */
    0;
  }

  return result;
}

function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len <= 0) {
    return;
  }

  if (s1 === s2) {
    if (i1 < i2) {
      var range_a = (s1.length - i2 | 0) - 1 | 0;
      var range_b = len - 1 | 0;
      var range = range_a > range_b ? range_b : range_a;

      for (var j = range; j >= 0; --j) {
        s1[i2 + j | 0] = s1[i1 + j | 0];
      }

      return;
    }

    if (i1 <= i2) {
      return;
    }

    var range_a$1 = (s1.length - i1 | 0) - 1 | 0;
    var range_b$1 = len - 1 | 0;
    var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;

    for (var k = 0; k <= range$1; ++k) {
      s1[i2 + k | 0] = s1[i1 + k | 0];
    }

    return;
  }

  var off1 = s1.length - i1 | 0;

  if (len <= off1) {
    for (var i = 0; i < len; ++i) {
      s2[i2 + i | 0] = s1[i1 + i | 0];
    }

    return;
  }

  for (var i$1 = 0; i$1 < off1; ++i$1) {
    s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
  }

  for (var i$2 = off1; i$2 < len; ++i$2) {
    s2[i2 + i$2 | 0] =
    /* '\000' */
    0;
  }
}

function bytes_to_string(a) {
  var i = 0;
  var len = a.length;
  var s = "";
  var s_len = len;

  if (i === 0 && len <= 4096 && len === a.length) {
    return String.fromCharCode.apply(null, a);
  }

  var offset = 0;

  while (s_len > 0) {
    var next = s_len < 1024 ? s_len : 1024;
    var tmp_bytes = new Array(next);

    for (var k = 0; k < next; ++k) {
      tmp_bytes[k] = a[k + offset | 0];
    }

    s = s + String.fromCharCode.apply(null, tmp_bytes);
    s_len = s_len - next | 0;
    offset = offset + next | 0;
  }

  ;
  return s;
}

function caml_blit_string(s1, i1, s2, i2, len) {
  if (len <= 0) {
    return;
  }

  var off1 = s1.length - i1 | 0;

  if (len <= off1) {
    for (var i = 0; i < len; ++i) {
      s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
    }

    return;
  }

  for (var i$1 = 0; i$1 < off1; ++i$1) {
    s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
  }

  for (var i$2 = off1; i$2 < len; ++i$2) {
    s2[i2 + i$2 | 0] =
    /* '\000' */
    0;
  }
}

function bytes_of_string(s) {
  var len = s.length;
  var res = new Array(len);

  for (var i = 0; i < len; ++i) {
    res[i] = s.charCodeAt(i);
  }

  return res;
}

function caml_bytes_compare_aux(s1, s2, _off, len, def) {
  while (true) {
    var off = _off;

    if (off >= len) {
      return def;
    }

    var a = s1[off];
    var b = s2[off];

    if (a > b) {
      return 1;
    }

    if (a < b) {
      return -1;
    }

    _off = off + 1 | 0;
    continue;
  }

  ;
}

function caml_bytes_compare(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;

  if (len1 === len2) {
    return caml_bytes_compare_aux(s1, s2, 0, len1, 0);
  } else if (len1 < len2) {
    return caml_bytes_compare_aux(s1, s2, 0, len1, -1);
  } else {
    return caml_bytes_compare_aux(s1, s2, 0, len2, 1);
  }
}

function caml_bytes_equal(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;

  if (len1 === len2) {
    var _off = 0;

    while (true) {
      var off = _off;

      if (off === len1) {
        return true;
      }

      var a = s1[off];
      var b = s2[off];

      if (a !== b) {
        return false;
      }

      _off = off + 1 | 0;
      continue;
    }

    ;
  } else {
    return false;
  }
}

function caml_bytes_greaterthan(s1, s2) {
  return caml_bytes_compare(s1, s2) > 0;
}

function caml_bytes_greaterequal(s1, s2) {
  return caml_bytes_compare(s1, s2) >= 0;
}

function caml_bytes_lessthan(s1, s2) {
  return caml_bytes_compare(s1, s2) < 0;
}

function caml_bytes_lessequal(s1, s2) {
  return caml_bytes_compare(s1, s2) <= 0;
}
/* No side effect */
},{}],"../node_modules/rescript/lib/es6/caml_int64.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mk = mk;
exports.succ = succ;
exports.of_int32 = of_int32;
exports.to_int32 = to_int32;
exports.add = add;
exports.neg = neg;
exports.sub = sub;
exports.lsl_ = lsl_;
exports.lsr_ = lsr_;
exports.asr_ = asr_;
exports.is_zero = is_zero;
exports.mul = mul;
exports.xor = xor;
exports.or_ = or_;
exports.and_ = and_;
exports.equal_null = equal_null;
exports.equal_undefined = equal_undefined;
exports.equal_nullable = equal_nullable;
exports.to_float = to_float;
exports.of_float = of_float;
exports.div = div;
exports.mod_ = mod_;
exports.compare = compare;
exports.float_of_bits = float_of_bits;
exports.bits_of_float = bits_of_float;
exports.div_mod = div_mod;
exports.to_hex = to_hex;
exports.discard_sign = discard_sign;
exports.to_string = to_string;
exports.neg_one = exports.zero = exports.one = exports.max_int = exports.min_int = void 0;

var Caml = _interopRequireWildcard(require("./caml.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function mk(lo, hi) {
  return [hi, lo >>> 0];
}

var min_int = [-2147483648, 0];
exports.min_int = min_int;
var max_int = [2147483647, 4294967295];
exports.max_int = max_int;
var one = [0, 1];
exports.one = one;
var zero = [0, 0];
exports.zero = zero;
var neg_one = [-1, 4294967295];
exports.neg_one = neg_one;

function neg_signed(x) {
  return (x & -2147483648) !== 0;
}

function non_neg_signed(x) {
  return (x & -2147483648) === 0;
}

function succ(param) {
  var x_lo = param[1];
  var x_hi = param[0];
  var lo = x_lo + 1 | 0;
  return [x_hi + (lo === 0 ? 1 : 0) | 0, lo >>> 0];
}

function neg(param) {
  var other_lo = (param[1] ^ -1) + 1 | 0;
  return [(param[0] ^ -1) + (other_lo === 0 ? 1 : 0) | 0, other_lo >>> 0];
}

function add_aux(param, y_lo, y_hi) {
  var x_lo = param[1];
  var lo = x_lo + y_lo | 0;
  var overflow = neg_signed(x_lo) && (neg_signed(y_lo) || non_neg_signed(lo)) || neg_signed(y_lo) && non_neg_signed(lo) ? 1 : 0;
  return [param[0] + y_hi + overflow | 0, lo >>> 0];
}

function add(self, param) {
  return add_aux(self, param[1], param[0]);
}

function equal_null(x, y) {
  if (y !== null) {
    return Caml.i64_eq(x, y);
  } else {
    return false;
  }
}

function equal_undefined(x, y) {
  if (y !== undefined) {
    return Caml.i64_eq(x, y);
  } else {
    return false;
  }
}

function equal_nullable(x, y) {
  if (y == null) {
    return false;
  } else {
    return Caml.i64_eq(x, y);
  }
}

function sub_aux(x, lo, hi) {
  var y_lo = (lo ^ -1) + 1 >>> 0;
  var y_hi = (hi ^ -1) + (y_lo === 0 ? 1 : 0) | 0;
  return add_aux(x, y_lo, y_hi);
}

function sub(self, param) {
  return sub_aux(self, param[1], param[0]);
}

function lsl_(x, numBits) {
  if (numBits === 0) {
    return x;
  }

  var lo = x[1];

  if (numBits >= 32) {
    return [lo << (numBits - 32 | 0), 0];
  } else {
    return [lo >>> (32 - numBits | 0) | x[0] << numBits, lo << numBits >>> 0];
  }
}

function lsr_(x, numBits) {
  if (numBits === 0) {
    return x;
  }

  var hi = x[0];
  var offset = numBits - 32 | 0;

  if (offset === 0) {
    return [0, hi >>> 0];
  } else if (offset > 0) {
    return [0, hi >>> offset];
  } else {
    return [hi >>> numBits, (hi << (-offset | 0) | x[1] >>> numBits) >>> 0];
  }
}

function asr_(x, numBits) {
  if (numBits === 0) {
    return x;
  }

  var hi = x[0];

  if (numBits < 32) {
    return [hi >> numBits, (hi << (32 - numBits | 0) | x[1] >>> numBits) >>> 0];
  } else {
    return [hi >= 0 ? 0 : -1, hi >> (numBits - 32 | 0) >>> 0];
  }
}

function is_zero(param) {
  if (param[0] !== 0) {
    return false;
  } else {
    return param[1] === 0;
  }
}

function mul(_this, _other) {
  while (true) {
    var other = _other;
    var $$this = _this;
    var lo;
    var this_hi = $$this[0];
    var exit = 0;
    var exit$1 = 0;
    var exit$2 = 0;

    if (this_hi !== 0) {
      exit$2 = 4;
    } else {
      if ($$this[1] === 0) {
        return zero;
      }

      exit$2 = 4;
    }

    if (exit$2 === 4) {
      if (other[0] !== 0) {
        exit$1 = 3;
      } else {
        if (other[1] === 0) {
          return zero;
        }

        exit$1 = 3;
      }
    }

    if (exit$1 === 3) {
      if (this_hi !== -2147483648 || $$this[1] !== 0) {
        exit = 2;
      } else {
        lo = other[1];
      }
    }

    if (exit === 2) {
      var other_hi = other[0];
      var lo$1 = $$this[1];
      var exit$3 = 0;

      if (other_hi !== -2147483648 || other[1] !== 0) {
        exit$3 = 3;
      } else {
        lo = lo$1;
      }

      if (exit$3 === 3) {
        var other_lo = other[1];

        if (this_hi < 0) {
          if (other_hi >= 0) {
            return neg(mul(neg($$this), other));
          }

          _other = neg(other);
          _this = neg($$this);
          continue;
        }

        if (other_hi < 0) {
          return neg(mul($$this, neg(other)));
        }

        var a48 = this_hi >>> 16;
        var a32 = this_hi & 65535;
        var a16 = lo$1 >>> 16;
        var a00 = lo$1 & 65535;
        var b48 = other_hi >>> 16;
        var b32 = other_hi & 65535;
        var b16 = other_lo >>> 16;
        var b00 = other_lo & 65535;
        var c48 = 0;
        var c32 = 0;
        var c16 = 0;
        var c00 = a00 * b00;
        c16 = (c00 >>> 16) + a16 * b00;
        c32 = c16 >>> 16;
        c16 = (c16 & 65535) + a00 * b16;
        c32 = c32 + (c16 >>> 16) + a32 * b00;
        c48 = c32 >>> 16;
        c32 = (c32 & 65535) + a16 * b16;
        c48 = c48 + (c32 >>> 16);
        c32 = (c32 & 65535) + a00 * b32;
        c48 = c48 + (c32 >>> 16);
        c32 = c32 & 65535;
        c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
        return [c32 | c48 << 16, (c00 & 65535 | (c16 & 65535) << 16) >>> 0];
      }
    }

    if ((lo & 1) === 0) {
      return zero;
    } else {
      return min_int;
    }
  }

  ;
}

function xor(param, param$1) {
  return [param[0] ^ param$1[0], (param[1] ^ param$1[1]) >>> 0];
}

function or_(param, param$1) {
  return [param[0] | param$1[0], (param[1] | param$1[1]) >>> 0];
}

function and_(param, param$1) {
  return [param[0] & param$1[0], (param[1] & param$1[1]) >>> 0];
}

function to_float(param) {
  return param[0] * 0x100000000 + param[1];
}

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  }

  if (x <= -9.22337203685477581e+18) {
    return min_int;
  }

  if (x + 1 >= 9.22337203685477581e+18) {
    return max_int;
  }

  if (x < 0) {
    return neg(of_float(-x));
  }

  var hi = x / 4294967296 | 0;
  var lo = x % 4294967296 | 0;
  return [hi, lo >>> 0];
}

function isSafeInteger(param) {
  var hi = param[0];
  var top11Bits = hi >> 21;

  if (top11Bits === 0) {
    return true;
  } else if (top11Bits === -1) {
    return !(param[1] === 0 && hi === -2097152);
  } else {
    return false;
  }
}

function to_string(self) {
  if (isSafeInteger(self)) {
    return String(to_float(self));
  }

  if (self[0] < 0) {
    if (Caml.i64_eq(self, min_int)) {
      return "-9223372036854775808";
    } else {
      return "-" + to_string(neg(self));
    }
  }

  var approx_div1 = of_float(Math.floor(to_float(self) / 10));
  var lo = approx_div1[1];
  var hi = approx_div1[0];
  var match = sub_aux(sub_aux(self, lo << 3, lo >>> 29 | hi << 3), lo << 1, lo >>> 31 | hi << 1);
  var rem_lo = match[1];
  var rem_hi = match[0];

  if (rem_lo === 0 && rem_hi === 0) {
    return to_string(approx_div1) + "0";
  }

  if (rem_hi < 0) {
    var rem_lo$1 = (rem_lo ^ -1) + 1 >>> 0;
    var delta = Math.ceil(rem_lo$1 / 10);
    var remainder = 10 * delta - rem_lo$1;
    return to_string(sub_aux(approx_div1, delta | 0, 0)) + String(remainder | 0);
  }

  var delta$1 = Math.floor(rem_lo / 10);
  var remainder$1 = rem_lo - 10 * delta$1;
  return to_string(add_aux(approx_div1, delta$1 | 0, 0)) + String(remainder$1 | 0);
}

function div(_self, _other) {
  while (true) {
    var other = _other;
    var self = _self;
    var self_hi = self[0];
    var exit = 0;
    var exit$1 = 0;

    if (other[0] !== 0 || other[1] !== 0) {
      exit$1 = 2;
    } else {
      throw {
        RE_EXN_ID: "Division_by_zero",
        Error: new Error()
      };
    }

    if (exit$1 === 2) {
      if (self_hi !== -2147483648) {
        if (self_hi !== 0) {
          exit = 1;
        } else {
          if (self[1] === 0) {
            return zero;
          }

          exit = 1;
        }
      } else if (self[1] !== 0) {
        exit = 1;
      } else {
        if (Caml.i64_eq(other, one) || Caml.i64_eq(other, neg_one)) {
          return self;
        }

        if (Caml.i64_eq(other, min_int)) {
          return one;
        }

        var half_this = asr_(self, 1);
        var approx = lsl_(div(half_this, other), 1);
        var exit$2 = 0;

        if (approx[0] !== 0) {
          exit$2 = 3;
        } else {
          if (approx[1] === 0) {
            if (other[0] < 0) {
              return one;
            } else {
              return neg(one);
            }
          }

          exit$2 = 3;
        }

        if (exit$2 === 3) {
          var rem = sub(self, mul(other, approx));
          return add(approx, div(rem, other));
        }
      }
    }

    if (exit === 1) {
      var other_hi = other[0];
      var exit$3 = 0;

      if (other_hi !== -2147483648) {
        exit$3 = 2;
      } else {
        if (other[1] === 0) {
          return zero;
        }

        exit$3 = 2;
      }

      if (exit$3 === 2) {
        if (self_hi < 0) {
          if (other_hi >= 0) {
            return neg(div(neg(self), other));
          }

          _other = neg(other);
          _self = neg(self);
          continue;
        }

        if (other_hi < 0) {
          return neg(div(self, neg(other)));
        }

        var res = zero;
        var rem$1 = self;

        while (Caml.i64_ge(rem$1, other)) {
          var b = Math.floor(to_float(rem$1) / to_float(other));
          var approx$1 = 1 > b ? 1 : b;
          var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
          var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
          var approxRes = of_float(approx$1);
          var approxRem = mul(approxRes, other);

          while (approxRem[0] < 0 || Caml.i64_gt(approxRem, rem$1)) {
            approx$1 = approx$1 - delta;
            approxRes = of_float(approx$1);
            approxRem = mul(approxRes, other);
          }

          ;

          if (is_zero(approxRes)) {
            approxRes = one;
          }

          res = add(res, approxRes);
          rem$1 = sub(rem$1, approxRem);
        }

        ;
        return res;
      }
    }
  }

  ;
}

function mod_(self, other) {
  return sub(self, mul(div(self, other), other));
}

function div_mod(self, other) {
  var quotient = div(self, other);
  return [quotient, sub(self, mul(quotient, other))];
}

function compare(self, other) {
  var y = other[0];
  var x = self[0];
  var v = x < y ? -1 : x === y ? 0 : 1;

  if (v !== 0) {
    return v;
  }

  var y$1 = other[1];
  var x$1 = self[1];

  if (x$1 < y$1) {
    return -1;
  } else if (x$1 === y$1) {
    return 0;
  } else {
    return 1;
  }
}

function of_int32(lo) {
  return [lo < 0 ? -1 : 0, lo >>> 0];
}

function to_int32(x) {
  return x[1] | 0;
}

function to_hex(x) {
  var x_lo = x[1];
  var x_hi = x[0];

  var aux = function (v) {
    return (v >>> 0).toString(16);
  };

  if (x_hi === 0 && x_lo === 0) {
    return "0";
  }

  if (x_lo === 0) {
    return aux(x_hi) + "00000000";
  }

  if (x_hi === 0) {
    return aux(x_lo);
  }

  var lo = aux(x_lo);
  var pad = 8 - lo.length | 0;

  if (pad <= 0) {
    return aux(x_hi) + lo;
  } else {
    return aux(x_hi) + ("0".repeat(pad) + lo);
  }
}

function discard_sign(x) {
  return [2147483647 & x[0], x[1]];
}

function float_of_bits(x) {
  return function (lo, hi) {
    return new Float64Array(new Int32Array([lo, hi]).buffer)[0];
  }(x[1], x[0]);
}

function bits_of_float(x) {
  var match = function (x) {
    return new Int32Array(new Float64Array([x]).buffer);
  }(x);

  return [match[1], match[0] >>> 0];
}
/* No side effect */
},{"./caml.js":"../node_modules/rescript/lib/es6/caml.js"}],"../node_modules/rescript/lib/es6/caml_format.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.caml_format_float = caml_format_float;
exports.caml_format_int = caml_format_int;
exports.caml_float_of_string = caml_float_of_string;
exports.caml_int64_format = caml_int64_format;
exports.caml_int_of_string = caml_int_of_string;
exports.caml_int64_of_string = caml_int64_of_string;
exports.caml_nativeint_of_string = exports.caml_int32_of_string = exports.caml_int32_format = exports.caml_nativeint_format = exports.caml_hexstring_of_float = void 0;

var Caml = _interopRequireWildcard(require("./caml.js"));

var Caml_int64 = _interopRequireWildcard(require("./caml_int64.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function parse_digit(c) {
  if (c >= 65) {
    if (c >= 97) {
      if (c >= 123) {
        return -1;
      } else {
        return c - 87 | 0;
      }
    } else if (c >= 91) {
      return -1;
    } else {
      return c - 55 | 0;
    }
  } else if (c > 57 || c < 48) {
    return -1;
  } else {
    return c -
    /* '0' */
    48 | 0;
  }
}

function int_of_string_base(param) {
  switch (param) {
    case
    /* Oct */
    0:
      return 8;

    case
    /* Hex */
    1:
      return 16;

    case
    /* Dec */
    2:
      return 10;

    case
    /* Bin */
    3:
      return 2;
  }
}

function parse_sign_and_base(s) {
  var sign = 1;
  var base =
  /* Dec */
  2;
  var i = 0;
  var match = s.charCodeAt(i);

  switch (match) {
    case 43:
      i = i + 1 | 0;
      break;

    case 44:
      break;

    case 45:
      sign = -1;
      i = i + 1 | 0;
      break;

    default:
  }

  if (s[i] === "0") {
    var match$1 = s.charCodeAt(i + 1 | 0);

    if (match$1 >= 89) {
      if (match$1 >= 111) {
        if (match$1 < 121) {
          switch (match$1) {
            case 111:
              base =
              /* Oct */
              0;
              i = i + 2 | 0;
              break;

            case 117:
              i = i + 2 | 0;
              break;

            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 118:
            case 119:
              break;

            case 120:
              base =
              /* Hex */
              1;
              i = i + 2 | 0;
              break;
          }
        }
      } else if (match$1 === 98) {
        base =
        /* Bin */
        3;
        i = i + 2 | 0;
      }
    } else if (match$1 !== 66) {
      if (match$1 >= 79) {
        switch (match$1) {
          case 79:
            base =
            /* Oct */
            0;
            i = i + 2 | 0;
            break;

          case 85:
            i = i + 2 | 0;
            break;

          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 86:
          case 87:
            break;

          case 88:
            base =
            /* Hex */
            1;
            i = i + 2 | 0;
            break;
        }
      }
    } else {
      base =
      /* Bin */
      3;
      i = i + 2 | 0;
    }
  }

  return [i, sign, base];
}

function caml_int_of_string(s) {
  var match = parse_sign_and_base(s);
  var i = match[0];
  var base = int_of_string_base(match[2]);
  var threshold = 4294967295;
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) :
  /* '\000' */
  0;
  var d = parse_digit(c);

  if (d < 0 || d >= base) {
    throw {
      RE_EXN_ID: "Failure",
      _1: "int_of_string",
      Error: new Error()
    };
  }

  var aux = function (_acc, _k) {
    while (true) {
      var k = _k;
      var acc = _acc;

      if (k === len) {
        return acc;
      }

      var a = s.charCodeAt(k);

      if (a ===
      /* '_' */
      95) {
        _k = k + 1 | 0;
        continue;
      }

      var v = parse_digit(a);

      if (v < 0 || v >= base) {
        throw {
          RE_EXN_ID: "Failure",
          _1: "int_of_string",
          Error: new Error()
        };
      }

      var acc$1 = base * acc + v;

      if (acc$1 > threshold) {
        throw {
          RE_EXN_ID: "Failure",
          _1: "int_of_string",
          Error: new Error()
        };
      }

      _k = k + 1 | 0;
      _acc = acc$1;
      continue;
    }

    ;
  };

  var res = match[1] * aux(d, i + 1 | 0);
  var or_res = res | 0;

  if (base === 10 && res !== or_res) {
    throw {
      RE_EXN_ID: "Failure",
      _1: "int_of_string",
      Error: new Error()
    };
  }

  return or_res;
}

function caml_int64_of_string(s) {
  var match = parse_sign_and_base(s);
  var hbase = match[2];
  var i = match[0];
  var base = Caml_int64.of_int32(int_of_string_base(hbase));
  var sign = Caml_int64.of_int32(match[1]);
  var threshold;

  switch (hbase) {
    case
    /* Oct */
    0:
      threshold = [536870911, 4294967295];
      break;

    case
    /* Hex */
    1:
      threshold = [268435455, 4294967295];
      break;

    case
    /* Dec */
    2:
      threshold = [429496729, 2576980377];
      break;

    case
    /* Bin */
    3:
      threshold = Caml_int64.max_int;
      break;
  }

  var len = s.length;
  var c = i < len ? s.charCodeAt(i) :
  /* '\000' */
  0;
  var d = Caml_int64.of_int32(parse_digit(c));

  if (Caml.i64_lt(d, Caml_int64.zero) || Caml.i64_ge(d, base)) {
    throw {
      RE_EXN_ID: "Failure",
      _1: "int64_of_string",
      Error: new Error()
    };
  }

  var aux = function (_acc, _k) {
    while (true) {
      var k = _k;
      var acc = _acc;

      if (k === len) {
        return acc;
      }

      var a = s.charCodeAt(k);

      if (a ===
      /* '_' */
      95) {
        _k = k + 1 | 0;
        continue;
      }

      var v = Caml_int64.of_int32(parse_digit(a));

      if (Caml.i64_lt(v, Caml_int64.zero) || Caml.i64_ge(v, base) || Caml.i64_gt(acc, threshold)) {
        throw {
          RE_EXN_ID: "Failure",
          _1: "int64_of_string",
          Error: new Error()
        };
      }

      var acc$1 = Caml_int64.add(Caml_int64.mul(base, acc), v);
      _k = k + 1 | 0;
      _acc = acc$1;
      continue;
    }

    ;
  };

  var res = Caml_int64.mul(sign, aux(d, i + 1 | 0));
  var or_res = Caml_int64.or_(res, Caml_int64.zero);

  if (Caml.i64_eq(base, [0, 10]) && Caml.i64_neq(res, or_res)) {
    throw {
      RE_EXN_ID: "Failure",
      _1: "int64_of_string",
      Error: new Error()
    };
  }

  return or_res;
}

function int_of_base(param) {
  switch (param) {
    case
    /* Oct */
    0:
      return 8;

    case
    /* Hex */
    1:
      return 16;

    case
    /* Dec */
    2:
      return 10;
  }
}

function lowercase(c) {
  if (c >=
  /* 'A' */
  65 && c <=
  /* 'Z' */
  90 || c >=
  /* '\192' */
  192 && c <=
  /* '\214' */
  214 || c >=
  /* '\216' */
  216 && c <=
  /* '\222' */
  222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function parse_format(fmt) {
  var len = fmt.length;

  if (len > 31) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "format_int: format too long",
      Error: new Error()
    };
  }

  var f = {
    justify: "+",
    signstyle: "-",
    filter: " ",
    alternate: false,
    base:
    /* Dec */
    2,
    signedconv: false,
    width: 0,
    uppercase: false,
    sign: 1,
    prec: -1,
    conv: "f"
  };
  var _i = 0;

  while (true) {
    var i = _i;

    if (i >= len) {
      return f;
    }

    var c = fmt.charCodeAt(i);
    var exit = 0;

    if (c >= 69) {
      if (c >= 88) {
        if (c >= 121) {
          exit = 1;
        } else {
          switch (c) {
            case 88:
              f.base =
              /* Hex */
              1;
              f.uppercase = true;
              _i = i + 1 | 0;
              continue;

            case 101:
            case 102:
            case 103:
              exit = 5;
              break;

            case 100:
            case 105:
              exit = 4;
              break;

            case 111:
              f.base =
              /* Oct */
              0;
              _i = i + 1 | 0;
              continue;

            case 117:
              f.base =
              /* Dec */
              2;
              _i = i + 1 | 0;
              continue;

            case 89:
            case 90:
            case 91:
            case 92:
            case 93:
            case 94:
            case 95:
            case 96:
            case 97:
            case 98:
            case 99:
            case 104:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 118:
            case 119:
              exit = 1;
              break;

            case 120:
              f.base =
              /* Hex */
              1;
              _i = i + 1 | 0;
              continue;
          }
        }
      } else if (c >= 72) {
        exit = 1;
      } else {
        f.signedconv = true;
        f.uppercase = true;
        f.conv = String.fromCharCode(lowercase(c));
        _i = i + 1 | 0;
        continue;
      }
    } else {
      switch (c) {
        case 35:
          f.alternate = true;
          _i = i + 1 | 0;
          continue;

        case 32:
        case 43:
          exit = 2;
          break;

        case 45:
          f.justify = "-";
          _i = i + 1 | 0;
          continue;

        case 46:
          f.prec = 0;
          var j = i + 1 | 0;

          while (function (j) {
            return function () {
              var w = fmt.charCodeAt(j) -
              /* '0' */
              48 | 0;
              return w >= 0 && w <= 9;
            };
          }(j)()) {
            f.prec = (Math.imul(f.prec, 10) + fmt.charCodeAt(j) | 0) -
            /* '0' */
            48 | 0;
            j = j + 1 | 0;
          }

          ;
          _i = j;
          continue;

        case 33:
        case 34:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 44:
        case 47:
          exit = 1;
          break;

        case 48:
          f.filter = "0";
          _i = i + 1 | 0;
          continue;

        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          exit = 3;
          break;

        default:
          exit = 1;
      }
    }

    switch (exit) {
      case 1:
        _i = i + 1 | 0;
        continue;

      case 2:
        f.signstyle = String.fromCharCode(c);
        _i = i + 1 | 0;
        continue;

      case 3:
        f.width = 0;
        var j$1 = i;

        while (function (j$1) {
          return function () {
            var w = fmt.charCodeAt(j$1) -
            /* '0' */
            48 | 0;
            return w >= 0 && w <= 9;
          };
        }(j$1)()) {
          f.width = (Math.imul(f.width, 10) + fmt.charCodeAt(j$1) | 0) -
          /* '0' */
          48 | 0;
          j$1 = j$1 + 1 | 0;
        }

        ;
        _i = j$1;
        continue;

      case 4:
        f.signedconv = true;
        f.base =
        /* Dec */
        2;
        _i = i + 1 | 0;
        continue;

      case 5:
        f.signedconv = true;
        f.conv = String.fromCharCode(c);
        _i = i + 1 | 0;
        continue;
    }
  }

  ;
}

function finish_formatting(config, rawbuffer) {
  var justify = config.justify;
  var signstyle = config.signstyle;
  var filter = config.filter;
  var alternate = config.alternate;
  var base = config.base;
  var signedconv = config.signedconv;
  var width = config.width;
  var uppercase = config.uppercase;
  var sign = config.sign;
  var len = rawbuffer.length;

  if (signedconv && (sign < 0 || signstyle !== "-")) {
    len = len + 1 | 0;
  }

  if (alternate) {
    if (base ===
    /* Oct */
    0) {
      len = len + 1 | 0;
    } else if (base ===
    /* Hex */
    1) {
      len = len + 2 | 0;
    }
  }

  var buffer = "";

  if (justify === "+" && filter === " ") {
    for (var _for = len; _for < width; ++_for) {
      buffer = buffer + filter;
    }
  }

  if (signedconv) {
    if (sign < 0) {
      buffer = buffer + "-";
    } else if (signstyle !== "-") {
      buffer = buffer + signstyle;
    }
  }

  if (alternate && base ===
  /* Oct */
  0) {
    buffer = buffer + "0";
  }

  if (alternate && base ===
  /* Hex */
  1) {
    buffer = buffer + "0x";
  }

  if (justify === "+" && filter === "0") {
    for (var _for$1 = len; _for$1 < width; ++_for$1) {
      buffer = buffer + filter;
    }
  }

  buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;

  if (justify === "-") {
    for (var _for$2 = len; _for$2 < width; ++_for$2) {
      buffer = buffer + " ";
    }
  }

  return buffer;
}

function caml_format_int(fmt, i) {
  if (fmt === "%d") {
    return String(i);
  }

  var f = parse_format(fmt);
  var i$1 = i < 0 ? f.signedconv ? (f.sign = -1, -i >>> 0) : i >>> 0 : i;
  var s = i$1.toString(int_of_base(f.base));

  if (f.prec >= 0) {
    f.filter = " ";
    var n = f.prec - s.length | 0;

    if (n > 0) {
      s = "0".repeat(n) + s;
    }
  }

  return finish_formatting(f, s);
}

function dec_of_pos_int64(x) {
  if (!Caml.i64_lt(x, Caml_int64.zero)) {
    return Caml_int64.to_string(x);
  }

  var wbase = [0, 10];
  var y = Caml_int64.discard_sign(x);
  var match = Caml_int64.div_mod(y, wbase);
  var match$1 = Caml_int64.div_mod(Caml_int64.add([0, 8], match[1]), wbase);
  var quotient = Caml_int64.add(Caml_int64.add([214748364, 3435973836], match[0]), match$1[0]);
  return Caml_int64.to_string(quotient) + "0123456789"[Caml_int64.to_int32(match$1[1])];
}

function oct_of_int64(x) {
  var s = "";
  var wbase = [0, 8];
  var cvtbl = "01234567";

  if (Caml.i64_lt(x, Caml_int64.zero)) {
    var y = Caml_int64.discard_sign(x);
    var match = Caml_int64.div_mod(y, wbase);
    var quotient = Caml_int64.add([268435456, 0], match[0]);
    var modulus = match[1];
    s = cvtbl[Caml_int64.to_int32(modulus)] + s;

    while (Caml.i64_neq(quotient, Caml_int64.zero)) {
      var match$1 = Caml_int64.div_mod(quotient, wbase);
      quotient = match$1[0];
      modulus = match$1[1];
      s = cvtbl[Caml_int64.to_int32(modulus)] + s;
    }

    ;
  } else {
    var match$2 = Caml_int64.div_mod(x, wbase);
    var quotient$1 = match$2[0];
    var modulus$1 = match$2[1];
    s = cvtbl[Caml_int64.to_int32(modulus$1)] + s;

    while (Caml.i64_neq(quotient$1, Caml_int64.zero)) {
      var match$3 = Caml_int64.div_mod(quotient$1, wbase);
      quotient$1 = match$3[0];
      modulus$1 = match$3[1];
      s = cvtbl[Caml_int64.to_int32(modulus$1)] + s;
    }

    ;
  }

  return s;
}

function caml_int64_format(fmt, x) {
  if (fmt === "%d") {
    return Caml_int64.to_string(x);
  }

  var f = parse_format(fmt);
  var x$1 = f.signedconv && Caml.i64_lt(x, Caml_int64.zero) ? (f.sign = -1, Caml_int64.neg(x)) : x;
  var match = f.base;
  var s;

  switch (match) {
    case
    /* Oct */
    0:
      s = oct_of_int64(x$1);
      break;

    case
    /* Hex */
    1:
      s = Caml_int64.to_hex(x$1);
      break;

    case
    /* Dec */
    2:
      s = dec_of_pos_int64(x$1);
      break;
  }

  var fill_s;

  if (f.prec >= 0) {
    f.filter = " ";
    var n = f.prec - s.length | 0;
    fill_s = n > 0 ? "0".repeat(n) + s : s;
  } else {
    fill_s = s;
  }

  return finish_formatting(f, fill_s);
}

function caml_format_float(fmt, x) {
  var f = parse_format(fmt);
  var prec = f.prec < 0 ? 6 : f.prec;
  var x$1 = x < 0 ? (f.sign = -1, -x) : x;
  var s = "";

  if (isNaN(x$1)) {
    s = "nan";
    f.filter = " ";
  } else if (isFinite(x$1)) {
    var match = f.conv;

    switch (match) {
      case "e":
        s = x$1.toExponential(prec);
        var i = s.length;

        if (s[i - 3 | 0] === "e") {
          s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
        }

        break;

      case "f":
        s = x$1.toFixed(prec);
        break;

      case "g":
        var prec$1 = prec !== 0 ? prec : 1;
        s = x$1.toExponential(prec$1 - 1 | 0);
        var j = s.indexOf("e");
        var exp = Number(s.slice(j + 1 | 0)) | 0;

        if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
          var i$1 = j - 1 | 0;

          while (s[i$1] === "0") {
            i$1 = i$1 - 1 | 0;
          }

          ;

          if (s[i$1] === ".") {
            i$1 = i$1 - 1 | 0;
          }

          s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
          var i$2 = s.length;

          if (s[i$2 - 3 | 0] === "e") {
            s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
          }
        } else {
          var p = prec$1;

          if (exp < 0) {
            p = p - (exp + 1 | 0) | 0;
            s = x$1.toFixed(p);
          } else {
            while (function () {
              s = x$1.toFixed(p);
              return s.length > (prec$1 + 1 | 0);
            }()) {
              p = p - 1 | 0;
            }

            ;
          }

          if (p !== 0) {
            var k = s.length - 1 | 0;

            while (s[k] === "0") {
              k = k - 1 | 0;
            }

            ;

            if (s[k] === ".") {
              k = k - 1 | 0;
            }

            s = s.slice(0, k + 1 | 0);
          }
        }

        break;

      default:
    }
  } else {
    s = "inf";
    f.filter = " ";
  }

  return finish_formatting(f, s);
}

var caml_hexstring_of_float = function (x, prec, style) {
  if (!isFinite(x)) {
    if (isNaN(x)) return "nan";
    return x > 0 ? "infinity" : "-infinity";
  }

  var sign = x == 0 && 1 / x == -Infinity ? 1 : x >= 0 ? 0 : 1;
  if (sign) x = -x;
  var exp = 0;

  if (x == 0) {} else if (x < 1) {
    while (x < 1 && exp > -1022) {
      x *= 2;
      exp--;
    }
  } else {
    while (x >= 2) {
      x /= 2;
      exp++;
    }
  }

  var exp_sign = exp < 0 ? '' : '+';
  var sign_str = '';
  if (sign) sign_str = '-';else {
    switch (style) {
      case 43
      /* '+' */
      :
        sign_str = '+';
        break;

      case 32
      /* ' ' */
      :
        sign_str = ' ';
        break;

      default:
        break;
    }
  }

  if (prec >= 0 && prec < 13) {
    /* If a precision is given, and is small, round mantissa accordingly */
    var cst = Math.pow(2, prec * 4);
    x = Math.round(x * cst) / cst;
  }

  var x_str = x.toString(16);

  if (prec >= 0) {
    var idx = x_str.indexOf('.');

    if (idx < 0) {
      x_str += '.' + '0'.repeat(prec);
    } else {
      var size = idx + 1 + prec;
      if (x_str.length < size) x_str += '0'.repeat(size - x_str.length);else x_str = x_str.substr(0, size);
    }
  }

  return sign_str + '0x' + x_str + 'p' + exp_sign + exp.toString(10);
};

exports.caml_hexstring_of_float = caml_hexstring_of_float;

var float_of_string = function (s, exn) {
  var res = +s;
  if (s.length > 0 && res === res) return res;
  s = s.replace(/_/g, "");
  res = +s;

  if (s.length > 0 && res === res || /^[+-]?nan$/i.test(s)) {
    return res;
  }

  ;
  var m = /^ *([+-]?)0x([0-9a-f]+)\.?([0-9a-f]*)p([+-]?[0-9]+)/i.exec(s); //            1        2             3           4

  if (m) {
    var m3 = m[3].replace(/0+$/, '');
    var mantissa = parseInt(m[1] + m[2] + m3, 16);
    var exponent = (m[4] | 0) - 4 * m3.length;
    res = mantissa * Math.pow(2, exponent);
    return res;
  }

  if (/^\+?inf(inity)?$/i.test(s)) return Infinity;
  if (/^-inf(inity)?$/i.test(s)) return -Infinity;
  throw exn;
};

function caml_float_of_string(s) {
  return float_of_string(s, {
    RE_EXN_ID: "Failure",
    _1: "float_of_string"
  });
}

var caml_nativeint_format = caml_format_int;
exports.caml_nativeint_format = caml_nativeint_format;
var caml_int32_format = caml_format_int;
exports.caml_int32_format = caml_int32_format;
var caml_int32_of_string = caml_int_of_string;
exports.caml_int32_of_string = caml_int32_of_string;
var caml_nativeint_of_string = caml_int_of_string;
/* No side effect */

exports.caml_nativeint_of_string = caml_nativeint_of_string;
},{"./caml.js":"../node_modules/rescript/lib/es6/caml.js","./caml_int64.js":"../node_modules/rescript/lib/es6/caml_int64.js"}],"../node_modules/rescript/lib/es6/caml_string.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.make = make;

function get(s, i) {
  if (i >= s.length || i < 0) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "index out of bounds",
      Error: new Error()
    };
  }

  return s.charCodeAt(i);
}

function make(n, ch) {
  return String.fromCharCode(ch).repeat(n);
}
/* No side effect */
},{}],"../node_modules/rescript/lib/es6/caml_exceptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.caml_is_extension = caml_is_extension;
exports.caml_exn_slot_name = caml_exn_slot_name;
exports.id = void 0;
var id = {
  contents: 0
};
exports.id = id;

function create(str) {
  id.contents = id.contents + 1 | 0;
  return str + ("/" + id.contents);
}

function caml_is_extension(e) {
  if (e == null) {
    return false;
  } else {
    return typeof e.RE_EXN_ID === "string";
  }
}

function caml_exn_slot_name(x) {
  return x.RE_EXN_ID;
}
/* No side effect */
},{}],"../node_modules/rescript/lib/es6/caml_js_exceptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.internalToOCamlException = internalToOCamlException;
exports.caml_as_js_exn = caml_as_js_exn;
exports.$$Error = void 0;

var Caml_option = _interopRequireWildcard(require("./caml_option.js"));

var Caml_exceptions = _interopRequireWildcard(require("./caml_exceptions.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var $$Error = /* @__PURE__ */Caml_exceptions.create("Caml_js_exceptions.Error");
exports.$$Error = $$Error;

function internalToOCamlException(e) {
  if (Caml_exceptions.caml_is_extension(e)) {
    return e;
  } else {
    return {
      RE_EXN_ID: $$Error,
      _1: e
    };
  }
}

function caml_as_js_exn(exn) {
  if (exn.RE_EXN_ID === $$Error) {
    return Caml_option.some(exn._1);
  }
}
/* No side effect */
},{"./caml_option.js":"../node_modules/rescript/lib/es6/caml_option.js","./caml_exceptions.js":"../node_modules/rescript/lib/es6/caml_exceptions.js"}],"../node_modules/rescript/lib/es6/caml_external_polyfill.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.resolve = exports.getGlobalThis = void 0;

var getGlobalThis = function () {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof this !== 'undefined') return this;
  throw new Error('Unable to locate global `this`');
};

exports.getGlobalThis = getGlobalThis;

var resolve = function (s) {
  var myGlobal = getGlobalThis();

  if (myGlobal[s] === undefined) {
    throw new Error(s + " not polyfilled by ReScript yet\n");
  }

  return myGlobal[s];
};

exports.resolve = resolve;

var register = function (s, fn) {
  var myGlobal = getGlobalThis();
  myGlobal[s] = fn;
  return 0;
};
/* No side effect */


exports.register = register;
},{}],"../node_modules/rescript/lib/es6/pervasives.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalid_arg = invalid_arg;
exports.failwith = failwith;
exports.abs = abs;
exports.lnot = lnot;
exports.classify_float = classify_float;
exports.char_of_int = char_of_int;
exports.string_of_bool = string_of_bool;
exports.bool_of_string = bool_of_string;
exports.bool_of_string_opt = bool_of_string_opt;
exports.int_of_string_opt = int_of_string_opt;
exports.string_of_float = string_of_float;
exports.float_of_string_opt = float_of_string_opt;
exports.$at = $at;
exports.print_char = print_char;
exports.print_string = print_string;
exports.print_bytes = print_bytes;
exports.print_int = print_int;
exports.print_float = print_float;
exports.print_newline = print_newline;
exports.prerr_char = prerr_char;
exports.prerr_string = prerr_string;
exports.prerr_bytes = prerr_bytes;
exports.prerr_int = prerr_int;
exports.prerr_float = prerr_float;
exports.prerr_newline = prerr_newline;
exports.read_line = read_line;
exports.read_int = read_int;
exports.read_int_opt = read_int_opt;
exports.read_float = read_float;
exports.read_float_opt = read_float_opt;
exports.open_out = open_out;
exports.open_out_bin = open_out_bin;
exports.open_out_gen = open_out_gen;
exports.flush_all = flush_all;
exports.output_string = output_string;
exports.output_bytes = output_bytes;
exports.output = output;
exports.output_substring = output_substring;
exports.output_binary_int = output_binary_int;
exports.output_value = output_value;
exports.seek_out = seek_out;
exports.pos_out = pos_out;
exports.out_channel_length = out_channel_length;
exports.close_out = close_out;
exports.close_out_noerr = close_out_noerr;
exports.set_binary_mode_out = set_binary_mode_out;
exports.open_in = open_in;
exports.open_in_bin = open_in_bin;
exports.open_in_gen = open_in_gen;
exports.input_char = input_char;
exports.input_line = input_line;
exports.input = input;
exports.really_input = really_input;
exports.really_input_string = really_input_string;
exports.input_byte = input_byte;
exports.input_binary_int = input_binary_int;
exports.input_value = input_value;
exports.seek_in = seek_in;
exports.pos_in = pos_in;
exports.in_channel_length = in_channel_length;
exports.close_in = close_in;
exports.close_in_noerr = close_in_noerr;
exports.set_binary_mode_in = set_binary_mode_in;
exports.string_of_format = string_of_format;
exports.exit = exit;
exports.at_exit = at_exit;
exports.valid_float_lexem = valid_float_lexem;
exports.unsafe_really_input = unsafe_really_input;
exports.do_at_exit = do_at_exit;
exports.LargeFile = exports.output_byte = exports.output_char = exports.flush = exports.stderr = exports.stdout = exports.stdin = exports.epsilon_float = exports.min_float = exports.max_float = exports.neg_infinity = exports.infinity = exports.min_int = exports.max_int = exports.Exit = void 0;

var Curry = _interopRequireWildcard(require("./curry.js"));

var Caml_io = _interopRequireWildcard(require("./caml_io.js"));

var Caml_sys = _interopRequireWildcard(require("./caml_sys.js"));

var Caml_bytes = _interopRequireWildcard(require("./caml_bytes.js"));

var Caml_format = _interopRequireWildcard(require("./caml_format.js"));

var Caml_string = _interopRequireWildcard(require("./caml_string.js"));

var Caml_exceptions = _interopRequireWildcard(require("./caml_exceptions.js"));

var Caml_js_exceptions = _interopRequireWildcard(require("./caml_js_exceptions.js"));

var Caml_external_polyfill = _interopRequireWildcard(require("./caml_external_polyfill.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function failwith(s) {
  throw {
    RE_EXN_ID: "Failure",
    _1: s,
    Error: new Error()
  };
}

function invalid_arg(s) {
  throw {
    RE_EXN_ID: "Invalid_argument",
    _1: s,
    Error: new Error()
  };
}

var Exit = /* @__PURE__ */Caml_exceptions.create("Pervasives.Exit");
exports.Exit = Exit;

function abs(x) {
  if (x >= 0) {
    return x;
  } else {
    return -x | 0;
  }
}

function lnot(x) {
  return x ^ -1;
}

var min_int = -2147483648;
exports.min_int = min_int;

function classify_float(x) {
  if (isFinite(x)) {
    if (Math.abs(x) >= 2.22507385850720138e-308) {
      return (
        /* FP_normal */
        0
      );
    } else if (x !== 0) {
      return (
        /* FP_subnormal */
        1
      );
    } else {
      return (
        /* FP_zero */
        2
      );
    }
  } else if (isNaN(x)) {
    return (
      /* FP_nan */
      4
    );
  } else {
    return (
      /* FP_infinite */
      3
    );
  }
}

function char_of_int(n) {
  if (n < 0 || n > 255) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "char_of_int",
      Error: new Error()
    };
  }

  return n;
}

function string_of_bool(b) {
  if (b) {
    return "true";
  } else {
    return "false";
  }
}

function bool_of_string(param) {
  switch (param) {
    case "false":
      return false;

    case "true":
      return true;

    default:
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "bool_of_string",
        Error: new Error()
      };
  }
}

function bool_of_string_opt(param) {
  switch (param) {
    case "false":
      return false;

    case "true":
      return true;

    default:
      return;
  }
}

function int_of_string_opt(s) {
  try {
    return Caml_format.caml_int_of_string(s);
  } catch (raw_exn) {
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);

    if (exn.RE_EXN_ID === "Failure") {
      return;
    }

    throw exn;
  }
}

function valid_float_lexem(s) {
  var l = s.length;
  var _i = 0;

  while (true) {
    var i = _i;

    if (i >= l) {
      return s + ".";
    }

    var match = Caml_string.get(s, i);

    if (match >= 48) {
      if (match >= 58) {
        return s;
      }

      _i = i + 1 | 0;
      continue;
    }

    if (match !== 45) {
      return s;
    }

    _i = i + 1 | 0;
    continue;
  }

  ;
}

function string_of_float(f) {
  return valid_float_lexem(Caml_format.caml_format_float("%.12g", f));
}

function float_of_string_opt(s) {
  try {
    return Caml_format.caml_float_of_string(s);
  } catch (raw_exn) {
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);

    if (exn.RE_EXN_ID === "Failure") {
      return;
    }

    throw exn;
  }
}

function $at(l1, l2) {
  if (l1) {
    return {
      hd: l1.hd,
      tl: $at(l1.tl, l2)
    };
  } else {
    return l2;
  }
}

var stdin = Caml_io.stdin;
exports.stdin = stdin;
var stdout = Caml_io.stdout;
exports.stdout = stdout;
var stderr = Caml_io.stderr;
exports.stderr = stderr;

function open_out_gen(mode, perm, name) {
  var c = Caml_external_polyfill.resolve("caml_ml_open_descriptor_out")(Caml_external_polyfill.resolve("caml_sys_open")(name, mode, perm));
  Caml_external_polyfill.resolve("caml_ml_set_channel_name")(c, name);
  return c;
}

function open_out(name) {
  return open_out_gen({
    hd:
    /* Open_wronly */
    1,
    tl: {
      hd:
      /* Open_creat */
      3,
      tl: {
        hd:
        /* Open_trunc */
        4,
        tl: {
          hd:
          /* Open_text */
          7,
          tl:
          /* [] */
          0
        }
      }
    }
  }, 438, name);
}

function open_out_bin(name) {
  return open_out_gen({
    hd:
    /* Open_wronly */
    1,
    tl: {
      hd:
      /* Open_creat */
      3,
      tl: {
        hd:
        /* Open_trunc */
        4,
        tl: {
          hd:
          /* Open_binary */
          6,
          tl:
          /* [] */
          0
        }
      }
    }
  }, 438, name);
}

function flush_all(param) {
  var _param = Caml_io.caml_ml_out_channels_list(undefined);

  while (true) {
    var param$1 = _param;

    if (!param$1) {
      return;
    }

    try {
      Caml_io.caml_ml_flush(param$1.hd);
    } catch (raw_exn) {
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);

      if (exn.RE_EXN_ID !== "Sys_error") {
        throw exn;
      }
    }

    _param = param$1.tl;
    continue;
  }

  ;
}

function output_bytes(oc, s) {
  return Caml_external_polyfill.resolve("caml_ml_output_bytes")(oc, s, 0, s.length);
}

function output_string(oc, s) {
  return Caml_io.caml_ml_output(oc, s, 0, s.length);
}

function output(oc, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "output",
      Error: new Error()
    };
  }

  return Caml_external_polyfill.resolve("caml_ml_output_bytes")(oc, s, ofs, len);
}

function output_substring(oc, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "output_substring",
      Error: new Error()
    };
  }

  return Caml_io.caml_ml_output(oc, s, ofs, len);
}

function output_value(chan, v) {
  return Caml_external_polyfill.resolve("caml_output_value")(chan, v,
  /* [] */
  0);
}

function close_out(oc) {
  Caml_io.caml_ml_flush(oc);
  return Caml_external_polyfill.resolve("caml_ml_close_channel")(oc);
}

function close_out_noerr(oc) {
  try {
    Caml_io.caml_ml_flush(oc);
  } catch (exn) {}

  try {
    return Caml_external_polyfill.resolve("caml_ml_close_channel")(oc);
  } catch (exn$1) {
    return;
  }
}

function open_in_gen(mode, perm, name) {
  var c = Caml_external_polyfill.resolve("caml_ml_open_descriptor_in")(Caml_external_polyfill.resolve("caml_sys_open")(name, mode, perm));
  Caml_external_polyfill.resolve("caml_ml_set_channel_name")(c, name);
  return c;
}

function open_in(name) {
  return open_in_gen({
    hd:
    /* Open_rdonly */
    0,
    tl: {
      hd:
      /* Open_text */
      7,
      tl:
      /* [] */
      0
    }
  }, 0, name);
}

function open_in_bin(name) {
  return open_in_gen({
    hd:
    /* Open_rdonly */
    0,
    tl: {
      hd:
      /* Open_binary */
      6,
      tl:
      /* [] */
      0
    }
  }, 0, name);
}

function input(ic, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "input",
      Error: new Error()
    };
  }

  return Caml_external_polyfill.resolve("caml_ml_input")(ic, s, ofs, len);
}

function unsafe_really_input(ic, s, _ofs, _len) {
  while (true) {
    var len = _len;
    var ofs = _ofs;

    if (len <= 0) {
      return;
    }

    var r = Caml_external_polyfill.resolve("caml_ml_input")(ic, s, ofs, len);

    if (r === 0) {
      throw {
        RE_EXN_ID: "End_of_file",
        Error: new Error()
      };
    }

    _len = len - r | 0;
    _ofs = ofs + r | 0;
    continue;
  }

  ;
}

function really_input(ic, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "really_input",
      Error: new Error()
    };
  }

  return unsafe_really_input(ic, s, ofs, len);
}

function really_input_string(ic, len) {
  var s = Caml_bytes.caml_create_bytes(len);
  really_input(ic, s, 0, len);
  return Caml_bytes.bytes_to_string(s);
}

function input_line(chan) {
  var build_result = function (buf, _pos, _param) {
    while (true) {
      var param = _param;
      var pos = _pos;

      if (!param) {
        return buf;
      }

      var hd = param.hd;
      var len = hd.length;
      Caml_bytes.caml_blit_bytes(hd, 0, buf, pos - len | 0, len);
      _param = param.tl;
      _pos = pos - len | 0;
      continue;
    }

    ;
  };

  var scan = function (_accu, _len) {
    while (true) {
      var len = _len;
      var accu = _accu;
      var n = Caml_external_polyfill.resolve("caml_ml_input_scan_line")(chan);

      if (n === 0) {
        if (accu) {
          return build_result(Caml_bytes.caml_create_bytes(len), len, accu);
        }

        throw {
          RE_EXN_ID: "End_of_file",
          Error: new Error()
        };
      }

      if (n > 0) {
        var res = Caml_bytes.caml_create_bytes(n - 1 | 0);
        Caml_external_polyfill.resolve("caml_ml_input")(chan, res, 0, n - 1 | 0);
        Caml_external_polyfill.resolve("caml_ml_input_char")(chan);

        if (!accu) {
          return res;
        }

        var len$1 = (len + n | 0) - 1 | 0;
        return build_result(Caml_bytes.caml_create_bytes(len$1), len$1, {
          hd: res,
          tl: accu
        });
      }

      var beg = Caml_bytes.caml_create_bytes(-n | 0);
      Caml_external_polyfill.resolve("caml_ml_input")(chan, beg, 0, -n | 0);
      _len = len - n | 0;
      _accu = {
        hd: beg,
        tl: accu
      };
      continue;
    }

    ;
  };

  return Caml_bytes.bytes_to_string(scan(
  /* [] */
  0, 0));
}

function close_in_noerr(ic) {
  try {
    return Caml_external_polyfill.resolve("caml_ml_close_channel")(ic);
  } catch (exn) {
    return;
  }
}

function print_char(c) {
  return Caml_io.caml_ml_output_char(stdout, c);
}

function print_string(s) {
  return output_string(stdout, s);
}

function print_bytes(s) {
  return output_bytes(stdout, s);
}

function print_int(i) {
  return output_string(stdout, String(i));
}

function print_float(f) {
  return output_string(stdout, valid_float_lexem(Caml_format.caml_format_float("%.12g", f)));
}

function print_newline(param) {
  Caml_io.caml_ml_output_char(stdout,
  /* '\n' */
  10);
  return Caml_io.caml_ml_flush(stdout);
}

function prerr_char(c) {
  return Caml_io.caml_ml_output_char(stderr, c);
}

function prerr_string(s) {
  return output_string(stderr, s);
}

function prerr_bytes(s) {
  return output_bytes(stderr, s);
}

function prerr_int(i) {
  return output_string(stderr, String(i));
}

function prerr_float(f) {
  return output_string(stderr, valid_float_lexem(Caml_format.caml_format_float("%.12g", f)));
}

function prerr_newline(param) {
  Caml_io.caml_ml_output_char(stderr,
  /* '\n' */
  10);
  return Caml_io.caml_ml_flush(stderr);
}

function read_line(param) {
  Caml_io.caml_ml_flush(stdout);
  return input_line(stdin);
}

function read_int(param) {
  return Caml_format.caml_int_of_string((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function read_int_opt(param) {
  return int_of_string_opt((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function read_float(param) {
  return Caml_format.caml_float_of_string((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function read_float_opt(param) {
  return float_of_string_opt((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function string_of_format(param) {
  return param._1;
}

var exit_function = {
  contents: flush_all
};

function at_exit(f) {
  var g = exit_function.contents;

  exit_function.contents = function (param) {
    Curry._1(f, undefined);

    return Curry._1(g, undefined);
  };
}

function do_at_exit(param) {
  return Curry._1(exit_function.contents, undefined);
}

function exit(retcode) {
  do_at_exit(undefined);
  return Caml_sys.caml_sys_exit(retcode);
}

var max_int = 2147483647;
exports.max_int = max_int;
var infinity = Infinity;
exports.infinity = infinity;
var neg_infinity = -Infinity;
exports.neg_infinity = neg_infinity;
var max_float = 1.79769313486231571e+308;
exports.max_float = max_float;
var min_float = 2.22507385850720138e-308;
exports.min_float = min_float;
var epsilon_float = 2.22044604925031308e-16;
exports.epsilon_float = epsilon_float;
var flush = Caml_io.caml_ml_flush;
exports.flush = flush;
var output_char = Caml_io.caml_ml_output_char;
exports.output_char = output_char;
var output_byte = Caml_io.caml_ml_output_char;
exports.output_byte = output_byte;

function output_binary_int(prim0, prim1) {
  return Caml_external_polyfill.resolve("caml_ml_output_int")(prim0, prim1);
}

function seek_out(prim0, prim1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_out")(prim0, prim1);
}

function pos_out(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_out")(prim);
}

function out_channel_length(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size")(prim);
}

function set_binary_mode_out(prim0, prim1) {
  return Caml_external_polyfill.resolve("caml_ml_set_binary_mode")(prim0, prim1);
}

function input_char(prim) {
  return Caml_external_polyfill.resolve("caml_ml_input_char")(prim);
}

function input_byte(prim) {
  return Caml_external_polyfill.resolve("caml_ml_input_char")(prim);
}

function input_binary_int(prim) {
  return Caml_external_polyfill.resolve("caml_ml_input_int")(prim);
}

function input_value(prim) {
  return Caml_external_polyfill.resolve("caml_input_value")(prim);
}

function seek_in(prim0, prim1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_in")(prim0, prim1);
}

function pos_in(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_in")(prim);
}

function in_channel_length(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size")(prim);
}

function close_in(prim) {
  return Caml_external_polyfill.resolve("caml_ml_close_channel")(prim);
}

function set_binary_mode_in(prim0, prim1) {
  return Caml_external_polyfill.resolve("caml_ml_set_binary_mode")(prim0, prim1);
}

function LargeFile_seek_out(prim0, prim1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_out_64")(prim0, prim1);
}

function LargeFile_pos_out(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_out_64")(prim);
}

function LargeFile_out_channel_length(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size_64")(prim);
}

function LargeFile_seek_in(prim0, prim1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_in_64")(prim0, prim1);
}

function LargeFile_pos_in(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_in_64")(prim);
}

function LargeFile_in_channel_length(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size_64")(prim);
}

var LargeFile = {
  seek_out: LargeFile_seek_out,
  pos_out: LargeFile_pos_out,
  out_channel_length: LargeFile_out_channel_length,
  seek_in: LargeFile_seek_in,
  pos_in: LargeFile_pos_in,
  in_channel_length: LargeFile_in_channel_length
};
/* No side effect */

exports.LargeFile = LargeFile;
},{"./curry.js":"../node_modules/rescript/lib/es6/curry.js","./caml_io.js":"../node_modules/rescript/lib/es6/caml_io.js","./caml_sys.js":"../node_modules/rescript/lib/es6/caml_sys.js","./caml_bytes.js":"../node_modules/rescript/lib/es6/caml_bytes.js","./caml_format.js":"../node_modules/rescript/lib/es6/caml_format.js","./caml_string.js":"../node_modules/rescript/lib/es6/caml_string.js","./caml_exceptions.js":"../node_modules/rescript/lib/es6/caml_exceptions.js","./caml_js_exceptions.js":"../node_modules/rescript/lib/es6/caml_js_exceptions.js","./caml_external_polyfill.js":"../node_modules/rescript/lib/es6/caml_external_polyfill.js"}],"../node_modules/rescript/lib/es6/list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.length = length;
exports.compare_lengths = compare_lengths;
exports.compare_length_with = compare_length_with;
exports.cons = cons;
exports.hd = hd;
exports.tl = tl;
exports.nth = nth;
exports.nth_opt = nth_opt;
exports.rev = rev;
exports.init = init;
exports.rev_append = rev_append;
exports.flatten = flatten;
exports.iter = iter;
exports.iteri = iteri;
exports.map = map;
exports.mapi = mapi$1;
exports.rev_map = rev_map;
exports.fold_left = fold_left;
exports.fold_right = fold_right;
exports.iter2 = iter2;
exports.map2 = map2;
exports.rev_map2 = rev_map2;
exports.fold_left2 = fold_left2;
exports.fold_right2 = fold_right2;
exports.for_all = for_all;
exports.exists = exists;
exports.for_all2 = for_all2;
exports.exists2 = exists2;
exports.mem = mem;
exports.memq = memq;
exports.find = find;
exports.find_opt = find_opt;
exports.find_all = find_all;
exports.partition = partition;
exports.assoc = assoc;
exports.assoc_opt = assoc_opt;
exports.assq = assq;
exports.assq_opt = assq_opt;
exports.mem_assoc = mem_assoc;
exports.mem_assq = mem_assq;
exports.remove_assoc = remove_assoc;
exports.remove_assq = remove_assq;
exports.split = split;
exports.combine = combine;
exports.stable_sort = stable_sort;
exports.sort_uniq = sort_uniq;
exports.merge = merge;
exports.fast_sort = exports.sort = exports.filter = exports.concat = exports.append = void 0;

var Curry = _interopRequireWildcard(require("./curry.js"));

var Caml_obj = _interopRequireWildcard(require("./caml_obj.js"));

var Pervasives = _interopRequireWildcard(require("./pervasives.js"));

var Caml_option = _interopRequireWildcard(require("./caml_option.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function length(l) {
  var _len = 0;
  var _param = l;

  while (true) {
    var param = _param;
    var len = _len;

    if (!param) {
      return len;
    }

    _param = param.tl;
    _len = len + 1 | 0;
    continue;
  }

  ;
}

function cons(a, l) {
  return {
    hd: a,
    tl: l
  };
}

function hd(param) {
  if (param) {
    return param.hd;
  }

  throw {
    RE_EXN_ID: "Failure",
    _1: "hd",
    Error: new Error()
  };
}

function tl(param) {
  if (param) {
    return param.tl;
  }

  throw {
    RE_EXN_ID: "Failure",
    _1: "tl",
    Error: new Error()
  };
}

function nth(l, n) {
  if (n < 0) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "List.nth",
      Error: new Error()
    };
  }

  var _l = l;
  var _n = n;

  while (true) {
    var n$1 = _n;
    var l$1 = _l;

    if (l$1) {
      if (n$1 === 0) {
        return l$1.hd;
      }

      _n = n$1 - 1 | 0;
      _l = l$1.tl;
      continue;
    }

    throw {
      RE_EXN_ID: "Failure",
      _1: "nth",
      Error: new Error()
    };
  }

  ;
}

function nth_opt(l, n) {
  if (n < 0) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "List.nth",
      Error: new Error()
    };
  }

  var _l = l;
  var _n = n;

  while (true) {
    var n$1 = _n;
    var l$1 = _l;

    if (!l$1) {
      return;
    }

    if (n$1 === 0) {
      return Caml_option.some(l$1.hd);
    }

    _n = n$1 - 1 | 0;
    _l = l$1.tl;
    continue;
  }

  ;
}

function rev_append(_l1, _l2) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (!l1) {
      return l2;
    }

    _l2 = {
      hd: l1.hd,
      tl: l2
    };
    _l1 = l1.tl;
    continue;
  }

  ;
}

function rev(l) {
  return rev_append(l,
  /* [] */
  0);
}

function init_tailrec_aux(_acc, _i, n, f) {
  while (true) {
    var i = _i;
    var acc = _acc;

    if (i >= n) {
      return acc;
    }

    _i = i + 1 | 0;
    _acc = {
      hd: Curry._1(f, i),
      tl: acc
    };
    continue;
  }

  ;
}

function init_aux(i, n, f) {
  if (i >= n) {
    return (
      /* [] */
      0
    );
  }

  var r = Curry._1(f, i);

  return {
    hd: r,
    tl: init_aux(i + 1 | 0, n, f)
  };
}

function init(len, f) {
  if (len < 0) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "List.init",
      Error: new Error()
    };
  }

  if (len > 10000) {
    return rev_append(init_tailrec_aux(
    /* [] */
    0, 0, len, f),
    /* [] */
    0);
  } else {
    return init_aux(0, len, f);
  }
}

function flatten(param) {
  if (param) {
    return Pervasives.$at(param.hd, flatten(param.tl));
  } else {
    return (
      /* [] */
      0
    );
  }
}

function map(f, param) {
  if (!param) {
    return (
      /* [] */
      0
    );
  }

  var r = Curry._1(f, param.hd);

  return {
    hd: r,
    tl: map(f, param.tl)
  };
}

function mapi(i, f, param) {
  if (!param) {
    return (
      /* [] */
      0
    );
  }

  var r = Curry._2(f, i, param.hd);

  return {
    hd: r,
    tl: mapi(i + 1 | 0, f, param.tl)
  };
}

function mapi$1(f, l) {
  return mapi(0, f, l);
}

function rev_map(f, l) {
  var _accu =
  /* [] */
  0;
  var _param = l;

  while (true) {
    var param = _param;
    var accu = _accu;

    if (!param) {
      return accu;
    }

    _param = param.tl;
    _accu = {
      hd: Curry._1(f, param.hd),
      tl: accu
    };
    continue;
  }

  ;
}

function iter(f, _param) {
  while (true) {
    var param = _param;

    if (!param) {
      return;
    }

    Curry._1(f, param.hd);

    _param = param.tl;
    continue;
  }

  ;
}

function iteri(f, l) {
  var _i = 0;
  var _param = l;

  while (true) {
    var param = _param;
    var i = _i;

    if (!param) {
      return;
    }

    Curry._2(f, i, param.hd);

    _param = param.tl;
    _i = i + 1 | 0;
    continue;
  }

  ;
}

function fold_left(f, _accu, _l) {
  while (true) {
    var l = _l;
    var accu = _accu;

    if (!l) {
      return accu;
    }

    _l = l.tl;
    _accu = Curry._2(f, accu, l.hd);
    continue;
  }

  ;
}

function fold_right(f, l, accu) {
  if (l) {
    return Curry._2(f, l.hd, fold_right(f, l.tl, accu));
  } else {
    return accu;
  }
}

function map2(f, l1, l2) {
  if (l1) {
    if (l2) {
      var r = Curry._2(f, l1.hd, l2.hd);

      return {
        hd: r,
        tl: map2(f, l1.tl, l2.tl)
      };
    }

    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "List.map2",
      Error: new Error()
    };
  }

  if (!l2) {
    return (
      /* [] */
      0
    );
  }

  throw {
    RE_EXN_ID: "Invalid_argument",
    _1: "List.map2",
    Error: new Error()
  };
}

function rev_map2(f, l1, l2) {
  var _accu =
  /* [] */
  0;
  var _l1 = l1;
  var _l2 = l2;

  while (true) {
    var l2$1 = _l2;
    var l1$1 = _l1;
    var accu = _accu;

    if (l1$1) {
      if (l2$1) {
        _l2 = l2$1.tl;
        _l1 = l1$1.tl;
        _accu = {
          hd: Curry._2(f, l1$1.hd, l2$1.hd),
          tl: accu
        };
        continue;
      }

      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.rev_map2",
        Error: new Error()
      };
    }

    if (l2$1) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.rev_map2",
        Error: new Error()
      };
    }

    return accu;
  }

  ;
}

function iter2(f, _l1, _l2) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (l1) {
      if (l2) {
        Curry._2(f, l1.hd, l2.hd);

        _l2 = l2.tl;
        _l1 = l1.tl;
        continue;
      }

      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.iter2",
        Error: new Error()
      };
    }

    if (!l2) {
      return;
    }

    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "List.iter2",
      Error: new Error()
    };
  }

  ;
}

function fold_left2(f, _accu, _l1, _l2) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;
    var accu = _accu;

    if (l1) {
      if (l2) {
        _l2 = l2.tl;
        _l1 = l1.tl;
        _accu = Curry._3(f, accu, l1.hd, l2.hd);
        continue;
      }

      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.fold_left2",
        Error: new Error()
      };
    }

    if (l2) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.fold_left2",
        Error: new Error()
      };
    }

    return accu;
  }

  ;
}

function fold_right2(f, l1, l2, accu) {
  if (l1) {
    if (l2) {
      return Curry._3(f, l1.hd, l2.hd, fold_right2(f, l1.tl, l2.tl, accu));
    }

    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "List.fold_right2",
      Error: new Error()
    };
  }

  if (l2) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "List.fold_right2",
      Error: new Error()
    };
  }

  return accu;
}

function for_all(p, _param) {
  while (true) {
    var param = _param;

    if (!param) {
      return true;
    }

    if (!Curry._1(p, param.hd)) {
      return false;
    }

    _param = param.tl;
    continue;
  }

  ;
}

function exists(p, _param) {
  while (true) {
    var param = _param;

    if (!param) {
      return false;
    }

    if (Curry._1(p, param.hd)) {
      return true;
    }

    _param = param.tl;
    continue;
  }

  ;
}

function for_all2(p, _l1, _l2) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (l1) {
      if (l2) {
        if (!Curry._2(p, l1.hd, l2.hd)) {
          return false;
        }

        _l2 = l2.tl;
        _l1 = l1.tl;
        continue;
      }

      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.for_all2",
        Error: new Error()
      };
    }

    if (!l2) {
      return true;
    }

    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "List.for_all2",
      Error: new Error()
    };
  }

  ;
}

function exists2(p, _l1, _l2) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (l1) {
      if (l2) {
        if (Curry._2(p, l1.hd, l2.hd)) {
          return true;
        }

        _l2 = l2.tl;
        _l1 = l1.tl;
        continue;
      }

      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.exists2",
        Error: new Error()
      };
    }

    if (!l2) {
      return false;
    }

    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "List.exists2",
      Error: new Error()
    };
  }

  ;
}

function mem(x, _param) {
  while (true) {
    var param = _param;

    if (!param) {
      return false;
    }

    if (Caml_obj.caml_equal(param.hd, x)) {
      return true;
    }

    _param = param.tl;
    continue;
  }

  ;
}

function memq(x, _param) {
  while (true) {
    var param = _param;

    if (!param) {
      return false;
    }

    if (param.hd === x) {
      return true;
    }

    _param = param.tl;
    continue;
  }

  ;
}

function assoc(x, _param) {
  while (true) {
    var param = _param;

    if (param) {
      var match = param.hd;

      if (Caml_obj.caml_equal(match[0], x)) {
        return match[1];
      }

      _param = param.tl;
      continue;
    }

    throw {
      RE_EXN_ID: "Not_found",
      Error: new Error()
    };
  }

  ;
}

function assoc_opt(x, _param) {
  while (true) {
    var param = _param;

    if (!param) {
      return;
    }

    var match = param.hd;

    if (Caml_obj.caml_equal(match[0], x)) {
      return Caml_option.some(match[1]);
    }

    _param = param.tl;
    continue;
  }

  ;
}

function assq(x, _param) {
  while (true) {
    var param = _param;

    if (param) {
      var match = param.hd;

      if (match[0] === x) {
        return match[1];
      }

      _param = param.tl;
      continue;
    }

    throw {
      RE_EXN_ID: "Not_found",
      Error: new Error()
    };
  }

  ;
}

function assq_opt(x, _param) {
  while (true) {
    var param = _param;

    if (!param) {
      return;
    }

    var match = param.hd;

    if (match[0] === x) {
      return Caml_option.some(match[1]);
    }

    _param = param.tl;
    continue;
  }

  ;
}

function mem_assoc(x, _param) {
  while (true) {
    var param = _param;

    if (!param) {
      return false;
    }

    if (Caml_obj.caml_equal(param.hd[0], x)) {
      return true;
    }

    _param = param.tl;
    continue;
  }

  ;
}

function mem_assq(x, _param) {
  while (true) {
    var param = _param;

    if (!param) {
      return false;
    }

    if (param.hd[0] === x) {
      return true;
    }

    _param = param.tl;
    continue;
  }

  ;
}

function remove_assoc(x, param) {
  if (!param) {
    return (
      /* [] */
      0
    );
  }

  var l = param.tl;
  var pair = param.hd;

  if (Caml_obj.caml_equal(pair[0], x)) {
    return l;
  } else {
    return {
      hd: pair,
      tl: remove_assoc(x, l)
    };
  }
}

function remove_assq(x, param) {
  if (!param) {
    return (
      /* [] */
      0
    );
  }

  var l = param.tl;
  var pair = param.hd;

  if (pair[0] === x) {
    return l;
  } else {
    return {
      hd: pair,
      tl: remove_assq(x, l)
    };
  }
}

function find(p, _param) {
  while (true) {
    var param = _param;

    if (param) {
      var x = param.hd;

      if (Curry._1(p, x)) {
        return x;
      }

      _param = param.tl;
      continue;
    }

    throw {
      RE_EXN_ID: "Not_found",
      Error: new Error()
    };
  }

  ;
}

function find_opt(p, _param) {
  while (true) {
    var param = _param;

    if (!param) {
      return;
    }

    var x = param.hd;

    if (Curry._1(p, x)) {
      return Caml_option.some(x);
    }

    _param = param.tl;
    continue;
  }

  ;
}

function find_all(p) {
  return function (param) {
    var _accu =
    /* [] */
    0;
    var _param = param;

    while (true) {
      var param$1 = _param;
      var accu = _accu;

      if (!param$1) {
        return rev_append(accu,
        /* [] */
        0);
      }

      var l = param$1.tl;
      var x = param$1.hd;

      if (Curry._1(p, x)) {
        _param = l;
        _accu = {
          hd: x,
          tl: accu
        };
        continue;
      }

      _param = l;
      continue;
    }

    ;
  };
}

function partition(p, l) {
  var _yes =
  /* [] */
  0;
  var _no =
  /* [] */
  0;
  var _param = l;

  while (true) {
    var param = _param;
    var no = _no;
    var yes = _yes;

    if (!param) {
      return [rev_append(yes,
      /* [] */
      0), rev_append(no,
      /* [] */
      0)];
    }

    var l$1 = param.tl;
    var x = param.hd;

    if (Curry._1(p, x)) {
      _param = l$1;
      _yes = {
        hd: x,
        tl: yes
      };
      continue;
    }

    _param = l$1;
    _no = {
      hd: x,
      tl: no
    };
    continue;
  }

  ;
}

function split(param) {
  if (!param) {
    return [
    /* [] */
    0,
    /* [] */
    0];
  }

  var match = param.hd;
  var match$1 = split(param.tl);
  return [{
    hd: match[0],
    tl: match$1[0]
  }, {
    hd: match[1],
    tl: match$1[1]
  }];
}

function combine(l1, l2) {
  if (l1) {
    if (l2) {
      return {
        hd: [l1.hd, l2.hd],
        tl: combine(l1.tl, l2.tl)
      };
    }

    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "List.combine",
      Error: new Error()
    };
  }

  if (!l2) {
    return (
      /* [] */
      0
    );
  }

  throw {
    RE_EXN_ID: "Invalid_argument",
    _1: "List.combine",
    Error: new Error()
  };
}

function merge(cmp, l1, l2) {
  if (!l1) {
    return l2;
  }

  if (!l2) {
    return l1;
  }

  var h2 = l2.hd;
  var h1 = l1.hd;

  if (Curry._2(cmp, h1, h2) <= 0) {
    return {
      hd: h1,
      tl: merge(cmp, l1.tl, l2)
    };
  } else {
    return {
      hd: h2,
      tl: merge(cmp, l1, l2.tl)
    };
  }
}

function chop(_k, _l) {
  while (true) {
    var l = _l;
    var k = _k;

    if (k === 0) {
      return l;
    }

    if (l) {
      _l = l.tl;
      _k = k - 1 | 0;
      continue;
    }

    throw {
      RE_EXN_ID: "Assert_failure",
      _1: ["list.ml", 262, 11],
      Error: new Error()
    };
  }

  ;
}

function stable_sort(cmp, l) {
  var sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;

        if (match) {
          var match$1 = match.tl;

          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;

            if (Curry._2(cmp, x1, x2) <= 0) {
              if (Curry._2(cmp, x2, x3) <= 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x2,
                    tl: {
                      hd: x3,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              } else if (Curry._2(cmp, x1, x3) <= 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x3,
                    tl: {
                      hd: x2,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              } else {
                return {
                  hd: x3,
                  tl: {
                    hd: x1,
                    tl: {
                      hd: x2,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              }
            } else if (Curry._2(cmp, x1, x3) <= 0) {
              return {
                hd: x2,
                tl: {
                  hd: x1,
                  tl: {
                    hd: x3,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            } else if (Curry._2(cmp, x2, x3) <= 0) {
              return {
                hd: x2,
                tl: {
                  hd: x3,
                  tl: {
                    hd: x1,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            } else {
              return {
                hd: x3,
                tl: {
                  hd: x2,
                  tl: {
                    hd: x1,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            }
          }
        }
      }
    } else if (l) {
      var match$2 = l.tl;

      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;

        if (Curry._2(cmp, x1$1, x2$1) <= 0) {
          return {
            hd: x1$1,
            tl: {
              hd: x2$1,
              tl:
              /* [] */
              0
            }
          };
        } else {
          return {
            hd: x2$1,
            tl: {
              hd: x1$1,
              tl:
              /* [] */
              0
            }
          };
        }
      }
    }

    var n1 = n >> 1;
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = rev_sort(n1, l);
    var s2 = rev_sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu =
    /* [] */
    0;

    while (true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;

      if (!l1) {
        return rev_append(l2$1, accu);
      }

      if (!l2$1) {
        return rev_append(l1, accu);
      }

      var h2 = l2$1.hd;
      var h1 = l1.hd;

      if (Curry._2(cmp, h1, h2) > 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = l1.tl;
        continue;
      }

      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = l2$1.tl;
      continue;
    }

    ;
  };

  var rev_sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;

        if (match) {
          var match$1 = match.tl;

          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;

            if (Curry._2(cmp, x1, x2) > 0) {
              if (Curry._2(cmp, x2, x3) > 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x2,
                    tl: {
                      hd: x3,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              } else if (Curry._2(cmp, x1, x3) > 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x3,
                    tl: {
                      hd: x2,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              } else {
                return {
                  hd: x3,
                  tl: {
                    hd: x1,
                    tl: {
                      hd: x2,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              }
            } else if (Curry._2(cmp, x1, x3) > 0) {
              return {
                hd: x2,
                tl: {
                  hd: x1,
                  tl: {
                    hd: x3,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            } else if (Curry._2(cmp, x2, x3) > 0) {
              return {
                hd: x2,
                tl: {
                  hd: x3,
                  tl: {
                    hd: x1,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            } else {
              return {
                hd: x3,
                tl: {
                  hd: x2,
                  tl: {
                    hd: x1,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            }
          }
        }
      }
    } else if (l) {
      var match$2 = l.tl;

      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;

        if (Curry._2(cmp, x1$1, x2$1) > 0) {
          return {
            hd: x1$1,
            tl: {
              hd: x2$1,
              tl:
              /* [] */
              0
            }
          };
        } else {
          return {
            hd: x2$1,
            tl: {
              hd: x1$1,
              tl:
              /* [] */
              0
            }
          };
        }
      }
    }

    var n1 = n >> 1;
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = sort(n1, l);
    var s2 = sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu =
    /* [] */
    0;

    while (true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;

      if (!l1) {
        return rev_append(l2$1, accu);
      }

      if (!l2$1) {
        return rev_append(l1, accu);
      }

      var h2 = l2$1.hd;
      var h1 = l1.hd;

      if (Curry._2(cmp, h1, h2) <= 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = l1.tl;
        continue;
      }

      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = l2$1.tl;
      continue;
    }

    ;
  };

  var len = length(l);

  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

function sort_uniq(cmp, l) {
  var sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;

        if (match) {
          var match$1 = match.tl;

          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;

            var c = Curry._2(cmp, x1, x2);

            if (c === 0) {
              var c$1 = Curry._2(cmp, x2, x3);

              if (c$1 === 0) {
                return {
                  hd: x2,
                  tl:
                  /* [] */
                  0
                };
              } else if (c$1 < 0) {
                return {
                  hd: x2,
                  tl: {
                    hd: x3,
                    tl:
                    /* [] */
                    0
                  }
                };
              } else {
                return {
                  hd: x3,
                  tl: {
                    hd: x2,
                    tl:
                    /* [] */
                    0
                  }
                };
              }
            }

            if (c < 0) {
              var c$2 = Curry._2(cmp, x2, x3);

              if (c$2 === 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x2,
                    tl:
                    /* [] */
                    0
                  }
                };
              }

              if (c$2 < 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x2,
                    tl: {
                      hd: x3,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              }

              var c$3 = Curry._2(cmp, x1, x3);

              if (c$3 === 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x2,
                    tl:
                    /* [] */
                    0
                  }
                };
              } else if (c$3 < 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x3,
                    tl: {
                      hd: x2,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              } else {
                return {
                  hd: x3,
                  tl: {
                    hd: x1,
                    tl: {
                      hd: x2,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              }
            }

            var c$4 = Curry._2(cmp, x1, x3);

            if (c$4 === 0) {
              return {
                hd: x2,
                tl: {
                  hd: x1,
                  tl:
                  /* [] */
                  0
                }
              };
            }

            if (c$4 < 0) {
              return {
                hd: x2,
                tl: {
                  hd: x1,
                  tl: {
                    hd: x3,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            }

            var c$5 = Curry._2(cmp, x2, x3);

            if (c$5 === 0) {
              return {
                hd: x2,
                tl: {
                  hd: x1,
                  tl:
                  /* [] */
                  0
                }
              };
            } else if (c$5 < 0) {
              return {
                hd: x2,
                tl: {
                  hd: x3,
                  tl: {
                    hd: x1,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            } else {
              return {
                hd: x3,
                tl: {
                  hd: x2,
                  tl: {
                    hd: x1,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            }
          }
        }
      }
    } else if (l) {
      var match$2 = l.tl;

      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;

        var c$6 = Curry._2(cmp, x1$1, x2$1);

        if (c$6 === 0) {
          return {
            hd: x1$1,
            tl:
            /* [] */
            0
          };
        } else if (c$6 < 0) {
          return {
            hd: x1$1,
            tl: {
              hd: x2$1,
              tl:
              /* [] */
              0
            }
          };
        } else {
          return {
            hd: x2$1,
            tl: {
              hd: x1$1,
              tl:
              /* [] */
              0
            }
          };
        }
      }
    }

    var n1 = n >> 1;
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = rev_sort(n1, l);
    var s2 = rev_sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu =
    /* [] */
    0;

    while (true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;

      if (!l1) {
        return rev_append(l2$1, accu);
      }

      if (!l2$1) {
        return rev_append(l1, accu);
      }

      var t2 = l2$1.tl;
      var h2 = l2$1.hd;
      var t1 = l1.tl;
      var h1 = l1.hd;

      var c$7 = Curry._2(cmp, h1, h2);

      if (c$7 === 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l2 = t2;
        _l1 = t1;
        continue;
      }

      if (c$7 > 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = t1;
        continue;
      }

      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = t2;
      continue;
    }

    ;
  };

  var rev_sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;

        if (match) {
          var match$1 = match.tl;

          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;

            var c = Curry._2(cmp, x1, x2);

            if (c === 0) {
              var c$1 = Curry._2(cmp, x2, x3);

              if (c$1 === 0) {
                return {
                  hd: x2,
                  tl:
                  /* [] */
                  0
                };
              } else if (c$1 > 0) {
                return {
                  hd: x2,
                  tl: {
                    hd: x3,
                    tl:
                    /* [] */
                    0
                  }
                };
              } else {
                return {
                  hd: x3,
                  tl: {
                    hd: x2,
                    tl:
                    /* [] */
                    0
                  }
                };
              }
            }

            if (c > 0) {
              var c$2 = Curry._2(cmp, x2, x3);

              if (c$2 === 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x2,
                    tl:
                    /* [] */
                    0
                  }
                };
              }

              if (c$2 > 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x2,
                    tl: {
                      hd: x3,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              }

              var c$3 = Curry._2(cmp, x1, x3);

              if (c$3 === 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x2,
                    tl:
                    /* [] */
                    0
                  }
                };
              } else if (c$3 > 0) {
                return {
                  hd: x1,
                  tl: {
                    hd: x3,
                    tl: {
                      hd: x2,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              } else {
                return {
                  hd: x3,
                  tl: {
                    hd: x1,
                    tl: {
                      hd: x2,
                      tl:
                      /* [] */
                      0
                    }
                  }
                };
              }
            }

            var c$4 = Curry._2(cmp, x1, x3);

            if (c$4 === 0) {
              return {
                hd: x2,
                tl: {
                  hd: x1,
                  tl:
                  /* [] */
                  0
                }
              };
            }

            if (c$4 > 0) {
              return {
                hd: x2,
                tl: {
                  hd: x1,
                  tl: {
                    hd: x3,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            }

            var c$5 = Curry._2(cmp, x2, x3);

            if (c$5 === 0) {
              return {
                hd: x2,
                tl: {
                  hd: x1,
                  tl:
                  /* [] */
                  0
                }
              };
            } else if (c$5 > 0) {
              return {
                hd: x2,
                tl: {
                  hd: x3,
                  tl: {
                    hd: x1,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            } else {
              return {
                hd: x3,
                tl: {
                  hd: x2,
                  tl: {
                    hd: x1,
                    tl:
                    /* [] */
                    0
                  }
                }
              };
            }
          }
        }
      }
    } else if (l) {
      var match$2 = l.tl;

      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;

        var c$6 = Curry._2(cmp, x1$1, x2$1);

        if (c$6 === 0) {
          return {
            hd: x1$1,
            tl:
            /* [] */
            0
          };
        } else if (c$6 > 0) {
          return {
            hd: x1$1,
            tl: {
              hd: x2$1,
              tl:
              /* [] */
              0
            }
          };
        } else {
          return {
            hd: x2$1,
            tl: {
              hd: x1$1,
              tl:
              /* [] */
              0
            }
          };
        }
      }
    }

    var n1 = n >> 1;
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = sort(n1, l);
    var s2 = sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu =
    /* [] */
    0;

    while (true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;

      if (!l1) {
        return rev_append(l2$1, accu);
      }

      if (!l2$1) {
        return rev_append(l1, accu);
      }

      var t2 = l2$1.tl;
      var h2 = l2$1.hd;
      var t1 = l1.tl;
      var h1 = l1.hd;

      var c$7 = Curry._2(cmp, h1, h2);

      if (c$7 === 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l2 = t2;
        _l1 = t1;
        continue;
      }

      if (c$7 < 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = t1;
        continue;
      }

      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = t2;
      continue;
    }

    ;
  };

  var len = length(l);

  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

function compare_lengths(_l1, _l2) {
  while (true) {
    var l2 = _l2;
    var l1 = _l1;

    if (!l1) {
      if (l2) {
        return -1;
      } else {
        return 0;
      }
    }

    if (!l2) {
      return 1;
    }

    _l2 = l2.tl;
    _l1 = l1.tl;
    continue;
  }

  ;
}

function compare_length_with(_l, _n) {
  while (true) {
    var n = _n;
    var l = _l;

    if (!l) {
      if (n === 0) {
        return 0;
      } else if (n > 0) {
        return -1;
      } else {
        return 1;
      }
    }

    if (n <= 0) {
      return 1;
    }

    _n = n - 1 | 0;
    _l = l.tl;
    continue;
  }

  ;
}

var append = Pervasives.$at;
exports.append = append;
var concat = flatten;
exports.concat = concat;
var filter = find_all;
exports.filter = filter;
var sort = stable_sort;
exports.sort = sort;
var fast_sort = stable_sort;
/* No side effect */

exports.fast_sort = fast_sort;
},{"./curry.js":"../node_modules/rescript/lib/es6/curry.js","./caml_obj.js":"../node_modules/rescript/lib/es6/caml_obj.js","./pervasives.js":"../node_modules/rescript/lib/es6/pervasives.js","./caml_option.js":"../node_modules/rescript/lib/es6/caml_option.js"}],"../node_modules/rescript/lib/es6/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.make_matrix = make_matrix;
exports.append = append;
exports.sub = sub;
exports.copy = copy;
exports.fill = fill;
exports.blit = blit;
exports.to_list = to_list;
exports.of_list = of_list;
exports.iter = iter;
exports.iteri = iteri;
exports.map = map;
exports.mapi = mapi;
exports.fold_left = fold_left;
exports.fold_right = fold_right;
exports.iter2 = iter2;
exports.map2 = map2;
exports.for_all = for_all;
exports.exists = exists;
exports.mem = mem;
exports.memq = memq;
exports.sort = sort;
exports.stable_sort = stable_sort;
exports.Floatarray = exports.fast_sort = exports.concat = exports.create_matrix = exports.make_float = void 0;

var Curry = _interopRequireWildcard(require("./curry.js"));

var Caml_obj = _interopRequireWildcard(require("./caml_obj.js"));

var Caml_array = _interopRequireWildcard(require("./caml_array.js"));

var Caml_exceptions = _interopRequireWildcard(require("./caml_exceptions.js"));

var Caml_js_exceptions = _interopRequireWildcard(require("./caml_js_exceptions.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var make_float = Caml_array.make_float;
exports.make_float = make_float;
var Floatarray = {};
exports.Floatarray = Floatarray;

function init(l, f) {
  if (l === 0) {
    return [];
  }

  if (l < 0) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "Array.init",
      Error: new Error()
    };
  }

  var res = Caml_array.make(l, Curry._1(f, 0));

  for (var i = 1; i < l; ++i) {
    res[i] = Curry._1(f, i);
  }

  return res;
}

function make_matrix(sx, sy, init) {
  var res = Caml_array.make(sx, []);

  for (var x = 0; x < sx; ++x) {
    res[x] = Caml_array.make(sy, init);
  }

  return res;
}

function copy(a) {
  var l = a.length;

  if (l === 0) {
    return [];
  } else {
    return Caml_array.sub(a, 0, l);
  }
}

function append(a1, a2) {
  var l1 = a1.length;

  if (l1 === 0) {
    return copy(a2);
  } else if (a2.length === 0) {
    return Caml_array.sub(a1, 0, l1);
  } else {
    return a1.concat(a2);
  }
}

function sub(a, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (a.length - len | 0)) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "Array.sub",
      Error: new Error()
    };
  }

  return Caml_array.sub(a, ofs, len);
}

function fill(a, ofs, len, v) {
  if (ofs < 0 || len < 0 || ofs > (a.length - len | 0)) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "Array.fill",
      Error: new Error()
    };
  }

  for (var i = ofs, i_finish = ofs + len | 0; i < i_finish; ++i) {
    a[i] = v;
  }
}

function blit(a1, ofs1, a2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (a1.length - len | 0) || ofs2 < 0 || ofs2 > (a2.length - len | 0)) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "Array.blit",
      Error: new Error()
    };
  }

  return Caml_array.blit(a1, ofs1, a2, ofs2, len);
}

function iter(f, a) {
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    Curry._1(f, a[i]);
  }
}

function iter2(f, a, b) {
  if (a.length !== b.length) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "Array.iter2: arrays must have the same length",
      Error: new Error()
    };
  }

  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    Curry._2(f, a[i], b[i]);
  }
}

function map(f, a) {
  var l = a.length;

  if (l === 0) {
    return [];
  }

  var r = Caml_array.make(l, Curry._1(f, a[0]));

  for (var i = 1; i < l; ++i) {
    r[i] = Curry._1(f, a[i]);
  }

  return r;
}

function map2(f, a, b) {
  var la = a.length;
  var lb = b.length;

  if (la !== lb) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "Array.map2: arrays must have the same length",
      Error: new Error()
    };
  }

  if (la === 0) {
    return [];
  }

  var r = Caml_array.make(la, Curry._2(f, a[0], b[0]));

  for (var i = 1; i < la; ++i) {
    r[i] = Curry._2(f, a[i], b[i]);
  }

  return r;
}

function iteri(f, a) {
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    Curry._2(f, i, a[i]);
  }
}

function mapi(f, a) {
  var l = a.length;

  if (l === 0) {
    return [];
  }

  var r = Caml_array.make(l, Curry._2(f, 0, a[0]));

  for (var i = 1; i < l; ++i) {
    r[i] = Curry._2(f, i, a[i]);
  }

  return r;
}

function to_list(a) {
  var _i = a.length - 1 | 0;

  var _res =
  /* [] */
  0;

  while (true) {
    var res = _res;
    var i = _i;

    if (i < 0) {
      return res;
    }

    _res = {
      hd: a[i],
      tl: res
    };
    _i = i - 1 | 0;
    continue;
  }

  ;
}

function list_length(_accu, _param) {
  while (true) {
    var param = _param;
    var accu = _accu;

    if (!param) {
      return accu;
    }

    _param = param.tl;
    _accu = accu + 1 | 0;
    continue;
  }

  ;
}

function of_list(l) {
  if (!l) {
    return [];
  }

  var a = Caml_array.make(list_length(0, l), l.hd);
  var _i = 1;
  var _param = l.tl;

  while (true) {
    var param = _param;
    var i = _i;

    if (!param) {
      return a;
    }

    a[i] = param.hd;
    _param = param.tl;
    _i = i + 1 | 0;
    continue;
  }

  ;
}

function fold_left(f, x, a) {
  var r = x;

  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = Curry._2(f, r, a[i]);
  }

  return r;
}

function fold_right(f, a, x) {
  var r = x;

  for (var i = a.length - 1 | 0; i >= 0; --i) {
    r = Curry._2(f, a[i], r);
  }

  return r;
}

function exists(p, a) {
  var n = a.length;
  var _i = 0;

  while (true) {
    var i = _i;

    if (i === n) {
      return false;
    }

    if (Curry._1(p, a[i])) {
      return true;
    }

    _i = i + 1 | 0;
    continue;
  }

  ;
}

function for_all(p, a) {
  var n = a.length;
  var _i = 0;

  while (true) {
    var i = _i;

    if (i === n) {
      return true;
    }

    if (!Curry._1(p, a[i])) {
      return false;
    }

    _i = i + 1 | 0;
    continue;
  }

  ;
}

function mem(x, a) {
  var n = a.length;
  var _i = 0;

  while (true) {
    var i = _i;

    if (i === n) {
      return false;
    }

    if (Caml_obj.caml_equal(a[i], x)) {
      return true;
    }

    _i = i + 1 | 0;
    continue;
  }

  ;
}

function memq(x, a) {
  var n = a.length;
  var _i = 0;

  while (true) {
    var i = _i;

    if (i === n) {
      return false;
    }

    if (x === a[i]) {
      return true;
    }

    _i = i + 1 | 0;
    continue;
  }

  ;
}

var Bottom = /* @__PURE__ */Caml_exceptions.create("Array.Bottom");

function sort(cmp, a) {
  var maxson = function (l, i) {
    var i31 = ((i + i | 0) + i | 0) + 1 | 0;
    var x = i31;

    if ((i31 + 2 | 0) < l) {
      if (Curry._2(cmp, Caml_array.get(a, i31), Caml_array.get(a, i31 + 1 | 0)) < 0) {
        x = i31 + 1 | 0;
      }

      if (Curry._2(cmp, Caml_array.get(a, x), Caml_array.get(a, i31 + 2 | 0)) < 0) {
        x = i31 + 2 | 0;
      }

      return x;
    }

    if ((i31 + 1 | 0) < l && Curry._2(cmp, Caml_array.get(a, i31), Caml_array.get(a, i31 + 1 | 0)) < 0) {
      return i31 + 1 | 0;
    }

    if (i31 < l) {
      return i31;
    }

    throw {
      RE_EXN_ID: Bottom,
      _1: i,
      Error: new Error()
    };
  };

  var trickle = function (l, i, e) {
    try {
      var _i = i;

      while (true) {
        var i$1 = _i;
        var j = maxson(l, i$1);

        if (Curry._2(cmp, Caml_array.get(a, j), e) <= 0) {
          return Caml_array.set(a, i$1, e);
        }

        Caml_array.set(a, i$1, Caml_array.get(a, j));
        _i = j;
        continue;
      }

      ;
    } catch (raw_i) {
      var i$2 = Caml_js_exceptions.internalToOCamlException(raw_i);

      if (i$2.RE_EXN_ID === Bottom) {
        return Caml_array.set(a, i$2._1, e);
      }

      throw i$2;
    }
  };

  var bubble = function (l, i) {
    try {
      var _i = i;

      while (true) {
        var i$1 = _i;
        var j = maxson(l, i$1);
        Caml_array.set(a, i$1, Caml_array.get(a, j));
        _i = j;
        continue;
      }

      ;
    } catch (raw_i) {
      var i$2 = Caml_js_exceptions.internalToOCamlException(raw_i);

      if (i$2.RE_EXN_ID === Bottom) {
        return i$2._1;
      }

      throw i$2;
    }
  };

  var trickleup = function (_i, e) {
    while (true) {
      var i = _i;
      var father = (i - 1 | 0) / 3 | 0;

      if (i === father) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: ["array.ml", 238, 4],
          Error: new Error()
        };
      }

      if (Curry._2(cmp, Caml_array.get(a, father), e) >= 0) {
        return Caml_array.set(a, i, e);
      }

      Caml_array.set(a, i, Caml_array.get(a, father));

      if (father <= 0) {
        return Caml_array.set(a, 0, e);
      }

      _i = father;
      continue;
    }

    ;
  };

  var l = a.length;

  for (var i = ((l + 1 | 0) / 3 | 0) - 1 | 0; i >= 0; --i) {
    trickle(l, i, Caml_array.get(a, i));
  }

  for (var i$1 = l - 1 | 0; i$1 >= 2; --i$1) {
    var e = Caml_array.get(a, i$1);
    Caml_array.set(a, i$1, Caml_array.get(a, 0));
    trickleup(bubble(i$1, 0), e);
  }

  if (l <= 1) {
    return;
  }

  var e$1 = Caml_array.get(a, 1);
  Caml_array.set(a, 1, Caml_array.get(a, 0));
  return Caml_array.set(a, 0, e$1);
}

function stable_sort(cmp, a) {
  var merge = function (src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
    var src1r = src1ofs + src1len | 0;
    var src2r = src2ofs + src2len | 0;
    var _i1 = src1ofs;

    var _s1 = Caml_array.get(a, src1ofs);

    var _i2 = src2ofs;

    var _s2 = Caml_array.get(src2, src2ofs);

    var _d = dstofs;

    while (true) {
      var d = _d;
      var s2 = _s2;
      var i2 = _i2;
      var s1 = _s1;
      var i1 = _i1;

      if (Curry._2(cmp, s1, s2) <= 0) {
        Caml_array.set(dst, d, s1);
        var i1$1 = i1 + 1 | 0;

        if (i1$1 >= src1r) {
          return blit(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
        }

        _d = d + 1 | 0;
        _s1 = Caml_array.get(a, i1$1);
        _i1 = i1$1;
        continue;
      }

      Caml_array.set(dst, d, s2);
      var i2$1 = i2 + 1 | 0;

      if (i2$1 >= src2r) {
        return blit(a, i1, dst, d + 1 | 0, src1r - i1 | 0);
      }

      _d = d + 1 | 0;
      _s2 = Caml_array.get(src2, i2$1);
      _i2 = i2$1;
      continue;
    }

    ;
  };

  var isortto = function (srcofs, dst, dstofs, len) {
    for (var i = 0; i < len; ++i) {
      var e = Caml_array.get(a, srcofs + i | 0);
      var j = (dstofs + i | 0) - 1 | 0;

      while (j >= dstofs && Curry._2(cmp, Caml_array.get(dst, j), e) > 0) {
        Caml_array.set(dst, j + 1 | 0, Caml_array.get(dst, j));
        j = j - 1 | 0;
      }

      ;
      Caml_array.set(dst, j + 1 | 0, e);
    }
  };

  var sortto = function (srcofs, dst, dstofs, len) {
    if (len <= 5) {
      return isortto(srcofs, dst, dstofs, len);
    }

    var l1 = len / 2 | 0;
    var l2 = len - l1 | 0;
    sortto(srcofs + l1 | 0, dst, dstofs + l1 | 0, l2);
    sortto(srcofs, a, srcofs + l2 | 0, l1);
    return merge(srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs);
  };

  var l = a.length;

  if (l <= 5) {
    return isortto(0, a, 0, l);
  }

  var l1 = l / 2 | 0;
  var l2 = l - l1 | 0;
  var t = Caml_array.make(l2, Caml_array.get(a, 0));
  sortto(l1, t, 0, l2);
  sortto(0, a, l2, l1);
  return merge(l2, l1, t, 0, l2, a, 0);
}

var create_matrix = make_matrix;
exports.create_matrix = create_matrix;
var concat = Caml_array.concat;
exports.concat = concat;
var fast_sort = stable_sort;
/* No side effect */

exports.fast_sort = fast_sort;
},{"./curry.js":"../node_modules/rescript/lib/es6/curry.js","./caml_obj.js":"../node_modules/rescript/lib/es6/caml_obj.js","./caml_array.js":"../node_modules/rescript/lib/es6/caml_array.js","./caml_exceptions.js":"../node_modules/rescript/lib/es6/caml_exceptions.js","./caml_js_exceptions.js":"../node_modules/rescript/lib/es6/caml_js_exceptions.js"}],"../node_modules/@glennsl/bs-json/src/Json_decode.bs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.id = id;
exports.bool = bool;
exports.$$float = $$float;
exports.$$int = $$int;
exports.string = string;
exports.$$char = $$char;
exports.date = date;
exports.nullable = nullable;
exports.nullAs = nullAs;
exports.array = array;
exports.list = list;
exports.pair = pair;
exports.tuple3 = tuple3;
exports.tuple4 = tuple4;
exports.dict = dict;
exports.field = field;
exports.at = at;
exports.optional = optional;
exports.oneOf = oneOf;
exports.either = either;
exports.withDefault = withDefault;
exports.map = map;
exports.andThen = andThen;
exports.tuple2 = exports.DecodeError = void 0;

var List = _interopRequireWildcard(require("rescript/lib/es6/list.js"));

var $$Array = _interopRequireWildcard(require("rescript/lib/es6/array.js"));

var Curry = _interopRequireWildcard(require("rescript/lib/es6/curry.js"));

var Js_dict = _interopRequireWildcard(require("rescript/lib/es6/js_dict.js"));

var Caml_option = _interopRequireWildcard(require("rescript/lib/es6/caml_option.js"));

var Caml_string = _interopRequireWildcard(require("rescript/lib/es6/caml_string.js"));

var Caml_exceptions = _interopRequireWildcard(require("rescript/lib/es6/caml_exceptions.js"));

var Caml_js_exceptions = _interopRequireWildcard(require("rescript/lib/es6/caml_js_exceptions.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _isInteger(value) {
  if (Number.isFinite(value)) {
    return Math.floor(value) === value;
  } else {
    return false;
  }
}

var DecodeError = /* @__PURE__ */Caml_exceptions.create("Json_decode.DecodeError");
exports.DecodeError = DecodeError;

function id(json) {
  return json;
}

function bool(json) {
  if (typeof json === "boolean") {
    return json;
  }

  throw {
    RE_EXN_ID: DecodeError,
    _1: "Expected boolean, got " + JSON.stringify(json),
    Error: new Error()
  };
}

function $$float(json) {
  if (typeof json === "number") {
    return json;
  }

  throw {
    RE_EXN_ID: DecodeError,
    _1: "Expected number, got " + JSON.stringify(json),
    Error: new Error()
  };
}

function $$int(json) {
  var f = $$float(json);

  if (_isInteger(f)) {
    return f;
  }

  throw {
    RE_EXN_ID: DecodeError,
    _1: "Expected integer, got " + JSON.stringify(json),
    Error: new Error()
  };
}

function string(json) {
  if (typeof json === "string") {
    return json;
  }

  throw {
    RE_EXN_ID: DecodeError,
    _1: "Expected string, got " + JSON.stringify(json),
    Error: new Error()
  };
}

function $$char(json) {
  var s = string(json);

  if (s.length === 1) {
    return Caml_string.get(s, 0);
  }

  throw {
    RE_EXN_ID: DecodeError,
    _1: "Expected single-character string, got " + JSON.stringify(json),
    Error: new Error()
  };
}

function date(json) {
  return new Date(string(json));
}

function nullable(decode, json) {
  if (json === null) {
    return null;
  } else {
    return Curry._1(decode, json);
  }
}

function nullAs(value, json) {
  if (json === null) {
    return value;
  }

  throw {
    RE_EXN_ID: DecodeError,
    _1: "Expected null, got " + JSON.stringify(json),
    Error: new Error()
  };
}

function array(decode, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    var target = new Array(length);

    for (var i = 0; i < length; ++i) {
      var value;

      try {
        value = Curry._1(decode, json[i]);
      } catch (raw_msg) {
        var msg = Caml_js_exceptions.internalToOCamlException(raw_msg);

        if (msg.RE_EXN_ID === DecodeError) {
          throw {
            RE_EXN_ID: DecodeError,
            _1: msg._1 + ("\n\tin array at index " + String(i)),
            Error: new Error()
          };
        }

        throw msg;
      }

      target[i] = value;
    }

    return target;
  }

  throw {
    RE_EXN_ID: DecodeError,
    _1: "Expected array, got " + JSON.stringify(json),
    Error: new Error()
  };
}

function list(decode, json) {
  return $$Array.to_list(array(decode, json));
}

function pair(decodeA, decodeB, json) {
  if (Array.isArray(json)) {
    var length = json.length;

    if (length === 2) {
      try {
        return [Curry._1(decodeA, json[0]), Curry._1(decodeB, json[1])];
      } catch (raw_msg) {
        var msg = Caml_js_exceptions.internalToOCamlException(raw_msg);

        if (msg.RE_EXN_ID === DecodeError) {
          throw {
            RE_EXN_ID: DecodeError,
            _1: msg._1 + "\n\tin pair/tuple2",
            Error: new Error()
          };
        }

        throw msg;
      }
    } else {
      throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array of length 2, got array of length " + length,
        Error: new Error()
      };
    }
  } else {
    throw {
      RE_EXN_ID: DecodeError,
      _1: "Expected array, got " + JSON.stringify(json),
      Error: new Error()
    };
  }
}

function tuple3(decodeA, decodeB, decodeC, json) {
  if (Array.isArray(json)) {
    var length = json.length;

    if (length === 3) {
      try {
        return [Curry._1(decodeA, json[0]), Curry._1(decodeB, json[1]), Curry._1(decodeC, json[2])];
      } catch (raw_msg) {
        var msg = Caml_js_exceptions.internalToOCamlException(raw_msg);

        if (msg.RE_EXN_ID === DecodeError) {
          throw {
            RE_EXN_ID: DecodeError,
            _1: msg._1 + "\n\tin tuple3",
            Error: new Error()
          };
        }

        throw msg;
      }
    } else {
      throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array of length 3, got array of length " + length,
        Error: new Error()
      };
    }
  } else {
    throw {
      RE_EXN_ID: DecodeError,
      _1: "Expected array, got " + JSON.stringify(json),
      Error: new Error()
    };
  }
}

function tuple4(decodeA, decodeB, decodeC, decodeD, json) {
  if (Array.isArray(json)) {
    var length = json.length;

    if (length === 4) {
      try {
        return [Curry._1(decodeA, json[0]), Curry._1(decodeB, json[1]), Curry._1(decodeC, json[2]), Curry._1(decodeD, json[3])];
      } catch (raw_msg) {
        var msg = Caml_js_exceptions.internalToOCamlException(raw_msg);

        if (msg.RE_EXN_ID === DecodeError) {
          throw {
            RE_EXN_ID: DecodeError,
            _1: msg._1 + "\n\tin tuple4",
            Error: new Error()
          };
        }

        throw msg;
      }
    } else {
      throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array of length 4, got array of length " + length,
        Error: new Error()
      };
    }
  } else {
    throw {
      RE_EXN_ID: DecodeError,
      _1: "Expected array, got " + JSON.stringify(json),
      Error: new Error()
    };
  }
}

function dict(decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var keys = Object.keys(json);
    var l = keys.length;
    var target = {};

    for (var i = 0; i < l; ++i) {
      var key = keys[i];
      var value;

      try {
        value = Curry._1(decode, json[key]);
      } catch (raw_msg) {
        var msg = Caml_js_exceptions.internalToOCamlException(raw_msg);

        if (msg.RE_EXN_ID === DecodeError) {
          throw {
            RE_EXN_ID: DecodeError,
            _1: msg._1 + "\n\tin dict",
            Error: new Error()
          };
        }

        throw msg;
      }

      target[key] = value;
    }

    return target;
  }

  throw {
    RE_EXN_ID: DecodeError,
    _1: "Expected object, got " + JSON.stringify(json),
    Error: new Error()
  };
}

function field(key, decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var value = Js_dict.get(json, key);

    if (value !== undefined) {
      try {
        return Curry._1(decode, Caml_option.valFromOption(value));
      } catch (raw_msg) {
        var msg = Caml_js_exceptions.internalToOCamlException(raw_msg);

        if (msg.RE_EXN_ID === DecodeError) {
          throw {
            RE_EXN_ID: DecodeError,
            _1: msg._1 + ("\n\tat field '" + (key + "'")),
            Error: new Error()
          };
        }

        throw msg;
      }
    } else {
      throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected field '" + key + "'",
        Error: new Error()
      };
    }
  } else {
    throw {
      RE_EXN_ID: DecodeError,
      _1: "Expected object, got " + JSON.stringify(json),
      Error: new Error()
    };
  }
}

function at(key_path, decoder) {
  if (key_path) {
    var rest = key_path.tl;
    var key = key_path.hd;

    if (!rest) {
      return function (param) {
        return field(key, decoder, param);
      };
    }

    var partial_arg = at(rest, decoder);
    return function (param) {
      return field(key, partial_arg, param);
    };
  }

  throw {
    RE_EXN_ID: "Invalid_argument",
    _1: "Expected key_path to contain at least one element",
    Error: new Error()
  };
}

function optional(decode, json) {
  try {
    return Caml_option.some(Curry._1(decode, json));
  } catch (raw_exn) {
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);

    if (exn.RE_EXN_ID === DecodeError) {
      return;
    }

    throw exn;
  }
}

function oneOf(decoders, json) {
  var _decoders = decoders;
  var _errors =
  /* [] */
  0;

  while (true) {
    var errors = _errors;
    var decoders$1 = _decoders;

    if (decoders$1) {
      try {
        return Curry._1(decoders$1.hd, json);
      } catch (raw_e) {
        var e = Caml_js_exceptions.internalToOCamlException(raw_e);

        if (e.RE_EXN_ID === DecodeError) {
          _errors = {
            hd: e._1,
            tl: errors
          };
          _decoders = decoders$1.tl;
          continue;
        }

        throw e;
      }
    } else {
      var revErrors = List.rev(errors);
      throw {
        RE_EXN_ID: DecodeError,
        _1: "All decoders given to oneOf failed. Here are all the errors: " + revErrors + ". And the JSON being decoded: " + JSON.stringify(json),
        Error: new Error()
      };
    }
  }

  ;
}

function either(a, b) {
  var partial_arg_1 = {
    hd: b,
    tl:
    /* [] */
    0
  };
  var partial_arg = {
    hd: a,
    tl: partial_arg_1
  };
  return function (param) {
    return oneOf(partial_arg, param);
  };
}

function withDefault($$default, decode, json) {
  try {
    return Curry._1(decode, json);
  } catch (raw_exn) {
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);

    if (exn.RE_EXN_ID === DecodeError) {
      return $$default;
    }

    throw exn;
  }
}

function map(f, decode, json) {
  return Curry._1(f, Curry._1(decode, json));
}

function andThen(b, a, json) {
  return Curry._2(b, Curry._1(a, json), json);
}

var tuple2 = pair;
/* No side effect */

exports.tuple2 = tuple2;
},{"rescript/lib/es6/list.js":"../node_modules/rescript/lib/es6/list.js","rescript/lib/es6/array.js":"../node_modules/rescript/lib/es6/array.js","rescript/lib/es6/curry.js":"../node_modules/rescript/lib/es6/curry.js","rescript/lib/es6/js_dict.js":"../node_modules/rescript/lib/es6/js_dict.js","rescript/lib/es6/caml_option.js":"../node_modules/rescript/lib/es6/caml_option.js","rescript/lib/es6/caml_string.js":"../node_modules/rescript/lib/es6/caml_string.js","rescript/lib/es6/caml_exceptions.js":"../node_modules/rescript/lib/es6/caml_exceptions.js","rescript/lib/es6/caml_js_exceptions.js":"../node_modules/rescript/lib/es6/caml_js_exceptions.js"}],"SharedTypes.bs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currencyToJs = currencyToJs;
exports.currencyFromJs = currencyFromJs;
exports.ClientApi = exports.Errors = void 0;

var Belt_Option = _interopRequireWildcard(require("rescript/lib/es6/belt_Option.js"));

var Json_decode = _interopRequireWildcard(require("@glennsl/bs-json/src/Json_decode.bs.js"));

var Caml_exceptions = _interopRequireWildcard(require("rescript/lib/es6/caml_exceptions.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
function extensionsDecoder(json) {
  return {
    code: Json_decode.field("code", function (param) {
      return Json_decode.optional(Json_decode.$$int, param);
    }, json),
    messageUser: Json_decode.field("messageUser", function (param) {
      return Json_decode.optional(Json_decode.string, param);
    }, json),
    type_: Json_decode.field("type", Json_decode.string, json)
  };
}

function locationDecoder(json) {
  return {
    column: Json_decode.field("column", function (param) {
      return Json_decode.optional(Json_decode.$$int, param);
    }, json),
    line: Json_decode.field("line", function (param) {
      return Json_decode.optional(Json_decode.$$int, param);
    }, json)
  };
}

function graphQLerrorDecoder(json) {
  return {
    message: Json_decode.field("message", Json_decode.string, json),
    locations: Belt_Option.getWithDefault(Json_decode.optional(function (param) {
      return Json_decode.field("locations", function (param) {
        return Json_decode.list(locationDecoder, param);
      }, param);
    }, json),
    /* [] */
    0),
    extensions: Json_decode.field("extensions", extensionsDecoder, json)
  };
}

var AuthenticationException = /* @__PURE__ */Caml_exceptions.create("SharedTypes.Errors.AuthenticationException");
var FetchError = /* @__PURE__ */Caml_exceptions.create("SharedTypes.Errors.FetchError");
var NotFound = /* @__PURE__ */Caml_exceptions.create("SharedTypes.Errors.NotFound");
var GraphQLError = /* @__PURE__ */Caml_exceptions.create("SharedTypes.Errors.GraphQLError");
var Errors = {
  extensionsDecoder: extensionsDecoder,
  locationDecoder: locationDecoder,
  graphQLerrorDecoder: graphQLerrorDecoder,
  AuthenticationException: AuthenticationException,
  FetchError: FetchError,
  NotFound: NotFound,
  GraphQLError: GraphQLError
};
exports.Errors = Errors;

function algoliaSearchKeyDecoder(json) {
  return {
    key: Json_decode.field("key", Json_decode.string, json),
    timeToLive: Json_decode.field("timeToLive", Json_decode.string, json)
  };
}

function algoliaSearchKeyResponseDecoder(json) {
  var decoderWithError = function decoderWithError(json) {
    return {
      data: Json_decode.field("data", function (param) {
        return Json_decode.optional(function (param) {
          return Json_decode.field("algoliaSearchKey", algoliaSearchKeyDecoder, param);
        }, param);
      }, json),
      errors: Json_decode.field("errors", function (param) {
        return Json_decode.optional(function (param) {
          return Json_decode.list(graphQLerrorDecoder, param);
        }, param);
      }, json)
    };
  };

  var decoderWithNoneError = function decoderWithNoneError(json) {
    return {
      data: Json_decode.field("data", function (param) {
        return Json_decode.optional(function (param) {
          return Json_decode.field("algoliaSearchKey", algoliaSearchKeyDecoder, param);
        }, param);
      }, json),
      errors: undefined
    };
  };

  return Json_decode.oneOf({
    hd: decoderWithError,
    tl: {
      hd: decoderWithNoneError,
      tl:
      /* [] */
      0
    }
  }, json);
}

function bidIncrementsDecoder(json) {
  return {
    from: Json_decode.field("from", Json_decode.$$int, json),
    increment: Json_decode.field("increment", Json_decode.$$int, json)
  };
}

var ClientApi = {
  algoliaSearchKeyDecoder: algoliaSearchKeyDecoder,
  algoliaSearchKeyResponseDecoder: algoliaSearchKeyResponseDecoder,
  bidIncrementsDecoder: bidIncrementsDecoder
};
exports.ClientApi = ClientApi;
var _map = {
  "EUR": "EUR",
  "USD": "USD",
  "GBP": "GBP",
  "HKD": "HKD",
  "CNY": "CNY",
  "CHF": "CHF",
  "QAR": "QAR",
  "JPY": "JPY"
};

function currencyToJs(param) {
  return param;
}

function currencyFromJs(param) {
  return _map[param];
}
/* No side effect */
},{"rescript/lib/es6/belt_Option.js":"../node_modules/rescript/lib/es6/belt_Option.js","@glennsl/bs-json/src/Json_decode.bs.js":"../node_modules/@glennsl/bs-json/src/Json_decode.bs.js","rescript/lib/es6/caml_exceptions.js":"../node_modules/rescript/lib/es6/caml_exceptions.js"}],"GraphQLFetchClient.bs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeQueryHeaders = makeQueryHeaders;
exports.makeQueryBody = makeQueryBody;
exports.rawJson = rawJson;
exports.parseResponseJson = parseResponseJson;
exports.MakeQuery = MakeQuery;

var Curry = _interopRequireWildcard(require("rescript/lib/es6/curry.js"));

var Fetch = _interopRequireWildcard(require("bs-fetch/src/Fetch.bs.js"));

var Js_dict = _interopRequireWildcard(require("rescript/lib/es6/js_dict.js"));

var Belt_List = _interopRequireWildcard(require("rescript/lib/es6/belt_List.js"));

var Belt_Array = _interopRequireWildcard(require("rescript/lib/es6/belt_Array.js"));

var Belt_Option = _interopRequireWildcard(require("rescript/lib/es6/belt_Option.js"));

var Caml_option = _interopRequireWildcard(require("rescript/lib/es6/caml_option.js"));

var Json_decode = _interopRequireWildcard(require("@glennsl/bs-json/src/Json_decode.bs.js"));

var SharedTypes = _interopRequireWildcard(require("./SharedTypes.bs.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
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
  return JSON.stringify(Js_dict.fromList(Belt_List.concatMany([{
    hd: ["query", query],
    tl:
    /* [] */
    0
  }, Belt_Option.mapWithDefault(maybeVariables,
  /* [] */
  0, function (variables) {
    return {
      hd: ["variables", variables],
      tl:
      /* [] */
      0
    };
  }), Belt_Option.mapWithDefault(maybeOperationName,
  /* [] */
  0, function (operationName) {
    return {
      hd: ["operationName", operationName],
      tl:
      /* [] */
      0
    };
  })])));
}

function rawJson(json) {
  return json;
}

function parseResponseJson(json) {
  return {
    data: Belt_Option.flatMap(Json_decode.optional(function (param) {
      return Json_decode.field("data", function (param) {
        return Json_decode.nullable(rawJson, param);
      }, param);
    }, json), function (prim) {
      if (prim === null) {
        return;
      } else {
        return Caml_option.some(prim);
      }
    }),
    errors: Json_decode.optional(function (param) {
      return Json_decode.field("errors", function (param) {
        return Json_decode.array(rawJson, param);
      }, param);
    }, json)
  };
}

function MakeQuery(T) {
  var makeClient = function makeClient(maybeAccessToken, maybeVariables, maybeOperationName) {
    return fetch(Curry._1(T.graphQLUrl, undefined), Fetch.RequestInit.make(
    /* Post */
    2, Caml_option.some(makeQueryHeaders(maybeAccessToken)), Caml_option.some(makeQueryBody(Caml_option.some(maybeVariables), Caml_option.some(maybeOperationName), T.Query.query)), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(undefined));
  };

  var parse = function parse(responseJson) {
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
                locations:
                /* [] */
                0,
                extensions: {
                  code: undefined,
                  messageUser: undefined,
                  type_: ""
                }
              },
              tl:
              /* [] */
              0
            }
          };
        }
      }

      var data = Caml_option.valFromOption(match);

      if (match$1 !== undefined) {
        return {
          NAME: "DataWithError",
          VAL: [Curry._1(T.Query.parse, data), Belt_List.fromArray(Belt_Array.map(match$1, SharedTypes.Errors.graphQLerrorDecoder))]
        };
      } else {
        return {
          NAME: "Data",
          VAL: Curry._1(T.Query.parse, data)
        };
      }
    } catch (exn) {
      return {
        NAME: "Error",
        VAL: {
          hd: {
            message: "Could not parse data",
            locations:
            /* [] */
            0,
            extensions: {
              code: undefined,
              messageUser: undefined,
              type_: ""
            }
          },
          tl:
          /* [] */
          0
        }
      };
    }
  };

  var queryAndParse = function queryAndParse(token, variables, operationName, param) {
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
/* No side effect */
},{"rescript/lib/es6/curry.js":"../node_modules/rescript/lib/es6/curry.js","bs-fetch/src/Fetch.bs.js":"../node_modules/bs-fetch/src/Fetch.bs.js","rescript/lib/es6/js_dict.js":"../node_modules/rescript/lib/es6/js_dict.js","rescript/lib/es6/belt_List.js":"../node_modules/rescript/lib/es6/belt_List.js","rescript/lib/es6/belt_Array.js":"../node_modules/rescript/lib/es6/belt_Array.js","rescript/lib/es6/belt_Option.js":"../node_modules/rescript/lib/es6/belt_Option.js","rescript/lib/es6/caml_option.js":"../node_modules/rescript/lib/es6/caml_option.js","@glennsl/bs-json/src/Json_decode.bs.js":"../node_modules/@glennsl/bs-json/src/Json_decode.bs.js","./SharedTypes.bs.js":"SharedTypes.bs.js"}],"TestQuery.bs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Test = void 0;

var BaseClient = _interopRequireWildcard(require("./BaseClient.bs.js"));

var GraphQLFetchClient = _interopRequireWildcard(require("./GraphQLFetchClient.bs.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
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

function serializeVariables(param) {}

function makeVariables(param) {}

function makeDefaultVariables(param) {}

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
  parse: parse,
  toJson: function toJson(prim) {
    return prim;
  }
}));
var Test = {
  MakeQuery: MakeQuery,
  Query: Query
};
/* Query Not a pure module */

exports.Test = Test;
},{"./BaseClient.bs.js":"BaseClient.bs.js","./GraphQLFetchClient.bs.js":"GraphQLFetchClient.bs.js"}],"Demo.bs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchTest = fetchTest;

var Curry = _interopRequireWildcard(require("rescript/lib/es6/curry.js"));

var TestQuery = _interopRequireWildcard(require("./TestQuery.bs.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
function fetchTest(param) {
  return Curry._4(TestQuery.Test.Query.queryAndParse, undefined, undefined, undefined, undefined);
}

fetchTest(undefined).then(function (response) {
  console.log("response", response);
  return Promise.resolve(undefined);
});
/*  Not a pure module */
},{"rescript/lib/es6/curry.js":"../node_modules/rescript/lib/es6/curry.js","./TestQuery.bs.js":"TestQuery.bs.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51661" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Demo.bs.js"], null)
//# sourceMappingURL=/Demo.bs.82380004.js.map