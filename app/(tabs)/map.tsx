import Mapbox, { MapView } from "@rnmapbox/maps";
import { StyleSheet, Text, View } from 'react-native';
Mapbox.setAccessToken("pk.eyJ1IjoibWlsYW5haHVqYSIsImEiOiJjbWttOHpneWowZHB6M2Nvdm1keDczZjk1In0.KGzKZ1ywfzsMES3djPQRLw");
Mapbox.setTelemetryEnabled(false);
export default function HomeScreen() {
return (
    <View style={{ flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
     }}>
      <Text>Map Screen</Text>
              <View style={styles.container}>
          <MapView style={styles.map} />
        </View>
    </View>
      
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  map: {
    flex: 1
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato"
  }
});
