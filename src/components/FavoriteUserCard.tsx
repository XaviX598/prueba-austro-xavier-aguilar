import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing } from '../constants/theme';
import { User } from '../types/user';

type FavoriteUserCardProps = {
  onPress: () => void;
  user: User;
};

export const FavoriteUserCard = ({ onPress, user }: FavoriteUserCardProps) => (
  <Pressable onPress={onPress} style={styles.card}>
    <Image source={{ uri: user.avatar }} style={styles.avatar} />
    <Text numberOfLines={1} style={styles.name}>
      {user.fullName}
    </Text>
    <Text numberOfLines={1} style={styles.subtitle}>
      {user.location.city}
    </Text>
    <Text style={styles.action}>Ver detalle</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    width: 112,
    marginRight: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.textMuted,
  },
  action: {
    marginTop: spacing.sm,
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
  },
});
