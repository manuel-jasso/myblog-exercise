/**
 * This component displays the list of blog posts
 */
import React from 'react';

import PostsListsEntry from '../PostsListEntry/PostsListEntry';

export default class PostsList extends React.Component {

    render () {
        const props = this.props;
        return (
            <div>
                {props.posts.map((post) => (
                    <PostsListsEntry key={post.id} title={post.title} timestamp={post.timestamp}></PostsListsEntry>
                ))}
            </div>
        );
    }
}