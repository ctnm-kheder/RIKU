import { Linking } from 'react-native';

export function openUri(uri) {
  Linking.openURL(uri);
}
