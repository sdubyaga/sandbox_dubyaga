import Ajv, { type JSONSchemaType } from 'ajv';
import type { Booking, BookingDates, CreatedBooking } from '../RestfulBookerApi';

const ajv = new Ajv({ allErrors: true });

const bookingDatesSchema: JSONSchemaType<BookingDates> = {
  type: 'object',
  properties: {
    checkin: { type: 'string' },
    checkout: { type: 'string' },
  },
  required: ['checkin', 'checkout'],
  additionalProperties: true,
};

export const bookingSchema: JSONSchemaType<Booking> = {
  type: 'object',
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    totalprice: { type: 'number' },
    depositpaid: { type: 'boolean' },
    bookingdates: bookingDatesSchema,
    additionalneeds: { type: 'string' },
  },
  required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates', 'additionalneeds'],
  additionalProperties: true,
};

export const createdBookingSchema: JSONSchemaType<CreatedBooking> = {
  type: 'object',
  properties: {
    bookingid: { type: 'integer' },
    booking: bookingSchema,
  },
  required: ['bookingid', 'booking'],
  additionalProperties: true,
};

export const tokenSchema: JSONSchemaType<{ token: string }> = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
  required: ['token'],
  additionalProperties: true,
};

export const validateBooking = ajv.compile(bookingSchema);
export const validateCreatedBooking = ajv.compile(createdBookingSchema);
export const validateToken = ajv.compile(tokenSchema);