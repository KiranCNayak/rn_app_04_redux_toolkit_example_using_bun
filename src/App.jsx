import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { THEME_VARIANT } from './data/constants';
import { toggleTheme } from './redux/features/theme/themeSlice';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme === THEME_VARIANT.dark ? '#000' : '#fff',
        flex: 1,
      }}>
      <View style={styles.touchableContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            dispatch(toggleTheme());
          }}
          style={styles.touchableStyle}>
          <Text style={styles.touchableTextStyle}>Toggle Theme</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: theme === THEME_VARIANT.dark ? '#fff' : '#000' }}>
        {'Hello World!'}
      </Text>
      <Text
        style={{
          color: theme === THEME_VARIANT.dark ? '#fff' : '#000',
        }}>{`Theme selected: ${theme}`}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchableStyle: {
    backgroundColor: '#333',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  touchableContainerStyle: {
    backgroundColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },

  touchableTextStyle: {
    color: '#fff',
  },
});

export default App;
