/* Zed Attack Proxy (ZAP) and its related class files.
 *
 * ZAP is an HTTP/HTTPS proxy for assessing web application security.
 *
 * Copyright 2023 the ZAP development team
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

class AjaxSpider {
  constructor(clientApi) {
    this.api = clientApi;
  }

  /**
   * Gets the allowed resources.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  allowedResources = () => this.api.request('/ajaxSpider/view/allowedResources');

  /**
   * Gets the current status of the crawler.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  status = () => this.api.request('/ajaxSpider/view/status');

  /**
   * Gets the current results of the crawler.
   * @param {{ start: string, count: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  results = ({ start, count }) => this.api.request('/ajaxSpider/view/results', { start, count });

  /**
   * Gets the number of resources found.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  numberOfResults = () => this.api.request('/ajaxSpider/view/numberOfResults');

  /**
   * Gets the full crawled content detected by the AJAX Spider.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  fullResults = () => this.api.request('/ajaxSpider/view/fullResults');

  /**
   * Gets the configured browser to use for crawling.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionBrowserId = () => this.api.request('/ajaxSpider/view/optionBrowserId');

  /**
   * Gets the time to wait after an event (in ms).
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionEventWait = () => this.api.request('/ajaxSpider/view/optionEventWait');

  /**
   * Gets the configured max crawl depth.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionMaxCrawlDepth = () => this.api.request('/ajaxSpider/view/optionMaxCrawlDepth');

  /**
   * Gets the configured maximum crawl states.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionMaxCrawlStates = () => this.api.request('/ajaxSpider/view/optionMaxCrawlStates');

  /**
   * Gets the configured max duration of the crawl.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionMaxDuration = () => this.api.request('/ajaxSpider/view/optionMaxDuration');

  /**
   * Gets the configured number of browsers to be used.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionNumberOfBrowsers = () => this.api.request('/ajaxSpider/view/optionNumberOfBrowsers');

  /**
   * Gets the configured time to wait after reloading the page.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionReloadWait = () => this.api.request('/ajaxSpider/view/optionReloadWait');

  /**
   * Gets the configured value for 'Click Default Elements Only'.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionClickDefaultElems = () => this.api.request('/ajaxSpider/view/optionClickDefaultElems');

  /**
   * Gets the value indicating if elements should be clicked only once.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionClickElemsOnce = () => this.api.request('/ajaxSpider/view/optionClickElemsOnce');

  /**
   * Gets if the AJAX Spider should enable extensions.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionEnableExtensions = () => this.api.request('/ajaxSpider/view/optionEnableExtensions/');

  /**
   * Sets whether the AJAX Spider should enable extensions.
   * @param {{ bool: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionEnableExtensions = args => this.api.request('/ajaxSpider/action/setOptionEnableExtensions/', { Boolean: args.bool });

  /**
   * Gets if random values should be used in form fields.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionRandomInputs = () => this.api.request('/ajaxSpider/view/optionRandomInputs');

  /**
   * Runs the AJAX Spider against a target.
   * @param {{ url: string, inScope: string, contextName: string, subtreeOnly: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  scan = ({ url, inScope, contextName, subtreeOnly }) => this.api.request('/ajaxSpider/action/scan', { url, inScope, contextName, subtreeOnly });

  /**
   * Runs the AJAX Spider from the perspective of a User.
   * @param {{ contextName: string, userName: string, url: string, subtreeOnly: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  scanAsUser = ({ contextName, userName, url, subtreeOnly }) =>
    this.api.request('/ajaxSpider/action/scanAsUser', { contextName, userName, url, subtreeOnly });

  /**
   * Stops the AJAX Spider.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  stop = () => this.api.request('/ajaxSpider/action/stop');

  /**
   * Adds an allowed resource.
   * @param {{ regex: string, enabled?: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  addAllowedResource = ({ regex, enabled }) =>
    this.api.request('/ajaxSpider/action/addAllowedResource', { regex, enabled });

  /**
   * Removes an allowed resource.
   * @param {{ regex: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  removeAllowedResource = ({ regex }) => this.api.request('/ajaxSpider/action/removeAllowedResource', { regex });

  /**
   * Sets whether an allowed resource is enabled.
   * @param {{ regex: string, enabled: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setEnabledAllowedResource = ({ regex, enabled }) =>
    this.api.request('/ajaxSpider/action/setEnabledAllowedResource', { regex, enabled });

  /**
   * Sets the browser configuration for the AJAX Spider.
   * @param {{ browserId: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionBrowserId = ({ browserId }) =>
    this.api.request('/ajaxSpider/action/setOptionBrowserId', { String: browserId });

  /**
   * Sets whether the AJAX Spider should click only default elements.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionClickDefaultElems = ({ isSet }) =>
    this.api.request('/ajaxSpider/action/setOptionClickDefaultElems', { Boolean: isSet });

  /**
   * Sets whether elements should be clicked only once.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionClickElemsOnce = ({ isSet }) =>
    this.api.request('/ajaxSpider/action/setOptionClickElemsOnce', { Boolean: isSet });

  /**
   * Sets the wait time after an event (in ms).
   * @param {{ timeInMs: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionEventWait = ({ timeInMs }) =>
    this.api.request('/ajaxSpider/action/setOptionEventWait', { Integer: timeInMs });

  /**
   * Sets the maximum crawl depth.
   * @param {number} depth
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionMaxCrawlDepth = depth =>
    this.api.request('/ajaxSpider/action/setOptionMaxCrawlDepth', { Integer: depth });

  /**
   * Sets the maximum number of crawl states.
   * @param {{ maxCrawlStates: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionMaxCrawlStates = ({ maxCrawlStates }) =>
    this.api.request('/ajaxSpider/action/setOptionMaxCrawlStates', { Integer: maxCrawlStates });

  /**
   * Sets the maximum duration of the crawl (in minutes).
   * @param {{ timeInMinutes: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionMaxDuration = ({ timeInMinutes }) =>
    this.api.request('/ajaxSpider/action/setOptionMaxDuration', { Integer: timeInMinutes });

  /**
   * Sets the number of browsers to be used.
   * @param {{ browsers: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionNumberOfBrowsers = ({ browsers }) =>
    this.api.request('/ajaxSpider/action/setOptionNumberOfBrowsers', { Integer: browsers });

  /**
   * Sets whether random values should be used in form fields.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionRandomInputs = ({ isSet }) =>
    this.api.request('/ajaxSpider/action/setOptionRandomInputs', { Boolean: isSet });

  /**
   * Sets the wait time after page reload (in ms).
   * @param {{ timeInMs: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionReloadWait = ({ timeInMs }) =>
    this.api.request('/ajaxSpider/action/setOptionReloadWait', { Integer: timeInMs });
}

module.exports = AjaxSpider;
