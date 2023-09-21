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

import Dropdown from './components/dropdown/Dropdown';
import PostsList from './components/PostsList';
import { THEME_VARIANT } from './data/constants';
import { addPost } from './redux/features/posts/postsSlice';
import { toggleTheme } from './redux/features/theme/themeSlice';
import { selectAllUsers } from './redux/features/users/usersSlice';

function App() {
  const dispatch = useDispatch();

  const descriptionTextInputRef = useRef(null);
  const titleTextInputRef = useRef(null);

  const theme = useSelector(state => state.theme.theme);
  const { users } = useSelector(selectAllUsers);

  const [inputTextDescription, setInputTextDescription] = useState('');
  const [inputTextTitle, setInputTextTitle] = useState('');
  const [selectedDDItem, setSelectedDDItem] = useState(users[0]);

  const onAddPostTouchablePressed = () => {
    dispatch(addPost(inputTextTitle, inputTextDescription, selectedDDItem.id));

    clearTIData();
  };

  const clearTIData = () => {
    setInputTextDescription('');
    setInputTextTitle('');
    setSelectedDDItem(users[0]);

    titleTextInputRef.current.focus();
  };

  const setSelectedDropdownItem = item => {
    setSelectedDDItem(item);
  };

  const isAddBtnDisabled =
    inputTextTitle === '' ||
    inputTextDescription === '' ||
    selectedDDItem?.name === users[0].name;

  const isClearBtnDisabled =
    inputTextTitle === '' &&
    inputTextDescription === '' &&
    selectedDDItem.id === users[0].id;

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
      <Dropdown
        selectedDDItem={selectedDDItem}
        setSelectedDropdownItem={setSelectedDropdownItem}
      />
      <View style={styles.postsTouchableContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={isAddBtnDisabled}
          onPress={onAddPostTouchablePressed}
          style={[
            styles.postCRUDTouchableStyle,
            isAddBtnDisabled
              ? styles.positiveDisabledColorStyle
              : styles.positiveEnabledColorStyle,
          ]}>
          <Text
            style={[
              styles.postCRUDTouchableTextStyle,
              isAddBtnDisabled
                ? styles.postCRUDTouchableDisabledTextStyle
                : styles.postCRUDTouchableEnabledTextStyle,
            ]}>
            ADD
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={clearTIData}
          style={[
            isClearBtnDisabled
              ? styles.negativeColorDisabledStyle
              : styles.negativeColorEnabledStyle,
            styles.postCRUDTouchableStyle,
          ]}>
          <Text
            style={[
              isClearBtnDisabled
                ? styles.postCRUDTouchableDisabledTextStyle
                : styles.postCRUDTouchableEnabledTextStyle,
            ]}>
            CLEAR
          </Text>
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
    borderRadius: 4,
    marginVertical: 4,
    padding: 12,
  },

  negativeColorDisabledStyle: {
    backgroundColor: '#582310',
  },

  negativeColorEnabledStyle: {
    backgroundColor: '#a82310',
  },

  positiveDisabledColorStyle: {
    backgroundColor: '#235810',
  },

  positiveEnabledColorStyle: {
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

  postCRUDTouchableDisabledTextStyle: {
    color: '#999',
    fontWeight: '500',
  },

  postCRUDTouchableEnabledTextStyle: {
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
