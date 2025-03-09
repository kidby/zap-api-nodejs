/* Zed Attack Proxy (ZAP) and its related class files.
 *
 * ZAP is an HTTP/HTTPS proxy for assessing web application security.
 *
 * Copyright the ZAP development team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/// <reference path="../index.d.ts" />

const axios = require('axios');
const { AxiosError } = require('axios');

const modules = {
  accessControl: require('./accessControl'),
  acsrf: require('./acsrf'),
  ajaxSpider: require('./ajaxSpider'),
  alert: require('./alert'),
  alertFilter: require('./alertFilter'),
  ascan: require('./ascan'),
  authentication: require('./authentication'),
  authorization: require('./authorization'),
  automation: require('./automation'),
  autoupdate: require('./autoupdate'),
  brk: require('./brk'),
  context: require('./context'),
  core: require('./core'),
  exim: require('./exim'),
  forcedUser: require('./forcedUser'),
  graphql: require('./graphql'),
  httpSessions: require('./httpSessions'),
  network: require('./network'),
  oast: require('./oast'),
  openapi: require('./openapi'),
  params: require('./params'),
  pnh: require('./pnh'),
  pscan: require('./pscan'),
  reports: require('./reports'),
  replacer: require('./replacer'),
  retest: require('./retest'),
  reveal: require('./reveal'),
  revisit: require('./revisit'),
  ruleConfig: require('./ruleConfig'),
  script: require('./script'),
  search: require('./search'),
  selenium: require('./selenium'),
  sessionManagement: require('./sessionManagement'),
  soap: require('./soap'),
  spider: require('./spider'),
  stats: require('./stats'),
  users: require('./users'),
  wappalyzer: require('./wappalyzer'),
  websocket: require('./websocket'),
};

const BASE_URL_JSON = 'http://zap/JSON';
const BASE_URL_OTHER = 'http://zap/OTHER';

/**
 * Custom error class for API client errors.
 *
 * @augments {import('axios').AxiosError<ZAProxy.ErrorJson, Record<string, unknown>>}
 */
class ApiClientError extends AxiosError {
  /**
   * @param {import('axios').AxiosError<ZAProxy.ErrorJson, Record<string, unknown>>} err - The original error.
   */
  constructor(err) {
    super(err.message, { cause: err });
    this.name = 'ApiClientError';
    this.response = err.response;
  }
}

/**
 * Class representing the ZAP client API.
 */
class ClientApi {
  /**
   * @private
   * @type {import('axios').AxiosRequestConfig<Record<string, unknown>>}
   */
  _defaultAxiosConfig;

  /**
   * Creates an instance of the ZAP client API.
   *
   * @param {ZAProxy.ZapApiOptions} options - API connection options.
   */
  constructor(options) {
    const headers = /** @type {import('axios').RawAxiosRequestHeaders} */ ({});
    if (options.apiKey) {
      headers['X-ZAP-API-Key'] = options.apiKey;
    }

    /** @type {import('axios').AxiosProxyConfig|false|undefined} */
    let proxyConfig;
    if (options.proxy) {
      const parsed = new URL(options.proxy);
      proxyConfig = {
        host: parsed.hostname,
        port: parsed.port
          ? Number(parsed.port)
          : (parsed.protocol === 'https:' ? 443 : 80),
        protocol: parsed.protocol.slice(0, -1), // remove trailing colon
      };
    }

    /** @type {import('axios').AxiosRequestConfig<Record<string, unknown>>} */
    this._defaultAxiosConfig = {
      params: {},
      baseURL: BASE_URL_JSON,
      headers: headers,
      proxy: proxyConfig,
    };

    Object.keys(modules).forEach((key) => {
      this[key] = new modules[key](this);
    });
  }

  /**
   * Makes an API request to ZAP.
   *
   * Filters out properties from the data that are undefined, null, or empty strings,
   * while preserving valid falsy values such as 0 or '0'.
   *
   * @template T, D = Record<string, unknown>
   * @param {string} url - The endpoint URL.
   * @param {D} [data] - Request data.
   * @param {'other' | undefined} [format] - Optional response format.
   * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} [method='GET'] - HTTP method.
   * @returns {Promise<T>} A promise resolving with the response data.
   * @throws {ZAProxy.ApiClientError} If the request fails.
   */
  async request(url, data, format, method = 'GET') {
    const config = structuredClone(this._defaultAxiosConfig);
    config.method = method;
    config.url = url;

    if (data) {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) => value !== undefined && value !== null && value !== ''
        )
      );
      if (method === 'GET') {
        config.params = filteredData;
      } else {
        if (!config.headers || typeof config.headers !== 'object') {
          config.headers = {};
        }
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.data = filteredData;
      }
    }

    if (format === 'other') {
      config.baseURL = BASE_URL_OTHER;
    }

    /** @type {import('axios').AxiosResponse<T, Record<string, unknown>>} */
    const response = await axios.request(config);
    return response.data;
  }
}

module.exports = ClientApi;
