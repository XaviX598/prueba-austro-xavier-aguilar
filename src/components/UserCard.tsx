import Checkbox from 'expo-checkbox';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../constants/theme';
import { User } from '../types/user';

type UserCardProps = {
  canToggleSelection: boolean;
  isFavorite: boolean;
  isSelected: boolean;
  onPressDetail: () => void;
  onPressFavorite: () => void;
  onToggleSelection: () => void;
  user: User;
};

export const UserCard = ({
  canToggleSelection,
  isFavorite,
  isSelected,
  onPressDetail,
  onPressFavorite,
  onToggleSelection,
  user,
}: UserCardProps) => (
  <View style={styles.card}>
    <View style={styles.contentRow}>
      <View style={styles.mainColumn}>
        <View style={styles.header}>
          <Checkbox
            color={isSelected ? colors.secondary : undefined}
            disabled={!canToggleSelection && !isSelected}
            onValueChange={onToggleSelection}
            style={styles.checkbox}
            value={isSelected}
          />
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.identity}>
            <Text style={styles.name}>{user.fullName}</Text>
            <Text numberOfLines={1} style={styles.email}>
              {user.email}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.location}>
            {user.location.city}, {user.location.country}
          </Text>
          <Text style={styles.phone}>Teléfono original: {user.phone}</Text>
        </View>
      </View>

      <View style={styles.actionsColumn}>
        <Pressable onPress={onPressDetail} style={[styles.button, styles.secondaryButton]}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Ver detalle</Text>
        </Pressable>
        <Pressable onPress={onPressFavorite} style={[styles.button, isFavorite && styles.favoriteButton]}>
          <Text style={styles.buttonText}>{isFavorite ? 'Quitar favorito' : 'Favorito'}</Text>
        </Pressable>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contentRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  mainColumn: {
    flex: 1,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  checkbox: {
    borderRadius: 6,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: radius.pill,
  },
  identity: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  email: {
    color: colors.textMuted,
    fontSize: 13,
  },
  body: {
    gap: spacing.xs,
  },
  location: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  phone: {
    color: colors.textMuted,
    fontSize: 13,
  },
  actionsColumn: {
    width: 118,
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
  },
  secondaryButton: {
    backgroundColor: colors.primarySoft,
  },
  favoriteButton: {
    backgroundColor: colors.favorite,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: colors.primary,
  },
});
