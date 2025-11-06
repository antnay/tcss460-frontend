import { Movie } from './MoviesList';
import { Button } from './ui/button';
import { ArrowLeft, Edit2, Star } from 'lucide-react';

interface MovieDetailProps {
  movie: Movie;
  onBack: () => void;
  onEdit: (movie: Movie) => void;
}

export function MovieDetail({ movie, onBack, onEdit }: MovieDetailProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Movies
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-gray-900 mb-2">{movie.title}</h2>
            <p className="text-gray-600">{movie.year} • {movie.genre}</p>
          </div>
          <Button onClick={() => onEdit(movie)} className="gap-2">
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        </div>

        <div className="grid gap-6">
          <div>
            <h3 className="text-gray-700 mb-2">Director</h3>
            <p className="text-gray-900">{movie.director}</p>
          </div>

          <div>
            <h3 className="text-gray-700 mb-2">Rating</h3>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-900">{movie.rating} / 10</span>
            </div>
          </div>

          <div>
            <h3 className="text-gray-700 mb-2">Description</h3>
            <p className="text-gray-900 leading-relaxed">{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
