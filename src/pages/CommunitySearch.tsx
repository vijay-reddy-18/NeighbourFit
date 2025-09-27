import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Shield, 
  Heart, 
  Star, 
  Users, 
  Building,
  CheckCircle,
  Grid,
  List,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  GraduationCap,
  Car,
  Landmark,
  Stethoscope,
  ShoppingCart,
  Wifi,
  Zap
} from 'lucide-react';
import { communityDatabase, Community, searchCommunities, getAllStates, getAllCities } from '../data/communityData';
import SearchModal, { SearchPreferences } from '../components/SearchModal';

const CommunitySearch = () => {
  const [communities, setCommunities] = useState<Community[]>(communityDatabase);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>(communityDatabase);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [currentPreferences, setCurrentPreferences] = useState<SearchPreferences | null>(null);

  const cities = getAllCities();
  const states = getAllStates();

  useEffect(() => {
    let filtered = communities;

    // Apply text search
    if (searchTerm) {
      filtered = searchCommunities(searchTerm);
    }

    // Apply city filter
    if (selectedCity !== 'all') {
      filtered = filtered.filter(community => 
        community.city.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    // Apply state filter
    if (selectedState !== 'all') {
      filtered = filtered.filter(community => community.state === selectedState);
    }

    setFilteredCommunities(filtered);
  }, [searchTerm, selectedCity, selectedState, communities]);

  const handleSearchResults = (results: Community[], preferences: SearchPreferences) => {
    setFilteredCommunities(results);
    setCurrentPreferences(preferences);
    setSearchTerm('');
    setSelectedCity('all');
    setSelectedState('all');
  };

  const getCrimeRateColor = (rate: string) => {
    switch (rate) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4 bg-emerald-500 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Communities Across India</h1>
          <p className="text-xl text-gray-600 mb-8">Discover safe, welcoming neighborhoods with verified safety and hospitality ratings</p>
          
          {/* Prominent Search Button */}
          <motion.button
            onClick={() => setShowSearchModal(true)}
            className="inline-flex items-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-full hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-3xl border-4 border-emerald-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="mr-3 h-8 w-8" />
            Smart Community Search
            <motion.div
              className="ml-3 w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>
        </div>

        {/* Quick Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Basic Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Quick search communities, cities, or states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* State Selection */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            {/* City Selection */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Current Search Summary */}
          {currentPreferences && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
              <h3 className="font-medium text-emerald-900 mb-2">Active Search Filters:</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                {currentPreferences.city && (
                  <span className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full">
                    City: {currentPreferences.city}
                  </span>
                )}
                {currentPreferences.state && (
                  <span className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full">
                    State: {currentPreferences.state}
                  </span>
                )}
                <span className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full">
                  Budget: ₹{currentPreferences.maxBudget.toLocaleString()}
                </span>
                {currentPreferences.minSafety > 0 && (
                  <span className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full">
                    Min Safety: {currentPreferences.minSafety}/5
                  </span>
                )}
                <button
                  onClick={() => {
                    setCurrentPreferences(null);
                    setFilteredCommunities(communityDatabase);
                  }}
                  className="px-3 py-1 bg-red-200 text-red-800 rounded-full hover:bg-red-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-emerald-600">{filteredCommunities.length}</span> communities
            {selectedState !== 'all' && ` in ${selectedState}`}
            {selectedCity !== 'all' && ` in ${selectedCity}`}
          </p>
        </div>

        {/* Communities Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredCommunities.map((community) => (
            <motion.div
              key={community.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
            >
              <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'h-48'}`}>
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {community.isVerified && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-green-600 text-white rounded-full text-xs">
                        <CheckCircle className="h-3 w-3" />
                        <span>Verified</span>
                      </div>
                    )}
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCrimeRateColor(community.crimeRate)}`}>
                      {community.crimeRate} Crime
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    {getTrendIcon(community.trend)}
                  </div>
                </div>

                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{community.name}</h3>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{community.location}, {community.city}, {community.state}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-600">{community.priceRange}</p>
                      <p className="text-sm text-gray-500">{community.availableRooms} rooms available</p>
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Safety</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-bold">{community.safetyRating}</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Heart className="h-4 w-4 text-pink-600" />
                        <span className="text-sm font-medium">Hospitality</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-bold">{community.hospitalityScore}</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Building className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium">Clean</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-bold">{community.cleanlinessRating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <GraduationCap className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                      <span className="text-xs text-gray-600">{community.amenities.schools}</span>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <Stethoscope className="h-4 w-4 mx-auto mb-1 text-red-600" />
                      <span className="text-xs text-gray-600">{community.amenities.hospitals}</span>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <Landmark className="h-4 w-4 mx-auto mb-1 text-green-600" />
                      <span className="text-xs text-gray-600">{community.amenities.banks}</span>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <ShoppingCart className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                      <span className="text-xs text-gray-600">{community.amenities.malls}</span>
                    </div>
                  </div>

                  {/* Crime Info */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Recent crimes (6 months):</span>
                      <span className="font-medium">{community.recentCrimes} incidents</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {community.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                    {community.highlights.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{community.highlights.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/community/${community.id}`}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white text-center rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                    <button className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-200">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No communities found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or use our smart search</p>
            <button
              onClick={() => setShowSearchModal(true)}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              Open Smart Search
            </button>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSearch={handleSearchResults}
      />
    </div>
  );
};

export default CommunitySearch;