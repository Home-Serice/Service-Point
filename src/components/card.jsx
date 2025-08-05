import React from 'react';

const Card = ({ title, description, image, onClick }) => {
  return (
    <div 
      className="flex flex-col rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full relative" style={{ paddingBottom: '78%' }}>
        <img 
          src={image} 
          alt={title} 
          className="absolute w-full h-full object-cover bg-gray-50"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default Card;