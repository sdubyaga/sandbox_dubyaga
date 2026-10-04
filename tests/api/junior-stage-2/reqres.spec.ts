import { randomUUID } from 'node:crypto';
import type { APIRequestContext } from '@playwright/test';
import { expect, test } from '@playwright/test';

interface CreatedUser {
    id: string;
    name: string;
    job: string;
    responseBody: Record<string, unknown>;
}

function isUserSummary(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;
  return typeof user.id === 'number'
    && typeof user.email === 'string'
    && typeof user.first_name === 'string'
    && typeof user.last_name === 'string'
    && typeof user.avatar === 'string';
}

async function createUser(request: APIRequestContext): Promise<CreatedUser> {
  const user = {
    name: `Junior Stage 2 ${randomUUID()}`,
    job: 'QA learner',
  };
  const response = await request.post('/api/users', { data: user });

  expect(response.status()).toBe(201);
  expect(response.headers()['content-type']).toContain('application/json');

  const responseBody: unknown = await response.json();
  if (typeof responseBody !== 'object' || responseBody === null) {
    throw new Error('Reqres returned a non-object create-user response.');
  }

  const body = responseBody as Record<string, unknown>;
  if (typeof body.id !== 'string' && typeof body.id !== 'number') {
    throw new Error('Reqres create-user response did not include an ID.');
  }

  return {
    id: String(body.id),
    name: user.name,
    job: user.job,
    responseBody: body,
  };
}

async function deleteUser(request: APIRequestContext, userId: string): Promise<void> {
  const response = await request.delete(`/api/users/${userId}`);
  expect(response.status()).toBe(204);
}

for (const page of [1, 2]) {
  test(`@api GET users page ${page} returns a valid collection`, async ({ request }) => {
    const response = await request.get('/api/users', { params: { page } });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody: unknown = await response.json();
    if (typeof responseBody !== 'object' || responseBody === null) {
      throw new Error('Reqres returned a non-object users response.');
    }

    const body = responseBody as Record<string, unknown>;
    expect(body.page).toBe(page);
    expect(Array.isArray(body.data)).toBe(true);
    if (!Array.isArray(body.data)) {
      throw new Error('Reqres users response did not contain an array.');
    }

    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data.every(isUserSummary)).toBe(true);
  });
}

test('@api GET a seeded user returns its requested ID and profile fields', async ({ request }) => {
  const response = await request.get('/api/users/2');

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.data.id).toBe(2);
  expect(typeof responseBody.data.email).toBe('string');
  expect(typeof responseBody.data.first_name).toBe('string');
  expect(typeof responseBody.data.last_name).toBe('string');
});

test('@api POST creates a user and returns the submitted fields', async ({ request }) => {
  const user = await createUser(request);

  try {
    expect(user.responseBody.name).toBe(user.name);
    expect(user.responseBody.job).toBe(user.job);
    expect(typeof user.responseBody.createdAt).toBe('string');
  } finally {
    await deleteUser(request, user.id);
  }
});

test('@api PUT returns the updated user fields', async ({ request }) => {
  const user = await createUser(request);

  try {
    const updatedUser = {
      name: user.name,
      job: 'API test analyst',
    };
    const response = await request.put(`/api/users/${user.id}`, { data: updatedUser });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe(updatedUser.name);
    expect(responseBody.job).toBe(updatedUser.job);
    expect(typeof responseBody.updatedAt).toBe('string');
  } finally {
    await deleteUser(request, user.id);
  }
});

test('@api PATCH returns the changed field', async ({ request }) => {
  const user = await createUser(request);

  try {
    const updatedJob = 'API test specialist';
    const response = await request.patch(`/api/users/${user.id}`, {
      data: { job: updatedJob },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.job).toBe(updatedJob);
    expect(typeof responseBody.updatedAt).toBe('string');
  } finally {
    await deleteUser(request, user.id);
  }
});

test('@api DELETE a created user returns 204 with an empty response body', async ({ request }) => {
  const user = await createUser(request);
  const response = await request.delete(`/api/users/${user.id}`);

  expect(response.status()).toBe(204);
  expect(await response.text()).toBe('');
});

test('@api login without a password returns a field-specific validation error', async ({ request }) => {
  const response = await request.post('/api/login', {
    data: { email: 'qa@example.com' },
  });

  expect(response.status()).toBe(400);
  expect(response.headers()['content-type']).toContain('application/json');

  const responseBody = await response.json();
  expect(responseBody.error).toBe('Missing password');
});