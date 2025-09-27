import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Dumbbell,
  Activity,
  Heart
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' }
    ],
    features: [
      { label: 'Find Partners', href: '/services' },
      { label: 'Group Workouts', href: '/services' },
      { label: 'Activity Tracking', href: '/services' },
      { label: 'Community Events', href: '/services' }
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Safety Guidelines', href: '#' },
      { label: 'Community Rules', href: '#' },
      { label: 'Report Issue', href: '#' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Community Guidelines', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' }
  ];

  const cities = [
    {
      city: 'Mumbai',
      address: 'Bandra Kurla Complex, Mumbai, Maharashtra 400051',
      activities: '2,500+ Active Members'
    },
    {
      city: 'Bangalore',
      address: 'Koramangala, Bangalore, Karnataka 560034',
      activities: '3,200+ Active Members'
    },
    {
      city: 'Delhi',
      address: 'Connaught Place, New Delhi, Delhi 110001',
      activities: '2,800+ Active Members'
    },
    {
      city: 'Pune',
      address: 'Hinjewadi, Pune, Maharashtra 411057',
      activities: '1,900+ Active Members'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <Users className="h-8 w-8 text-emerald-400" />
                <span className="text-2xl font-bold">NeighbourFit India</span>
              </Link>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Building healthier communities across India by connecting neighbors through fitness. Join the movement and transform your neighborhood into a fitness hub.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-3 text-emerald-400" />
                  <span>hello@neighbourfit.in</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-3 text-emerald-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-3 text-emerald-400" />
                  <span>Bandra Kurla Complex, Mumbai, Maharashtra 400051</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Features Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              {footerLinks.features.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Active Cities */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">Active Communities Across India</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Activity className="h-5 w-5 text-emerald-400 mr-2" />
                  <h4 className="font-semibold text-white">{city.city}</h4>
                </div>
                <p className="text-gray-300 text-sm mb-1">{city.address}</p>
                <p className="text-emerald-400 text-sm font-medium">{city.activities}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-2">
                <Heart className="h-6 w-6 text-emerald-400 mr-2" />
                <h3 className="text-xl font-semibold">Stay Fit, Stay Connected</h3>
              </div>
              <p className="text-gray-300">
                Get weekly fitness tips, local activity updates, and community highlights delivered to your inbox.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © 2024 NeighbourFit India. All rights reserved to Chaitanya (chaitanya123@gmail.com) | Building Healthier Communities 🇮🇳
          </p>
          
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className={`p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 ${social.color}`}
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;