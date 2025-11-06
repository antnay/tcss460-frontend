import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Movie } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface EditMovieDialogProps {
  movie: Movie;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditMovieDialog({ movie, open, onOpenChange }: EditMovieDialogProps) {
  const { updateMovie } = useData();
  const [formData, setFormData] = useState({
    title: movie.title,
    year: movie.year,
    genre: movie.genre,
    director: movie.director,
    rating: movie.rating,
    description: movie.description,
    poster: movie.poster,
  });

  useEffect(() => {
    setFormData({
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      director: movie.director,
      rating: movie.rating,
      description: movie.description,
      poster: movie.poster,
    });
  }, [movie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMovie(movie.id, formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
          <DialogDescription>
            Update the movie information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-year">Year</Label>
              <Input
                id="edit-year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-genre">Genre</Label>
              <Input
                id="edit-genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-director">Director</Label>
              <Input
                id="edit-director"
                value={formData.director}
                onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-rating">Rating (0-10)</Label>
              <Input
                id="edit-rating"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-poster">Poster URL</Label>
              <Input
                id="edit-poster"
                type="url"
                value={formData.poster}
                onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Movie</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
