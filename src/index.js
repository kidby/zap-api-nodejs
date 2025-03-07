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

/**
 * @typedef {Object} ZapApiOptions
 * @property {string} [apiKey] - The API key for authentication
 * @property {string} [proxy] - The proxy URL to use for connections
 */

/**
 * @typedef {Object} ApiResponse
 * @property {Object} [data] - The response data
 * @property {string} [message] - Response message
 * @property {number} [code] - Response code
 */

const axios = require('axios');
const AccessControl = require('./accessControl');
const Acsrf = require('./acsrf');
const AjaxSpider = require('./ajaxSpider');
const Alert = require('./alert');
const AlertFilter = require('./alertFilter');
const Ascan = require('./ascan');
const Authentication = require('./authentication');
const Authorization = require('./authorization');
const Automation = require('./automation');
const Autoupdate = require('./autoupdate');
const Brk = require('./brk');
const Context = require('./context');
const Core = require('./core');
const Exim = require('./exim');
const ForcedUser = require('./forcedUser');
const Graphql = require('./graphql');
const HttpSessions = require('./httpSessions');
const Network = require('./network');
const Oast = require('./oast');
const Openapi = require('./openapi');
const Params = require('./params');
const Pnh = require('./pnh');
const Pscan = require('./pscan');
const Reports = require('./reports');
const Replacer = require('./replacer');
const Reveal = require('./reveal');
const Retest = require('./retest');
const Revisit = require('./revisit');
const RuleConfig = require('./ruleConfig');
const Script = require('./script');
const Search = require('./search');
const Selenium = require('./selenium');
const SessionManagement = require('./sessionManagement');
const Soap = require('./soap');
const Spider = require('./spider');
const Stats = require('./stats');
const Users = require('./users');
const Wappalyzer = require('./wappalyzer');
const Websocket = require('./websocket');
const { AxiosError } = require("axios");

const BASE_URL_JSON = 'http://zap/JSON';
const BASE_URL_OTHER = 'http://zap/OTHER';

/**
 * Custom error class for API client errors.
 * @augments {AxiosError}
 */
class ApiClientError extends AxiosError {
  /**
   * @param {import('axios').AxiosError} err - The original error.
   */
  constructor(err) {
    super(err.message, { cause: err });
    this.name = 'ApiClientError';

    /**
     * @type {{
     *   status: number|undefined,
     *   data: any
     * }}
     */
    this.response = {
      status: err.response?.status,
      data: err.response?.data,
    };
  }
}

/**
 * Class representing the ZAP client API.
 */
class ClientApi {
  /**
   * @type {import('axios').AxiosRequestConfig}
   * @private
   */
  _defaultAxiosConfig;

  /**
   * Creates an instance of the ZAP client API.
   * @param {ZapApiOptions} options - API connection options.
   */
  constructor(options) {
    this._defaultAxiosConfig = {
      params: {},
      baseURL: BASE_URL_JSON,
      headers: options.apiKey ? { 'X-ZAP-API-Key': options.apiKey } : {},
      proxy: options.proxy,
    };

    this.accessControl = new AccessControl(this);
    this.acsrf = new Acsrf(this);
    this.ajaxSpider = new AjaxSpider(this);
    this.alert = new Alert(this);
    this.alertFilter = new AlertFilter(this);
    this.ascan = new Ascan(this);
    this.authentication = new Authentication(this);
    this.authorization = new Authorization(this);
    this.automation = new Automation(this);
    this.autoupdate = new Autoupdate(this);
    this.brk = new Brk(this);
    this.context = new Context(this);
    this.core = new Core(this);
    this.exim = new Exim(this);
    this.forcedUser = new ForcedUser(this);
    this.graphql = new Graphql(this);
    this.httpSessions = new HttpSessions(this);
    this.network = new Network(this);
    this.oast = new Oast(this);
    this.openapi = new Openapi(this);
    this.params = new Params(this);
    this.pnh = new Pnh(this);
    this.pscan = new Pscan(this);
    this.replacer = new Replacer(this);
    this.reports = new Reports(this);
    this.retest = new Retest(this);
    this.reveal = new Reveal(this);
    this.revisit = new Revisit(this);
    this.ruleConfig = new RuleConfig(this);
    this.script = new Script(this);
    this.search = new Search(this);
    this.selenium = new Selenium(this);
    this.sessionManagement = new SessionManagement(this);
    this.soap = new Soap(this);
    this.spider = new Spider(this);
    this.stats = new Stats(this);
    this.users = new Users(this);
    this.wappalyzer = new Wappalyzer(this);
    this.websocket = new Websocket(this);
  }

  /**
   * Makes an API request to ZAP.
   *
   * @param {string} url - The endpoint URL.
   * @param {Record<string, string|number|boolean>} [data] - The request data.
   * @param {'other'|undefined} [format] - The response format.
   * @param {'GET'|'POST'|'PUT'|'DELETE'} [method='GET'] - The HTTP method.
   * @returns {Promise<ApiResponse>} A promise resolving with the response data.
   */
  request = async (url, data, format, method = 'GET') => {
    try {
      let requestConfig = structuredClone(this._defaultAxiosConfig);
      requestConfig.method = method;
      requestConfig.url = url;

      if (data) {
        // Filter out null/undefined values from data
        const filteredData = {};
        for (const [key, value] of Object.entries(data)) {
          if (value != null) {
            filteredData[key] = value;
          }
        }

        if (method === 'GET') {
          requestConfig.params = filteredData;
        } else {
          requestConfig.headers = {
            ...requestConfig.headers,
            'content-type': 'application/x-www-form-urlencoded',
          };
          requestConfig.data = filteredData;
        }
      }

      if (format === 'other') {
        requestConfig.baseURL = BASE_URL_OTHER;
      }

      const response = await axios.request(requestConfig);
      return response.data;
    } catch (error) {
      return Promise.reject(new ApiClientError(error));
    }
  };

  /**
   * Makes a request to the "other" endpoint.
   *
   * @param {string} url - The endpoint URL.
   * @param {Record<string, string|number|boolean>} [data] - The request data.
   * @param {'GET'|'POST'|'PUT'|'DELETE'} [method='GET'] - The HTTP method.
   * @returns {Promise<ApiResponse>} A promise resolving with the response data.
   */
  requestOther = async (url, data, method = 'GET') => {
    return this.request(url, data, 'other', method);
  };
}

module.exports = ClientApi;
