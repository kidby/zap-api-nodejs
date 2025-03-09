const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const axios = require('axios');
const ClientApi = require('../../src');

describe('ClientApi', () => {
  let originalAxiosRequest;

  beforeEach(() => {
    originalAxiosRequest = axios.request;
  });

  afterEach(() => {
    axios.request = originalAxiosRequest;
  });

  it('should return expected data on success', async () => {
    const fakeResponse = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      request: {},
    };

    axios.request = async () => fakeResponse;
    const client = new ClientApi({ apiKey: 'dummy-key' });
    const result = await client.request('/test-endpoint', { key: 'value' });
    assert.deepStrictEqual(result, fakeResponse.data);
  });

  it('should throw ApiClientError on failure', async () => {
    const fakeErrorResponse = {
      data: { code: 'error', message: 'failed', detail: 'error detail' },
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      config: {},
      request: {},
    };

    const fakeError = new Error('Request failed');
    fakeError.response = fakeErrorResponse;

    axios.request = async () => { throw fakeError; };
    const client = new ClientApi({ apiKey: 'dummy-key' });
    await assert.rejects(async () => {
      await client.request('/test-endpoint');
    }, err => {
      return err.name === 'ApiClientError' &&
        err.message === 'Request failed' &&
        JSON.stringify(err.response) === JSON.stringify(fakeErrorResponse);
    });
  });
});
