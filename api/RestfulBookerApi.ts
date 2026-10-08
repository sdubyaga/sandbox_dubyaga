import type { APIRequestContext, APIResponse } from '@playwright/test';

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export interface CreatedBooking {
  bookingid: number;
  booking: Booking;
}

export class RestfulBookerApi {
  constructor(private readonly request: APIRequestContext) {}

  ping(): Promise<APIResponse> {
    return this.request.get('/ping');
  }

  createToken(): Promise<APIResponse> {
    const username = process.env.RESTFUL_BOOKER_USERNAME || 'admin';
    const password = process.env.RESTFUL_BOOKER_PASSWORD || 'password123';

    return this.request.post('/auth', {
      data: { username, password },
    });
  }

  createBooking(booking: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data: booking });
  }

  getBooking(bookingId: number): Promise<APIResponse> {
    return this.request.get(`/booking/${bookingId}`);
  }

  updateBooking(
    bookingId: number,
    booking: Partial<Booking>,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return this.request.patch(`/booking/${bookingId}`, { data: booking, headers });
  }

  deleteBooking(bookingId: number): Promise<APIResponse> {
    return this.request.delete(`/booking/${bookingId}`, {
      headers: this.basicAuthHeaders,
    });
  }

  get basicAuthHeaders(): Record<string, string> {
    const username = process.env.RESTFUL_BOOKER_USERNAME || 'admin';
    const password = process.env.RESTFUL_BOOKER_PASSWORD || 'password123';
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    return { Authorization: `Basic ${credentials}` };
  }
}