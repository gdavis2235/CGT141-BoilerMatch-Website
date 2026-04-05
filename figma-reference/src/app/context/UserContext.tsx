import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  members: number;
  meetingTime: string;
  image: string;
  tags: string[];
  campus?: 'west-lafayette' | 'indianapolis';
}

interface UserContextType {
  campus: 'west-lafayette' | 'indianapolis' | null;
  setCampus: (campus: 'west-lafayette' | 'indianapolis') => void;
  interests: string[];
  setInterests: (interests: string[]) => void;
  matches: Club[];
  addMatch: (club: Club) => void;
  swipedClubs: Set<string>;
  addSwipedClub: (clubId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [campus, setCampus] = useState<'west-lafayette' | 'indianapolis' | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [matches, setMatches] = useState<Club[]>([]);
  const [swipedClubs, setSwipedClubs] = useState<Set<string>>(new Set());

  const addMatch = (club: Club) => {
    setMatches((prev) => [...prev, club]);
  };

  const addSwipedClub = (clubId: string) => {
    setSwipedClubs((prev) => new Set([...prev, clubId]));
  };

  return (
    <UserContext.Provider
      value={{
        campus,
        setCampus,
        interests,
        setInterests,
        matches,
        addMatch,
        swipedClubs,
        addSwipedClub,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
