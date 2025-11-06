import { TVShow } from './TVShowsList';
import { Button } from './ui/button';
import { ArrowLeft, Edit2, Star } from 'lucide-react';

interface TVShowDetailProps {
  show: TVShow;
  onBack: () => void;
  onEdit: (show: TVShow) => void;
}

export function TVShowDetail({ show, onBack, onEdit }: TVShowDetailProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to TV Shows
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-gray-900 mb-2">{show.title}</h2>
            <p className="text-gray-600">{show.year} • {show.genre}</p>
          </div>
          <Button onClick={() => onEdit(show)} className="gap-2">
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        </div>

        <div className="grid gap-6">
          <div>
            <h3 className="text-gray-700 mb-2">Creator</h3>
            <p className="text-gray-900">{show.creator}</p>
          </div>

          <div>
            <h3 className="text-gray-700 mb-2">Seasons</h3>
            <p className="text-gray-900">{show.seasons} seasons</p>
          </div>

          <div>
            <h3 className="text-gray-700 mb-2">Rating</h3>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-900">{show.rating} / 10</span>
            </div>
          </div>

          <div>
            <h3 className="text-gray-700 mb-2">Description</h3>
            <p className="text-gray-900 leading-relaxed">{show.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
