import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { useUser } from '../context/UserContext';
import { clubs } from '../data/clubsByCampus';
import ClubCard from '../components/ClubCard';
import { X, Heart, RotateCcw, Menu } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function SwipeView() {
  const navigate = useNavigate();
  const { campus, interests, addMatch, swipedClubs, addSwipedClub } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  // Motion values - must be declared before any early returns
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Filter clubs based on user campus and interests
  const filteredClubs = clubs.filter(
    (club) => {
      const matchesCampus = !club.campus || club.campus === campus;
      const matchesInterests = interests.includes(club.category);
      const notSwiped = !swipedClubs.has(club.id);
      return matchesCampus && matchesInterests && notSwiped;
    }
  );

  const currentClub = filteredClubs[currentIndex];

  useEffect(() => {
    if (!interests || interests.length === 0) {
      navigate('/');
    }
  }, [interests, navigate]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentClub) return;

    setExitDirection(direction);
    addSwipedClub(currentClub.id);

    if (direction === 'right') {
      addMatch(currentClub);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setExitDirection(null);
      x.set(0);
    }, 300);
  };

  const handleReset = () => {
    navigate('/');
  };

  if (!currentClub) {
    return (
      <div className="h-screen bg-gradient-to-br from-[hsl(39,39.7%,69.4%)] via-amber-100 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-3xl mb-4">No more clubs!</h2>
          <p className="text-gray-600 mb-6">You've seen all the clubs matching your interests.</p>
          <Button
            onClick={() => navigate('/matches')}
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg rounded-xl"
          >
            View Your Matches
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[hsl(39,39.7%,69.4%)] via-amber-100 to-yellow-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="rounded-full"
        >
          <RotateCcw className="size-5" />
        </Button>
        <h1 className="text-2xl">BoilerMatch</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/matches')}
          className="rounded-full"
        >
          <Menu className="size-5" />
        </Button>
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm aspect-[3/4]">
          {/* Next card preview */}
          {filteredClubs[currentIndex + 1] && (
            <div className="absolute w-full h-full scale-95 opacity-50">
              <ClubCard club={filteredClubs[currentIndex + 1]} />
            </div>
          )}

          {/* Current card */}
          <motion.div
            className="absolute w-full h-full"
            style={{
              x,
              rotate,
              opacity,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={
              exitDirection
                ? {
                    x: exitDirection === 'right' ? 400 : -400,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }
                : {}
            }
          >
            <ClubCard club={currentClub} />
          </motion.div>

          {/* Swipe indicators */}
          <motion.div
            className="absolute top-10 left-10 bg-red-500 text-white px-6 py-3 rounded-xl text-2xl rotate-[-20deg] border-4 border-red-500 pointer-events-none"
            style={{
              opacity: useTransform(x, [-100, -50, 0], [1, 0.5, 0]),
            }}
          >
            NOPE
          </motion.div>
          <motion.div
            className="absolute top-10 right-10 bg-green-500 text-white px-6 py-3 rounded-xl text-2xl rotate-[20deg] border-4 border-green-500 pointer-events-none"
            style={{
              opacity: useTransform(x, [0, 50, 100], [0, 0.5, 1]),
            }}
          >
            LIKE
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-8 flex justify-center gap-8">
        <Button
          onClick={() => handleSwipe('left')}
          size="icon"
          className="size-16 rounded-full bg-white hover:bg-red-50 shadow-lg border-2 border-red-200"
        >
          <X className="size-8 text-red-500" />
        </Button>
        <Button
          onClick={() => handleSwipe('right')}
          size="icon"
          className="size-20 rounded-full bg-white hover:bg-green-50 shadow-lg border-2 border-green-200"
        >
          <Heart className="size-10 text-green-500" />
        </Button>
      </div>
    </div>
  );
}