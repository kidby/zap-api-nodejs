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

/**
 * @typedef {'Db' |
 *   'Db.Firebird' |
 *   'Db.HypersonicSQL' |
 *   'Db.IBMDB2' |
 *   'Db.MariaDB' |
 *   'Db.MicrosoftAccess' |
 *   'Db.MicrosoftSQLServer' |
 *   'Db.MongoDB' |
 *   'Db.MySQL' |
 *   'Db.Oracle' |
 *   'Db.PostgreSQL' |
 *   'Db.SAPMaxDB' |
 *   'Db.SQLite' |
 *   'Db.Sybase' |
 *   'Language' |
 *   'Language.ASP' |
 *   'Language.C' |
 *   'Language.Java' |
 *   'Language.Java.Spring' |
 *   'Language.PHP' |
 *   'OS' |
 *   'OS.Linux' |
 *   'OS.MacOS' |
 *   'OS.Windows' |
 *   'Protocol' |
 *   'Protocol.LDAP' |
 *   'WS' |
 *   'WS.Apache' |
 *   'WS.IIS'} TechnologyName
 */

/**
 * @typedef {TechnologyName[]} TechnologyNames
 */


class Context {
  constructor(clientApi) {
    this.api = clientApi;
  }

  /**
   * Lists context names of current session.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  contextList() {
    return this.api.request('/context/view/contextList');
  }

  /**
   * Lists excluded regexs for a context.
   * @param {{ contextName: string }} args - Object with the context name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  excludeRegexs({ contextName }) {
    return this.api.request('/context/view/excludeRegexs', { contextName });
  }

  /**
   * Lists included regexs for a context.
   * @param {{ contextName: string }} args - Object with the context name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  includeRegexs({ contextName }) {
    return this.api.request('/context/view/includeRegexs', { contextName });
  }

  /**
   * Retrieves the details of a context.
   * @param {{ contextName: string }} args - Object with the context name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  context({ contextName }) {
    return this.api.request('/context/view/context', { contextName });
  }

  /**
   * Lists the names of all built-in technologies.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  technologyList() {
    return this.api.request('/context/view/technologyList');
  }

  /**
   * Lists the names of technologies included in a context.
   * @param {{ contextName: string }} args - Object with the context name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  includedTechnologyList({ contextName }) {
    return this.api.request('/context/view/includedTechnologyList', { contextName });
  }

  /**
   * Lists the names of technologies excluded from a context.
   * @param {{ contextName: string }} args - Object with the context name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  excludedTechnologyList({ contextName }) {
    return this.api.request('/context/view/excludedTechnologyList', { contextName });
  }

  /**
   * Lists URLs belonging to a context.
   * @param {{ contextName: string }} args - Object with the context name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  urls({ contextName }) {
    return this.api.request('/context/view/urls', { contextName });
  }

  /**
   * Adds an exclude regex to a context.
   * @param {{ contextName: string, regex: string }} args - Object with context name and regex.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  excludeFromContext({ contextName, regex }) {
    return this.api.request('/context/action/excludeFromContext', { contextName, regex });
  }

  /**
   * Adds an include regex to a context.
   * @param {{ contextName: string, regex: string }} args - Object with context name and regex.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  includeInContext({ contextName, regex }) {
    return this.api.request('/context/action/includeInContext', { contextName, regex });
  }

  /**
   * Sets the include and exclude regexs for a context.
   * @param {{
   *   contextName: string,
   *   incRegexs: string,
   *   excRegexs: string,
   * }} args - Object with context name, include and exclude regexs.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setContextRegexs({ contextName, incRegexs, excRegexs }) {
    return this.api.request('/context/action/setContextRegexs', { contextName, incRegexs, excRegexs });
  }

  /**
   * Sets the checking strategy for a context.
   * @param {{
   *   contextName: string,
   *   checkingStrategy: string,
   *   pollUrl: string,
   *   pollData: string,
   *   pollHeaders: string,
   *   pollFrequency: string,
   *   pollFrequencyUnits: string,
   * }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setContextCheckingStrategy({ contextName, checkingStrategy, pollUrl, pollData, pollHeaders, pollFrequency, pollFrequencyUnits }) {
    return this.api.request('/context/action/setContextCheckingStrategy', {
      contextName,
      checkingStrategy,
      pollUrl,
      pollData,
      pollHeaders,
      pollFrequency,
      pollFrequencyUnits,
    });
  }

  /**
   * Creates a new context.
   * @param {{ contextName: string }} args - Object with the context name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  newContext({ contextName }) {
    return this.api.request('/context/action/newContext', { contextName });
  }

  /**
   * Removes a context.
   * @param {{ contextName: string }} args - Object with the context name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  removeContext({ contextName }) {
    return this.api.request('/context/action/removeContext', { contextName });
  }

  /**
   * Exports a context to a file.
   * @param {{
   *   contextName: string,
   *   contextFile: string,
   * }} args - Object with context name and file name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  exportContext({ contextName, contextFile }) {
    return this.api.request('/context/action/exportContext', { contextName, contextFile });
  }

  /**
   * Imports a context from a file.
   * @param {{ contextFile: string }} args - Object with the file name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  importContext({ contextFile }) {
    return this.api.request('/context/action/importContext', { contextFile });
  }

  /**
   * Includes technologies in a context.
   * @param {{
   *   contextName: string,
   *   technologyNames: technologyNames,
   * }} args - Object with context name and a comma-separated string of TechnologyName values.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  includeContextTechnologies({ contextName, technologyNames }) {
    return this.api.request('/context/action/includeContextTechnologies', { contextName, technologyNames });
  }

  /**
   * Includes all built-in technologies in a context.
   * @param {{ contextName: string }} args - Object with the context name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  includeAllContextTechnologies({ contextName }) {
    return this.api.request('/context/action/includeAllContextTechnologies', { contextName });
  }

  /**
   * Excludes technologies from a context.
   * @param {{
   *   contextName: string,
   *   technologyNames: technologyNames,
   * }} args - Object with context name and a comma-separated string of TechnologyName values.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  excludeContextTechnologies({ contextName, technologyNames }) {
    return this.api.request('/context/action/excludeContextTechnologies', { contextName, technologyNames });
  }

  /**
   * Excludes all built-in technologies from a context.
   * @param {{ contextName: string }} args - Object with the context name.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  excludeAllContextTechnologies({ contextName }) {
    return this.api.request('/context/action/excludeAllContextTechnologies', { contextName });
  }

  /**
   * Sets a context to in scope.
   * @param {{
   *   contextName: string,
   *   booleanInScope: string,
   * }} args - Object with context name and a string ("true"/"false").
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setContextInScope({ contextName, booleanInScope }) {
    return this.api.request('/context/action/setContextInScope', { contextName, booleanInScope });
  }
}

module.exports = Context;
