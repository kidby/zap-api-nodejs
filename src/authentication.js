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

class Authentication {
  constructor(clientApi) {
    this.api = clientApi;
  }

  /**
   * Gets the names of the supported authentication methods.
   * @returns {Promise}
   */
  getSupportedAuthenticationMethods = () =>
    this.api.request('/authentication/view/getSupportedAuthenticationMethods');

  /**
   * Gets the configuration parameters for the specified authentication method.
   * @param {{ authMethodName: string }} args - Object containing the authentication method name.
   * @returns {Promise}
   */
  getAuthenticationMethodConfigParams = ({ authMethodName }) =>
    this.api.request('/authentication/view/getAuthenticationMethodConfigParams', { authMethodName });

  /**
   * Gets the authentication method for the context with the given ID.
   * @param {{ contextId: string }} args - Object containing the context ID.
   * @returns {Promise}
   */
  getAuthenticationMethod = ({ contextId }) =>
    this.api.request('/authentication/view/getAuthenticationMethod', { contextId });

  /**
   * Gets the logged in indicator for the context with the given ID.
   * @param {{ contextId: string }} args - Object containing the context ID.
   * @returns {Promise}
   */
  getLoggedInIndicator = ({ contextId }) =>
    this.api.request('/authentication/view/getLoggedInIndicator', { contextId });

  /**
   * Gets the logged out indicator for the context with the given ID.
   * @param {{ contextId: string }} args - Object containing the context ID.
   * @returns {Promise}
   */
  getLoggedOutIndicator = ({ contextId }) =>
    this.api.request('/authentication/view/getLoggedOutIndicator', { contextId });

  /**
   * Sets the authentication method for the context.
   * @param {{
   *   contextId: string,
   *   authMethodName: string,
   *   authMethodConfigParams?: string
   * }} args - Object containing contextId, authentication method name, and optional configuration parameters.
   * @returns {Promise}
   */
  setAuthenticationMethod = ({ contextId, authMethodName, authMethodConfigParams }) => {
    return this.api.request('/authentication/action/setAuthenticationMethod', { contextId, authMethodName, authMethodConfigParams });
  };

  /**
   * Sets the logged in indicator for the context.
   * @param {{
   *   contextId: string,
   *   loggedinindicatorregex: string
   * }} args - Object containing the context ID and logged in indicator regex.
   * @returns {Promise}
   */
  setLoggedInIndicator = ({ contextId, loggedInIndicatorRegex }) =>
    this.api.request('/authentication/action/setLoggedInIndicator', {
      contextId,
      loggedInIndicatorRegex,
    });

  /**
   * Sets the logged out indicator for the context.
   * @param {{
   *   contextId: string,
   *   loggedoutindicatorregex: string
   * }} args - Object containing the context ID and logged out indicator regex.
   * @returns {Promise}
   */
  setLoggedOutIndicator = ({ contextId, loggedOutIndicatorRegex }) =>
    this.api.request('/authentication/action/setLoggedOutIndicator', {
      contextId,
      loggedOutIndicatorRegex,
    });
}

module.exports = Authentication;
