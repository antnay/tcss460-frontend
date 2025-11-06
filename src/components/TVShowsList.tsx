import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Plus, Edit2, Eye } from 'lucide-react';
import { TVShowDetail } from './TVShowDetail';
import { TVShowForm } from './TVShowForm';

export interface TVShow {
  id: string;
  title: string;
  year: number;
  genre: string;
  creator: string;
  seasons: number;
  rating: number;
  description: string;
}

const ITEMS_PER_PAGE = 6;

const initialTVShows: TVShow[] = [
  {
    id: '1',
    title: 'Breaking Bad',
    year: 2008,
    genre: 'Crime',
    creator: 'Vince Gilligan',
    seasons: 5,
    rating: 9.5,
    description: 'A high school chemistry teacher turned methamphetamine producer partners with a former student to secure his family\'s future.'
  },
  {
    id: '2',
    title: 'Game of Thrones',
    year: 2011,
    genre: 'Fantasy',
    creator: 'David Benioff',
    seasons: 8,
    rating: 9.3,
    description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.'
  },
  {
    id: '3',
    title: 'Stranger Things',
    year: 2016,
    genre: 'Sci-Fi',
    creator: 'The Duffer Brothers',
    seasons: 4,
    rating: 8.7,
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.'
  },
  {
    id: '4',
    title: 'The Office',
    year: 2005,
    genre: 'Comedy',
    creator: 'Greg Daniels',
    seasons: 9,
    rating: 9.0,
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes and inappropriate behavior.'
  },
  {
    id: '5',
    title: 'The Crown',
    year: 2016,
    genre: 'Drama',
    creator: 'Peter Morgan',
    seasons: 6,
    rating: 8.6,
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.'
  },
  {
    id: '6',
    title: 'Westworld',
    year: 2016,
    genre: 'Sci-Fi',
    creator: 'Jonathan Nolan',
    seasons: 4,
    rating: 8.5,
    description: 'Set at the intersection of the near future and the reimagined past, exploring a world in which every human appetite can be indulged.'
  },
  {
    id: '7',
    title: 'The Mandalorian',
    year: 2019,
    genre: 'Sci-Fi',
    creator: 'Jon Favreau',
    seasons: 3,
    rating: 8.7,
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.'
  },
  {
    id: '8',
    title: 'Succession',
    year: 2018,
    genre: 'Drama',
    creator: 'Jesse Armstrong',
    seasons: 4,
    rating: 8.9,
    description: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down.'
  }
];

export function TVShowsList() {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [editingShow, setEditingShow] = useState<TVShow | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const storedShows = localStorage.getItem('tvShows');
    if (storedShows) {
      setTVShows(JSON.parse(storedShows));
    } else {
      setTVShows(initialTVShows);
      localStorage.setItem('tvShows', JSON.stringify(initialTVShows));
    }
  }, []);

  const filteredShows = tvShows.filter(show =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    show.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    show.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredShows.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedShows = filteredShows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSaveShow = (show: TVShow) => {
    let updatedShows: TVShow[];
    
    if (isCreating) {
      updatedShows = [...tvShows, { ...show, id: Date.now().toString() }];
    } else {
      updatedShows = tvShows.map(s => s.id === show.id ? show : s);
    }
    
    setTVShows(updatedShows);
    localStorage.setItem('tvShows', JSON.stringify(updatedShows));
    setEditingShow(null);
    setIsCreating(false);
  };

  if (selectedShow) {
    return (
      <TVShowDetail
        show={selectedShow}
        onBack={() => setSelectedShow(null)}
        onEdit={(show) => {
          setSelectedShow(null);
          setEditingShow(show);
        }}
      />
    );
  }

  if (editingShow || isCreating) {
    return (
      <TVShowForm
        show={editingShow}
        onSave={handleSaveShow}
        onCancel={() => {
          setEditingShow(null);
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
            placeholder="Search TV shows..."
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
          Add TV Show
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {paginatedShows.map((show) => (
          <div
            key={show.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="mb-4">
              <h3 className="text-gray-900 mb-1">{show.title}</h3>
              <p className="text-sm text-gray-600">{show.year} • {show.genre}</p>
            </div>
            
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{show.description}</p>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                ⭐ {show.rating}
              </div>
              <div className="text-sm text-gray-600">{show.seasons} seasons</div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedShow(show)}
                className="flex-1 gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingShow(show)}
                className="flex-1 gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredShows.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No TV shows found. Try a different search or add a new show.
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
