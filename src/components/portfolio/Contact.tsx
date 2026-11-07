import { useState } from 'react';
import { Mail, Phone, Linkedin, Globe, Send, AlertCircle, CheckCircle2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { isContactFormConfigured, sendContactMessage } from '../../lib/contact';
import { contactFormSchema, PURPOSE_OPTIONS } from '../../lib/validation';
import { contactFormLimiter } from '../../lib/rateLimiter';

const CONTACT_EMAIL = 'arc.mit07@gmail.com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'Admissions or academic' as (typeof PURPOSE_OPTIONS)[number],
    message: '',
    website: '', // Honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'ratelimit' | 'mailto'>('idle');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    // Honeypot check: silently succeed if a bot filled the hidden field
    if (formData.website.trim().length > 0) {
      setStatus('success');
      return;
    }

    setStatus('sending');

    try {
      const validation = contactFormSchema.safeParse(formData);

      if (!validation.success) {
        const errors: Record<string, string> = {};
        validation.error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setValidationErrors(errors);
        setStatus('idle');
        return;
      }

      const identifier = `contact_${formData.email}`;
      const rateLimitCheck = contactFormLimiter.check(identifier);

      if (!rateLimitCheck.allowed) {
        setStatus('ratelimit');
        setTimeout(() => setStatus('idle'), 5000);
        return;
      }

      if (!isContactFormConfigured) {
        const subject = encodeURIComponent(`[${validation.data.purpose}] Portfolio enquiry from ${validation.data.name}`);
        const body = encodeURIComponent(
          `Purpose: ${validation.data.purpose}\n\n${validation.data.message}\n\n— ${validation.data.name}\n${validation.data.email}`
        );
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        setStatus('mailto');
        setTimeout(() => setStatus('idle'), 8000);
        return;
      }

      await sendContactMessage({
        name: validation.data.name,
        email: validation.data.email,
        purpose: validation.data.purpose,
        message: validation.data.message,
      });

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        purpose: 'Admissions or academic',
        message: '',
        website: '',
      });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: Phone,
      label: 'Phone / WhatsApp',
      value: '+880 1721458573',
      href: 'tel:+8801721458573',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/aramitabh',
      href: 'https://linkedin.com/in/aramitabh',
    },
    {
      icon: Globe,
      label: 'ORCID',
      value: '0009-0004-6847-0225',
      href: 'https://orcid.org/0009-0004-6847-0225',
    },
  ];

  return (
    <section id="contact" className="brand-section bg-paper text-graphite">
      <div className="brand-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mb-14"
        >
          <p className="type-meta text-forest-deep mb-3">05 / Contact &amp; Inquiries</p>
          <h1 className="type-h1 text-graphite mb-4">
            Let’s start a <span className="accent-italic">conversation</span>.
          </h1>
          <p className="type-body-lg text-graphite-soft">
            Available for postgraduate research supervision, architectural studio roles, urban planning collaborations, and design commissions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Details & Availability */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Availability Notice */}
            <div className="bg-paper-raised border border-stone rounded-card p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-forest" aria-hidden="true" />
                <span className="type-meta text-forest-deep">Current Availability</span>
              </div>
              <p className="type-body text-graphite mb-3">
                Open to MSc / PhD research placements, sustainable architecture roles, and international collaborations for 2026–2027.
              </p>
              <p className="type-caption text-graphite-soft flex items-center gap-1.5">
                <MapPin size={14} className="text-terracotta-deep" aria-hidden="true" />
                Based in Bangladesh (UTC+6) · Typical response within 24–48 hours
              </p>
            </div>

            {/* Direct Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.label !== 'Email' && info.label !== 'Phone / WhatsApp' ? '_blank' : undefined}
                  rel={info.label !== 'Email' && info.label !== 'Phone / WhatsApp' ? 'noopener noreferrer' : undefined}
                  className="group bg-paper-raised rounded-card p-5 border border-stone hover:border-forest transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 bg-sage/20 rounded-card flex items-center justify-center shrink-0">
                      <info.icon size={18} className="text-forest-deep" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="type-meta text-graphite-soft">{info.label}</p>
                      <p className="text-sm font-medium text-graphite truncate group-hover:text-forest-deep transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-forest-deep shrink-0" aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Accessible Editorial Form (Section 8.7 & Section 9) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 bg-paper-raised border border-stone rounded-card p-6 sm:p-10"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Honeypot spam protection field */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-graphite">
                    Full Name <span className="text-terracotta-deep">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(validationErrors.name)}
                    aria-describedby={validationErrors.name ? 'name-error' : undefined}
                    className={`w-full h-12 px-4 bg-paper border rounded-card text-graphite placeholder:text-graphite-soft/60 focus:outline-none focus:border-forest focus:ring-2 focus:ring-sage/35 transition-colors ${
                      validationErrors.name ? 'border-terracotta-deep' : 'border-stone'
                    }`}
                    placeholder="Your name"
                  />
                  {validationErrors.name && (
                    <p id="name-error" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-terracotta-deep">
                      <AlertCircle size={14} aria-hidden="true" />
                      <span>{validationErrors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-graphite">
                    Email Address <span className="text-terracotta-deep">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(validationErrors.email)}
                    aria-describedby={validationErrors.email ? 'email-error' : undefined}
                    className={`w-full h-12 px-4 bg-paper border rounded-card text-graphite placeholder:text-graphite-soft/60 focus:outline-none focus:border-forest focus:ring-2 focus:ring-sage/35 transition-colors ${
                      validationErrors.email ? 'border-terracotta-deep' : 'border-stone'
                    }`}
                    placeholder="you@institution.edu"
                  />
                  {validationErrors.email && (
                    <p id="email-error" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-terracotta-deep">
                      <AlertCircle size={14} aria-hidden="true" />
                      <span>{validationErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-medium mb-2 text-graphite">
                  Purpose of Inquiry
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-paper border border-stone rounded-card text-graphite focus:outline-none focus:border-forest focus:ring-2 focus:ring-sage/35 transition-colors"
                >
                  {PURPOSE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-graphite">
                  Message <span className="text-terracotta-deep">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  aria-invalid={Boolean(validationErrors.message)}
                  aria-describedby={validationErrors.message ? 'message-error' : undefined}
                  className={`w-full p-4 bg-paper border rounded-card text-graphite placeholder:text-graphite-soft/60 focus:outline-none focus:border-forest focus:ring-2 focus:ring-sage/35 transition-colors resize-y ${
                    validationErrors.message ? 'border-terracotta-deep' : 'border-stone'
                  }`}
                  placeholder="Share context about your academic program, research project, studio role, or commission..."
                />
                {validationErrors.message && (
                  <p id="message-error" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-terracotta-deep">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{validationErrors.message}</span>
                  </p>
                )}
              </div>

              {status === 'success' && (
                <div role="status" className="p-4 bg-sage/20 border border-forest rounded-card flex items-start gap-2.5 text-forest-deep text-sm">
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Thank you for your message. I have received your note and will reply within 24–48 hours.</span>
                </div>
              )}

              {status === 'mailto' && (
                <div role="status" className="p-4 bg-sage/20 border border-forest rounded-card text-sm text-graphite">
                  <p className="font-semibold text-forest-deep mb-1">
                    Your email client has been opened with your message prepared
                  </p>
                  <p className="text-graphite-soft">
                    Please press send in your mail app, or write directly to{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline text-forest-deep font-medium">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div role="alert" className="p-4 bg-blush/35 border border-terracotta-deep rounded-card flex items-start gap-2.5 text-sm text-terracotta-deep">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold mb-1">Unable to send message automatically</p>
                    <p>
                      Please email me directly at{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="underline font-medium">
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}

              {status === 'ratelimit' && (
                <div role="alert" className="p-4 bg-blush/35 border border-terracotta-deep rounded-card flex items-start gap-2.5 text-sm text-terracotta-deep">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Too many requests. Please wait a few minutes before sending another message.</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    'Sending message...'
                  ) : (
                    <>
                      Send Message
                      <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
