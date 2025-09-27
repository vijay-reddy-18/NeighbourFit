import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Settings,
  Plus,
  Search,
  Filter,
  Clock,
  Star,
  Activity,
  Dumbbell,
  Heart,
  Target,
  Shield,
  Building,
  TreePine,
  Stethoscope,
  GraduationCap,
  Car,
  AlertTriangle,
  TrendingUp,
  Home
} from 'lucide-react';

const Dashboard = () => {
  const [selectedArea, setSelectedArea] = useState('Koramangala, Bangalore');

  // Community data for different areas in India
  const communityData = {
    'Koramangala, Bangalore': {
      safetyRating: 4.5,
      crimeRate: 'Low',
      infrastructure: 4.7,
      hospitality: 4.6,
      hospitals: [
        { name: 'Manipal Hospital', distance: '1.2 km', rating: 4.8 },
        { name: 'Apollo Hospital', distance: '2.1 km', rating: 4.7 }
      ],
      schools: [
        { name: 'Delhi Public School', distance: '0.8 km', rating: 4.9 },
        { name: 'Greenwood High', distance: '1.5 km', rating: 4.6 }
      ],
      parks: [
        { name: 'Lalbagh Botanical Garden', distance: '3.2 km', rating: 4.8 },
        { name: 'Cubbon Park', distance: '4.1 km', rating: 4.7 }
      ],
      amenities: {
        malls: 5,
        restaurants: 120,
        gyms: 15,
        banks: 25
      }
    },
    'Bandra, Mumbai': {
      safetyRating: 4.3,
      crimeRate: 'Low-Medium',
      infrastructure: 4.5,
      hospitality: 4.8,
      hospitals: [
        { name: 'Lilavati Hospital', distance: '2.3 km', rating: 4.9 },
        { name: 'Holy Family Hospital', distance: '1.8 km', rating: 4.6 }
      ],
      schools: [
        { name: 'St. Stanislaus High School', distance: '1.2 km', rating: 4.8 },
        { name: 'Apostolic Carmel High School', distance: '0.9 km', rating: 4.7 }
      ],
      parks: [
        { name: 'Joggers Park', distance: '0.5 km', rating: 4.6 },
        { name: 'Shivaji Park', distance: '3.8 km', rating: 4.5 }
      ],
      amenities: {
        malls: 8,
        restaurants: 200,
        gyms: 25,
        banks: 35
      }
    }
  };

  const currentData = communityData[selectedArea as keyof typeof communityData] || communityData['Koramangala, Bangalore'];

  // Fitness activities data for India
  const nearbyActivities = [
    {
      id: 1,
      title: 'Morning Yoga in Lalbagh',
      type: 'Yoga',
      time: '6:30 AM',
      participants: 12,
      maxParticipants: 20,
      distance: '0.8 km',
      organizer: 'Priya Sharma',
      rating: 4.9,
      location: 'Lalbagh Botanical Garden'
    },
    {
      id: 2,
      title: 'Cricket Practice Session',
      type: 'Cricket',
      time: '5:30 PM',
      participants: 8,
      maxParticipants: 22,
      distance: '1.2 km',
      organizer: 'Rajesh Kumar',
      rating: 4.7,
      location: 'Local Ground, Koramangala'
    },
    {
      id: 3,
      title: 'Evening Running Group',
      type: 'Running',
      time: '7:00 PM',
      participants: 15,
      maxParticipants: 25,
      distance: '0.5 km',
      organizer: 'Sneha Patel',
      rating: 4.8,
      location: 'Cubbon Park'
    },
    {
      id: 4,
      title: 'Badminton Tournament',
      type: 'Badminton',
      time: '8:00 AM',
      participants: 6,
      maxParticipants: 16,
      distance: '2.1 km',
      organizer: 'Arjun Singh',
      rating: 4.6,
      location: 'Sports Complex, Koramangala'
    }
  ];

  const fitnessPartners = [
    {
      id: 1,
      name: 'Kavya Reddy',
      activities: ['Yoga', 'Pilates', 'Meditation'],
      distance: '0.6 km',
      rating: 4.9,
      completedActivities: 67,
      location: 'Koramangala, Bangalore'
    },
    {
      id: 2,
      name: 'Vikram Joshi',
      activities: ['Cricket', 'Football', 'Running'],
      distance: '1.3 km',
      rating: 4.8,
      completedActivities: 45,
      location: 'Indiranagar, Bangalore'
    },
    {
      id: 3,
      name: 'Anita Gupta',
      activities: ['Gym', 'Zumba', 'Swimming'],
      distance: '0.9 km',
      rating: 5.0,
      completedActivities: 89,
      location: 'HSR Layout, Bangalore'
    },
    {
      id: 4,
      name: 'Rohit Mehta',
      activities: ['Cycling', 'Trekking', 'Badminton'],
      distance: '1.8 km',
      rating: 4.7,
      completedActivities: 52,
      location: 'BTM Layout, Bangalore'
    }
  ];

  const getSafetyColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600 bg-green-100';
    if (rating >= 3.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Dashboard</h1>
          <p className="text-gray-600 mt-2">Explore neighborhood data, safety ratings, and connect with your community</p>
        </div>

        {/* Area Selector */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Select Area</h2>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <span className="text-sm text-gray-600">Current: {selectedArea}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedArea('Koramangala, Bangalore')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedArea === 'Koramangala, Bangalore'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Koramangala, Bangalore</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>
            </button>
            <button
              onClick={() => setSelectedArea('Bandra, Mumbai')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedArea === 'Bandra, Mumbai'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Bandra, Mumbai</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">4.3</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Community Safety & Crime Data */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Safety & Crime Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getSafetyColor(currentData.safetyRating)}`}>
                    <Shield className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Safety Rating</h4>
                  <p className="text-2xl font-bold text-gray-900">{currentData.safetyRating}/5</p>
                  <p className="text-sm text-gray-600">Based on local data</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Crime Rate</h4>
                  <p className="text-lg font-bold text-gray-900">{currentData.crimeRate}</p>
                  <p className="text-sm text-gray-600">Last 12 months</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Infrastructure</h4>
                  <p className="text-2xl font-bold text-gray-900">{currentData.infrastructure}/5</p>
                  <p className="text-sm text-gray-600">Quality rating</p>
                </div>
              </div>
            </div>

            {/* Activity Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Activities</h3>
              {nearbyActivities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{activity.title}</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {activity.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {activity.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {activity.participants}/{activity.maxParticipants}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {activity.distance}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {activity.rating}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-1">
                        📍 {activity.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        Organized by <span className="font-medium">{activity.organizer}</span>
                      </p>
                    </div>
                    
                    <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700">
                      Join Activity
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Partners</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities or partners..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Community Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Amenities</h3>
              
              {/* Hospitals */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Stethoscope className="h-5 w-5 text-red-500 mr-2" />
                  Hospitals
                </h4>
                <div className="space-y-2">
                  {currentData.hospitals.map((hospital, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{hospital.name}</p>
                        <p className="text-xs text-gray-600">{hospital.distance}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs text-gray-600">{hospital.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schools */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                  Schools
                </h4>
                <div className="space-y-2">
                  {currentData.schools.map((school, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{school.name}</p>
                        <p className="text-xs text-gray-600">{school.distance}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs text-gray-600">{school.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parks */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <TreePine className="h-5 w-5 text-green-500 mr-2" />
                  Parks & Recreation
                </h4>
                <div className="space-y-2">
                  {currentData.parks.map((park, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{park.name}</p>
                        <p className="text-xs text-gray-600">{park.distance}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs text-gray-600">{park.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{currentData.amenities.malls}</p>
                  <p className="text-xs text-gray-600">Malls</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{currentData.amenities.gyms}</p>
                  <p className="text-xs text-gray-600">Gyms</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Home className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{currentData.amenities.restaurants}</p>
                  <p className="text-xs text-gray-600">Restaurants</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <Car className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{currentData.amenities.banks}</p>
                  <p className="text-xs text-gray-600">Banks</p>
                </div>
              </div>
            </div>

            {/* Fitness Partners */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Partners</h3>
              <div className="space-y-4">
                {fitnessPartners.map((partner) => (
                  <div key={partner.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {partner.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{partner.name}</p>
                      <p className="text-xs text-gray-500">{partner.activities.join(', ')}</p>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{partner.distance} • {partner.location}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span className="text-xs text-gray-500">{partner.rating} • {partner.completedActivities} activities</span>
                      </div>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospitality Rating */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Hospitality</h3>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-600 rounded-full mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{currentData.hospitality}/5</p>
                <p className="text-sm text-gray-600 mb-4">Friendliness Rating</p>
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(currentData.hospitality)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;