import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';

import { Screen } from '../components/Screen';
import { StatusView } from '../components/StatusView';
import { colors, radius, spacing } from '../constants/theme';
import { useUsersLocalContext } from '../context/UsersLocalContext';
import { useUsersQuery } from '../hooks/useUsersQuery';
import { RootStackParamList } from '../types/navigation';

type UserDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'UserDetail'>;

const MIN_PHONE_LENGTH = 7;

export const UserDetailScreen = ({ navigation, route }: UserDetailScreenProps) => {
  const { userId } = route.params;
  const { data = [] } = useUsersQuery();
  const { getLocalPhone, isFavorite, toggleFavorite, updateLocalPhone } = useUsersLocalContext();
  const user = useMemo(() => data.find((item) => item.id === userId), [data, userId]);
  const [draftPhone, setDraftPhone] = useState(() => (user ? getLocalPhone(user.id, '') : ''));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      return;
    }

    setDraftPhone(getLocalPhone(user.id, ''));
  }, [getLocalPhone, user]);

  if (!user) {
    return (
      <Screen>
        <StatusView
          actionLabel="Volver al inicio"
          description="No encontramos el usuario solicitado dentro de la respuesta actual de la API."
          onActionPress={() => navigation.goBack()}
          title="Usuario no disponible"
        />
      </Screen>
    );
  }

  const handleSavePhone = () => {
    const normalizedPhone = draftPhone.trim();

    if (!normalizedPhone) {
      setError('El teléfono local es obligatorio.');
      return;
    }

    if (normalizedPhone.length < MIN_PHONE_LENGTH) {
      setError(`El teléfono local debe tener al menos ${MIN_PHONE_LENGTH} caracteres.`);
      return;
    }

    updateLocalPhone(user.id, normalizedPhone);
    setDraftPhone(normalizedPhone);
    setError('');
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.subtitle}>
            {user.location.city}, {user.location.country}
          </Text>

          <View style={styles.heroActions}>
            <Pressable onPress={() => navigation.goBack()} style={[styles.button, styles.secondaryButton]}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Volver</Text>
            </Pressable>
            <Pressable
              onPress={() => toggleFavorite(user.id)}
              style={[styles.button, isFavorite(user.id) && styles.favoriteButton]}
            >
              <Text style={styles.buttonText}>{isFavorite(user.id) ? 'Quitar favorito' : 'Agregar favorito'}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Información de contacto</Text>
          <DetailRow label="Correo electrónico" value={user.email} />
          <DetailRow label="Teléfono original" value={user.phone} />
          <DetailRow label="Edad" value={`${user.age} años`} />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <DetailRow label="País" value={user.location.country} />
          <DetailRow label="Ciudad" value={user.location.city} />
          <DetailRow label="Provincia / estado" value={user.location.state} />
          <DetailRow label="Dirección" value={user.location.street} />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Teléfono local editable</Text>
          <Text style={styles.inputLabel}>Número de teléfono local</Text>
          <TextInput
            keyboardType="phone-pad"
            onChangeText={(value) => {
              setDraftPhone(value);
              if (error) {
                setError('');
              }
            }}
            placeholder="Ingresa un teléfono local"
            placeholderTextColor={colors.textMuted}
            style={[styles.input, error ? styles.inputError : undefined]}
            value={draftPhone}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Text style={styles.helperText}>
            Valor guardado actualmente: {getLocalPhone(user.id, 'Sin registrar')}
          </Text>

          <Pressable onPress={handleSavePhone} style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Guardar teléfono local</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  heroCard: {
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xxl,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  heroActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  infoCard: {
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  detailRow: {
    gap: spacing.xs,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 21,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: spacing.md,
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: '#FFF5F4',
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.primarySoft,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  saveButton: {
    marginTop: spacing.xs,
  },
  favoriteButton: {
    backgroundColor: colors.favorite,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
