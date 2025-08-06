import React from 'react';
import Button from '../components/button';
import { useNavigate } from 'react-router-dom';

const ProviderInfo = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/provider/login');
  };

  return (
    <div className="mb-10 px-4 pb-6">
      <h1 className="text-center text-2xl font-bold mb-9">Service Point</h1>

      <div className="flex justify-center mt-2 mb-6">
        <img
          src="src/assets/image_for_provider_info.svg"
          alt="Provider Info"
          className="w-full max-w-xs"
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <h2 className="text-xl font-bold mt-10">Join our network of professionals</h2>
        <p className="text-gray-600 mb-10 mt-5">
          Connect with customers seeking your expertise and grow your business.
        </p>
        
        <div className="w-full space-y-3 max-w-xs mt-16">
          <Button 
            label="Become a Provider" 
            variant="primary"
            fullWidth
            onClick={() => console.log("Become a Provider clicked")}
          />
          
          <Button 
            label="Already a Member" 
            variant="text"
            fullWidth
            onClick={goToLoginPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProviderInfo;