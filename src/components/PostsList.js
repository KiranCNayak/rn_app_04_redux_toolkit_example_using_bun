import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { selectAllPosts } from '../redux/features/posts/postsSlice';

const PostsList = () => {
  const { posts } = useSelector(selectAllPosts);

  const renderList =
    posts && posts.length > 0 ? (
      <View style={styles.postRootContainerStyle}>
        {posts.map(post => (
          <View key={post.id} style={styles.postContainerStyle}>
            <Text style={styles.postTitleTextStyle}>{post.title}</Text>
            <Text>{post.description}</Text>
          </View>
        ))}
      </View>
    ) : (
      <View style={styles.emptyPostListContainerStyle}>
        <Text>Empty List</Text>
      </View>
    );
  return <>{renderList}</>;
};

export default PostsList;

const styles = StyleSheet.create({
  emptyPostListContainerStyle: {
    alignItems: 'center',
  },

  postContainerStyle: {
    backgroundColor: '#111',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  postRootContainerStyle: {
    padding: 8,
  },

  postTitleTextStyle: {
    fontSize: 16,
    fontWeight: '700',
  },
});
