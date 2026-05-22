module.exports = function mdxRawLoader(source) {
  this.cacheable?.();

  return `export default ${JSON.stringify(source)};`;
};
