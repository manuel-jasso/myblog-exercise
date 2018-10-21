import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import posts from './api/api';

import PostsList from './components/PostsList/PostsList';
import PostEdit from './components/PostEdit/PostEdit';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  fetchPosts = () => {
    posts.getAll()
        .then((resp) => {
            this.setState({
              posts: resp
            });
        })
        .catch((error) => {
          console.log(error);
        });
  }

  componentDidMount () {
    this.fetchPosts();
  }

  createNewPost = () => {
    this.setState({
      addNew: true
    });
  }

  onCreate = (post) => {
    posts.create(post)
    .then((resp) => {
        const post = {
          title: resp.title,
          text: resp.text,
          id: resp.id,
          timestamp: resp.timestamp
        };
        this.setState((prevState) => {
          return {
            posts: [...prevState.posts, post],
            addNew: false
          };
        });
    })
    .catch((error) => {
        console.log(error);
        this.setState({
          addNew: false
        });
    });
  }

  onUpdate = (post) => {
    posts.update(post)
    .then((resp) => {
        const posts = this.state.posts.map((post) => {
          if (post.id === resp.id) {
            return resp;
          } else {
            return post;
          }
        });
        this.setState({
            posts,
            editPost: undefined
        });
    })
    .catch((error) => {
        console.log(error);
        this.setState({
          editPost: undefined
        });
    });
  }

  onDelete = (post) => {
    posts.delete(post)
    .then((resp) => {
        const posts = this.state.posts.reduce((acc, p) => {
          if (post.id !== p.id) {
            acc.push(p);
          }
          return acc;
        },[]);
        this.setState({
            posts,
            editPost: undefined
        });
    })
    .catch((error) => {
        console.log(error);
        this.setState({
          editPost: undefined
        });
    });
  }

  onEdit = (id) => {
    this.setState({
      editPost: id
    });
  }

  onClose = () => {
    this.setState({
      editPost: undefined,
      addNew: false
    });
  }

  appBody () {
    const state = this.state;
    let appBody = null;

    if (state.addNew) {
      appBody = <PostEdit onSave={this.onCreate} onClose={this.onClose}></PostEdit>
    } else if (state.editPost) {
      const post = state.posts.find((post) => post.id === state.editPost);
      appBody = <PostEdit onSave={this.onUpdate} onDelete={this.onDelete} onClose={this.onClose} id={post.id} title={post.title} text={post.text}></PostEdit>
    } else if (Array.isArray(state.posts)) {
      appBody =
        <div>
          <PostsList posts={state.posts} onEdit={this.onEdit}></PostsList>
          <button onClick={this.createNewPost}>Create New Post</button>
        </div>
    } else {
      appBody = <div>Fetching....</div>;
    }
    return appBody;
  }

  render() {
    return (
      <div className="App">
        {this.appBody()}
      </div>
    );
  }
}

export default App;
