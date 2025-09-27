import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Shield, 
  Users, 
  Star, 
  Heart,
  Building,
  TreePine,
  Stethoscope,
  GraduationCap,
  Car,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Eye,
  ThumbsUp,
  Flag
} from 'lucide-react';
import { getCommunityById } from '../data/communityData';

const CommunityProfile = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // Get community data by ID
    const communityData = getCommunityById(communityId || '');
    if (communityData) {
      setCommunity({
        ...communityData,
        reviews: [
          {
            id: '1',
            author: 'Sneha K.',
            rating: 5,
            comment: 'Very peaceful & safe for students. Great community with helpful neighbors.',
            date: '2024-01-15',
            helpful: 12
          },
          {
            id: '2',
            author: 'Karthik M.',
            rating: 4,
            comment: 'Walkable parks, guards at night. Friendly neighbors, but water issues occasionally.',
            date: '2024-01-10',
            helpful: 8
          }
        ]
      });
    }
    setLoading(false);
  }, [communityId]);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-100';
    if (rating >= 3.5) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-4 h-4 bg-emerald-600 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Not Found</h2>
          <p className="text-gray-600">The community you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{community.name}</h1>
                {community.isVerified && (
                  <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    <span>Verified Community</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{community.location}, {community.city}, {community.state}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${getRatingBg(community.safetyRating)}`}>
                    <Shield className={`h-8 w-8 ${getRatingColor(community.safetyRating)}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">Safety Rating</h3>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-lg font-bold">{community.safetyRating}</span>
                    <span className="text-gray-500">/5</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${getRatingBg(community.hospitalityScore)}`}>
                    <Heart className={`h-8 w-8 ${getRatingColor(community.hospitalityScore)}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">Hospitality Score</h3>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-lg font-bold">{community.hospitalityScore}</span>
                    <span className="text-gray-500">/5</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${getRatingBg(community.cleanlinessRating)}`}>
                    <Building className={`h-8 w-8 ${getRatingColor(community.cleanlinessRating)}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">Cleanliness</h3>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-lg font-bold">{community.cleanlinessRating}</span>
                    <span className="text-gray-500">/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                👀 See Available Rooms
              </button>
              <button className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-200">
                🔍 View Housemates
              </button>
            </div>
          </div>
        </motion.div>

        {/* Crime & Safety Information */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
            Crime & Safety Report
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Reported Crimes (Last 6 Months)</h3>
              <p className="text-2xl font-bold text-green-700">{community.recentCrimes}</p>
              <p className="text-sm text-green-600">Minor incidents only</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Crime Rate</h3>
              <p className="text-lg font-bold text-blue-700">{community.crimeRate}</p>
              <p className="text-sm text-blue-600">Compared to city average</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">Safety Trend</h3>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-purple-700 capitalize">{community.trend}</span>
              </div>
              <p className="text-xs text-purple-600 mt-1">Improving security measures</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium text-gray-900">Property Manager</p>
                <p className="text-gray-600">{community.contactInfo.propertyManager}</p>
                <p className="text-emerald-600">{community.contactInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-gray-600">{community.contactInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium text-gray-900">WhatsApp</p>
                <p className="text-gray-600">{community.contactInfo.whatsapp}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-emerald-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Full Address</p>
                <p className="text-gray-600">{community.contactInfo.address}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'amenities', label: 'Amenities' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'infrastructure', label: 'Infrastructure' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-900">Total Residents</h3>
                    <p className="text-2xl font-bold text-gray-900">{community.demographics.totalResidents}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-900">Average Age</h3>
                    <p className="text-2xl font-bold text-gray-900">{community.demographics.averageAge}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Heart className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-900">Family Friendly</h3>
                    <p className="text-2xl font-bold text-gray-900">{community.demographics.familyFriendly}%</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-900">Students</h3>
                    <p className="text-2xl font-bold text-gray-900">{community.demographics.studentPopulation}%</p>
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-emerald-900 mb-4">Community Highlights</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {community.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-800 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Amenities Tab */}
            {activeTab === 'amenities' && (
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{community.amenities.schools}</p>
                    <p className="text-sm text-gray-600">Schools</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Stethoscope className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{community.amenities.hospitals}</p>
                    <p className="text-sm text-gray-600">Hospitals</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Building className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{community.amenities.banks}</p>
                    <p className="text-sm text-gray-600">Banks</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Car className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{community.amenities.transport}/10</p>
                    <p className="text-sm text-gray-600">Transport</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Resident Reviews</h3>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                  >
                    Write Review
                  </button>
                </div>

                {showReviewForm && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Share Your Experience</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-6 w-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                        <textarea
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Share your experience living in this community..."
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                          Submit Review
                        </button>
                        <button
                          onClick={() => setShowReviewForm(false)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {community.reviews.map((review: any) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{review.author}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Flag className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <p className="text-gray-700 mb-4">"{review.comment}"</p>
                      
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">Helpful ({review.helpful})</span>
                        </button>
                        <button className="text-gray-500 hover:text-emerald-600">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Infrastructure Tab */}
            {activeTab === 'infrastructure' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Infrastructure Quality</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(community.infrastructure).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <span className="text-lg font-bold text-gray-900">{value}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityProfile;