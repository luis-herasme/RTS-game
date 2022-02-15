// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8wcER":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"h7u1C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _constants = require("./constants");
var _gameManager = require("./GameManager");
var _gameManagerDefault = parcelHelpers.interopDefault(_gameManager);
var _player = require("./Player");
var _playerDefault = parcelHelpers.interopDefault(_player);
// Creating player
const player = new _playerDefault.default("Luis", "rgba(255, 0, 0, 0.5)");
const gameManager = new _gameManagerDefault.default(_constants.MAP, player);
gameManager.start();

},{"./Player":"8YLWx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./constants":"45DZp","./GameManager":"lR2uF"}],"8YLWx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Player {
    constructor(name, color){
        this.name = name;
        this.color = color;
        this.blocks = [];
    }
    removeBlock(block) {
        const idx = this.blocks.indexOf(block);
        if (idx > -1) this.blocks.splice(idx, 1);
        else console.error("Block not found");
    }
    conquerBlock(block) {
        if (block.canBeConquer) {
            block.owner = this;
            this.blocks.push(block);
        }
    }
}
exports.default = Player;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"45DZp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TILEMAP", ()=>TILEMAP
);
parcelHelpers.export(exports, "BLOCK_LINE_WIDTH", ()=>BLOCK_LINE_WIDTH
);
parcelHelpers.export(exports, "FORCE", ()=>FORCE
);
parcelHelpers.export(exports, "BLOCK_DEFAULT_SIZE", ()=>BLOCK_DEFAULT_SIZE
);
parcelHelpers.export(exports, "TILE_SIZE", ()=>TILE_SIZE
);
parcelHelpers.export(exports, "SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP", ()=>SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP
);
parcelHelpers.export(exports, "Visibility", ()=>Visibility
);
parcelHelpers.export(exports, "MAP", ()=>MAP
);
var _vector = require("./Vector");
var _vectorDefault = parcelHelpers.interopDefault(_vector);
// Loading sprites
const tilemapSource = require("../public/tilemap-separated.png");
const TILEMAP = new Image();
TILEMAP.src = tilemapSource;
const BLOCK_LINE_WIDTH = 2;
const FORCE = 20;
const BLOCK_DEFAULT_SIZE = 100;
const TILE_SIZE = 16;
const SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP = {
    "W": new _vectorDefault.default(6, 4),
    "WBL": new _vectorDefault.default(0, 4),
    "WBR": new _vectorDefault.default(4, 4),
    "WB": new _vectorDefault.default(2, 4),
    "WL": new _vectorDefault.default(0, 2),
    "WR": new _vectorDefault.default(4, 2),
    "H": new _vectorDefault.default(19, 9),
    "H_L2": new _vectorDefault.default(18, 9),
    "T": new _vectorDefault.default(2, 2),
    "WT": new _vectorDefault.default(2, 0),
    "WTL": new _vectorDefault.default(0, 0),
    "WTR": new _vectorDefault.default(4, 0),
    "TREES": new _vectorDefault.default(10, 0),
    "TREES_L2": new _vectorDefault.default(10, 2),
    "TOWER_LEVEL_1": new _vectorDefault.default(13, 9),
    "TOWER_LEVEL_1_L2": new _vectorDefault.default(12, 9),
    "TOWER_LEVEL_2": new _vectorDefault.default(13, 11),
    "TOWER_LEVEL_2_L2": new _vectorDefault.default(12, 11),
    "TOWER_LEVEL_3": new _vectorDefault.default(13, 13),
    "TOWER_LEVEL_3_L2": new _vectorDefault.default(12, 13),
    "MOUNTAIN": new _vectorDefault.default(12, 0),
    "SHIP": new _vectorDefault.default(2, 4),
    "SHIP_L2": new _vectorDefault.default(15, 11),
    "BOAT_UP": new _vectorDefault.default(6, 4),
    "BOAT_DOWN": new _vectorDefault.default(6, 4),
    "BOAT_LEFT": new _vectorDefault.default(6, 4),
    "BOAT_RIGHT": new _vectorDefault.default(6, 4),
    "BOAT_UP_L2": new _vectorDefault.default(14, 7),
    "BOAT_DOWN_L2": new _vectorDefault.default(18, 7),
    "BOAT_LEFT_L2": new _vectorDefault.default(12, 7),
    "BOAT_RIGHT_L2": new _vectorDefault.default(16, 7),
    "SHADOW": new _vectorDefault.default(0, 5)
};
let Visibility;
(function(Visibility1) {
    Visibility1[Visibility1["hidden"] = 0] = "hidden";
    Visibility1[Visibility1["visible"] = 1] = "visible";
})(Visibility || (Visibility = {
}));
const MAP = [
    [
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W"
    ],
    [
        "W",
        "WTL",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WTR",
        "W",
        "W",
        "W",
        "WTL",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WTR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "T",
        "MOUNTAIN",
        "T",
        "T",
        "T",
        "T",
        "TOWER_LEVEL_3",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "T",
        "MOUNTAIN",
        "T",
        "T",
        "T",
        "T",
        "TOWER_LEVEL_3",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "T",
        "T",
        "H",
        "TREES",
        "TREES",
        "T",
        "T",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "T",
        "T",
        "H",
        "TREES",
        "TREES",
        "T",
        "T",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "TREES",
        "T",
        "T",
        "T",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "TREES",
        "T",
        "T",
        "T",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "T",
        "MOUNTAIN",
        "MOUNTAIN",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "T",
        "MOUNTAIN",
        "MOUNTAIN",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "MOUNTAIN",
        "T",
        "T",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "MOUNTAIN",
        "T",
        "T",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WBL",
        "WB",
        "SHIP",
        "WB",
        "WB",
        "WB",
        "WB",
        "WB",
        "WBR",
        "W",
        "W",
        "W",
        "WBL",
        "WB",
        "SHIP",
        "WB",
        "WB",
        "WB",
        "WB",
        "WB",
        "WBR",
        "W",
        "W"
    ],
    [
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W"
    ],
    [
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W"
    ],
    [
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W"
    ],
    [
        "W",
        "WTL",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WTR",
        "W",
        "W",
        "W",
        "WTL",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WT",
        "WTR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "T",
        "MOUNTAIN",
        "T",
        "T",
        "T",
        "T",
        "TOWER_LEVEL_3",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "T",
        "MOUNTAIN",
        "T",
        "T",
        "T",
        "T",
        "TOWER_LEVEL_3",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "T",
        "T",
        "H",
        "TREES",
        "TREES",
        "T",
        "T",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "T",
        "T",
        "H",
        "TREES",
        "TREES",
        "T",
        "T",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "TREES",
        "T",
        "T",
        "T",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "TREES",
        "T",
        "T",
        "T",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "T",
        "MOUNTAIN",
        "MOUNTAIN",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "T",
        "MOUNTAIN",
        "MOUNTAIN",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "MOUNTAIN",
        "T",
        "T",
        "WR",
        "W",
        "W",
        "W",
        "WL",
        "TOWER_LEVEL_1",
        "T",
        "T",
        "T",
        "MOUNTAIN",
        "T",
        "T",
        "WR",
        "W",
        "W"
    ],
    [
        "W",
        "WBL",
        "WB",
        "SHIP",
        "WB",
        "WB",
        "WB",
        "WB",
        "WB",
        "WBR",
        "W",
        "W",
        "W",
        "WBL",
        "WB",
        "SHIP",
        "WB",
        "WB",
        "WB",
        "WB",
        "WB",
        "WBR",
        "W",
        "W"
    ],
    [
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W"
    ],
    [
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W",
        "W"
    ], 
];

},{"./Vector":"ebDaq","../public/tilemap-separated.png":"24dkT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ebDaq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Vector {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    static mult(scalar, v) {
        return new Vector(scalar * v.x, scalar * v.y);
    }
    add(v) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }
    mult(scalar) {
        this.x = scalar * this.x;
        this.y = scalar * this.y;
    }
    zero() {
        this.x = 0;
        this.y = 0;
    }
}
exports.default = Vector;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"24dkT":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('7UhFu') + "tilemap-separated.3394c8b8.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {
};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"lR2uF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _camera = require("./Camera");
var _cameraDefault = parcelHelpers.interopDefault(_camera);
var _canvasManager = require("./CanvasManager");
var _canvasManagerDefault = parcelHelpers.interopDefault(_canvasManager);
var _cursor = require("./Cursor");
var _cursorDefault = parcelHelpers.interopDefault(_cursor);
var _scene = require("./Scene");
var _sceneDefault = parcelHelpers.interopDefault(_scene);
var _vector = require("./Vector");
var _vectorDefault = parcelHelpers.interopDefault(_vector);
class GameManager {
    constructor(map, player){
        // Creates canvas
        this.canvasManager = new _canvasManagerDefault.default();
        this.scene = new _sceneDefault.default(this.canvasManager.context, map);
        this.player = player;
        this.camera = new _cameraDefault.default(this.scene.map);
        this.cursor = new _cursorDefault.default(this.canvasManager.context, this.scene.map, this.player);
        // Initial player position
        this.scene.map[3][4].population = 1;
        this.player.conquerBlock(this.scene.map[3][4]);
        // Events
        this.startListeningToOnBlockClick();
    }
    start() {
        window.onload = ()=>{
            const population = document.getElementById("population");
            const levelUp = document.getElementById("levelUp");
            population.innerText = "Population: 0";
            setInterval(()=>{
                if (this.cursor.blockSelected) {
                    if (this.cursor.blockSelected.level !== undefined) {
                        if (this.cursor.blockSelected.owner && this.cursor.blockSelected.level < 3 && this.cursor.blockSelected.population > 10 * this.cursor.blockSelected.level + 10) levelUp.style.visibility = "visible";
                        else levelUp.style.visibility = "hidden";
                    } else levelUp.style.visibility = "hidden";
                } else levelUp.style.visibility = "hidden";
            }, 100);
            levelUp.onclick = ()=>{
                if (this.cursor.blockSelected) {
                    if (this.cursor.blockSelected.level !== undefined) {
                        if (this.cursor.blockSelected.owner) {
                            if (this.cursor.blockSelected.level == 3) console.log("You are in the max level");
                            else if (this.cursor.blockSelected.population > 10 * this.cursor.blockSelected.level + 10) {
                                this.cursor.blockSelected.population = this.cursor.blockSelected.population - (10 * this.cursor.blockSelected.level + 10);
                                this.cursor.blockSelected.level = this.cursor.blockSelected.level + 1;
                            } else console.log("You need more than: ", 10 * this.cursor.blockSelected.level + 10, " units in this block.");
                        }
                    }
                }
            };
            // Increase population by one each 3 seconds 
            setInterval(()=>{
                let totalPopulation = 0;
                this.scene.eachBlock((block)=>{
                    if (block.ship) block.population = block.population - 1;
                    else if (block._owner !== undefined && block.level != undefined) {
                        block.population = block.population + (block.level + 1);
                        totalPopulation += block.population;
                    }
                });
                population.innerText = `Population: ${totalPopulation}`;
            }, 1000);
            setInterval(()=>{
                this.scene.eachBlock((block)=>{
                    if (block._owner !== undefined) block.population = block.population + 1;
                    if (block.ship) block.population = block.population - 1;
                });
            }, 100);
        };
        requestAnimationFrame(()=>this.update()
        );
    }
    // Events
    startListeningToOnBlockClick() {
        document.addEventListener("click", (e)=>{
            const mousePosition = new _vectorDefault.default(e.clientX, e.clientY);
            this.scene.map.forEach((x)=>{
                x.forEach((block)=>{
                    if (mousePosition.x > block.positionRelativeToCamera.x && mousePosition.x < block.positionRelativeToCamera.x + block.size.x && mousePosition.y > block.positionRelativeToCamera.y && mousePosition.y < block.positionRelativeToCamera.y + block.size.y) block.onClick(this.cursor);
                });
            });
        });
    }
    update() {
        this.scene.update();
        this.cursor.update();
        this.camera.update();
        requestAnimationFrame(()=>this.update()
        );
    }
}
exports.default = GameManager;

},{"./Camera":"k3m5x","./CanvasManager":"2CezV","./Cursor":"keOFH","./Scene":"3E7xP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./Vector":"ebDaq"}],"k3m5x":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("./constants");
var _vector = require("./Vector");
var _vectorDefault = parcelHelpers.interopDefault(_vector);
class Camera {
    constructor(map){
        this._position = new _vectorDefault.default(0, 0);
        this.velocity = new _vectorDefault.default(0, 0);
        this.acceleration = new _vectorDefault.default(0, 0);
        this.inertia = 1;
        this.friction = 0.9;
        this.map = map;
        this.startCameraMovementEvent();
    }
    get position() {
        return this._position;
    }
    set position(newPosition) {
        this._position = newPosition;
        this._position.x = Math.round(this._position.x);
        this._position.y = Math.round(this._position.y);
        this.map.forEach((x)=>{
            x.forEach((block)=>{
                block.positionRelativeToCamera = _vectorDefault.default.add(block.position, this._position);
            });
        });
    }
    addForce(force) {
        this.acceleration.add(_vectorDefault.default.mult(1 / this.inertia, force));
    }
    update() {
        this.position = _vectorDefault.default.add(this.position, this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.mult(this.friction);
        this.acceleration.zero();
    }
    startCameraMovementEvent() {
        document.addEventListener("keydown", (e)=>{
            const key = e.key.toLocaleLowerCase();
            if (key === 'w') this.addForce(new _vectorDefault.default(0, _constants.FORCE));
            else if (key === 's') this.addForce(new _vectorDefault.default(0, -_constants.FORCE));
            else if (key === 'd') this.addForce(new _vectorDefault.default(-_constants.FORCE, 0));
            else if (key === 'a') this.addForce(new _vectorDefault.default(_constants.FORCE, 0));
        });
    }
}
exports.default = Camera;

},{"./constants":"45DZp","./Vector":"ebDaq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2CezV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class CanvasManager {
    constructor(){
        this._canvas = document.createElement("canvas");
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        document.body.appendChild(this._canvas);
        this.context = this._canvas.getContext("2d", {
            alpha: false
        });
        // To make the pixel art no look blurry
        this.context.imageSmoothingEnabled = false;
        this.updateCanvasSizeOnWindowResize();
    }
    updateCanvasSizeOnWindowResize() {
        window.addEventListener("resize", ()=>{
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            // To make the pixel art no look blurry
            this.context.imageSmoothingEnabled = false;
        });
    }
}
exports.default = CanvasManager;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"keOFH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("./constants");
var _renderable = require("./Renderable");
var _renderableDefault = parcelHelpers.interopDefault(_renderable);
var _vector = require("./Vector");
var _vectorDefault = parcelHelpers.interopDefault(_vector);
class Cursor extends _renderableDefault.default {
    constructor(context, map, player){
        super(new _vectorDefault.default(0, 0), new _vectorDefault.default(_constants.BLOCK_DEFAULT_SIZE, _constants.BLOCK_DEFAULT_SIZE));
        this.canGoOnWater = false;
        this._blockSelected = null;
        this.context = context;
        this.tilemap = _constants.TILEMAP;
        this.map = map;
        this.player = player;
        this.startListeningToKeyboardEvents();
    }
    get blockSelected() {
        return this._blockSelected;
    }
    set blockSelected(value) {
        // Hiding previous block surroundings if it was a boat
        if (this._blockSelected !== null) {
            if (this._blockSelected.type[0] == "W") {
                if (this.canGoOnWater) this._blockSelected.setVisibility(_constants.Visibility.hidden);
            }
        }
        this._blockSelected = value;
        if (this._blockSelected !== null) {
            if (this._blockSelected.border == false) {
                if (this._blockSelected.owner == this.player) this._blockSelected.setVisibility(_constants.Visibility.visible);
                if (this._blockSelected.owner == this.player && (this._blockSelected.type == "SHIP" || this._blockSelected.type == "BOAT_LEFT")) this.canGoOnWater = true;
                else if (this._blockSelected.type[0] != "W") this.canGoOnWater = false;
                if (this.canGoOnWater) this._blockSelected.setVisibility(_constants.Visibility.visible);
            }
        }
    }
    saveSelectedUnitsInShip(player) {
        if (this.blockSelected !== null) {
            this.blockSelected.ship = true;
            this.blockSelected.canBeConquer = true;
            player.conquerBlock(this.blockSelected);
            this.canGoOnWater = false;
            this._blockSelected.setVisibility(_constants.Visibility.visible);
        }
    }
    move(newBlock, prevBlock) {
        // If you are not the owner of the new block
        if (newBlock.owner !== this.player) {
            // If your poplation is greater you can conquer
            if (prevBlock.population - 1 > newBlock.population) {
                newBlock.population = prevBlock.population - 1 - newBlock.population;
                this.player.conquerBlock(newBlock);
                this.blockSelected = newBlock;
            } else {
                newBlock.population = newBlock.population - (prevBlock.population - 1);
                this.blockSelected = newBlock;
            }
        } else {
            newBlock.population = prevBlock.population - 1 + newBlock.population;
            this.blockSelected = newBlock;
        }
        if (prevBlock.ship) {
            prevBlock.population = 0;
            newBlock.population = newBlock.population + 1;
            newBlock.setVisibility(_constants.Visibility.visible);
        } else prevBlock.population = 1;
    }
    startListeningToKeyboardEvents() {
        document.addEventListener("keydown", (e)=>{
            const key = e.key.toLocaleLowerCase();
            if (this.blockSelected !== null) {
                const blockSelected = this.blockSelected;
                const x = blockSelected.x;
                const y = blockSelected.y;
                if (key === 'arrowup') {
                    if (this.map[y - 1][x].border) return 0;
                } else if (key === 'arrowdown') {
                    if (this.map[y + 1][x].border) return 0;
                } else if (key === 'arrowright') {
                    if (this.map[y][x + 1].border) return 0;
                } else if (key === 'arrowleft') {
                    if (this.map[y][x - 1].border) return 0;
                }
                if (blockSelected.population > 1 && blockSelected.owner == this.player || this.canGoOnWater) {
                    if (key === 'arrowup') {
                        if (this.map[y - 1][x].canBeConquer || (this.map[y - 1][x].type[0] == "W" || this.map[y - 1][x].type == "BOAT_LEFT") && this.canGoOnWater) {
                            const newBlock = this.map[y - 1][x];
                            this.move(newBlock, blockSelected);
                        }
                    } else if (key === 'arrowdown') {
                        if (this.map[y + 1][x].canBeConquer || (this.map[y + 1][x].type[0] == "W" || this.map[y + 1][x].type == "BOAT_LEFT") && this.canGoOnWater) {
                            const newBlock = this.map[y + 1][x];
                            this.move(newBlock, blockSelected);
                        }
                    } else if (key === 'arrowright') {
                        if (this.map[y][x + 1].canBeConquer || (this.map[y][x + 1].type[0] == "W" || this.map[y][x + 1].type == "BOAT_LEFT") && this.canGoOnWater) {
                            const newBlock = this.map[y][x + 1];
                            this.move(newBlock, blockSelected);
                        }
                    } else if (key === 'arrowleft') {
                        if (this.map[y][x - 1].canBeConquer || (this.map[y][x - 1].type[0] == "W" || this.map[y][x - 1].type == "BOAT_LEFT") && this.canGoOnWater) {
                            const newBlock = this.map[y][x - 1];
                            this.move(newBlock, blockSelected);
                        }
                    }
                } else {
                    if (key === 'arrowup') this.blockSelected = this.map[y - 1][x];
                    else if (key === 'arrowdown') this.blockSelected = this.map[y + 1][x];
                    else if (key === 'arrowright') this.blockSelected = this.map[y][x + 1];
                    else if (key === 'arrowleft') this.blockSelected = this.map[y][x - 1];
                }
            }
        });
    }
    update() {
        if (this.blockSelected !== null) {
            if (this.canGoOnWater && this.blockSelected.population == 0) {
                this.blockSelected.setVisibility(_constants.Visibility.hidden);
                this.canGoOnWater = false;
            // this.blockSelected = null
            }
        }
        this.renderSelectedBlock();
    }
    renderSelectedBlock() {
        if (this.blockSelected !== null) {
            this.positionRelativeToCamera = this.blockSelected.positionRelativeToCamera;
            this.drawTile(this.context, "SHADOW");
            if (this.canGoOnWater) {
                this.drawTile(this.context, "BOAT_LEFT_L2");
                this.drawText(this.context, String(this.blockSelected.population));
            }
        }
    }
}
exports.default = Cursor;

},{"./constants":"45DZp","./Renderable":"boglS","./Vector":"ebDaq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"boglS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("./constants");
class Renderable {
    constructor(positionRelativeToCamera, size){
        this.color = "";
        this.positionRelativeToCamera = positionRelativeToCamera;
        this._size = size;
        this.tilemap = _constants.TILEMAP;
    }
    get size() {
        return this._size;
    }
    drawTile(context, type) {
        context.beginPath();
        context.drawImage(this.tilemap, _constants.SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP[type].x * _constants.TILE_SIZE, _constants.SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP[type].y * _constants.TILE_SIZE, _constants.TILE_SIZE, _constants.TILE_SIZE, this.positionRelativeToCamera.x, this.positionRelativeToCamera.y, this._size.x, this._size.y);
    }
    drawText(context, text) {
        context.beginPath();
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#333";
        context.lineWidth = 7;
        context.font = "20px 'Press Start 2P'";
        context.strokeText(String(text), this.positionRelativeToCamera.x + this._size.x / 2 - 30, this.positionRelativeToCamera.y + this._size.y / 2 - 20);
        context.font = "20px 'Press Start 2P'";
        context.fillText(String(text), this.positionRelativeToCamera.x + this._size.x / 2 - 30, this.positionRelativeToCamera.y + this._size.y / 2 - 20);
    }
    drawRect(context, stroke, fillColor = null) {
        if (fillColor == null) fillColor = this.color;
        context.beginPath();
        if (stroke) {
            context.strokeStyle = "rgba(255, 255, 255, 0.2)";
            context.lineWidth = _constants.BLOCK_LINE_WIDTH;
        } else context.fillStyle = fillColor;
        context.rect(this.positionRelativeToCamera.x, this.positionRelativeToCamera.y, this._size.x, this._size.y);
        if (stroke) context.stroke();
        else context.fill();
    }
}
exports.default = Renderable;

},{"./constants":"45DZp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3E7xP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _block = require("./Block");
var _blockDefault = parcelHelpers.interopDefault(_block);
var _vector = require("./Vector");
var _vectorDefault = parcelHelpers.interopDefault(_vector);
var _constants = require("./constants");
var _settlement = require("./Settlement");
var _settlementDefault = parcelHelpers.interopDefault(_settlement);
function generateMapMatrix(mapSize) {
    const map = [];
    for(let y = 0; y < mapSize; y++){
        map[y] = [];
        for(let x = 0; x < mapSize; x++)map[y][x] = null;
    }
    return map;
}
class Scene {
    constructor(context, map){
        this.context = context;
        this.loadMap(map);
    }
    add(block, x, y) {
        block.map = this.map;
        this.map[y][x] = block;
    }
    update() {
        this.render();
    }
    eachBlock(fn) {
        this.map.forEach((mapRow)=>{
            mapRow.forEach((block)=>{
                fn(block);
            });
        });
    }
    loadMap(map) {
        this.map = generateMapMatrix(map.length);
        for(let y = 0; y < map.length; y++)for(let x = 0; x < map.length; x++){
            const size = new _vectorDefault.default(_constants.BLOCK_DEFAULT_SIZE + 1, _constants.BLOCK_DEFAULT_SIZE + 1);
            const position = new _vectorDefault.default(x * _constants.BLOCK_DEFAULT_SIZE, y * _constants.BLOCK_DEFAULT_SIZE);
            const block = new _blockDefault.default(position, size, x, y, map[y][x]);
            if (x == 0 || x == map.length - 1 || y == 0 || y == map.length - 1) block.border = true;
            if (map[y][x].includes("TOWER_LEVEL_") || map[y][x] == "H") {
                const settlement = new _settlementDefault.default(position, size, x, y, map[y][x]);
                if (x == 0 || x == map.length - 1 || y == 0 || y == map.length - 1) settlement.border = true;
                if (map[y][x] === "H") {
                    settlement.population = 5;
                    settlement.level = 0;
                } else if (map[y][x] === "TOWER_LEVEL_1") {
                    settlement.population = 10;
                    settlement.level = 1;
                } else if (map[y][x] === "TOWER_LEVEL_3") {
                    settlement.population = 100;
                    settlement.level = 3;
                }
                this.add(settlement, x, y);
            } else {
                if (map[y][x][0] == "W") block.canBeConquer = false;
                if (map[y][x] == "SHIP") {
                    block.population = 2;
                    block.canBeConquer = true;
                } else if (map[y][x] === "MOUNTAIN") block.canBeConquer = false;
                this.add(block, x, y);
            }
        }
    }
    // Renderization
    render() {
        this.clear();
        this.map.forEach((x)=>{
            x.forEach((block)=>{
                block.render(this.context);
            });
        });
    }
    clear() {
        this.context.beginPath();
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
}
exports.default = Scene;

},{"./Block":"hPpOk","./Vector":"ebDaq","./constants":"45DZp","./Settlement":"guSgX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hPpOk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("./constants");
var _renderable = require("./Renderable");
var _renderableDefault = parcelHelpers.interopDefault(_renderable);
class Block extends _renderableDefault.default {
    constructor(position, size, x, y, type){
        super(position, size);
        // Visibility
        this.seen = false;
        this.typeSeen = "";
        this.nextToPlayer = false;
        // Conquer block
        this.canBeConquer = true;
        this.border = false;
        this._population = 0;
        this.ship = false;
        this._x = x;
        this._y = y;
        this._position = position;
        this.type = type;
        this._visibility = _constants.Visibility.hidden;
    }
    get visibility() {
        return this._visibility;
    }
    set visibility(value) {
        if (value == _constants.Visibility.visible) {
            this.seen = true;
            this.typeSeen = this.type;
        }
        if (this._owner) {
            this._visibility = _constants.Visibility.visible;
            if (value == _constants.Visibility.hidden) console.warn("Owned blocks cannot be hidden");
        } else if (this.nextToPlayer) {
            this._visibility = _constants.Visibility.visible;
            if (value == _constants.Visibility.hidden) console.warn("Blocks next to a player cannot be hidden");
        } else this._visibility = value;
    }
    get population() {
        return this._population;
    }
    set population(value) {
        if (this.ship && value <= 1) {
            this.canBeConquer = false;
            this._owner = undefined;
            this.color = "";
            this.ship = false;
            this.setNextToPlayer(false);
            this.setVisibility(_constants.Visibility.hidden);
        }
        this._population = value;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get position() {
        return this._position;
    }
    get owner() {
        return this._owner;
    }
    set owner(value) {
        if (this._owner !== undefined) this._owner.removeBlock(this);
        this._owner = value;
        this.color = this._owner.color;
        this.setVisibility(_constants.Visibility.visible);
        this.setNextToPlayer(true);
    }
    setNextToPlayer(value) {
        this.nextToPlayer = value;
        this.map[this.y][this.x + 1].nextToPlayer = value;
        this.map[this.y][this.x - 1].nextToPlayer = value;
        this.map[this.y + 1][this.x].nextToPlayer = value;
        this.map[this.y - 1][this.x].nextToPlayer = value;
        this.map[this.y + 1][this.x + 1].nextToPlayer = value;
        this.map[this.y + 1][this.x - 1].nextToPlayer = value;
        this.map[this.y - 1][this.x + 1].nextToPlayer = value;
        this.map[this.y - 1][this.x - 1].nextToPlayer = value;
    }
    setVisibility(visibility) {
        this.visibility = visibility;
        this.map[this.y][this.x + 1].visibility = visibility;
        this.map[this.y][this.x - 1].visibility = visibility;
        this.map[this.y + 1][this.x].visibility = visibility;
        this.map[this.y - 1][this.x].visibility = visibility;
        this.map[this.y + 1][this.x + 1].visibility = visibility;
        this.map[this.y + 1][this.x - 1].visibility = visibility;
        this.map[this.y - 1][this.x + 1].visibility = visibility;
        this.map[this.y - 1][this.x - 1].visibility = visibility;
    }
    drawFog(context) {
        if (this.seen) // Translucid fog
        this.drawRect(context, false, "rgba(0,0,0, 0.7)");
        else // Fog
        this.drawRect(context, false, "rgb(17, 17, 17)");
    }
    onClick(cursor) {
        if (this.owner) {
            if (cursor.canGoOnWater) cursor.saveSelectedUnitsInShip(this.owner);
            cursor.blockSelected = this;
        }
    }
    render(context) {
        if (this.visibility == _constants.Visibility.hidden) {
            // If this tile has been seen draw a block 
            if (this.seen) {
                this.drawTile(context, this.typeSeen);
                if (_constants.SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP[this.typeSeen + "_L2"]) this.drawTile(context, this.typeSeen + "_L2");
            }
            // Draw fog, if it's a block that has been seenm, the fog will be translucid
            this.drawFog(context);
        } else {
            // Draw the sprite of this block type
            this.drawTile(context, this.type);
            // If the block has a owner draw a rect with the owner color
            if (this.owner) this.drawRect(context, false);
            if (_constants.SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP[this.type + "_L2"]) this.drawTile(context, this.type + "_L2");
            if (this.ship) this.drawTile(context, "BOAT_LEFT_L2");
            if (this.canBeConquer && this.population !== 0) this.drawText(context, String(this.population));
            // Draw tile border
            this.drawRect(context, true);
        }
    }
}
exports.default = Block;

},{"./constants":"45DZp","./Renderable":"boglS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"guSgX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _block = require("./Block");
var _blockDefault = parcelHelpers.interopDefault(_block);
class Settlement extends _blockDefault.default {
    constructor(position, size, x, y, type){
        super(position, size, x, y, type);
        this._level = 0;
    }
    get level() {
        return this._level;
    }
    set level(value) {
        const prev_level = this._level;
        this._level = value;
        if (value == 0) this.type = "H";
        else if (value == 1) this.type = "TOWER_LEVEL_1";
        else if (value == 2) this.type = "TOWER_LEVEL_2";
        else if (value == 3) this.type = "TOWER_LEVEL_3";
        else {
            console.error(`Level ${value} is not supported.`);
            this._level = prev_level;
        }
    }
}
exports.default = Settlement;

},{"./Block":"hPpOk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["8wcER","h7u1C"], "h7u1C", "parcelRequire86ed")

//# sourceMappingURL=index.b71e74eb.js.map
