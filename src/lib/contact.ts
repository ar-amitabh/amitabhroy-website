const accessKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim();

export const isContactFormConfigured = accessKey.length > 0;

export interface ContactMessage {
  name: string;
  email: string;
  purpose?: string;
  message: string;
}

/**
 * Sends a contact message through Web3Forms, which forwards it to the
 * portfolio inbox. The access key is public by design and safe to ship.
 */
export async function sendContactMessage({ name, email, purpose, message }: ContactMessage): Promise<void> {
  if (!accessKey) {
    throw new Error('Contact form is not configured.');
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      purpose: purpose || 'General enquiry',
      message,
      subject: `[${purpose || 'Enquiry'}] Portfolio message from ${name}`,
      from_name: 'amitabhroy.bd',
      replyto: email,
      botcheck: '',
    }),
  });

  const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || 'The message could not be sent.');
  }
}
