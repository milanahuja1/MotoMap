import Mapbox, { MapView } from "@rnmapbox/maps";
import { StyleSheet, View } from 'react-native';
Mapbox.setAccessToken("pk.eyJ1IjoibWlsYW5haHVqYSIsImEiOiJjbWttOHpneWowZHB6M2Nvdm1keDczZjk1In0.KGzKZ1ywfzsMES3djPQRLw");
Mapbox.setTelemetryEnabled(false);
export default function HomeScreen() {
return (
<View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} />
    </View>
      
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
  }
});
