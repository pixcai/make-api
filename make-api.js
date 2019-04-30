const axios = require('axios');
const _get = require('lodash.get');
const _merge = require('lodash.merge');
const _cloneDeep = require('lodash.clonedeep');

const createFactory = (factory, parseConfig = _cloneDeep) => (config, mapping) => {
  const parsedConfig = parseConfig(config);
  const url = _get(parsedConfig, 'url');

  if (url && mapping) {
    const parts = url.match(/:([^/=&#?]+)/g);

    if (parts) {
      parsedConfig.url = parts.reduce((part, re) => {
        return part.replace(RegExp(re, 'g'), _get(mapping, re.substr(1)));
      }, url);
    }
  }

  return factory.request(parsedConfig);
};

const createMethod = method => function (url) {
  return createFactory(this, config => _merge(config, { url, method }));
};

function API(defaultConfig, factory) {
  if (!(this instanceof API)) {
    return new API(defaultConfig, factory);
  }
  this.request = createFactory(factory || API, config => _merge(defaultConfig, config));
}

API.prototype.DELETE = createMethod('DELETE');
API.prototype.GET = createMethod('GET');
API.prototype.OPTIONS = createMethod('OPTIONS');
API.prototype.HEAD = createMethod('HEAD');
API.prototype.PATCH = createMethod('PATCH');
API.prototype.POST = createMethod('POST');
API.prototype.PUT = createMethod('PUT');

API.request = axios;

export const DELETE = API.prototype.DELETE.bind(API);
export const GET = API.prototype.GET.bind(API);
export const OPTIONS = API.prototype.OPTIONS.bind(API);
export const HEAD = API.prototype.HEAD.bind(API);
export const PATCH = API.prototype.PATCH.bind(API);
export const POST = API.prototype.POST.bind(API);
export const PUT = API.prototype.PUT.bind(API);

export default API;
