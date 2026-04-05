import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Heart, Palette, PartyPopper, Code, Users, Briefcase, Globe, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const INTEREST_OPTIONS = [
  { id: 'fitness', label: 'Fitness', icon: Heart, color: 'bg-red-500' },
  { id: 'art', label: 'Art', icon: Palette, color: 'bg-purple-500' },
  { id: 'entertainment', label: 'Entertainment', icon: PartyPopper, color: 'bg-yellow-500' },
  { id: 'technology', label: 'Technology', icon: Code, color: 'bg-blue-500' },
  { id: 'service', label: 'Service', icon: Users, color: 'bg-green-500' },
  { id: 'business', label: 'Business', icon: Briefcase, color: 'bg-indigo-500' },
  { id: 'cultural', label: 'Cultural', icon: Globe, color: 'bg-pink-500' },
];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { setCampus, setInterests } = useUser();
  const [step, setStep] = useState<'campus' | 'interests'>('campus');
  const [selectedCampus, setSelectedCampus] = useState<'west-lafayette' | 'indianapolis' | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleCampusSelection = (campus: 'west-lafayette' | 'indianapolis') => {
    setSelectedCampus(campus);
    setCampus(campus);
    setStep('interests');
  };

  const handleContinue = () => {
    if (selectedInterests.length > 0) {
      setInterests(selectedInterests);
      navigate('/swipe');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(39,39.7%,69.4%)] via-amber-100 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2"> BoilerMatch</h1>
          <p className="text-black-600">Find your perfect club at Purdue!</p>
        </div>

        {step === 'campus' ? (
          <div className="mb-8">
            <h2 className="text-xl mb-4">Which campus are you on?</h2>
            <p className="text-sm text-gray-600 mb-6">Select your Purdue campus</p>

            <div className="space-y-4">
              <button
                onClick={() => handleCampusSelection('west-lafayette')}
                className="relative w-full h-48 rounded-xl border-2 border-gray- overflow-hidden hover:border-[hsl(39,39.7%,69.4%)] hover:shadow-xl transition-all group"
              >
                <ImageWithFallback
                  src="https://www.purdue.edu/newsroom/wp-content/uploads/2024/07/campus-aerialLO.jpg"
                  alt="West Lafayette Campus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="bg-[hsl(39,39.7%,69.4%)] p-3 rounded-lg shadow-lg">
                      <MapPin className="size-6" />
                    </div>
                    <div className="text-left">
                      <span className="text-xl font-bold block">West Lafayette</span>
                      <span className="text-sm text-gray-200">Main campus</span>
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleCampusSelection('indianapolis')}
                className="relative w-full h-48 rounded-xl border-2 border-gray- overflow-hidden hover:border-[hsl(39,39.7%,69.4%)] hover:shadow-xl transition-all group"
              >
                <ImageWithFallback
                  src="https://old.polytechnic.purdue.edu/sites/default/files/images/purdue-indianapolis.jpg"
                  alt="Indianapolis Campus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="bg-[hsl(39,39.7%,69.4%)] p-3 rounded-lg shadow-lg">
                      <MapPin className="size-6" />
                    </div>
                    <div className="text-left">
                      <span className="text-xl font-bold block">Purdue Indianapolis</span>
                      <span className="text-sm text-gray-200">Indianapolis campus</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl mb-4">What are you interested in?</h2>
              <p className="text-sm text-gray-600 mb-6">Select at least one category</p>

              <div className="space-y-4">
                {INTEREST_OPTIONS.map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = selectedInterests.includes(interest.id);
                  
                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${ isSelected ? 'border-amber-500 bg-[#8e6f3e] shadow-md scale-105' : 'border-gray-200 bg-white hover:border-[hsl(39,39.7%,85%)] hover:border-[hsl(39,39.7%,69.4%)]' }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`${interest.color} p-3 rounded-lg text-white`}>
                          <Icon className="size-6" />
                        </div>
                        <span className="text-lg">{interest.label}</span>
                        {isSelected && (
                          <span className="ml-auto text-amber-500">✓</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={handleContinue}
              disabled={selectedInterests.length === 0}
              className="w-full bg-[#8e6f3e] text-white hover:bg-black hover:text-[#8e6f3e] py-6 text-lg rounded-xl"
            >
              Match!
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}