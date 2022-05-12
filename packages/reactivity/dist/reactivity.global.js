var VueReactivity = (() => {
  // packages/shared/src/index.ts
  var isObject = (value) => {
    return typeof value === "object" && value !== null;
  };

  // packages/reactivity/src/index.ts
  var i = isObject({});
  console.log(i);
})();
//# sourceMappingURL=reactivity.global.js.map
