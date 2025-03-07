// app/random-user/page.tsx
'use client';

import { useState } from 'react';
import { useRandomUser } from '../app/hooks/randomUserHook';
import { PersonComponent } from '../app/components/PersonComponent';

export default function RandomUserPage() {
  const [userCount, setUserCount] = useState<number>(1);
  const { people, loading, error, refreshUsers } = useRandomUser(userCount);

  const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserCount(Number(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Random User Generator</h1>
      
      <div className="flex justify-center mb-6">
        <div className="mr-4">
          <label htmlFor="userCount" className="block mb-2">Number of users:</label>
          <select 
            id="userCount" 
            value={userCount} 
            onChange={handleCountChange}
            className="border rounded px-3 py-2"
          >
            {[1, 3, 5, 10].map(count => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={refreshUsers}
          className="mt-6 px-5 py-2 bg-green-600 text-white border-none rounded cursor-pointer text-base transition-colors hover:bg-green-700"
        >
          Refresh Users
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-64 text-center px-5">
          <p>Loading users...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-64 text-center px-5">
          <p>Error: {error}</p>
          <button 
            onClick={refreshUsers}
            className="mt-5 px-5 py-2 bg-green-600 text-white border-none rounded cursor-pointer text-base transition-colors hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person, index) => (
            <div key={index} className="flex justify-center">
              <PersonComponent person={person} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}