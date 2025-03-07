'use client';
import { useState } from 'react';
import { Person } from '../types/Person';

interface PersonComponentProps {
  person: Person;
}

export function PersonComponent({ person }: PersonComponentProps) {
  const [activeProperty, setActiveProperty] = useState<keyof Person>('name');
  
  const iconConfig = [
    { property: 'name' as keyof Person, icon: '👤', text: "Hi, my name is" },
    { property: 'email' as keyof Person, icon: '✉️', text: "My email address is"},
    { property: 'birthday' as keyof Person, icon: '📝', text: "My birthday is" },
    { property: 'phone' as keyof Person, icon: '📍', text: "My phone number is" },
    { property: 'password' as keyof Person, icon: '🔒', text: "My password is" },
  ];
  
  const activeText = iconConfig.find(item => item.property === activeProperty)?.text || 'Hi, My name is';
  
  return (
    <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center pb-5 transition-transform duration-300 hover:translate-y-1 m-5">
      <div className="w-full h-36 bg-gray-100 flex justify-center relative">
        <img 
          src={person.profile || '/default-avatar.png'} 
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white absolute top-16"
        />
      </div>
      
      <div className="mt-16 text-center px-5">
        <h2 className="text-gray-600 text-sm mb-2 font-normal">{activeText}</h2>
        <p className="text-2xl font-bold mb-6 min-h-16 flex items-center justify-center break-words">
          {person[activeProperty]}
        </p>
      </div>
      
      <div className="grid grid-cols-5 w-4/5 gap-3">
        {iconConfig.map(({ property, icon }) => (
          <button
            key={property}
            className={`bg-transparent border-none text-xl cursor-pointer p-2 rounded-full transition-all duration-200 hover:bg-gray-100 hover:scale-110 ${activeProperty === property ? 'bg-gray-100 scale-110' : ''}`}
            onMouseEnter={() => setActiveProperty(property)}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}