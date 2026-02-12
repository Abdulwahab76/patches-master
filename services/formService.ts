
import { QuoteFormData } from "../types";

/**
 * Service to handle form submissions.
 * Note: Resend API requires a secret key usually stored server-side.
 * In a client-only environment, we use a mock implementation or a proxy.
 */
export const submitQuoteRequest = async (data: QuoteFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Analytics tracking for conversion
    if ((window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        'event_category': 'form',
        'event_label': 'quote_request',
        'value': 1.0
      });
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'designFile' && value) {
        formData.append('designFile', value);
      } else {
        formData.append(key, value as string);
      }
    });

    const response = await fetch('/api/leads', {
      method: 'POST',
      body: formData, // Content-Type header is set automatically by browser with boundary
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Server returned error');
    }

    return {
      success: true,
      message: "Quote request sent successfully! Our specialist will contact you soon."
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      message: "Failed to send request. Please try again or email us directly."
    };
  }
};
