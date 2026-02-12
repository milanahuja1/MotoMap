import { Button, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

import { useLocalSearchParams } from 'expo-router';

export default function Preview() {
  const { name, lat, lon, city, country } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">{name}</ThemedText>
      <ThemedText type="title">{city}, {country}</ThemedText>
      <ThemedText>{lat}, {lon}</ThemedText>
    

    <Button 
    title="Directions"
    onPress={() => {startNavigation();}}
    />
</View>


  );
}

function startNavigation() {
  // Implement navigation logic here, e.g., open a maps app with directions
  console.log('Starting navigation...');
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
