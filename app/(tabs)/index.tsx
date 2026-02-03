import { Camera, MapView, UserLocation } from "@maplibre/maplibre-react-native";
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState, } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import SearchDropdown from '../../components/search-dropdown';

//Mapbox.setAccessToken("pk.eyJ1IjoibWlsYW5haHVqYSIsImEiOiJjbWttOHpneWowZHB6M2Nvdm1keDczZjk1In0.KGzKZ1ywfzsMES3djPQRLw");
//Mapbox.setTelemetryEnabled(false);


const API_ENDPOINT = `https://photon.komoot.io/api/?q=`;
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

type CurrentLocation = {
  latitude: number;
  longitude: number;
};


export default function MapScreen() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<PhotonResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
  const [selectedCoord, setSelectedCoord] = useState<[number, number] | null>(null); // [lon, lat]
  const [followUser, setFollowUser] = useState(true);
  
  

  
useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission denied');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setCurrentLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  })();
}, []);


    const handleSearchChange = async (text: string) => {
    setQuery(text);

    if (text.length < 2) {
      setData([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchPhoton(
        text,
        currentLocation?.latitude,
        currentLocation?.longitude
      );
      setData(results);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setQuery('');
    setSelectedCoord(null);
    setFollowUser(true);
  };

  const handleSelectLocation = (item: PhotonResult) => {
    const [lon, lat] = item.geometry.coordinates;
    setSelectedCoord([lon, lat]);
    setFollowUser(false);
    // optional: keep the query text, but hide the list by blurring the input via the back arrow when you want
  };

const searchPhoton = async (
  query: string,
  lat?: number,
  lon?: number
): Promise<PhotonResult[]> => {
  if (!query) return [];

  const params = new URLSearchParams({
    q: query,
    limit: '10',
  });

  if (lat != null && lon != null) {
    params.append('lat', lat.toString());
    params.append('lon', lon.toString());
  }

  const url = `https://photon.komoot.io/api/?${params.toString()}`;
  const response = await fetch(url);
  const json = await response.json();

  return json.features;
};

return (
<View style={styles.container}>
      <Map center={selectedCoord} followUser={followUser} currentLocation={currentLocation} />
      <View style={styles.searchContainer}>
        <SearchBar value={query} onQuery={handleSearchChange} onBack={handleBack} />
        {query.length > 0 && (
          <SearchDropdown data={data} onSelect={handleSelectLocation} />
        )}
      </View>
    </View>
  );
}
function Map({
  center,
  followUser,
  currentLocation,
}: {
  center: [number, number] | null;
  followUser: boolean;
  currentLocation: { latitude: number; longitude: number } | null;
}) {
  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=ZsqcDdYmq64sYztIuuag"
      //mapStyle="https://demotiles.maplibre.org/style.json"
    >
      <UserLocation visible />

      <Camera
        followUserLocation={followUser && currentLocation != null}
        followZoomLevel={14}
        centerCoordinate={
          followUser
            ? undefined
            : center ??
              (currentLocation
                ? [currentLocation.longitude, currentLocation.latitude]
                : undefined)
        }
        zoomLevel={14}
      />
    </MapView>
  );
}
function SearchBar({
  value,
  onQuery,
  onBack,
}: {
  value: string;
  onQuery: (text: string) => void;
  onBack: () => void;
}) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.searchRow}>
      {isFocused && (
        <Pressable
          onPress={() => {
            inputRef.current?.blur();
            onBack();
          }}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
      )}
      <TextInput
        ref={inputRef}
        placeholder="Search for a destination"
        style={styles.searchBox}
        value={value}
        onChangeText={onQuery}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  searchRow: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 10,
  paddingHorizontal: 8,
  height: 50,
},

backArrow: {
  fontSize: 20,
  marginRight: 8,
},
searchContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
  },
  searchBox:{
            height: 50,
            backgroundColor: 'white',
            borderRadius: 10,
            paddingHorizontal: 12, },
});