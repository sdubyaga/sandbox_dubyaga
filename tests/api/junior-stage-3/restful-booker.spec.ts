import { randomUUID } from 'node:crypto';
import { expect, test as base } from '@playwright/test';
import type { Booking, CreatedBooking } from '@api/RestfulBookerApi';
import { RestfulBookerApi } from '@api/RestfulBookerApi';
import {
  validateBooking,
  validateCreatedBooking,
  validateToken,
} from '@api/schemas/booking.schema';

interface IsolatedBooking {
  created: CreatedBooking;
  creationResponseBody: unknown;
  markDeleted: () => void;
}

interface ApiFixtures {
  restfulBookerApi: RestfulBookerApi;
  isolatedBooking: IsolatedBooking;
}

const test = base.extend<ApiFixtures>({
  restfulBookerApi: async ({ request }, use) => {
    await use(new RestfulBookerApi(request));
  },
  isolatedBooking: async ({ restfulBookerApi }, use) => {
    const booking: Booking = {
      firstname: `Stage3-${randomUUID().slice(0, 8)}`,
      lastname: 'Automation',
      totalprice: 123,
      depositpaid: true,
      bookingdates: {
        checkin: '2027-06-10',
        checkout: '2027-06-15',
      },
      additionalneeds: 'Breakfast',
    };
    const response = await restfulBookerApi.createBooking(booking);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const creationResponseBody: unknown = await response.json();
    expect(
      validateCreatedBooking(creationResponseBody),
      JSON.stringify(validateCreatedBooking.errors),
    ).toBe(true);

    const created = creationResponseBody as CreatedBooking;
    let deleted = false;
    try {
      await use({
        created,
        creationResponseBody,
        markDeleted: () => {
          deleted = true;
        },
      });
    } finally {
      if (!deleted) {
        const deleteResponse = await restfulBookerApi.deleteBooking(created.bookingid);
        expect(deleteResponse.status()).toBe(201);
      }
    }
  },
});

test('@api health check responds with 201', async ({ restfulBookerApi }) => {
  const response = await restfulBookerApi.ping();

  expect(response.status()).toBe(201);
});

test('@api auth endpoint returns a token matching its response schema', async ({ restfulBookerApi }) => {
  const response = await restfulBookerApi.createToken();

  expect(response.status()).toBe(200);
  const responseBody: unknown = await response.json();
  expect(validateToken(responseBody), JSON.stringify(validateToken.errors)).toBe(true);
});

test('@api create booking response matches schema and contains submitted data', async ({ isolatedBooking }) => {
  expect(
    validateCreatedBooking(isolatedBooking.creationResponseBody),
    JSON.stringify(validateCreatedBooking.errors),
  ).toBe(true);
  expect(isolatedBooking.created.booking.firstname).toContain('Stage3-');
  expect(isolatedBooking.created.booking.bookingdates.checkin).toBe('2027-06-10');
});

test('@api retrieve an isolated booking and validate its schema', async ({ restfulBookerApi, isolatedBooking }) => {
  const response = await restfulBookerApi.getBooking(isolatedBooking.created.bookingid);

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  const responseBody: unknown = await response.json();
  expect(validateBooking(responseBody), JSON.stringify(validateBooking.errors)).toBe(true);
  expect((responseBody as Booking).firstname).toBe(isolatedBooking.created.booking.firstname);
});

test('@api authenticated partial update persists changed data', async ({ restfulBookerApi, isolatedBooking }) => {
  const updatedNeeds = 'Dinner';
  const response = await restfulBookerApi.updateBooking(
    isolatedBooking.created.bookingid,
    { additionalneeds: updatedNeeds },
    restfulBookerApi.basicAuthHeaders,
  );

  expect(response.status()).toBe(200);
  const responseBody: unknown = await response.json();
  expect(validateBooking(responseBody), JSON.stringify(validateBooking.errors)).toBe(true);
  expect((responseBody as Booking).additionalneeds).toBe(updatedNeeds);

  const retrievedResponse = await restfulBookerApi.getBooking(isolatedBooking.created.bookingid);
  expect(retrievedResponse.status()).toBe(200);
  const retrievedBooking: unknown = await retrievedResponse.json();
  expect((retrievedBooking as Booking).additionalneeds).toBe(updatedNeeds);
});

test('@api unauthenticated update is forbidden', async ({ restfulBookerApi, isolatedBooking }) => {
  const response = await restfulBookerApi.updateBooking(
    isolatedBooking.created.bookingid,
    { additionalneeds: 'Unauthorized update' },
  );

  expect(response.status()).toBe(403);
});

test('@api delete booking removes the isolated resource', async ({ restfulBookerApi, isolatedBooking }) => {
  const deleteResponse = await restfulBookerApi.deleteBooking(isolatedBooking.created.bookingid);
  isolatedBooking.markDeleted();

  expect(deleteResponse.status()).toBe(201);
  const getResponse = await restfulBookerApi.getBooking(isolatedBooking.created.bookingid);
  expect(getResponse.status()).toBe(404);
});