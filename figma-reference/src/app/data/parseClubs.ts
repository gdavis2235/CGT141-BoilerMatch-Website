// Helper to categorize clubs based on keywords in name and description
export function categorizeClub(name: string, description: string): string {
  const combined = (name + ' ' + description).toLowerCase();
  
  // Fitness & Sports keywords
  if (combined.match(/\b(fitness|gym|workout|sport|athletic|martial|yoga|dance|cycling|running|tennis|basketball|soccer|football|hockey|baseball|volleyball|swim|climb|fencing|taekwondo|karate|judo|kendo|badminton|wrestling|boxing|rowing|lacrosse|rugby|cricket|golf|disc|ultimate|skating|ski)\b/)) {
    return 'fitness';
  }
  
  // Art & Creativity keywords
  if (combined.match(/\b(art|artist|paint|draw|sketch|sculpt|craft|design|fashion|photo|film|cinema|theater|theatre|music|band|choir|orchestra|architecture|graphic|illustration|bonsai|pottery|knit|sew|embroid|fiber|handmade|diy)\b/)) {
    return 'art';
  }
  
  // Entertainment & Gaming keywords
  if (combined.match(/\b(game|gaming|esport|chess|poker|board game|card|d&d|dungeon|rpg|video game|nintendo|playstation|xbox|smash|league of legends|valorant|overwatch|pokemon|anime|manga|comedy|improv|magic|cosplay|comic|convention)\b/)) {
    return 'entertainment';
  }
  
  // Technology & Engineering keywords
  if (combined.match(/\b(computer|coding|programming|software|hardware|robot|tech|engineer|mechanical|electrical|civil|chemical|aerospace|nuclear|industrial|cyber|hack|data|algorithm|ai|artificial intelligence|machine learning|app|web|developer|code|asme|aiaa|ieee|acm)\b/)) {
    return 'technology';
  }
  
  // Service & Volunteering keywords
  if (combined.match(/\b(service|volunteer|community|charity|philanthrop|outreach|mentor|tutor|food pantry|homeless|nonprofit|awareness|advocacy|support|help|relief|sustainability|environment|conservation|green|eco|recycle)\b/)) {
    return 'service';
  }
  
  // Business & Professional keywords
  if (combined.match(/\b(business|finance|marketing|account|consult|entrepreneur|startup|invest|stock|trade|management|commerce|economic|mba|professional|career|network|industry|corporate|sales)\b/)) {
    return 'business';
  }
  
  // Cultural & Diversity keywords
  if (combined.match(/\b(cultural|culture|heritage|ethnic|international|asian|african|latino|hispanic|korean|chinese|japanese|indian|european|middle east|diversity|multicultural|language|foreign|abroad|exchange|immigrant)\b/)) {
    return 'cultural';
  }
  
  // Default to cultural if it has "association" or "club" in name
  if (name.toLowerCase().includes('association') || name.toLowerCase().includes('student')) {
    return 'cultural';
  }
  
  return 'cultural'; // Default
}

export function generateMockData(clubName: string): { members: number; meetingTime: string } {
  // Generate semi-random but consistent data based on club name
  const hash = clubName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const members = 30 + (hash % 250); // 30-280 members
  
  const meetingOptions = [
    'Mondays 7 PM',
    'Tuesdays 6 PM',
    'Wednesdays 7 PM',
    'Thursdays 6:30 PM',
    'Fridays 5 PM',
    'Bi-weekly',
    'Weekly meetings',
    'Monthly',
    'Check Discord',
    'Email for info',
    'Varies',
    'Mon/Wed 7 PM',
    'Tues/Thurs 6 PM',
  ];
  
  const meetingTime = meetingOptions[hash % meetingOptions.length];
  
  return { members, meetingTime };
}
