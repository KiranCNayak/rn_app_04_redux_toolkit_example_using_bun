import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import PostsList from './components/PostsList';
import { THEME_VARIANT } from './data/constants';
import { addPost } from './redux/features/posts/postsSlice';
import { toggleTheme } from './redux/features/theme/themeSlice';

function App() {
  const dispatch = useDispatch();

  const descriptionTextInputRef = useRef(null);
  const titleTextInputRef = useRef(null);

  const theme = useSelector(state => state.theme.theme);

  const [inputTextDescription, setInputTextDescription] = useState('');
  const [inputTextTitle, setInputTextTitle] = useState('');

  const onAddPostTouchablePressed = () => {
    // Empty title text Validation
    if (inputTextTitle === '') {
      titleTextInputRef.current.focus();
      return;
    }

    // Empty description text Validation
    if (inputTextDescription === '') {
      descriptionTextInputRef.current.focus();
      return;
    }

    dispatch(
      addPost({
        id: nanoid(),
        title: inputTextTitle,
        description: inputTextDescription,
      }),
    );

    clearTIData();
  };

  const clearTIData = () => {
    setInputTextDescription('');
    setInputTextTitle('');

    titleTextInputRef.current.focus();
  };

  const AddPostComponent = (
    <View style={styles.addPostRootContainerStyle}>
      <TextInput
        onChangeText={setInputTextTitle}
        placeholder={'Enter Title'}
        ref={titleTextInputRef}
        style={styles.titleTIStyle}
        value={inputTextTitle}
      />
      <TextInput
        onChangeText={setInputTextDescription}
        placeholder={'Enter Description'}
        ref={descriptionTextInputRef}
        style={styles.descriptionTIStyle}
        value={inputTextDescription}
      />
      <View style={styles.postsTouchableContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onAddPostTouchablePressed}
          style={[styles.postCRUDTouchableStyle, styles.positiveColorStyle]}>
          <Text style={styles.postCRUDTouchableTextStyle}>ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={clearTIData}
          style={[styles.negativeColorStyle, styles.postCRUDTouchableStyle]}>
          <Text style={styles.postCRUDTouchableTextStyle}>CLEAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
      {AddPostComponent}
      <PostsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addPostRootContainerStyle: {
    margin: 8,
  },

  descriptionTIStyle: {
    backgroundColor: '#333',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginTop: 4,
    padding: 12,
  },

  negativeColorStyle: {
    backgroundColor: '#a82310',
  },

  positiveColorStyle: {
    backgroundColor: '#23a810',
  },

  postCRUDTouchableStyle: {
    alignItems: 'center',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    margin: 12,
    padding: 8,
  },

  postCRUDTouchableTextStyle: {
    color: '#fff',
    fontWeight: '700',
  },

  postsTouchableContainerStyle: {
    flexDirection: 'row',
    marginTop: 8,
  },

  titleTIStyle: {
    backgroundColor: '#333',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 4,
    padding: 12,
  },

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
