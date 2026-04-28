import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../constants/theme';

type SelectionToolbarProps = {
  helperText: string;
  onAddSelected: () => void;
  onClear: () => void;
  onSelectAll: () => void;
  selectedCount: number;
  totalCount: number;
};

export const SelectionToolbar = ({
  helperText,
  onAddSelected,
  onClear,
  onSelectAll,
  selectedCount,
  totalCount,
}: SelectionToolbarProps) => (
  <View style={styles.container}>
    <View style={styles.summaryRow}>
      <Text style={styles.title}>Selección ordenada</Text>
      <Text style={styles.counter}>
        {selectedCount}/{totalCount}
      </Text>
    </View>
    <Text style={styles.helper}>{helperText}</Text>

    <View style={styles.actions}>
      <Pressable onPress={onSelectAll} style={[styles.button, styles.primaryButton]}>
        <Text style={styles.primaryButtonText}>Seleccionar todos</Text>
      </Pressable>
      <Pressable onPress={onAddSelected} style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.secondaryButtonText}>Agregar favoritos</Text>
      </Pressable>
    </View>

    <Pressable onPress={onClear}>
      <Text style={styles.clearAction}>Limpiar selección</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  counter: {
    color: colors.secondary,
    fontWeight: '700',
  },
  helper: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  button: {
    flex: 1,
    minHeight: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  secondaryButton: {
    backgroundColor: colors.primarySoft,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  clearAction: {
    marginTop: spacing.xs,
    color: colors.danger,
    fontWeight: '600',
    textAlign: 'center',
  },
});
