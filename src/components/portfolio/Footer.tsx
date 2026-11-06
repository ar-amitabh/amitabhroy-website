import { Linkedin, Mail, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/aramitabh',
      label: 'LinkedIn',
    },
    {
      icon: Facebook,
      href: 'https://www.facebook.com/aramitabh',
      label: 'Facebook',
    },
    {
      icon: Twitter,
      href: 'https://x.com/ArAmitabh',
      label: 'X',
    },
    {
      icon: Mail,
      href: 'mailto:arc.mit07@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <footer className="bg-[#040816] border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[#F9FAFB] font-medium">
              © 2026 Amitabh Chondro Roy
            </p>
            <p className="text-[#9CA3AF] text-sm mt-2">
              Designed with passion for healthier built environments.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="w-12 h-12 bg-[#111827] border border-gray-800 rounded-lg flex items-center justify-center hover:bg-[#22C55E]/10 hover:border-[#22C55E] transition-all"
                aria-label={link.label}
              >
                <link.icon size={20} className="text-[#9CA3AF] hover:text-[#22C55E]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-[#9CA3AF]">
            Open to collaborations in sustainable architecture and urban design
          </p>
        </div>
      </div>
    </footer>
  );
}
