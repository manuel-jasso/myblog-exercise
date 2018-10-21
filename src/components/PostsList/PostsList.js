/**
 * This component displays the list of blog posts
 */
import React from 'react';

import PostsListsEntry from '../PostsListEntry/PostsListEntry';

export default class PostsList extends React.Component {

    onEdit = (id) => {
        const props = this.props;
        props.onEdit(id);
    }

    render () {
        const props = this.props;
        return (
            <div>
                {props.posts.map((post) => (
                    <PostsListsEntry
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        timestamp={post.timestamp}
                        onEdit={props.onEdit}
                        onDelete={props.onDelete}></PostsListsEntry>
                ))}
            </div>
        );
    }
}