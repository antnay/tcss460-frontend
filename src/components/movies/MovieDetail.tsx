import { useState } from 'react';
import { Movie } from '../../types';
import { useData } from '../../context/DataContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft, Star, Edit, Trash2 } from 'lucide-react';
import { EditMovieDialog } from './EditMovieDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

interface MovieDetailProps {
  movie: Movie;
  onBack: () => void;
}

export function MovieDetail({ movie, onBack }: MovieDetailProps) {
  const { deleteMovie } = useData();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = () => {
    deleteMovie(movie.id);
    onBack();
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Movies
      </Button>

      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="mb-2">{movie.title}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="secondary">{movie.year}</Badge>
                    <Badge variant="outline">{movie.genre}</Badge>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowEditDialog(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Movie</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{movie.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Director</h3>
                  <p>{movie.director}</p>
                </div>

                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Description</h3>
                  <p className="text-gray-700">{movie.description}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditMovieDialog
        movie={movie}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </div>
  );
}
