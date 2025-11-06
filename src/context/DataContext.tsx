import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie, TVShow } from '../types';
import { useAuth } from './AuthContext';

interface DataContextType {
  movies: Movie[];
  tvShows: TVShow[];
  addMovie: (movie: Omit<Movie, 'id' | 'userId'>) => void;
  updateMovie: (id: string, movie: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  addTVShow: (tvShow: Omit<TVShow, 'id' | 'userId'>) => void;
  updateTVShow: (id: string, tvShow: Partial<TVShow>) => void;
  deleteTVShow: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const MOVIES_KEY = 'app_movies';
const TVSHOWS_KEY = 'app_tvshows';

// Sample data
const sampleMovies: Omit<Movie, 'userId'>[] = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: 'Drama',
    director: 'Frank Darabont',
    rating: 9.3,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    director: 'Christopher Nolan',
    rating: 9.0,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    rating: 8.8,
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
  },
];

const sampleTVShows: Omit<TVShow, 'userId'>[] = [
  {
    id: '1',
    title: 'Breaking Bad',
    year: 2008,
    genre: 'Crime',
    seasons: 5,
    episodes: 62,
    rating: 9.5,
    description: 'A high school chemistry teacher turned methamphetamine manufacturer partners with a former student.',
    poster: 'https://images.unsplash.com/photo-1574267432644-f610a51acebd?w=400&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Stranger Things',
    year: 2016,
    genre: 'Sci-Fi',
    seasons: 4,
    episodes: 42,
    rating: 8.7,
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.',
    poster: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'The Crown',
    year: 2016,
    genre: 'Drama',
    seasons: 6,
    episodes: 60,
    rating: 8.6,
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=600&fit=crop',
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load data from localStorage
    const storedMovies = localStorage.getItem(MOVIES_KEY);
    const storedTVShows = localStorage.getItem(TVSHOWS_KEY);

    if (!storedMovies) {
      // Initialize with sample data
      const initialMovies = sampleMovies.map(m => ({ ...m, userId: 'sample' }));
      localStorage.setItem(MOVIES_KEY, JSON.stringify(initialMovies));
      setMovies(initialMovies);
    } else {
      setMovies(JSON.parse(storedMovies));
    }

    if (!storedTVShows) {
      // Initialize with sample data
      const initialTVShows = sampleTVShows.map(t => ({ ...t, userId: 'sample' }));
      localStorage.setItem(TVSHOWS_KEY, JSON.stringify(initialTVShows));
      setTVShows(initialTVShows);
    } else {
      setTVShows(JSON.parse(storedTVShows));
    }
  }, []);

  const addMovie = (movie: Omit<Movie, 'id' | 'userId'>) => {
    const newMovie: Movie = {
      ...movie,
      id: Date.now().toString(),
      userId: user?.id || 'sample',
    };
    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
    localStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
  };

  const updateMovie = (id: string, movieUpdate: Partial<Movie>) => {
    const updatedMovies = movies.map(m => 
      m.id === id ? { ...m, ...movieUpdate } : m
    );
    setMovies(updatedMovies);
    localStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
  };

  const deleteMovie = (id: string) => {
    const updatedMovies = movies.filter(m => m.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
  };

  const addTVShow = (tvShow: Omit<TVShow, 'id' | 'userId'>) => {
    const newTVShow: TVShow = {
      ...tvShow,
      id: Date.now().toString(),
      userId: user?.id || 'sample',
    };
    const updatedTVShows = [...tvShows, newTVShow];
    setTVShows(updatedTVShows);
    localStorage.setItem(TVSHOWS_KEY, JSON.stringify(updatedTVShows));
  };

  const updateTVShow = (id: string, tvShowUpdate: Partial<TVShow>) => {
    const updatedTVShows = tvShows.map(t => 
      t.id === id ? { ...t, ...tvShowUpdate } : t
    );
    setTVShows(updatedTVShows);
    localStorage.setItem(TVSHOWS_KEY, JSON.stringify(updatedTVShows));
  };

  const deleteTVShow = (id: string) => {
    const updatedTVShows = tvShows.filter(t => t.id !== id);
    setTVShows(updatedTVShows);
    localStorage.setItem(TVSHOWS_KEY, JSON.stringify(updatedTVShows));
  };

  return (
    <DataContext.Provider value={{ 
      movies, 
      tvShows, 
      addMovie, 
      updateMovie, 
      deleteMovie,
      addTVShow,
      updateTVShow,
      deleteTVShow,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
