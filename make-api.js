function parseConfig({ url, ...config }, mappings) {
  if (typeof url === 'string' && mappings && typeof mappings === 'object') {
    Array.from(url.matchAll(/:([^/?=&#]+)/g)).forEach(([variable, key]) => {
      url = url.replace(variable, mappings[key] || '');
    });
  }
  return { ...config, url };
}

function API(defaultConfig, factory = API) {
  this.request = (config, mappings) => factory.request(
    parseConfig({ ...defaultConfig, ...config }, mappings),
  );
}

API.request = require('axios');

const createMethod = (method) => function (defaultConfig) {
  if (typeof defaultConfig === 'string') {
    defaultConfig = { method, url: defaultConfig };
  } else {
    defaultConfig = { method, ...defaultConfig };
  }
  return new API(defaultConfig, this instanceof API ? this : API).request;
};

export const PUT = API.prototype.PUT = createMethod('put');
export const GET = API.prototype.GET = createMethod('get');
export const POST = API.prototype.POST = createMethod('post');
export const HEAD = API.prototype.HEAD = createMethod('head');
export const PATCH = API.prototype.PATCH = createMethod('patch');
export const DELETE = API.prototype.DELETE = createMethod('delete');
export const OPTIONS = API.prototype.OPTIONS = createMethod('options');

export default API;
