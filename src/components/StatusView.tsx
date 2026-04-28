import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../constants/theme';

type StatusViewProps = {
  actionLabel?: string;
  description: string;
  onActionPress?: () => void;
  title: string;
  tone?: 'default' | 'error';
  visual?: ReactNode;
};

export const StatusView = ({
  actionLabel,
  description,
  onActionPress,
  title,
  tone = 'default',
  visual,
}: StatusViewProps) => (
  <View style={[styles.container, tone === 'error' && styles.containerError]}>
    {visual}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    {actionLabel && onActionPress ? (
      <Pressable onPress={onActionPress} style={styles.button}>
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginVertical: spacing.xxl,
    padding: spacing.xxl,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  containerError: {
    borderColor: '#F3C6C2',
    backgroundColor: '#FFF5F4',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
