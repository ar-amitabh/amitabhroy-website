import { useState } from 'react';
import { Mail, Phone, Linkedin, Globe, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { isContactFormConfigured, sendContactMessage } from '../../lib/contact';
import { contactFormSchema } from '../../lib/validation';
import { contactFormLimiter } from '../../lib/rateLimiter';

const CONTACT_EMAIL = 'arc.mit07@gmail.com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'ratelimit' | 'mailto'>('idle');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
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
        // Without a Web3Forms key, open the visitor's mail app with the message
        // ready to send so the form is never a dead end.
        const subject = encodeURIComponent(`Portfolio enquiry from ${validation.data.name}`);
        const body = encodeURIComponent(`${validation.data.message}\n\n— ${validation.data.name}\n${validation.data.email}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        setStatus('mailto');
        setTimeout(() => setStatus('idle'), 8000);
        return;
      }

      await sendContactMessage({
        name: validation.data.name,
        email: validation.data.email,
        message: validation.data.message,
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      label: 'Phone',
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
      label: 'Portfolio',
      value: 'www.amitabhroy.bd',
      href: 'https://www.amitabhroy.bd',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#040816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Let's Connect</h1>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Open to graduate study, research collaborations, and opportunities in architecture, urban planning and sustainable design.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  href={info.href}
                  target={info.label !== 'Email' && info.label !== 'Phone' ? '_blank' : undefined}
                  rel={info.label !== 'Email' && info.label !== 'Phone' ? 'noopener noreferrer' : undefined}
                  className="group bg-[#111827] rounded-xl p-6 border border-gray-800 hover:border-[#22C55E] transition-all"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center mr-3">
                      <info.icon size={20} className="text-[#22C55E]" />
                    </div>
                    <span className="text-sm text-[#9CA3AF]">{info.label}</span>
                  </div>
                  <p className="text-[#F9FAFB] font-medium group-hover:text-[#22C55E] transition-colors">
                    {info.value}
                  </p>
                </motion.a>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-xl p-8 border border-[#22C55E]/30">
              <h2 className="text-xl font-bold mb-4">Areas of Interest</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#22C55E] mr-2">→</span>
                  <span className="text-[#9CA3AF]">Graduate school collaborations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#22C55E] mr-2">→</span>
                  <span className="text-[#9CA3AF]">Research partnerships in human-centered design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#22C55E] mr-2">→</span>
                  <span className="text-[#9CA3AF]">Architectural roles in sustainability-focused firms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#22C55E] mr-2">→</span>
                  <span className="text-[#9CA3AF]">Speaking engagements and workshops</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#F9FAFB]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-[#111827] border rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors text-[#F9FAFB] ${
                    validationErrors.name ? 'border-red-500' : 'border-gray-800'
                  }`}
                  placeholder="Your name"
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-400">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#F9FAFB]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-[#111827] border rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors text-[#F9FAFB] ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-800'
                  }`}
                  placeholder="your.email@example.com"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#F9FAFB]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 bg-[#111827] border rounded-lg focus:outline-none focus:border-[#22C55E] transition-colors text-[#F9FAFB] resize-none ${
                    validationErrors.message ? 'border-red-500' : 'border-gray-800'
                  }`}
                  placeholder="Tell me about your project or opportunity..."
                />
                {validationErrors.message && (
                  <p className="mt-1 text-sm text-red-400">{validationErrors.message}</p>
                )}
              </div>

              {status === 'success' && (
                <div role="status" className="p-4 bg-[#22C55E]/10 border border-[#22C55E]/50 rounded-lg text-[#22C55E]">
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}

              {status === 'mailto' && (
                <div role="status" className="p-4 bg-[#0EA5E9]/10 border border-[#0EA5E9]/50 rounded-lg">
                  <p className="text-[#7DD3FC] font-semibold mb-2">
                    Your email app should be open
                  </p>
                  <p className="text-[#BAE6FD] text-sm">
                    Send the prepared message from there, or write to <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-white">{CONTACT_EMAIL}</a> directly.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div role="alert" className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 font-semibold mb-2">
                    Unable to send message
                  </p>
                  <p className="text-red-300 text-sm">
                    Please email me directly at <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-red-200">{CONTACT_EMAIL}</a> or try again later.
                  </p>
                </div>
              )}

              {status === 'ratelimit' && (
                <div role="alert" className="p-4 bg-orange-500/10 border border-orange-500/50 rounded-lg">
                  <p className="text-orange-400 font-semibold mb-2">
                    Too many requests
                  </p>
                  <p className="text-orange-300 text-sm">
                    Please wait a few minutes before submitting another message.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-[#22C55E] text-[#040816] rounded-lg font-semibold hover:bg-[#22C55E]/90 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2" size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
