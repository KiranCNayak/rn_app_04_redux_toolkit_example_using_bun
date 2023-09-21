import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { selectAllUsers } from '../../redux/features/users/usersSlice';

const PostItem = ({ post }) => {
  const { users } = useSelector(selectAllUsers);

  const postAuthor = users.filter(user => user.id === post.userId);

  return (
    <View style={styles.postContainerStyle}>
      <Text style={styles.postTitleTextStyle}>{post.title}</Text>
      <Text>{post.description}</Text>
      <View style={styles.postAuthorTextContainerStyle}>
        <Text>{`by ${
          (postAuthor && postAuthor[0]?.name) ?? 'Unknown Author'
        }`}</Text>
      </View>
    </View>
  );
};
export default memo(PostItem);

const styles = StyleSheet.create({
  postAuthorTextContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  postContainerStyle: {
    backgroundColor: '#111',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  postTitleTextStyle: {
    fontSize: 16,
    fontWeight: '700',
  },
});
