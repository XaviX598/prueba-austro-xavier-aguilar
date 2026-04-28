import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { User } from '../types/user';
import { canToggleOrderedSelection } from '../utils/selection';

type UserLocalState = {
  favorites: Record<string, boolean>;
  selectedIds: string[];
  localPhones: Record<string, string>;
};

type UsersLocalContextValue = UserLocalState & {
  toggleFavorite: (userId: string) => void;
  addManyFavorites: (userIds: string[]) => void;
  toggleSelectedOrdered: (userId: string, orderedUsers: User[]) => boolean;
  selectAll: (orderedUsers: User[]) => void;
  clearSelection: () => void;
  updateLocalPhone: (userId: string, phone: string) => void;
  isFavorite: (userId: string) => boolean;
  getLocalPhone: (userId: string, fallbackPhone: string) => string;
};

const UsersLocalContext = createContext<UsersLocalContextValue | undefined>(undefined);

export const UsersLocalProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [localPhones, setLocalPhones] = useState<Record<string, string>>({});

  const value = useMemo<UsersLocalContextValue>(
    () => ({
      favorites,
      selectedIds,
      localPhones,
      toggleFavorite: (userId) => {
        setFavorites((current) => {
          const next = { ...current };

          if (next[userId]) {
            delete next[userId];
          } else {
            next[userId] = true;
          }

          return next;
        });
      },
      addManyFavorites: (userIds) => {
        setFavorites((current) =>
          userIds.reduce<Record<string, boolean>>((accumulator, userId) => {
            accumulator[userId] = true;
            return accumulator;
          }, { ...current }),
        );
      },
      toggleSelectedOrdered: (userId, orderedUsers) => {
        let wasApplied = false;

        setSelectedIds((current) => {
          if (!canToggleOrderedSelection(current, userId, orderedUsers)) {
            return current;
          }

          wasApplied = true;

          if (current.includes(userId)) {
            return current.filter((currentId) => currentId !== userId);
          }

          return [...current, userId];
        });

        return wasApplied;
      },
      selectAll: (orderedUsers) => {
        setSelectedIds(orderedUsers.map((user) => user.id));
      },
      clearSelection: () => setSelectedIds([]),
      updateLocalPhone: (userId, phone) => {
        setLocalPhones((current) => ({
          ...current,
          [userId]: phone,
        }));
      },
      isFavorite: (userId) => Boolean(favorites[userId]),
      getLocalPhone: (userId, fallbackPhone) => localPhones[userId] ?? fallbackPhone,
    }),
    [favorites, localPhones, selectedIds],
  );

  return <UsersLocalContext.Provider value={value}>{children}</UsersLocalContext.Provider>;
};

export const useUsersLocalContext = () => {
  const context = useContext(UsersLocalContext);

  if (!context) {
    throw new Error('useUsersLocalContext debe usarse dentro de UsersLocalProvider.');
  }

  return context;
};
