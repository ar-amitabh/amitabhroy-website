import { z } from 'zod';

export const PURPOSE_OPTIONS = [
  'Admissions or academic',
  'Job opportunity',
  'Collaboration',
  'Commission',
  'Other',
] as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-'.]+$/, 'Name contains invalid characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  purpose: z.enum(PURPOSE_OPTIONS).default('Collaboration'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
