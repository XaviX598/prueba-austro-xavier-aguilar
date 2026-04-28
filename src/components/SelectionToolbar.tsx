import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { colors, radius, spacing } from '../constants/theme';

type SelectionToolbarProps = {
  helperText: string;
  onAddSelected: () => void;
  onClear: () => void;
  onRemoveSelectedFavorites: () => void;
  onSelectAll: () => void;
  selectedCount: number;
  totalCount: number;
};

export const SelectionToolbar = ({
  helperText,
  onAddSelected,
  onClear,
  onRemoveSelectedFavorites,
  onSelectAll,
  selectedCount,
  totalCount,
}: SelectionToolbarProps) => {
  const { width } = useWindowDimensions();
  const isNarrow = width <= 361;

  return (
    <View style={styles.container}>
      <View style={[styles.summaryRow, isNarrow && styles.summaryRowNarrow]}>
        <Text style={styles.title}>Selección ordenada</Text>
        <Text style={styles.counter}>
          {selectedCount}/{totalCount}
        </Text>
      </View>

      <Text style={styles.helper}>{helperText}</Text>

      <View style={[styles.actions, isNarrow && styles.actionsNarrow]}>
        <Pressable onPress={onSelectAll} style={[styles.button, styles.primaryButton, isNarrow && styles.fullButton]}>
          <Text style={styles.primaryButtonText}>Seleccionar todos</Text>
        </Pressable>

        <Pressable
          onPress={onAddSelected}
          style={[styles.button, styles.secondaryButton, isNarrow && styles.fullButton]}
        >
          <Text style={styles.secondaryButtonText}>Agregar favoritos</Text>
        </Pressable>
      </View>

      <View style={[styles.actions, isNarrow && styles.actionsNarrow]}>
        <Pressable
          onPress={onRemoveSelectedFavorites}
          style={[styles.button, styles.warningButton, isNarrow && styles.fullButton]}
        >
          <Text style={styles.warningButtonText}>Quitar favoritos seleccionados</Text>
        </Pressable>

        <Pressable onPress={onClear} style={[styles.button, styles.clearButton, isNarrow && styles.fullButton]}>
          <Text style={styles.clearButtonText}>Limpiar selección</Text>
        </Pressable>
      </View>
    </View>
  );
};

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
  summaryRowNarrow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing.xs,
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
  actionsNarrow: {
    flexDirection: 'column',
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
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.primarySoft,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
  },
  warningButton: {
    backgroundColor: '#FFF4E5',
    borderWidth: 1,
    borderColor: '#F4C27A',
  },
  warningButtonText: {
    color: colors.warning,
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#FFF5F4',
    borderWidth: 1,
    borderColor: '#F2B8B5',
  },
  clearButtonText: {
    color: colors.danger,
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
  },
  fullButton: {
    width: '100%',
  },
});
