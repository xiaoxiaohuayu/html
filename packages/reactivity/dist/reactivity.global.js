var VueReactivity = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/reactivity/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    HaoReactive: () => reactive,
    effect: () => effect
  });

  // packages/reactivity/src/effect.ts
  function effect() {
  }

  // packages/shared/src/index.ts
  var isObject = (value) => {
    return typeof value === "object" && value !== null;
  };

  // packages/reactivity/src/reactive.ts
  function reactive(target) {
    if (!isObject(target)) {
      return;
    }
    const proxy = new Proxy(target, {
      get(target2, key, receiver) {
        console.log("\u53BB\u4EE3\u7406\u5BF9\u8C61\u4E0A\u53D6\u503C", target2[key]);
        return target2[key];
      },
      set(target2, key, value, receiver) {
        console.log("\u53BB\u4EE3\u7406\u5BF9\u8C61\u4E0A\u8BBE\u7F6E\u503C", target2[key]);
        return true;
      }
    });
    return proxy;
  }
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=reactivity.global.js.map
