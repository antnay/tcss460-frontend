export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string;
  director: string;
  rating: number;
  description: string;
  poster: string;
  userId: string;
}

export interface TVShow {
  id: string;
  title: string;
  year: number;
  genre: string;
  seasons: number;
  episodes: number;
  rating: number;
  description: string;
  poster: string;
  userId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  isLoading: boolean;
}
