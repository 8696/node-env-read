const fs = require('fs');

function sliceArray(text) {
  text = text.trim();
  if (!/^[\w\W]+=/.test(text)
    || /^=/.test(text)
    || /^#/.test(text)
  ) return null;
  return {
    key: text.slice(0, text.indexOf('=')).trim(),
    value: text.slice(text.indexOf('=') + 1, text.length).trim()
  };
}

function transformValue(text) {
  if (text === '') return text
  if (text === 'true') return true;
  if (text === 'false') return false;
  if (!isNaN(Number(text))) return Number(text);
  return text;
}

module.exports = class {
  constructor(envConfigFile) {
    let content = fs.readFileSync(
      envConfigFile
    ).toString();
    const config = {};
    content
      .split(/[(\r\n)\r\n]+/)
      .forEach(item => {
        item = sliceArray(item);
        if (item && !config.hasOwnProperty(item.key)) {
          Object.defineProperty(config, item.key, {
            value: transformValue(item.value),
            configurable: false,
            writable: false,
            enumerable: true
          });
        }
      });
    Object.defineProperty(this, 'config', {
      value: config,
      configurable: false,
      writable: false,
      enumerable: false
    });
  }

  get(key) {
    if (!key) return this.config;
    return this.has(key) ? this.config[key] : null;
  }

  has(key) {
    if (!key) return false;
    return this.config.hasOwnProperty(key);
  }
};
