make-api
=========
Make a promise-based API use RESTful style

Installing
---------

Using npm:

`npm install @pixcai/make-api -S`

Using yarn:

`yarn add @pixcai/make-api`

Example
---------

Basic usage:
```js
import { GET, POST } from '@pixcai/make-api';

const user = {
  register: POST('http://localhost:3000/user/register'),
  query: GET('http://localhost:3000/user/:id'),
};

user.register({
  data: {
    username: 'admin',
    password: '123456',
  },
}).then(({ data }) => console.log(data));

user.query({}, { id: 1 }).then(({ data }) => console.log(data));
```
`make-api` default uses `axios` for request. We can configure axios options by `API.request`:
```js
import API, { POST } from '@pixcai/make-api';

API.request.defaults.baseURL = 'http://localhost:3000';

const user = {
  register: POST('/user/register'),
};

user.register({
  data: {
    username: 'admin',
    password: '123456',
  },
}).then(({ data }) => console.log(data));
```
And we can use different config for different API:
```js
import API from '@pixcai/make-api';

const userAPI = new API({ baseURL: 'http://localhost:3000' });
const user = {
  register: userAPI.POST('/user/register'),
};

const adminAPI = new API({ baseURL: 'http://localhost:8001' });
const admin = {
  register: adminAPI.POST('/register'),
};
```
Or custom request function:
```js
import API, { POST } from '@pixcai/make-api';

API.request = ({ baseURL, url, ...config }) => window.fetch(baseURL + url, config);

const user = {
  register: POST('/user/register'),
};
```
```js
import API from '@pixcai/make-api';

const userAPI = new API({
  baseURL: 'http://localhost:3000',
}, {
  request: ({ baseURL, url, ...config }) => window.fetch(baseURL + url, config),
});
```

API
---------

### `DELETE(url)`
### `GET(url)`
### `HEAD(url)`
### `OPTIONS(url)`
### `PATCH(url)`
### `POST(url)`
### `PUT(url)`
### `API.request(config, mapping)`

### `new API(defaultConfig, factory = API)`

Make an instance that have all the above methods and uses `defaultConfig` and `factory`.

- `defaultConfig`: request config.

- `factory`: An object that must have field `request`.

License
---------

MIT
