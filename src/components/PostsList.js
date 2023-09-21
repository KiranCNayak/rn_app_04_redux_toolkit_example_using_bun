import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import PostItem from './postItem/PostItem';
import { selectAllPosts } from '../redux/features/posts/postsSlice';

const PostsList = () => {
  const { posts } = useSelector(selectAllPosts);

  const renderList =
    posts && posts.length > 0 ? (
      <View style={styles.postRootContainerStyle}>
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
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

  postRootContainerStyle: {
    padding: 8,
  },
});
