import * as z from 'zod';

export const propertySchema = z.object({
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    suburb: z.string().min(1, 'Suburb is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(1, 'Zip code is required'),
  }),
  salePrice: z.number().min(0, 'Sale price must be a positive number'),
  description: z.string().optional(),
});
