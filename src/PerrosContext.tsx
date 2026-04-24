import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface userData {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface PerrosContextType {
  favorites: userData[];
  toggleFavorite: (perro: userData) => void;
  isFavorite: (id: string) => boolean;
}

export const PerrosContext = createContext<PerrosContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const PerrosProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<userData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("perros_favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("perros_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (perro: userData) => {
    setFavorites((prev) => {
      const existe = prev.some((p) => p.id === perro.id);
      return existe ? prev.filter((p) => p.id !== perro.id) : [...prev, perro];
    });
  };

  const isFavorite = (id: string) => favorites.some((p) => p.id === id);

  return (
    <PerrosContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </PerrosContext.Provider>
  );
};