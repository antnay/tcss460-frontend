import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Plus, Edit2, Eye } from 'lucide-react';
import { MovieDetail } from './MovieDetail';
import { MovieForm } from './MovieForm';

export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string;
  director: string;
  rating: number;
  description: string;
}

const ITEMS_PER_PAGE = 6;

const initialMovies: Movie[] = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: 'Drama',
    director: 'Frank Darabont',
    rating: 9.3,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
  },
  {
    id: '2',
    title: 'The Godfather',
    year: 1972,
    genre: 'Crime',
    director: 'Francis Ford Coppola',
    rating: 9.2,
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
  },
  {
    id: '3',
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    director: 'Christopher Nolan',
    rating: 9.0,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.'
  },
  {
    id: '4',
    title: 'Pulp Fiction',
    year: 1994,
    genre: 'Crime',
    director: 'Quentin Tarantino',
    rating: 8.9,
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.'
  },
  {
    id: '5',
    title: 'Forrest Gump',
    year: 1994,
    genre: 'Drama',
    director: 'Robert Zemeckis',
    rating: 8.8,
    description: 'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.'
  },
  {
    id: '6',
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    rating: 8.8,
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.'
  },
  {
    id: '7',
    title: 'The Matrix',
    year: 1999,
    genre: 'Sci-Fi',
    director: 'The Wachowskis',
    rating: 8.7,
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
  },
  {
    id: '8',
    title: 'Goodfellas',
    year: 1990,
    genre: 'Crime',
    director: 'Martin Scorsese',
    rating: 8.7,
    description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife and his partners in crime.'
  }
];

export function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    } else {
      setMovies(initialMovies);
      localStorage.setItem('movies', JSON.stringify(initialMovies));
    }
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSaveMovie = (movie: Movie) => {
    let updatedMovies: Movie[];
    
    if (isCreating) {
      updatedMovies = [...movies, { ...movie, id: Date.now().toString() }];
    } else {
      updatedMovies = movies.map(m => m.id === movie.id ? movie : m);
    }
    
    setMovies(updatedMovies);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    setEditingMovie(null);
    setIsCreating(false);
  };

  if (selectedMovie) {
    return (
      <MovieDetail
        movie={selectedMovie}
        onBack={() => setSelectedMovie(null)}
        onEdit={(movie) => {
          setSelectedMovie(null);
          setEditingMovie(movie);
        }}
      />
    );
  }

  if (editingMovie || isCreating) {
    return (
      <MovieForm
        movie={editingMovie}
        onSave={handleSaveMovie}
        onCancel={() => {
          setEditingMovie(null);
          setIsCreating(false);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Movie
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {paginatedMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="mb-4">
              <h3 className="text-gray-900 mb-1">{movie.title}</h3>
              <p className="text-sm text-gray-600">{movie.year} • {movie.genre}</p>
            </div>
            
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{movie.description}</p>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                ⭐ {movie.rating}
              </div>
              <div className="text-sm text-gray-600">{movie.director}</div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedMovie(movie)}
                className="flex-1 gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingMovie(movie)}
                className="flex-1 gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No movies found. Try a different search or add a new movie.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
