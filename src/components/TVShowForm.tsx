import { useState } from 'react';
import { TVShow } from './TVShowsList';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ArrowLeft } from 'lucide-react';

interface TVShowFormProps {
  show: TVShow | null;
  onSave: (show: TVShow) => void;
  onCancel: () => void;
}

export function TVShowForm({ show, onSave, onCancel }: TVShowFormProps) {
  const [formData, setFormData] = useState<TVShow>(
    show || {
      id: '',
      title: '',
      year: new Date().getFullYear(),
      genre: '',
      creator: '',
      seasons: 1,
      rating: 5.0,
      description: ''
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div>
      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-gray-900 mb-6">
          {show ? 'Edit TV Show' : 'Add New TV Show'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="creator">Creator</Label>
              <Input
                id="creator"
                value={formData.creator}
                onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="seasons">Seasons</Label>
              <Input
                id="seasons"
                type="number"
                min="1"
                value={formData.seasons}
                onChange={(e) => setFormData({ ...formData, seasons: parseInt(e.target.value) })}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="rating">Rating (0-10)</Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="mt-1"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit">
              {show ? 'Update TV Show' : 'Create TV Show'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
