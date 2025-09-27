// Community Data for all 29 Indian States
// Each state has 10 cities with multiple communities
// Total: 300+ communities across India

export interface Community {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  area: string;
  image: string;
  priceRange: string;
  availableRooms: number;
  safetyRating: number;
  hospitalityScore: number;
  cleanlinessRating: number;
  crimeRate: 'Low' | 'Medium' | 'High';
  recentCrimes: number;
  trend: 'improving' | 'stable' | 'declining';
  isVerified: boolean;
  highlights: string[];
  amenities: {
    schools: number;
    hospitals: number;
    banks: number;
    malls: number;
    restaurants: number;
    gyms: number;
    parks: number;
    pharmacy: number;
    supermarkets: number;
    atms: number;
    petrolPumps: number;
    transport: number;
    wifi: boolean;
    powerBackup: boolean;
    waterSupply: boolean;
    security: boolean;
    cctv: boolean;
    parking: boolean;
    elevator: boolean;
    garden: boolean;
    playground: boolean;
    clubhouse: boolean;
    swimming: boolean;
    metro: boolean;
    bus: boolean;
  };
  infrastructure: {
    roadQuality: number;
    waterSupply: number;
    powerSupply: number;
    internetSpeed: number;
    wasteManagement: number;
    streetLights: number;
    drainage: number;
    publicTransport: number;
  };
  demographics: {
    totalResidents: number;
    averageAge: number;
    familyFriendly: number;
    studentPopulation: number;
  };
  contactInfo: {
    propertyManager: string;
    phone: string;
    email: string;
    whatsapp: string;
    address: string;
  };
}

// Real images from Pexels for Indian communities
const communityImages = [
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3288100/pexels-photo-3288100.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/5563473/pexels-photo-5563473.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/6186810/pexels-photo-6186810.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7534555/pexels-photo-7534555.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8134848/pexels-photo-8134848.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8134849/pexels-photo-8134849.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8134850/pexels-photo-8134850.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8134851/pexels-photo-8134851.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8134852/pexels-photo-8134852.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8134853/pexels-photo-8134853.jpeg?auto=compress&cs=tinysrgb&w=800'
];

// Generate random but realistic data
const getRandomImage = () => communityImages[Math.floor(Math.random() * communityImages.length)];
const getRandomRating = (min: number = 3.5, max: number = 5) => Math.round((Math.random() * (max - min) + min) * 10) / 10;
const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomCrimeRate = (): 'Low' | 'Medium' | 'High' => {
  const rates = ['Low', 'Medium', 'High'];
  return rates[Math.floor(Math.random() * rates.length)] as 'Low' | 'Medium' | 'High';
};

// All 29 Indian States with 10 cities each
const statesCitiesData = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Kadapa', 'Anantapur', 'Eluru'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Ziro', 'Bomdila', 'Tawang', 'Tezu', 'Changlang', 'Namsai', 'Seppa'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon', 'Karimganj', 'Sivasagar'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Mahasamund'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Lajpat Nagar', 'Karol Bagh', 'Connaught Place', 'Janakpuri', 'Vasant Kunj', 'Saket', 'Pitampura'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Sanquelim', 'Valpoi', 'Quepem'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Navsari'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula'],
  'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Kullu', 'Hamirpur', 'Una', 'Bilaspur', 'Chamba', 'Kangra'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Phusro', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary', 'Bijapur', 'Shimoga'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Malappuram', 'Kannur', 'Kasaragod'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli'],
  'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Kakching', 'Ukhrul', 'Senapati', 'Tamenglong', 'Chandel', 'Jiribam'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongpoh', 'Baghmara', 'Williamnagar', 'Resubelpara', 'Mawkyrwat', 'Ampati', 'Mairang'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Kolasib', 'Serchhip', 'Lawngtlai', 'Mamit', 'Hnahthial', 'Saitual'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Kiphire', 'Longleng', 'Peren'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Firozpur', 'Hoshiarpur', 'Batala'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Bharatpur', 'Sikar'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Jorethang', 'Nayabazar', 'Rangpo', 'Singtam', 'Yuksom', 'Pelling'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukudi'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet'],
  'Tripura': ['Agartala', 'Dharmanagar', 'Udaipur', 'Kailashahar', 'Belonia', 'Khowai', 'Teliamura', 'Sabroom', 'Kamalpur', 'Amarpur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly', 'Aligarh', 'Moradabad'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Kotdwar', 'Manglaur', 'Sitarganj'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Malda', 'Bardhaman', 'Kharagpur', 'Haldia', 'Krishnanagar']
};

// Generate communities for all states
export const communityDatabase: Community[] = [];

let communityId = 1;

Object.entries(statesCitiesData).forEach(([state, cities]) => {
  cities.forEach((city, cityIndex) => {
    // Generate 1-3 communities per city to ensure we have 300+ total
    const communitiesPerCity = cityIndex < 5 ? 2 : 1; // More communities for first 5 cities
    
    for (let i = 0; i < communitiesPerCity; i++) {
      const communityNames = [
        'Heights', 'Gardens', 'Residency', 'Enclave', 'Paradise', 'Valley', 'Plaza', 
        'Towers', 'Apartments', 'Complex', 'Homes', 'Villas', 'Estate', 'Park',
        'Green', 'Royal', 'Premium', 'Elite', 'Grand', 'Heritage'
      ];
      
      const areas = [
        'Central', 'East', 'West', 'North', 'South', 'Downtown', 'Uptown', 
        'Old City', 'New Town', 'Commercial', 'Residential', 'IT Hub'
      ];

      const communityName = `${city} ${communityNames[Math.floor(Math.random() * communityNames.length)]}`;
      const area = `${areas[Math.floor(Math.random() * areas.length)]} ${city}`;
      
      const managerNames = [
        'Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sunita Patel', 'Vikram Reddy',
        'Kavya Nair', 'Arjun Gupta', 'Meera Joshi', 'Rohit Agarwal', 'Sneha Iyer',
        'Karthik Menon', 'Divya Rao', 'Suresh Chandra', 'Lakshmi Devi', 'Manoj Tiwari'
      ];

      const community: Community = {
        id: `community-${communityId}`,
        name: communityName,
        location: area,
        city: city,
        state: state,
        area: area,
        image: getRandomImage(),
        priceRange: `₹${getRandomNumber(8, 35)}K - ₹${getRandomNumber(40, 80)}K`,
        availableRooms: getRandomNumber(5, 25),
        safetyRating: getRandomRating(3.8, 5.0),
        hospitalityScore: getRandomRating(3.5, 5.0),
        cleanlinessRating: getRandomRating(3.6, 4.9),
        crimeRate: getRandomCrimeRate(),
        recentCrimes: getRandomNumber(0, 8),
        trend: ['improving', 'stable', 'declining'][Math.floor(Math.random() * 3)] as any,
        isVerified: Math.random() > 0.3,
        highlights: [
          'Safe Neighborhood',
          'Good Connectivity',
          'Family Friendly',
          'Near Metro',
          'Shopping Nearby',
          'Parks & Recreation'
        ].slice(0, getRandomNumber(3, 6)),
        amenities: {
          schools: getRandomNumber(2, 15),
          hospitals: getRandomNumber(1, 8),
          banks: getRandomNumber(5, 25),
          malls: getRandomNumber(1, 6),
          restaurants: getRandomNumber(20, 80),
          gyms: getRandomNumber(3, 12),
          parks: getRandomNumber(2, 8),
          pharmacy: getRandomNumber(3, 10),
          supermarkets: getRandomNumber(5, 15),
          atms: getRandomNumber(8, 20),
          petrolPumps: getRandomNumber(2, 8),
          transport: getRandomNumber(6, 10),
          wifi: Math.random() > 0.2,
          powerBackup: Math.random() > 0.3,
          waterSupply: Math.random() > 0.1,
          security: Math.random() > 0.25,
          cctv: Math.random() > 0.4,
          parking: Math.random() > 0.2,
          elevator: Math.random() > 0.5,
          garden: Math.random() > 0.3,
          playground: Math.random() > 0.4,
          clubhouse: Math.random() > 0.6,
          swimming: Math.random() > 0.7,
          metro: Math.random() > 0.6,
          bus: Math.random() > 0.2
        },
        infrastructure: {
          roadQuality: getRandomRating(3.0, 5.0),
          waterSupply: getRandomRating(3.2, 4.8),
          powerSupply: getRandomRating(3.5, 4.9),
          internetSpeed: getRandomRating(3.8, 5.0),
          wasteManagement: getRandomRating(3.0, 4.5),
          streetLights: getRandomRating(3.5, 4.8),
          drainage: getRandomRating(2.8, 4.5),
          publicTransport: getRandomRating(3.2, 4.7)
        },
        demographics: {
          totalResidents: getRandomNumber(150, 800),
          averageAge: getRandomNumber(28, 45),
          familyFriendly: getRandomNumber(60, 95),
          studentPopulation: getRandomNumber(15, 40)
        },
        contactInfo: {
          propertyManager: managerNames[Math.floor(Math.random() * managerNames.length)],
          phone: `+91 ${getRandomNumber(90000, 99999)} ${getRandomNumber(10000, 99999)}`,
          email: `${communityName.toLowerCase().replace(/\s+/g, '')}@properties.in`,
          whatsapp: `+91 ${getRandomNumber(90000, 99999)} ${getRandomNumber(10000, 99999)}`,
          address: `${area}, ${city}, ${state} ${getRandomNumber(100000, 999999)}`
        }
      };

      communityDatabase.push(community);
      communityId++;
    }
  });
});

console.log(`Generated ${communityDatabase.length} communities across ${Object.keys(statesCitiesData).length} states`);

// Helper functions for search and filtering
export const getAllStates = (): string[] => {
  return Object.keys(statesCitiesData);
};

export const getAllCities = (): string[] => {
  return Object.values(statesCitiesData).flat();
};

export const getCitiesByState = (state: string): string[] => {
  return statesCitiesData[state as keyof typeof statesCitiesData] || [];
};

export const getAreasByCity = (city: string): string[] => {
  const areas = communityDatabase
    .filter(community => community.city === city)
    .map(community => community.area);
  return [...new Set(areas)];
};

export const searchCommunities = (query: string): Community[] => {
  if (!query.trim()) return communityDatabase;
  
  const searchTerm = query.toLowerCase();
  return communityDatabase.filter(community =>
    community.name.toLowerCase().includes(searchTerm) ||
    community.city.toLowerCase().includes(searchTerm) ||
    community.state.toLowerCase().includes(searchTerm) ||
    community.location.toLowerCase().includes(searchTerm) ||
    community.area.toLowerCase().includes(searchTerm)
  );
};

export const getCommunityById = (id: string): Community | undefined => {
  return communityDatabase.find(community => community.id === id);
};

export const getCommunitiesByState = (state: string): Community[] => {
  return communityDatabase.filter(community => community.state === state);
};

export const getCommunitiesByCity = (city: string): Community[] => {
  return communityDatabase.filter(community => community.city === city);
};

export const getCommunitiesByArea = (area: string): Community[] => {
  return communityDatabase.filter(community => community.area === area);
};