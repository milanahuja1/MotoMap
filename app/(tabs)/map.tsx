import Mapbox, { Camera, LocationPuck, MapView } from "@rnmapbox/maps";
import { useState } from "react";
import { StyleSheet, TextInput, View } from 'react-native';
Mapbox.setAccessToken("pk.eyJ1IjoibWlsYW5haHVqYSIsImEiOiJjbWttOHpneWowZHB6M2Nvdm1keDczZjk1In0.KGzKZ1ywfzsMES3djPQRLw");
Mapbox.setTelemetryEnabled(false);
export default function HomeScreen() {
  const [query, setQuery] = useState('');
return (
<View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject}>
          <Camera zoomLevel={14} followUserLocation={true} />
          <LocationPuck puckBearingEnabled={true}/>
      </MapView>
      
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
            onSubmitEditing={() => {
    console.log('User searched:', query);
  }}
          style={styles.searchBox}
          />
      </View>
    </View>
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
