// hooks/useRandomUser.ts
'use client';

import { useState, useEffect } from 'react';
import { Person } from '../types/Person';

interface RandomUserResponse {
  results: Array<{
    name: {
      first: string;
      last: string;
    };
    email: string;
    dob: {
      date: string;
    };
    phone: string;
    login: {
      password: string;
    };
    picture: {
      large: string;
    };
  }>;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export function useRandomUser(count: number = 1) {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomUsers = async (count: number = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://randomuser.me/api/?results=${count}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: RandomUserResponse = await response.json();
      
      const formattedPeople: Person[] = data.results.map(user => ({
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        birthday: new Date(user.dob.date).toLocaleDateString(),
        phone: user.phone,
        password: user.login.password,
        profile: user.picture.large
      }));
      
      setPeople(formattedPeople);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching random users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomUsers(count);
  }, [count]);

  const refreshUsers = () => fetchRandomUsers(count);

  return { people, loading, error, refreshUsers };
}