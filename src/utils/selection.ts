import { User } from '../types/user';

export const isSelected = (selectedIds: string[], userId: string) => selectedIds.includes(userId);

export const canToggleOrderedSelection = (selectedIds: string[], userId: string, orderedUsers: User[]) => {
  const orderedIds = orderedUsers.map((user) => user.id);
  const targetIndex = orderedIds.indexOf(userId);
  const alreadySelected = selectedIds.includes(userId);

  if (targetIndex === -1) {
    return false;
  }

  if (alreadySelected) {
    return selectedIds[selectedIds.length - 1] === userId;
  }

  const expectedNextId = orderedIds[selectedIds.length];

  return expectedNextId === userId;
};

export const getSelectionHint = (selectedIds: string[], orderedUsers: User[]) => {
  if (orderedUsers.length === 0) {
    return 'No hay usuarios disponibles para seleccionar.';
  }

  if (selectedIds.length === orderedUsers.length) {
    return 'Todos los usuarios válidos ya están seleccionados.';
  }

  const nextUser = orderedUsers[selectedIds.length];

  return `La siguiente selección válida es ${nextUser.lastName}, ${nextUser.firstName}.`;
};
