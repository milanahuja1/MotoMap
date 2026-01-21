import Mapbox, { Camera, LocationPuck, MapView } from "@rnmapbox/maps";
import React from "react";
import { StyleSheet, TextInput, View } from 'react-native';

Mapbox.setAccessToken("pk.eyJ1IjoibWlsYW5haHVqYSIsImEiOiJjbWttOHpneWowZHB6M2Nvdm1keDczZjk1In0.KGzKZ1ywfzsMES3djPQRLw");
Mapbox.setTelemetryEnabled(false);




export default function MapScreen() {
  const [query, onChangeText] = React.useState('');
return (
<View style={styles.container}>
      <Map />
      <View style={styles.searchContainer}>
        <SearchBar value={query} onChangeText={onChangeText} />
      </View>
    </View>
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
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <TextInput
      placeholder="Search for a destination"
      style={styles.searchBox}
      value={value}
      onChangeText={onChangeText}
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
