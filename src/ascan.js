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

class Ascan {
  constructor(clientApi) {
    this.api = clientApi;
  }

  /**
   * Gets the status of a scan.
   * @param {{ scanId: string }} args - Object containing the scan ID.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  status = ({ scanId }) =>
    this.api.request('/ascan/view/status', { scanId });

  /**
   * Retrieves the scan progress.
   * @param {{ scanId: string }} args - Object containing the scan ID.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  scanProgress = ({ scanId }) =>
    this.api.request('/ascan/view/scanProgress', { scanId });

  /**
   * Gets the message IDs sent during a scan.
   * @param {{ scanId: string }} args - Object containing the scan ID.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  messagesIds = ({ scanId }) =>
    this.api.request('/ascan/view/messagesIds', { scanId });

  /**
   * Gets the alert IDs raised during a scan.
   * @param {{ scanId: string }} args - Object containing the scan ID.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  alertsIds = ({ scanId }) =>
    this.api.request('/ascan/view/alertsIds', { scanId });

  /**
   * Retrieves all scans.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  scans = () =>
    this.api.request('/ascan/view/scans');

  /**
   * Gets the names of scan policies.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  scanPolicyNames = () =>
    this.api.request('/ascan/view/scanPolicyNames');

  /**
   * Retrieves the regexes of URLs excluded from active scans.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  excludedFromScan = () =>
    this.api.request('/ascan/view/excludedFromScan');

  /**
   * Retrieves the scan rules (scanners) based on scan policy or category.
   * @param {{ scanPolicyName: string, policyId: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  scanners = ({ scanPolicyName, policyId }) =>
    this.api.request('/ascan/view/scanners', { scanPolicyName, policyId });

  /**
   * Retrieves the scan policies.
   * @param {{ scanPolicyName: string, policyId: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  policies = ({ scanPolicyName, policyId }) =>
    this.api.request('/ascan/view/policies', { scanPolicyName, policyId });

  /**
   * Gets the attack mode queue.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  attackModeQueue = () =>
    this.api.request('/ascan/view/attackModeQueue');

  /**
   * Retrieves parameters excluded from scanning.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  excludedParams = () =>
    this.api.request('/ascan/view/excludedParams');

  /**
   * Retrieves the list of excluded parameters from scan options.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionExcludedParamList = () =>
    this.api.request('/ascan/view/optionExcludedParamList');

  /**
   * Retrieves the types of excluded parameters.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  excludedParamTypes = () =>
    this.api.request('/ascan/view/excludedParamTypes');

  /**
   * Gets the current attack policy option.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionAttackPolicy = () =>
    this.api.request('/ascan/view/optionAttackPolicy');

  /**
   * Gets the default scan policy option.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionDefaultPolicy = () =>
    this.api.request('/ascan/view/optionDefaultPolicy');

  /**
   * Gets the delay (in milliseconds) option for scan requests.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionDelayInMs = () =>
    this.api.request('/ascan/view/optionDelayInMs');

  /**
   * Retrieves the setting for handling anti-CSRF tokens.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionHandleAntiCSRFTokens = () =>
    this.api.request('/ascan/view/optionHandleAntiCSRFTokens');

  /**
   * Gets the maximum number of hosts per scan.
   * @param {{ hosts: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionHostPerScan = ({ hosts }) =>
    this.api.request('/ascan/view/optionHostPerScan', { hosts });

  /**
   * Retrieves the maximum chart time option in minutes.
   * @param {{ timeInMin: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionMaxChartTimeInMins = ({ timeInMin }) =>
    this.api.request('/ascan/view/optionMaxChartTimeInMins', { timeInMin });

  /**
   * Retrieves the maximum number of results to list.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionMaxResultsToList = () =>
    this.api.request('/ascan/view/optionMaxResultsToList');

  /**
   * Gets the maximum rule duration option (in minutes).
   * @param {{ timeInMin: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionMaxRuleDurationInMins = ({ timeInMin }) =>
    this.api.request('/ascan/view/optionMaxRuleDurationInMins', { timeInMin });

  /**
   * Retrieves the maximum scan duration option (in minutes).
   * @param {{ timeInMin: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionMaxScanDurationInMins = ({ timeInMin }) =>
    this.api.request('/ascan/view/optionMaxScanDurationInMins', { timeInMin });

  /**
   * Gets the maximum number of scans to display in the UI.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionMaxScansInUI = () =>
    this.api.request('/ascan/view/optionMaxScansInUI');

  /**
   * Retrieves the option for target parameters enabled via RPC.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionTargetParamsEnabledRPC = () =>
    this.api.request('/ascan/view/optionTargetParamsEnabledRPC');

  /**
   * Gets the option for injectable target parameters.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionTargetParamsInjectable = () =>
    this.api.request('/ascan/view/optionTargetParamsInjectable');

  /**
   * Gets the number of threads per host for scanning.
   * @param {{ threads: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionThreadPerHost = ({ threads }) =>
    this.api.request('/ascan/view/optionThreadPerHost', { threads });

  /**
   * Gets whether a query parameter is added to GET requests without parameters.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionAddQueryParam = () =>
    this.api.request('/ascan/view/optionAddQueryParam');

  /**
   * Retrieves the setting for allowing attacks on start.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionAllowAttackOnStart = () =>
    this.api.request('/ascan/view/optionAllowAttackOnStart');

  /**
   * Retrieves whether the scanner injects its plugin ID into HTTP headers.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionInjectPluginIdInHeader = () =>
    this.api.request('/ascan/view/optionInjectPluginIdInHeader');

  /**
   * Gets the option for prompting in attack mode.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionPromptInAttackMode = () =>
    this.api.request('/ascan/view/optionPromptInAttackMode');

  /**
   * Retrieves the option for prompting to clear finished scans.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionPromptToClearFinishedScans = () =>
    this.api.request('/ascan/view/optionPromptToClearFinishedScans');

  /**
   * Retrieves the option for rescanning in attack mode.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionRescanInAttackMode = () =>
    this.api.request('/ascan/view/optionRescanInAttackMode');

  /**
   * Retrieves the option for scanning all HTTP headers.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionScanHeadersAllRequests = () =>
    this.api.request('/ascan/view/optionScanHeadersAllRequests');

  /**
   * Gets the option for scanning null JSON values.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionScanNullJsonValues = () =>
    this.api.request('/ascan/view/optionScanNullJsonValues');

  /**
   * Retrieves the option to show advanced dialog options.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  optionShowAdvancedDialog = () =>
    this.api.request('/ascan/view/optionShowAdvancedDialog');

  /**
   * Starts an active scan.
   * @param {{
   *   url?: string,
   *   recurse?: string,
   *   inScopeOnly?: boolean,
   *   scanPolicyName?: string,
   *   method?: string,
   *   postdata?: string,
   *   contextId?: string,
   * }} [args={}]
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  scan = ({ url, recurse, inScopeOnly, scanPolicyName, method, postdata, contextId } = {}) =>
    this.api.request('/ascan/action/scan', { url, recurse, inScopeOnly, scanPolicyName, method, postdata, contextId });

  /**
   * Starts a scan as a user.
   * @param {{ url: string, contextId: string, userId: string, recurse: string, scanPolicyName: string, method: string, postData: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  scanAsUser = ({ url, contextId, userId, recurse, scanPolicyName, method, postData }) =>
    this.api.request('/ascan/action/scanAsUser', { url, contextId, userId, recurse, scanPolicyName, method, postData });

  /**
   * Pauses a scan.
   * @param {{ scanId: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  pause = ({ scanId }) =>
    this.api.request('/ascan/action/pause', { scanId });

  /**
   * Resumes a paused scan.
   * @param {{ scanId: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  resume = ({ scanId }) =>
    this.api.request('/ascan/action/resume', { scanId });

  /**
   * Stops an active scan.
   * @param {{ scanId: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  stop = ({ scanId }) =>
    this.api.request('/ascan/action/stop', { scanId });

  /**
   * Removes a scan.
   * @param {{ scanId: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  removeScan = ({ scanId }) =>
    this.api.request('/ascan/action/removeScan', { scanId });

  /**
   * Pauses all scans.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  pauseAllScans = () =>
    this.api.request('/ascan/action/pauseAllScans');

  /**
   * Resumes all paused scans.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  resumeAllScans = () =>
    this.api.request('/ascan/action/resumeAllScans');

  /**
   * Stops all active scans.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  stopAllScans = () =>
    this.api.request('/ascan/action/stopAllScans');

  /**
   * Removes all scans.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  removeAllScans = () =>
    this.api.request('/ascan/action/removeAllScans');

  /**
   * Clears all URL exclusion regexes from active scans.
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  clearExcludedFromScan = () =>
    this.api.request('/ascan/action/clearExcludedFromScan');

  /**
   * Excludes a URL from scanning using a regex.
   * @param {{ regex: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  excludeFromScan = ({ regex }) =>
    this.api.request('/ascan/action/excludeFromScan', { regex });

  /**
   * Enables all scanners for a given scan policy.
   * @param {{ scanPolicyName?: string }} [args={}]
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  enableAllScanners = ({ scanPolicyName } = {}) => {
    const params = {};
    if (scanPolicyName) params.scanPolicyName = scanPolicyName;
    return this.api.request('/ascan/action/enableAllScanners', params);
  };

  /**
   * Disables all scanners for a given scan policy.
   * @param {{ scanPolicyName?: string }} [args={}]
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  disableAllScanners = ({ scanPolicyName } = {}) =>
    this.api.request('/ascan/action/disableAllScanners', { scanPolicyName });

  /**
   * Enables specific scanners by IDs.
   * @param {{ ids: string, scanPolicyName?: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  enableScanners = ({ ids, scanPolicyName } = {}) =>
    this.api.request('/ascan/action/enableScanners', { ids, scanPolicyName });

  /**
   * Disables specific scanners by IDs.
   * @param {{ ids: string, scanPolicyName?: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  disableScanners = ({ ids, scanPolicyName } = {}) =>
    this.api.request('/ascan/action/disableScanners', { ids, scanPolicyName });

  /**
   * Sets enabled scan policies.
   * @param {{ ids: string, scanPolicyName: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setEnabledPolicies = ({ ids, scanPolicyName }) =>
    this.api.request('/ascan/action/setEnabledPolicies', { ids, scanPolicyName });

  /**
   * Sets the attack strength for a policy.
   * @param {{ id: string, attackStrength: string, scanPolicyName: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setPolicyAttackStrength = ({ id, attackStrength, scanPolicyName }) =>
    this.api.request('/ascan/action/setPolicyAttackStrength', { id, attackStrength, scanPolicyName });

  /**
   * Sets the alert threshold for a policy.
   * @param {{ id: string, alertThreshold: string, scanPolicyName: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setPolicyAlertThreshold = ({ id, alertThreshold, scanPolicyName }) =>
    this.api.request('/ascan/action/setPolicyAlertThreshold', { id, alertThreshold, scanPolicyName });

  /**
   * Sets the attack strength for a scanner.
   * @param {{ id: string, attackStrength: string, scanPolicyName: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setScannerAttackStrength = ({ id, attackStrength, scanPolicyName }) =>
    this.api.request('/ascan/action/setScannerAttackStrength', { id, attackStrength, scanPolicyName });

  /**
   * Sets the alert threshold for a scanner.
   * @param {{ id: string, alertThreshold: string, scanPolicyName: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setScannerAlertThreshold = ({ id, alertThreshold, scanPolicyName }) =>
    this.api.request('/ascan/action/setScannerAlertThreshold', { id, alertThreshold, scanPolicyName });

  /**
   * Adds a new scan policy.
   * @param {{ scanPolicyName: string, alertThreshold: string, attackStrength: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  addScanPolicy = ({ scanPolicyName, alertThreshold, attackStrength }) =>
    this.api.request('/ascan/action/addScanPolicy', { scanPolicyName, alertThreshold, attackStrength });

  /**
   * Removes a scan policy.
   * @param {{ scanPolicyName: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  removeScanPolicy = ({ scanPolicyName }) =>
    this.api.request('/ascan/action/removeScanPolicy', { scanPolicyName });

  /**
   * Updates an existing scan policy.
   * @param {{ scanPolicyName: string, alertThreshold: string, attackStrength: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  updateScanPolicy = ({ scanPolicyName, alertThreshold, attackStrength }) =>
    this.api.request('/ascan/action/updateScanPolicy', { scanPolicyName, alertThreshold, attackStrength });

  /**
   * Imports a scan policy from a file.
   * @param {{ path: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  importScanPolicy = ({ path }) =>
    this.api.request('/ascan/action/importScanPolicy', { path });

  /**
   * Adds an excluded parameter.
   * @param {{ name: string, type: string, url: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  addExcludedParam = ({ name, type, url }) =>
    this.api.request('/ascan/action/addExcludedParam', { name, type, url });

  /**
   * Modifies an excluded parameter.
   * @param {{ idx: string, name: string, type: string, url: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  modifyExcludedParam = ({ idx, name, type, url }) =>
    this.api.request('/ascan/action/modifyExcludedParam', { idx, name, type, url });

  /**
   * Removes an excluded parameter.
   * @param {{ idx: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  removeExcludedParam = ({ idx }) =>
    this.api.request('/ascan/action/removeExcludedParam', { idx });

  /**
   * Skips a scanner during a scan.
   * @param {{ scanId: string, scannerId: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  skipScanner = ({ scanId, scannerId }) =>
    this.api.request('/ascan/action/skipScanner', { scanId, scannerId });

  /**
   * Sets the attack policy option.
   * @param {{ attackPolicy: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionAttackPolicy = ({ attackPolicy }) =>
    this.api.request('/ascan/action/setOptionAttackPolicy', { String: attackPolicy });

  /**
   * Sets the default policy option.
   * @param {{ defaultPolicy: string }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionDefaultPolicy = ({ defaultPolicy }) =>
    this.api.request('/ascan/action/setOptionDefaultPolicy', { String: defaultPolicy });

  /**
   * Sets whether to add a query parameter to GET requests with no parameters.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionAddQueryParam = ({ isSet }) =>
    this.api.request('/ascan/action/setOptionAddQueryParam', { Boolean: String(isSet) });

  /**
   * Sets whether to allow attack on start.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionAllowAttackOnStart = ({ isSet }) =>
    this.api.request('/ascan/action/setOptionAllowAttackOnStart', { Boolean: String(isSet) });

  /**
   * Sets the delay in milliseconds for scan actions.
   * @param {{ delayInMs: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionDelayInMs = ({ delayInMs }) =>
    this.api.request('/ascan/action/setOptionDelayInMs', { Integer: String(delayInMs) });

  /**
   * Sets whether to handle anti-CSRF tokens.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionHandleAntiCSRFTokens = ({ isSet }) =>
    this.api.request('/ascan/action/setOptionHandleAntiCSRFTokens', { Boolean: String(isSet) });

  /**
   * Sets the maximum hosts per scan.
   * @param {{ hostPerScan: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionHostPerScan = ({ hostPerScan }) =>
    this.api.request('/ascan/action/setOptionHostPerScan', { Integer: String(hostPerScan) });

  /**
   * Sets whether to inject the plugin ID into HTTP request headers.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionInjectPluginIdInHeader = ({ isSet }) =>
    this.api.request('/ascan/action/setOptionInjectPluginIdInHeader', { Boolean: String(isSet) });

  /**
   * Sets the maximum chart time (in minutes) for scan results.
   * @param {{ timeInMins: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionMaxChartTimeInMins = ({ timeInMins }) =>
    this.api.request('/ascan/action/setOptionMaxChartTimeInMins', { Integer: String(timeInMins) });

  /**
   * Sets the maximum results to list in the UI.
   * @param {{ maxResultsToList: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionMaxResultsToList = ({ maxResultsToList }) =>
    this.api.request('/ascan/action/setOptionMaxResultsToList', { Integer: maxResultsToList });

  /**
   * Sets the maximum rule duration (in minutes).
   * @param {{ durationInMins: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionMaxRuleDurationInMins = ({ durationInMins }) =>
    this.api.request('/ascan/action/setOptionMaxRuleDurationInMins', { Integer: String(durationInMins) });

  /**
   * Sets the maximum scan duration (in minutes).
   * @param {{ durationInMins: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionMaxScanDurationInMins = ({ durationInMins }) =>
    this.api.request('/ascan/action/setOptionMaxScanDurationInMins', { Integer: String(durationInMins) });

  /**
   * Sets the maximum number of scans to display in the UI.
   * @param {{ maxScansInUI: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionMaxScansInUI = ({ maxScansInUI }) =>
    this.api.request('/ascan/action/setOptionMaxScansInUI', { Integer: String(maxScansInUI) });

  /**
   * Sets whether to prompt in attack mode.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionPromptInAttackMode = ({ isSet }) =>
    this.api.request('/ascan/action/setOptionPromptInAttackMode', { Boolean: String(isSet) });

  /**
   * Sets whether to prompt to clear finished scans.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionPromptToClearFinishedScans = ({ isSet }) =>
    this.api.request('/ascan/action/setOptionPromptToClearFinishedScans', { Boolean: String(isSet) });

  /**
   * Sets whether to rescan in attack mode.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionRescanInAttackMode = ({ isSet }) =>
    this.api.request('/ascan/action/setOptionRescanInAttackMode', { Boolean: String(isSet) });

  /**
   * Sets whether to scan all HTTP headers.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionScanHeadersAllRequests = ({ isSet }) =>
    this.api.request('/ascan/action/setOptionScanHeadersAllRequests', { Boolean: String(isSet) });

  /**
   * Sets whether to scan null JSON values.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionScanNullJsonValues = ({ isSet }) =>
    this.api.request('/ascan/action/setOptionScanNullJsonValues', { Boolean: String(isSet) });

  /**
   * Sets whether to show the advanced dialog.
   * @param {{ isSet: boolean }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionShowAdvancedDialog = ({ isSet }) =>
    this.api.request('/ascan/action/setOptionShowAdvancedDialog', { Boolean: String(isSet) });

  /**
   * Sets the target parameters enabled via RPC.
   * @param {{ targetParamsEnabledRPC: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionTargetParamsEnabledRPC = ({ targetParamsEnabledRPC }) =>
    this.api.request('/ascan/action/setOptionTargetParamsEnabledRPC', { Integer: String(targetParamsEnabledRPC) });

  /**
   * Sets the target parameters injectable option.
   * @param {{ targetParamsInjectable: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionTargetParamsInjectable = ({ targetParamsInjectable }) =>
    this.api.request('/ascan/action/setOptionTargetParamsInjectable', { Integer: String(targetParamsInjectable) });

  /**
   * Sets the number of threads per host.
   * @param {{ threadPerHost: number }} args
   * @returns {ZAProxy.ZapApiPromiseResponse<string>}
   */
  setOptionThreadPerHost = ({ threadPerHost }) =>
    this.api.request('/ascan/action/setOptionThreadPerHost', { Integer: String(threadPerHost) });
}

module.exports = Ascan;
