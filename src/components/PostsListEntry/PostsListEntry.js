/**
 * This component displays a single post entry from a list.
 */
import React from 'react';

export default class PostsListEntry extends React.Component {

    render () {

        let date = new Date(this.props.timestamp);
        let title = this.props.title;

        return (
            <div>
                <span>{date.toDateString()}</span>
                <span>{title}</span>
            </div>
        );
    }
}