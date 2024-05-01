import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  slug: string;
}

export interface FavouriteItem extends Item {}

type FavouriteStore = {
  items: FavouriteItem[];
  removeAll: () => void;
  addOrRemove: (item: Item) => void;
  isFavourite: (id: FavouriteItem["id"]) => boolean;
};

export const useFavouriteStore = create(
  persist<FavouriteStore>(
    (set, get) => ({
      items: [],
      removeAll: () => set({ items: [] }),
      addOrRemove: (item) => {
        set((state) => {
          const itemsId = state.items.map((item) => item.id);

          if (itemsId.includes(item.id)) {
            return { items: state.items.filter((i) => i.id !== item.id) };
          }

          return { items: [...state.items, item] };
        });
      },
      isFavourite: (id) => get().items.some((item) => item.id === id),
    }),
    {
      name: "favourite-storage",
      version: 1,
    },
  ),
);
