import Mapbox, { Camera, LocationPuck, MapView } from "@rnmapbox/maps";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

Mapbox.setAccessToken("pk.eyJ1IjoibWlsYW5haHVqYSIsImEiOiJjbWttOHpneWowZHB6M2Nvdm1keDczZjk1In0.KGzKZ1ywfzsMES3djPQRLw");
Mapbox.setTelemetryEnabled(false);


const API_ENDPOINT = `https://randomuser.me/api/?results=30`;

export default function MapScreen() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_ENDPOINT);
    setIsLoading(false);
  }, []);

    const handleSearchChange = (text: string) => {
    setQuery(text);
    fetchData(API_ENDPOINT)
    console.log('User typed:', text);
  };

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results); 
      console.log(json.results);
    }
      catch (error) {
      console.log(error);
    }};

    if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={"large"} color="blue" />
      </View>
      );}

return (
<View style={styles.container}>
      <Map />
      <View style={styles.searchContainer}>
        <SearchBar value={query} onQuery={handleSearchChange} />
        <SearchList data={data} query={query} />
      </View>
    </View>
  );
}
function SearchList({ data }: { data: any[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.login.username}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name.first} {item.name.last}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
}
function Map(){
  return(
<MapView style={StyleSheet.absoluteFillObject}>
          <Camera zoomLevel={14} followUserLocation={true} />
          <LocationPuck puckBearingEnabled={true}/>
      </MapView>
  );
}
function SearchBar({
  value,
  onQuery,
}: {
  value: string;
  onQuery: (text: string) => void;
}) {
  return (
    <TextInput
      placeholder="Search for a destination"
      style={styles.searchBox}
      value={value}
      onChangeText={onQuery}
    />
  );
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
  }
  ,searchContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
  },
  searchBox:{
            height: 50,
            backgroundColor: 'white',
            borderRadius: 10,
            paddingHorizontal: 12, }
});
