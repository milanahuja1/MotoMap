import React from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';

type PhotonResult = {
  properties: {
    name: string;
    city?: string;
    country?: string;
    osm_id?: number;
    osm_type?: string;
  };
  geometry: {
    coordinates: [number, number]; // [lon, lat]
  };
};

export default function SearchDropdown({
  data,
  onSelect,
}: {
  data: PhotonResult[];
  onSelect: (item: PhotonResult) => void;
}) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => {
        const id = item.properties.osm_id;
        const type = item.properties.osm_type;
        if (id != null && type) return `${type}-${id}`;
        const [lon, lat] = item.geometry.coordinates;
        return `${item.properties.name}-${lat}-${lon}`;
      }}
      renderItem={({ item }) => (
        <Pressable style={styles.listItem} onPress={() => onSelect(item)}>
          <Text style={styles.nameText}>{item.properties.name}</Text>
          <Text style={styles.subText}>
            {item.properties.city}
            {item.properties.city && item.properties.country ? ', ' : ''}
            {item.properties.country}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});