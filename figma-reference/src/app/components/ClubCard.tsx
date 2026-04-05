import { Club } from '../context/UserContext';
import { Users, Clock, Tag } from 'lucide-react';

interface ClubCardProps {
  club: Club;
  style?: React.CSSProperties;
}

export default function ClubCard({ club, style }: ClubCardProps) {
  return (
    <div
      style={style}
      className="absolute w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={club.image}
          alt={club.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h2 className="text-2xl text-white mb-1">{club.name}</h2>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Users className="size-4" />
            <span>{club.members} members</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-gray-700 leading-relaxed">{club.description}</p>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="size-4" />
          <span className="text-sm">{club.meetingTime}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {club.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm"
            >
              <Tag className="size-3" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
