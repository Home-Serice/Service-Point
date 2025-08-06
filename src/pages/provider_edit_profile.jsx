import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable Form Field Component
const FormField = ({ label, type = "text", value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

// Reusable Service Item Component
const ServiceItem = ({ icon, name, rate, onRateChange, onRemove }) => (
  <div className="flex items-center justify-between py-3 border-b">
    <div className="flex items-center">
      {icon}
      <div className="ml-3">
        <p className="font-medium">{name}</p>
        <div className="flex items-center">
          <p className="text-sm text-gray-500">Hourly rate:</p>
          <input
            type="number"
            className="ml-2 w-12 p-1 text-sm border border-gray-300 rounded"
            value={rate}
            onChange={onRateChange}
          />
          <span className="ml-1 text-sm text-gray-500">$</span>
        </div>
      </div>
    </div>
    <button 
      onClick={onRemove}
      className="p-1 text-gray-500 hover:text-red-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
);

// Reusable Certification Item Component
const CertificationItem = ({ name, status, date, onStatusChange, onRemove }) => (
  <div className="flex items-center justify-between py-3 border-b">
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-xs text-gray-500">
        {status ? "Verified" : "Pending Verification"} • {date}
      </p>
    </div>
    <div className="flex items-center">
      <div 
        className={`w-5 h-5 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'} mr-3 flex items-center justify-center`}
      >
        {status && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <button 
        onClick={onRemove}
        className="p-1 text-gray-500 hover:text-red-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
);

// Main Component
const ProviderEditProfile = () => {
  const navigate = useNavigate();

  // State for profile data
  const [profileData, setProfileData] = useState({
    name: "Ethan Carter",
    primaryProfession: "Plumber",
    secondaryProfession: "Electrician",
    contactNumber: "",
    email: "",
    bio: "",
    profileImage: null,
    imagePreview: "https://i.pravatar.cc/150?img=32"
  });

  // State for services
  const [services, setServices] = useState([
    { id: 1, name: "House Cleaning", rate: 30, icon: <HomeIcon /> },
    { id: 2, name: "Lawn Care", rate: 25, icon: <GrassIcon /> },
    { id: 3, name: "Pet Sitting", rate: 20, icon: <PetIcon /> }
  ]);

  // State for certifications
  const [certifications, setCertifications] = useState([
    { id: 1, name: "Plumbing License", verified: true, date: "Added: February 2022" },
    { id: 2, name: "HVAC Certification", verified: false, date: "Added: March 2023" }
  ]);

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        profileImage: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  // Handle service rate change
  const handleRateChange = (id, newRate) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, rate: newRate } : service
    ));
  };

  // Handle remove service
  const handleRemoveService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  // Handle certification status change
  const handleCertStatusChange = (id) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, verified: !cert.verified } : cert
    ));
  };

  // Handle remove certification
  const handleRemoveCert = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  // Handle adding new certification
  const [newCertName, setNewCertName] = useState("");
  const handleAddCertification = () => {
    if (newCertName.trim()) {
      const newCert = {
        id: Date.now(),
        name: newCertName,
        verified: false,
        date: `Added: August 2025`
      };
      setCertifications([...certifications, newCert]);
      setNewCertName("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile data:", { ...profileData, services, certifications });
    // Add API call to save data here
    navigate('/provider/profile');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate('/provider/profile')} className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-xl font-medium">Edit Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="flex flex-col items-center py-6 border-b">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img src={profileData.imagePreview} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1.5 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
              <input
                id="profile-image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="text-center mt-3">
              <h2 className="text-lg font-bold">{profileData.name}</h2>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500">{profileData.primaryProfession}</p>
                <p className="text-xs text-gray-400">{profileData.secondaryProfession}</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-2">
            {/* Contact Info */}
            <FormField
              label="Contact Number"
              value={profileData.contactNumber}
              onChange={(e) => setProfileData({...profileData, contactNumber: e.target.value})}
              placeholder="Enter your phone number"
            />

            <FormField
              label="Email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              placeholder="Enter your email address"
            />

            {/* Bio */}
            <div className="mb-4 border-t pt-4">
              <label className="block text-sm text-gray-600 mb-1">Bio</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                placeholder="Tell clients about yourself..."
                rows={4}
              />
            </div>

            {/* Services Section */}
            <div className="border-t pt-4">
              <h3 className="font-bold mb-2">Services</h3>
              <div>
                {services.map(service => (
                  <ServiceItem
                    key={service.id}
                    icon={service.icon}
                    name={service.name}
                    rate={service.rate}
                    onRateChange={(e) => handleRateChange(service.id, e.target.value)}
                    onRemove={() => handleRemoveService(service.id)}
                  />
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="border-t pt-4">
              <h3 className="font-bold mb-2">Certifications</h3>
              <div className="mb-4">
                {certifications.map(cert => (
                  <CertificationItem
                    key={cert.id}
                    name={cert.name}
                    status={cert.verified}
                    date={cert.date}
                    onStatusChange={() => handleCertStatusChange(cert.id)}
                    onRemove={() => handleRemoveCert(cert.id)}
                  />
                ))}
              </div>
              
              {/* Add New Certification */}
              <div className="flex mb-4">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Add certification..."
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="bg-black text-white px-4 py-2 rounded-r-md"
                >
                  Add Certification
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Save Button */}
      <div className="p-4 border-t">
        <button 
          onClick={handleSubmit}
          className="bg-black text-white w-full py-3 rounded-full font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Icon components
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const GrassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const PetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
  </svg>
);

export default ProviderEditProfile;