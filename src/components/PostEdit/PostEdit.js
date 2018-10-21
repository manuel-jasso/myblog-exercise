/**
 * This Component is used to Create/Edit a blog post
 */
import React from 'react';

import './PostEdit.css';


export default class PostEdit extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            text: props.text
        }
    }

    onSave = () => {
        const props = this.props;
        const state = this.state;
        props.onSave({
            id: state.id,
            title: state.title,
            text: state.text
        });
    }

    onDelete = () => {
        const props = this.props;
        const state = this.state;
        props.onDelete({
            id: state.id
        });
    }

    handleTitleChange = (event) => {
        const target = event.target;
        this.setState({
            title: target.value
        })
    }

    handleTextChange = (event) => {
        const target = event.target;
        this.setState({
            text: target.value
        });
    }

    render () {
        const props = this.props;
        const state = this.state;
        const editing = (props.id) ? true : false;
        let header = (editing) ? 'Edit Post' : 'New Post';

        return (
            <div className="PostEdit">
                <h1>{header}</h1>
                <div>
                    <label>Title:</label>
                    <input type="text" onChange={this.handleTitleChange} value={state.title} />
                </div>
                <div>
                    <label>Text:</label>
                    <textarea onChange={this.handleTextChange} value={state.text} />
                </div>
                <button onClick={this.onSave}>Save</button>
                {editing ? <button onClick={this.onDelete}>Delete</button> : null}
                <button onClick={props.onClose}>Close</button>
            </div>
        );
    }
}