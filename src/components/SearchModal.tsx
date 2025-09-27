import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Search, 
  MapPin, 
  DollarSign, 
  Heart, 
  GraduationCap, 
  Car, 
  Landmark, 
  Shield, 
  AlertTriangle,
  ChevronRight,
  Filter,
  Stethoscope,
  ShoppingCart,
  Wifi,
  Zap,
  Droplets,
  TreePine,
  Building,
  Users,
  Clock,
  Star
} from 'lucide-react';
import { getAllStates, getCitiesByState, getAreasByCity, searchCommunities, Community } from '../data/communityData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (results: Community[], preferences: SearchPreferences) => void;
}

export interface SearchPreferences {
  state: string;
  city: string;
  area: string;
  maxBudget: number;
  minHospitality: number;
  minSchools: number;
  minTransport: number;
  minBanks: number;
  minSafety: number;
  minHospitals: number;
  minMalls: number;
  minRestaurants: number;
  minGyms: number;
  minParks: number;
  minPharmacy: number;
  minSupermarkets: number;
  minAtms: number;
  minPetrolPumps: number;
  crimeRate: 'all' | 'Low' | 'Medium' | 'High';
  verifiedOnly: boolean;
  wifiRequired: boolean;
  powerBackupRequired: boolean;
  waterSupplyRequired: boolean;
  securityRequired: boolean;
  cctvRequired: boolean;
  parkingRequired: boolean;
  elevatorRequired: boolean;
  gardenRequired: boolean;
  playgroundRequired: boolean;
  clubhouseRequired: boolean;
  swimmingRequired: boolean;
  metroRequired: boolean;
  busRequired: boolean;
  minRoadQuality: number;
  minWaterSupply: number;
  minPowerSupply: number;
  minInternetSpeed: number;
  minWasteManagement: number;
  minStreetLights: number;
  minDrainage: number;
  minPublicTransport: number;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [preferences, setPreferences] = useState<SearchPreferences>({
    state: '',
    city: '',
    area: '',
    maxBudget: 30000,
    minHospitality: 0,
    minSchools: 0,
    minTransport: 0,
    minBanks: 0,
    minSafety: 0,
    minHospitals: 0,
    minMalls: 0,
    minRestaurants: 0,
    minGyms: 0,
    minParks: 0,
    minPharmacy: 0,
    minSupermarkets: 0,
    minAtms: 0,
    minPetrolPumps: 0,
    crimeRate: 'all',
    verifiedOnly: false,
    wifiRequired: false,
    powerBackupRequired: false,
    waterSupplyRequired: false,
    securityRequired: false,
    cctvRequired: false,
    parkingRequired: false,
    elevatorRequired: false,
    gardenRequired: false,
    playgroundRequired: false,
    clubhouseRequired: false,
    swimmingRequired: false,
    metroRequired: false,
    busRequired: false,
    minRoadQuality: 0,
    minWaterSupply: 0,
    minPowerSupply: 0,
    minInternetSpeed: 0,
    minWasteManagement: 0,
    minStreetLights: 0,
    minDrainage: 0,
    minPublicTransport: 0
  });

  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);

  const states = getAllStates();

  // Update cities when state changes
  useEffect(() => {
    if (preferences.state) {
      const cities = getCitiesByState(preferences.state);
      setAvailableCities(cities);
      setPreferences(prev => ({ ...prev, city: '', area: '' }));
      setAvailableAreas([]);
    } else {
      setAvailableCities([]);
      setAvailableAreas([]);
    }
  }, [preferences.state]);

  // Update areas when city changes
  useEffect(() => {
    if (preferences.city) {
      const areas = getAreasByCity(preferences.city);
      setAvailableAreas(areas);
      setPreferences(prev => ({ ...prev, area: '' }));
    } else {
      setAvailableAreas([]);
    }
  }, [preferences.city]);

  const handleSearch = () => {
    let results = searchCommunities(searchQuery);
    
    // Apply filters
    results = results.filter(community => {
      const matchesState = !preferences.state || community.state === preferences.state;
      const matchesCity = !preferences.city || community.city === preferences.city;
      const matchesArea = !preferences.area || community.area === preferences.area;
      const matchesSafety = community.safetyRating >= preferences.minSafety;
      const matchesHospitality = community.hospitalityScore >= preferences.minHospitality;
      const matchesCrimeRate = preferences.crimeRate === 'all' || community.crimeRate === preferences.crimeRate;
      const matchesVerified = !preferences.verifiedOnly || community.isVerified;
      
      // Amenity filters
      const matchesSchools = community.amenities.schools >= preferences.minSchools;
      const matchesBanks = community.amenities.banks >= preferences.minBanks;
      const matchesTransport = community.amenities.transport >= preferences.minTransport;
      const matchesHospitals = community.amenities.hospitals >= preferences.minHospitals;
      const matchesMalls = community.amenities.malls >= preferences.minMalls;
      const matchesRestaurants = community.amenities.restaurants >= preferences.minRestaurants;
      const matchesGyms = community.amenities.gyms >= preferences.minGyms;
      const matchesParks = community.amenities.parks >= preferences.minParks;
      const matchesPharmacy = community.amenities.pharmacy >= preferences.minPharmacy;
      const matchesSupermarkets = community.amenities.supermarkets >= preferences.minSupermarkets;
      const matchesAtms = community.amenities.atms >= preferences.minAtms;
      const matchesPetrolPumps = community.amenities.petrolPumps >= preferences.minPetrolPumps;
      
      // Facility filters
      const matchesWifi = !preferences.wifiRequired || community.amenities.wifi;
      const matchesPowerBackup = !preferences.powerBackupRequired || community.amenities.powerBackup;
      const matchesWaterSupply = !preferences.waterSupplyRequired || community.amenities.waterSupply;
      const matchesSecurity = !preferences.securityRequired || community.amenities.security;
      const matchesCctv = !preferences.cctvRequired || community.amenities.cctv;
      const matchesParking = !preferences.parkingRequired || community.amenities.parking;
      const matchesElevator = !preferences.elevatorRequired || community.amenities.elevator;
      const matchesGarden = !preferences.gardenRequired || community.amenities.garden;
      const matchesPlayground = !preferences.playgroundRequired || community.amenities.playground;
      const matchesClubhouse = !preferences.clubhouseRequired || community.amenities.clubhouse;
      const matchesSwimming = !preferences.swimmingRequired || community.amenities.swimming;
      const matchesMetro = !preferences.metroRequired || community.amenities.metro;
      const matchesBus = !preferences.busRequired || community.amenities.bus;
      
      // Infrastructure filters
      const matchesRoadQuality = community.infrastructure.roadQuality >= preferences.minRoadQuality;
      const matchesWaterSupplyInfra = community.infrastructure.waterSupply >= preferences.minWaterSupply;
      const matchesPowerSupplyInfra = community.infrastructure.powerSupply >= preferences.minPowerSupply;
      const matchesInternetSpeed = community.infrastructure.internetSpeed >= preferences.minInternetSpeed;
      const matchesWasteManagement = community.infrastructure.wasteManagement >= preferences.minWasteManagement;
      const matchesStreetLights = community.infrastructure.streetLights >= preferences.minStreetLights;
      const matchesDrainage = community.infrastructure.drainage >= preferences.minDrainage;
      const matchesPublicTransport = community.infrastructure.publicTransport >= preferences.minPublicTransport;
      
      // Budget matching (extract numbers from price range)
      const priceNumbers = community.priceRange.match(/\d+/g);
      const maxPrice = priceNumbers ? parseInt(priceNumbers[priceNumbers.length - 1]) * 1000 : 0;
      const matchesBudget = maxPrice <= preferences.maxBudget;

      return matchesState && matchesCity && matchesArea && matchesSafety && matchesHospitality && 
             matchesCrimeRate && matchesVerified && matchesSchools && matchesBanks && 
             matchesTransport && matchesBudget && matchesHospitals && matchesMalls &&
             matchesRestaurants && matchesGyms && matchesParks && matchesPharmacy &&
             matchesSupermarkets && matchesAtms && matchesPetrolPumps && matchesWifi &&
             matchesPowerBackup && matchesWaterSupply && matchesSecurity && matchesCctv &&
             matchesParking && matchesElevator && matchesGarden && matchesPlayground &&
             matchesClubhouse && matchesSwimming && matchesMetro && matchesBus &&
             matchesRoadQuality && matchesWaterSupplyInfra && matchesPowerSupplyInfra &&
             matchesInternetSpeed && matchesWasteManagement && matchesStreetLights &&
             matchesDrainage && matchesPublicTransport;
    });

    onSearch(results, preferences);
    onClose();
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Find Your Perfect Community</h2>
                <p className="text-emerald-100 mt-1">Step {currentStep} of 4</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-emerald-700 rounded-full h-2">
              <motion.div
                className="bg-white rounded-full h-2"
                initial={{ width: '25%' }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Step 1: Location Search */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-6 w-6 text-emerald-600 mr-2" />
                    Where do you want to live?
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search by Community Name or Location
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="e.g., Koramangala, Dwarka, Bandra..."
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select State
                        </label>
                        <select
                          value={preferences.state}
                          onChange={(e) => setPreferences({...preferences, state: e.target.value})}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="">Choose State</option>
                          {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>

                      {preferences.state && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select City
                          </label>
                          <select
                            value={preferences.city}
                            onChange={(e) => setPreferences({...preferences, city: e.target.value})}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="">Choose City</option>
                            {availableCities.map((city) => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {preferences.city && availableAreas.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Area (Optional)
                          </label>
                          <select
                            value={preferences.area}
                            onChange={(e) => setPreferences({...preferences, area: e.target.value})}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="">All Areas</option>
                            {availableAreas.map((area) => (
                              <option key={area} value={area}>{area}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Quick State Buttons */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3">Popular States:</p>
                      <div className="flex flex-wrap gap-2">
                        {['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Gujarat', 'Telangana'].map((state) => (
                          <button
                            key={state}
                            onClick={() => setPreferences({...preferences, state})}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                              preferences.state === state
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                            }`}
                          >
                            {state}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget & Basic Preferences */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-6 w-6 text-emerald-600 mr-2" />
                  Budget & Basic Preferences
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Budget: ₹{preferences.maxBudget.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="5000"
                      max="50000"
                      step="1000"
                      value={preferences.maxBudget}
                      onChange={(e) => setPreferences({...preferences, maxBudget: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹5K</span>
                      <span>₹50K</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Heart className="h-4 w-4 text-pink-500 mr-1" />
                      Min Hospitality: {preferences.minHospitality}/5
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={preferences.minHospitality}
                      onChange={(e) => setPreferences({...preferences, minHospitality: parseFloat(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Shield className="h-4 w-4 text-green-500 mr-1" />
                      Min Safety Rating: {preferences.minSafety}/5
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={preferences.minSafety}
                      onChange={(e) => setPreferences({...preferences, minSafety: parseFloat(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                      Crime Rate Preference
                    </label>
                    <select
                      value={preferences.crimeRate}
                      onChange={(e) => setPreferences({...preferences, crimeRate: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="all">Any</option>
                      <option value="Low">Low Crime Only</option>
                      <option value="Medium">Medium or Lower</option>
                      <option value="High">All Levels</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={preferences.verifiedOnly}
                    onChange={(e) => setPreferences({...preferences, verifiedOnly: e.target.checked})}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="verified" className="ml-2 text-sm text-gray-700">
                    Show only verified communities
                  </label>
                </div>
              </motion.div>
            )}

            {/* Step 3: Amenities & Services */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="h-6 w-6 text-emerald-600 mr-2" />
                  Amenities & Services
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <GraduationCap className="h-4 w-4 text-blue-500 mr-1" />
                      Min Schools: {preferences.minSchools}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={preferences.minSchools}
                      onChange={(e) => setPreferences({...preferences, minSchools: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Stethoscope className="h-4 w-4 text-red-500 mr-1" />
                      Min Hospitals: {preferences.minHospitals}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={preferences.minHospitals}
                      onChange={(e) => setPreferences({...preferences, minHospitals: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Landmark className="h-4 w-4 text-purple-500 mr-1" />
                      Min Banks: {preferences.minBanks}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={preferences.minBanks}
                      onChange={(e) => setPreferences({...preferences, minBanks: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <ShoppingCart className="h-4 w-4 text-green-500 mr-1" />
                      Min Malls: {preferences.minMalls}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={preferences.minMalls}
                      onChange={(e) => setPreferences({...preferences, minMalls: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Car className="h-4 w-4 text-orange-500 mr-1" />
                      Min Transport Score: {preferences.minTransport}/10
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={preferences.minTransport}
                      onChange={(e) => setPreferences({...preferences, minTransport: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <TreePine className="h-4 w-4 text-green-600 mr-1" />
                      Min Parks: {preferences.minParks}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={preferences.minParks}
                      onChange={(e) => setPreferences({...preferences, minParks: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Essential Facilities */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Essential Facilities</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { key: 'wifiRequired', label: 'WiFi', icon: <Wifi className="h-4 w-4" /> },
                      { key: 'powerBackupRequired', label: 'Power Backup', icon: <Zap className="h-4 w-4" /> },
                      { key: 'waterSupplyRequired', label: 'Water Supply', icon: <Droplets className="h-4 w-4" /> },
                      { key: 'securityRequired', label: 'Security', icon: <Shield className="h-4 w-4" /> },
                      { key: 'cctvRequired', label: 'CCTV', icon: <Shield className="h-4 w-4" /> },
                      { key: 'parkingRequired', label: 'Parking', icon: <Car className="h-4 w-4" /> },
                      { key: 'elevatorRequired', label: 'Elevator', icon: <Building className="h-4 w-4" /> },
                      { key: 'gardenRequired', label: 'Garden', icon: <TreePine className="h-4 w-4" /> },
                      { key: 'playgroundRequired', label: 'Playground', icon: <Users className="h-4 w-4" /> },
                      { key: 'clubhouseRequired', label: 'Clubhouse', icon: <Building className="h-4 w-4" /> },
                      { key: 'swimmingRequired', label: 'Swimming Pool', icon: <Droplets className="h-4 w-4" /> },
                      { key: 'metroRequired', label: 'Metro Access', icon: <Car className="h-4 w-4" /> }
                    ].map((facility) => (
                      <label key={facility.key} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences[facility.key as keyof SearchPreferences] as boolean}
                          onChange={(e) => setPreferences({...preferences, [facility.key]: e.target.checked})}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        {facility.icon}
                        <span className="text-sm text-gray-700">{facility.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Infrastructure Quality */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="h-6 w-6 text-emerald-600 mr-2" />
                  Infrastructure Quality Requirements
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: 'minRoadQuality', label: 'Road Quality', icon: <Car className="h-4 w-4" /> },
                    { key: 'minWaterSupply', label: 'Water Supply', icon: <Droplets className="h-4 w-4" /> },
                    { key: 'minPowerSupply', label: 'Power Supply', icon: <Zap className="h-4 w-4" /> },
                    { key: 'minInternetSpeed', label: 'Internet Speed', icon: <Wifi className="h-4 w-4" /> },
                    { key: 'minWasteManagement', label: 'Waste Management', icon: <Building className="h-4 w-4" /> },
                    { key: 'minStreetLights', label: 'Street Lights', icon: <Building className="h-4 w-4" /> },
                    { key: 'minDrainage', label: 'Drainage System', icon: <Droplets className="h-4 w-4" /> },
                    { key: 'minPublicTransport', label: 'Public Transport', icon: <Car className="h-4 w-4" /> }
                  ].map((infra) => (
                    <div key={infra.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        {infra.icon}
                        <span className="ml-1">{infra.label}: {preferences[infra.key as keyof SearchPreferences]}/5</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={preferences[infra.key as keyof SearchPreferences] as number}
                        onChange={(e) => setPreferences({...preferences, [infra.key]: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-medium text-emerald-900 mb-2 flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Search Summary:
                  </h4>
                  <div className="text-sm text-emerald-700 space-y-1">
                    <p>• Location: {preferences.city || 'Any City'} {preferences.state && `(${preferences.state})`}</p>
                    {preferences.area && <p>• Area: {preferences.area}</p>}
                    <p>• Budget: Up to ₹{preferences.maxBudget.toLocaleString()}</p>
                    <p>• Min Safety: {preferences.minSafety}/5</p>
                    <p>• Min Hospitality: {preferences.minHospitality}/5</p>
                    <p>• Crime Rate: {preferences.crimeRate === 'all' ? 'Any' : preferences.crimeRate}</p>
                    {preferences.verifiedOnly && <p>• Verified communities only</p>}
                    {preferences.minSchools > 0 && <p>• Min Schools: {preferences.minSchools}</p>}
                    {preferences.minHospitals > 0 && <p>• Min Hospitals: {preferences.minHospitals}</p>}
                    {preferences.wifiRequired && <p>• WiFi required</p>}
                    {preferences.metroRequired && <p>• Metro access required</p>}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              ) : (
                <button
                  onClick={handleSearch}
                  className="px-8 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center font-medium"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find Communities
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;