import { expect, test } from '@playwright/test';

test.describe('@api Simple API test (Junior Stage 1)', () => {

  test('@api Simple GET test (returns query parameters and JSON response headers)', async ({ request }) => {
  const response = await request.get('/get', {
        params: { stage: 'junior-stage-1' },
  });

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const responseBody = await response.json();
  expect(responseBody.args.stage).toBe('junior-stage-1');
});

test('@api Simple POST test (echoes submitted JSON and its content type)', async ({ request }) => {
  const requestBody = {
        name: 'API learner',
        stage: 1,
  };
  const response = await request.post('/post', { data: requestBody });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.json).toEqual(requestBody);
  expect(responseBody.headers['Content-Type']).toContain('application/json');
});

test('@api Simple request sends a custom header', async ({ request }) => {
  const response = await request.get('/headers', {
        headers: { 'X-QA-Stage': 'junior-stage-1' },
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  const echoedHeader = Object.entries(responseBody.headers).find(
        ([headerName]) => headerName.toLowerCase() === 'x-qa-stage',
  );
  expect(echoedHeader?.[1]).toBe('junior-stage-1');
});

test('@api Status 401 test (returns an unauthorized status)', async ({ request }) => {
  const response = await request.get('/status/401');

  expect(response.status()).toBe(401);
});
});
