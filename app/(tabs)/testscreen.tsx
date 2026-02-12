import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getHealth } from '../api';

export default function TestScreen() {
  const [status, setStatus] = useState<string>('Checking...');

  useEffect(() => {
    const test = async () => {
      try {
        const data = await getHealth();
        setStatus(data.status);
      } catch (err) {
        console.log('Fetch failed:', String(err));
        setStatus('Backend unreachable');
      }
    };

    test();
  }, []);

  return (
    <View>
      <Text>Backend status: {status}</Text>
    </View>
  );
}

