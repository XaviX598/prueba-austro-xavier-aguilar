import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, FlatList, RefreshControl, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { FavoriteUserCard } from '../components/FavoriteUserCard';
import { Screen } from '../components/Screen';
import { SelectionToolbar } from '../components/SelectionToolbar';
import { StatusView } from '../components/StatusView';
import { UserCard } from '../components/UserCard';
import { colors, radius, spacing } from '../constants/theme';
import { useUsersLocalContext } from '../context/UsersLocalContext';
import { useUsersQuery } from '../hooks/useUsersQuery';
import { RootStackParamList } from '../types/navigation';
import { User } from '../types/user';
import { canToggleOrderedSelection, getSelectionHint, isSelected } from '../utils/selection';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { width } = useWindowDimensions();
  const { data = [], isError, isFetching, isLoading, refetch } = useUsersQuery();
  const {
    addManyFavorites,
    clearSelection,
    favorites,
    removeManyFavorites,
    selectAll,
    selectedIds,
    toggleFavorite,
    toggleSelectedOrdered,
  } = useUsersLocalContext();

  const favoriteUsers = data.filter((user) => favorites[user.id]);
  const selectionHint = getSelectionHint(selectedIds, data);
  const isNarrow = width <= 361;

  const handleNavigate = (userId: string) => {
    navigation.navigate('UserDetail', { userId });
  };

  const handleToggleSelection = (user: User) => {
    const wasApplied = toggleSelectedOrdered(user.id, data);

    if (!wasApplied) {
      Alert.alert(
        'Selección no válida',
        'Debes seguir el orden alfabético por apellido. Para desmarcar, retira primero el último usuario seleccionado.',
      );
    }
  };

  const handleSelectAll = () => {
    selectAll(data);
    addManyFavorites(data.map((user) => user.id));
  };

  const handleAddSelected = () => {
    if (selectedIds.length === 0) {
      Alert.alert('Sin selección', 'Selecciona al menos un usuario para agregarlo a favoritos.');
      return;
    }

    addManyFavorites(selectedIds);
  };

  const handleRemoveSelectedFavorites = () => {
    if (selectedIds.length === 0) {
      Alert.alert('Sin selección', 'Selecciona al menos un usuario para quitarlo de favoritos.');
      return;
    }

    removeManyFavorites(selectedIds);
  };

  if (isLoading) {
    return (
      <Screen>
        <StatusView
          description="Estamos consultando la API pública y preparando la lista ordenada de usuarios."
          title="Cargando usuarios"
        />
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen>
        <StatusView
          actionLabel="Reintentar"
          description="No fue posible obtener la información remota. Verifica tu conexión e intenta nuevamente."
          onActionPress={() => {
            void refetch();
          }}
          title="Ocurrió un error"
          tone="error"
        />
      </Screen>
    );
  }

  if (data.length === 0) {
    return (
      <Screen>
        <StatusView
          actionLabel="Actualizar"
          description="La API respondió sin usuarios. Puedes intentar refrescar para volver a consultar."
          onActionPress={() => {
            void refetch();
          }}
          title="Sin usuarios disponibles"
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <LinearGradient colors={['#173A63', '#285C98']} style={[styles.hero, isNarrow && styles.heroNarrow]}>
              <Text style={styles.heroEyebrow}>Prueba técnica frontend</Text>
              <Text style={[styles.heroTitle, isNarrow && styles.heroTitleNarrow]}>Usuarios ordenados por apellido</Text>
              <Text style={[styles.heroText, isNarrow && styles.heroTextNarrow]}>
                La selección múltiple solo permite avanzar en orden y agrega favoritos de forma controlada.
              </Text>
            </LinearGradient>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Favoritos</Text>
              <Text style={styles.sectionSubtitle}>{favoriteUsers.length} usuarios</Text>
            </View>

            {favoriteUsers.length > 0 ? (
              <FlatList
                data={favoriteUsers}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <FavoriteUserCard onPress={() => handleNavigate(item.id)} user={item} />}
                showsHorizontalScrollIndicator={false}
                style={styles.favoritesList}
              />
            ) : (
              <View style={styles.emptyFavorites}>
                <Text style={styles.emptyFavoritesText}>Aún no tienes favoritos.</Text>
              </View>
            )}

            <SelectionToolbar
              helperText={selectionHint}
              onAddSelected={handleAddSelected}
              onClear={clearSelection}
              onRemoveSelectedFavorites={handleRemoveSelectedFavorites}
              onSelectAll={handleSelectAll}
              selectedCount={selectedIds.length}
              totalCount={data.length}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Todos los usuarios</Text>
              <Text style={styles.sectionSubtitle}>FlatList vertical</Text>
            </View>
          </View>
        }
        contentContainerStyle={styles.contentContainer}
        data={data}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              void refetch();
            }}
            refreshing={isFetching}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item }) => {
          const selected = isSelected(selectedIds, item.id);
          const canToggle = canToggleOrderedSelection(selectedIds, item.id, data);

          return (
            <View style={styles.cardWrapper}>
              <UserCard
                canToggleSelection={canToggle}
                isFavorite={Boolean(favorites[item.id])}
                isSelected={selected}
                onPressDetail={() => handleNavigate(item.id)}
                onPressFavorite={() => toggleFavorite(item.id)}
                onToggleSelection={() => handleToggleSelection(item)}
                user={item}
              />
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  headerContent: {
    gap: spacing.lg,
    marginBottom: spacing.sm,
  },
  hero: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  heroNarrow: {
    padding: spacing.lg,
  },
  heroEyebrow: {
    color: '#D9E8FA',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  heroTitleNarrow: {
    fontSize: 21,
    lineHeight: 27,
  },
  heroText: {
    color: '#F4F7FB',
    fontSize: 14,
    lineHeight: 21,
  },
  heroTextNarrow: {
    fontSize: 13,
    lineHeight: 19,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
  },
  favoritesList: {
    marginBottom: spacing.sm,
  },
  emptyFavorites: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: spacing.lg,
  },
  emptyFavoritesText: {
    color: colors.textMuted,
    textAlign: 'center',
  },
  cardWrapper: {
    marginBottom: spacing.md,
  },
});
