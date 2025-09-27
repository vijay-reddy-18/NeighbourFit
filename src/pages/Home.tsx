import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, 
  Users, 
  MapPin, 
  Activity,
  Heart,
  Star,
  ChevronRight,
  Play,
  Dumbbell,
  Target,
  Clock,
  Shield,
  Building,
  TreePine,
  Stethoscope,
  GraduationCap,
  Car,
  Search,
  Filter,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: <Users className="h-12 w-12 text-emerald-500" />,
      title: 'Find Perfect Communities',
      description: 'Discover verified neighborhoods with detailed safety ratings, crime statistics, and hospitality scores across all 29 Indian states.',
      color: 'from-emerald-400 to-green-500'
    },
    {
      icon: <Shield className="h-12 w-12 text-green-500" />,
      title: 'Real-time Safety Data',
      description: 'Access live crime statistics, safety trends, and verified security measures for informed decisions.',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: <Heart className="h-12 w-12 text-pink-500" />,
      title: 'Community Hospitality',
      description: 'Explore hospitality ratings, neighbor reviews, and community culture insights.',
      color: 'from-pink-400 to-rose-500'
    },
    {
      icon: <MapPin className="h-12 w-12 text-purple-500" />,
      title: 'Smart Location Search',
      description: 'Find communities across 29 Indian states with comprehensive amenity mapping and real contact information.',
      color: 'from-purple-400 to-violet-500'
    }
  ];

  const communityFeatures = [
    {
      icon: <Building className="h-8 w-8 text-emerald-600" />,
      title: 'Infrastructure',
      description: 'Modern amenities and well-maintained facilities',
      rating: 4.5
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: 'Safety Rating',
      description: 'Low crime rate with 24/7 security',
      rating: 4.8
    },
    {
      icon: <TreePine className="h-8 w-8 text-emerald-600" />,
      title: 'Green Spaces',
      description: 'Parks and recreational areas nearby',
      rating: 4.6
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-red-600" />,
      title: 'Healthcare',
      description: 'Quality hospitals and clinics within reach',
      rating: 4.7
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-purple-600" />,
      title: 'Education',
      description: 'Top-rated schools and educational institutions',
      rating: 4.9
    },
    {
      icon: <Car className="h-8 w-8 text-orange-600" />,
      title: 'Transportation',
      description: 'Excellent connectivity and public transport',
      rating: 4.4
    }
  ];

  const stats = [
    { number: '290+', label: 'Communities', icon: <Building className="h-8 w-8" /> },
    { number: '29', label: 'States Covered', icon: <MapPin className="h-8 w-8" /> },
    { number: '290+', label: 'Cities', icon: <Users className="h-8 w-8" /> },
    { number: '95%', label: 'Safety Rating', icon: <Shield className="h-8 w-8" /> }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer, Mumbai',
      content: 'NeighbourFit helped me find the perfect community with excellent safety ratings and amazing neighbors!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Marketing Manager, Bangalore',
      content: 'The real-time crime data and hospitality scores made choosing my neighborhood so much easier.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Sneha Patel',
      role: 'Teacher, Delhi',
      content: 'Love how I can see all the amenities, hospitals, and schools in my area. Perfect for planning!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 80%, rgba(5, 150, 105, 0.3) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover Your
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Perfect Community
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Find safe neighborhoods with real-time crime data, hospitality ratings, and comprehensive amenity information across all 29 Indian states.
            </motion.p>

            {/* Prominent Search Button */}
            <motion.div 
              className="flex flex-col items-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  to="/services"
                  className="group inline-flex items-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-full hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-3xl border-4 border-white/20"
                >
                  <Search className="mr-3 h-8 w-8" />
                  Explore Communities
                  <ArrowRight className="ml-3 h-8 w-8 group-hover:translate-x-2 transition-transform" />
                </Link>
                
                {/* Pulsing Ring Animation */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-emerald-400"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose NeighbourFit?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive community insights for informed living decisions across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <motion.div
                  className="mb-6 transform group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="h-5 w-5 text-emerald-600" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: index * 0.2 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-lg text-emerald-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How NeighbourFit Works
            </h2>
            <p className="text-xl text-gray-600">
              Discover, analyze, and connect with your perfect community in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-6">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Search & Discover</h3>
              <p className="text-gray-600">Enter your desired city and explore communities with real-time safety and hospitality data</p>
            </motion.div>

            <motion.div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-6">
                <Filter className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Filter & Compare</h3>
              <p className="text-gray-600">Use our smart filters to compare safety ratings, amenities, and community features</p>
            </motion.div>

            <motion.div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Connect & Move</h3>
              <p className="text-gray-600">Join verified communities and connect with neighbors who share your lifestyle</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories from India
            </h2>
            <p className="text-xl text-gray-600">
              Real people finding their perfect communities across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-emerald-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Find Your Perfect Community?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of Indians who are making informed decisions about their neighborhoods with NeighbourFit.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-emerald-600 bg-white rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Communities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;