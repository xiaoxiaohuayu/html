// src/index.ts
function vitePluginTemplate() {
  return {
    name: "vite-plugin-template",
    enforce: "pre",
    apply: "build",
    config(config, { command }) {
      console.log("123");
    },
    configResolved(resolvedConfig) {
    },
    configureServer(server) {
    },
    transformIndexHtml(html) {
    },
    handleHotUpdate({ file, server }) {
    },
    options(options) {
    },
    buildStart(options) {
    },
    resolveId(source, importer, options) {
    },
    load(id) {
    },
    transform(code, id) {
    },
    buildEnd() {
    },
    outputOptions(options) {
    },
    renderStart(outputOptions, inputOptions) {
    },
    augmentChunkHash(chunkInfo) {
    },
    renderChunk(code, chunk, options) {
      return null;
    },
    generateBundle(options, bundle, isWrite) {
    },
    writeBundle(options, bundle) {
    },
    closeBundle() {
    }
  };
}
export {
  vitePluginTemplate as default
};
