/**
 * This component displays a single post entry from a list.
 */
import React from 'react';

export default class PostsListEntry extends React.Component {

    editPost = (event) => {
        event.preventDefault();
        const target = event.target;
        const props = this.props;
        props.onEdit(parseInt(target.id,10));
    }

    render () {
        let props = this.props;
        let date = new Date(props.timestamp).toDateString();
        let title = props.title;

        return (
            <div>
                <span>{date}</span>
                &nbsp;
                <a href="." onClick={this.editPost} id={props.id}>{title}</a>
            </div>
        );
    }
}