/**
 * This Component is used to Create/Edit a blog post
 */
import React from 'react';

export default class PostEdit extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            title: props.title,
            text: props.text
        }
    }

    onSave = () => {
        const props = this.props;
        const state = this.state;
        props.onSave({
            title: state.title,
            text: state.text
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

        let header = (props.id) ? 'Edit Post' : 'New Post';

        return (
            <div>
                <h1>{header}</h1>
                <div>
                    <label>Title:</label>
                    <input type="text" onChange={this.handleTitleChange} value={state.title} />
                </div>
                <div>
                    <label>Text:</label>
                    <textarea onChange={this.handleTextChange}>{state.text}</textarea>
                </div>
                <button onClick={this.onSave}>Save</button>
                <button onClick={props.onClose}>Close</button>
            </div>
        );
    }
}