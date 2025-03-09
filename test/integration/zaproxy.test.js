const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const axios = require('axios');
const { spawn, exec } = require('node:child_process');
const path = require('node:path');
const ClientApi = require('../../src');

const PORT = process.env.PORT || '8090';
const API_KEY = process.env.ZAP_API_KEY || '';

const waitForZap = function (port, timeout, interval) {
  timeout = timeout || 60000;
  interval = interval || 2000;
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = function () {
      axios
        .get('http://localhost:' + port + '/JSON/core/view/version/')
        .then(res => {
          if (res.status === 200) {
            return resolve();
          }
          if (Date.now() - start > timeout) {
            return reject(new Error('ZAP did not start in time'));
          }
          setTimeout(check, interval);
        })
        .catch(() => {
          if (Date.now() - start > timeout) {
            return reject(new Error('ZAP did not start in time'));
          }
          setTimeout(check, interval);
        });
    };
    check();
  });
};

const startZAP = function (port, apiKey) {
  const cwd = path.join(__dirname, '..', '..');
  const args = [
    'run',
    '-v', `${cwd}:/zap/wrk/:rw`,
    '-p', `${port}:${port}`,
    '--name', 'zaproxy-test',
    '-t', 'zaproxy/zap-nightly:latest',
    'zap.sh',
    '-daemon',
    '-host', '0.0.0.0',
    '-port', port,
    '-config', 'api.addrs.addr.name=.*',
    '-config', 'api.addrs.addr.regex=true',
    '-config', `api.key=${apiKey}`,
    '-addoninstall', 'fileupload',
    '-addoninstall', 'pscanrulesBeta',
  ];
  return spawn('docker', args, { stdio: ['inherit', 'pipe', 'pipe'] });
};

const execPromise = function (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout) => {
      err ? reject(err) : resolve(stdout);
    });
  });
};

describe('ZAP API Integration', () => {
  let zapProcess;

  before(async () => {
    try {
      await execPromise('docker rm -f zaproxy-test');
    } catch (e) {
      // ignore errors if container does not exist
    }
    zapProcess = startZAP(PORT, API_KEY);
    await waitForZap(PORT);
  });

  after(async () => {
    await execPromise('docker rm -f zaproxy-test');
    if (zapProcess) {
      zapProcess.kill();
    }
  });

  it('retrieves ZAP version', async () => {
    const client = new ClientApi({ apiKey: API_KEY });
    client._defaultAxiosConfig.baseURL = `http://localhost:${PORT}/JSON`;
    const version = await client.request('/core/view/version');
    assert.strictEqual(typeof version, 'string');
    assert.ok(version.length > 0);
  });

  it('lists contexts', async () => {
    const client = new ClientApi({ apiKey: API_KEY });
    client._defaultAxiosConfig.baseURL = `http://localhost:${PORT}/JSON`;
    const contexts = await client.request('/context/view/contextList');
    assert.ok(Array.isArray(contexts));
  });
});
