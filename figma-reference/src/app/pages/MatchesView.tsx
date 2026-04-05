import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowLeft, Users, Clock, ExternalLink } from 'lucide-react';

export default function MatchesView() {
  const navigate = useNavigate();
  const { matches } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(39,39.7%,69.4%)] via-amber-100 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/swipe')}
            className="rounded-full"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-2xl">Your Matches</h1>
          <div className="ml-auto bg-amber-500 text-white px-4 py-2 rounded-full text-sm">
            {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        {matches.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl mb-2">No matches yet</h2>
            <p className="text-gray-600 mb-6">Start swiping to find clubs you'll love!</p>
            <Button
              onClick={() => navigate('/swipe')}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg rounded-xl"
            >
              Start Swiping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((club) => (
              <Card key={club.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="text-xl">{club.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{club.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="size-4" />
                      <span>{club.members}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>{club.meetingTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {club.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white mt-2"
                    onClick={() => {
                      // In a real app, this would link to the club's page
                      alert(`Learn more about ${club.name}! In a real app, this would open their profile or contact page.`);
                    }}
                  >
                    <ExternalLink className="size-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}