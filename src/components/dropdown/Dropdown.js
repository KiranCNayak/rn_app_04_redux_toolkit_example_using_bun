import React, { memo, useCallback, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import DDListItem from './DDListItem';
import { IMAGES } from '../../data/images';
import { selectAllUsers } from '../../redux/features/users/usersSlice';

const Dropdown = ({ selectedDDItem, setSelectedDropdownItem }) => {
  const { users } = useSelector(selectAllUsers);

  const [showList, setShowList] = useState(false);

  const onItemPress = useCallback(
    item => {
      setSelectedDropdownItem(item);
      setShowList(false);
    },
    [setSelectedDropdownItem],
  );

  const renderList = useMemo(() => {
    return (
      <View style={styles.dropdownListRootContainerStyle}>
        {users.map(user => (
          <DDListItem
            key={user.id}
            onItemPress={onItemPress}
            selected={
              (selectedDDItem && user && selectedDDItem?.name === user?.name) ??
              false
            }
            user={user}
          />
        ))}
      </View>
    );
  }, [onItemPress, selectedDDItem, users]);

  return (
    <>
      <TouchableOpacity
        style={styles.rootContainerStyle}
        activeOpacity={0.6}
        onPress={() => setShowList(!showList)}>
        <Text>{selectedDDItem && selectedDDItem?.name}</Text>
        <Image
          alt="chevron"
          source={showList ? IMAGES.ICON_CHEVRON_UP : IMAGES.ICON_CHEVRON_DOWN}
          style={styles.dropdownIconStyle}
        />
      </TouchableOpacity>
      {showList && renderList}
    </>
  );
};

export default memo(Dropdown);

const styles = StyleSheet.create({
  dropdownIconStyle: {
    height: 16,
    width: 16,
  },

  dropdownListRootContainerStyle: {
    backgroundColor: '#222',
    borderRadius: 8,
    marginHorizontal: 4,
    marginTop: 4,
    padding: 8,
  },

  rootContainerStyle: {
    alignItems: 'center',
    backgroundColor: '#333',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    padding: 12,
  },
});
