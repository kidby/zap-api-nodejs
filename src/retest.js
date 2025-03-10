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

class Retest {
  constructor(clientApi) {
    this.api = clientApi;
  }

  /**
   * Retests alerts with the specified IDs.
   *
   * @param {{ alertIds: string }} args - Object containing the IDs of the alerts to retest.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>} A promise that resolves with the retest result.
   */
  retest = ({ alertIds }) =>
    this.api.request('/retest/action/retest', { alertIds });
}

module.exports = Retest;
