import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';

import { router, useLocalSearchParams } from 'expo-router';

export default function Preview() {
  const params = useLocalSearchParams();
  const name = typeof params.name === 'string' ? params.name : '';
  const city = typeof params.city === 'string' ? params.city : '';
  const country = typeof params.country === 'string' ? params.country : '';
  const latStr = typeof params.lat === 'string' ? params.lat : '';
  const lonStr = typeof params.lon === 'string' ? params.lon : '';

  const subtitle = [city, country].filter(Boolean).join(', ');
  const hasCoords = latStr.length > 0 && lonStr.length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ThemedText style={styles.backText}>Back</ThemedText>
          </Pressable>

          <ThemedText style={styles.headerTitle}>Preview</ThemedText>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.card}>
          <ThemedText type="title" style={styles.placeTitle} numberOfLines={2}>
            {name || 'Selected location'}
          </ThemedText>

          {subtitle.length > 0 ? (
            <ThemedText style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </ThemedText>
          ) : null}

          <ThemedText style={styles.coords}>
            {hasCoords ? `${latStr}, ${lonStr}` : 'No coordinates available'}
          </ThemedText>

          <Pressable
            style={[styles.primaryButton, !hasCoords && styles.primaryButtonDisabled]}
            disabled={!hasCoords}
            onPress={() => startNavigation(latStr, lonStr)}
          >
            <ThemedText style={styles.primaryButtonText}>Directions</ThemedText>
          </Pressable>

          <ThemedText style={styles.hint}>
            Placeholder for routing logic.
          </ThemedText>
        </View>
      </View>
    </SafeAreaView>
  );
}

function startNavigation(lat: string, lon: string) {
  // Placeholder – real routing logic will be implemented later
  if (!lat || !lon) {
    console.log('No destination coordinates');
    return;
  }
  console.log('Starting navigation to:', lat, lon);
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  backText: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 44,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  placeTitle: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.85,
    marginBottom: 10,
  },
  coords: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 14,
  },
  primaryButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#111',
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  hint: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 10,
  },
});
