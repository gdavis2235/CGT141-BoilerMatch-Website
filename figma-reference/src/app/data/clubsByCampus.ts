import { Club } from '../context/UserContext';
import { clubs as originalClubs } from './clubs';

// List of club names that are Indianapolis-specific based on the purdue_club_list.txt
const indianapolisClubKeywords = [
  'Indianapolis',
  'Indy',
  '(Indianapolis)',
  'Purdue Indianapolis',
  'in Indianapolis',
  'at Purdue Indianapolis',
  'PIN'
];

// Function to determine if a club is Indianapolis-specific
function isIndianapolisClub(club: Club): boolean {
  const searchText = `${club.name} ${club.description}`.toLowerCase();
  return indianapolisClubKeywords.some(keyword => 
    searchText.includes(keyword.toLowerCase())
  );
}

// Add campus property to all clubs
export const clubs: Club[] = originalClubs.map(club => ({
  ...club,
  campus: isIndianapolisClub(club) ? 'indianapolis' as const : 'west-lafayette' as const
}));

// Separate lists for each campus
export const westLafayetteClubs = clubs.filter(club => club.campus === 'west-lafayette');
export const indianapolisClubs = clubs.filter(club => club.campus === 'indianapolis');
