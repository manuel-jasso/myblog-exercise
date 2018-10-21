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

    this.fetchPosts();
  }

  fetchPosts = () => {
    posts.getAll()
        .then((respJson) => {
            this.setState({
              posts: respJson
            });
        })
        .catch((error) => {
          console.log(error);
        });
  }

  createNewPost = () => {
    this.setState({
      addNew: true
    });
  }

  onSavePost = (newPost) => {

    posts.create(newPost)
    .then((respJson) => {
        const newPost = {
          title: respJson.title,
          text: respJson.text,
          id: respJson.id,
          timestamp: respJson.timestamp
        };

        this.setState((prevState) => {
          return {
            posts: [...prevState.posts, newPost ],
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

  onClosePost = () => {
    this.setState({
      addNew: false
    });
  }

  appBody () {
    const state = this.state;
    let appBody = null;

    if (state.addNew) {
      appBody = <PostEdit onSave={this.onSavePost} onClose={this.onClosePost}></PostEdit>
    } else if (Array.isArray(state.posts)) {
      appBody = (
        <div>
          <PostsList posts={state.posts}></PostsList>
          <button onClick={this.createNewPost}>Create New Post</button>
        </div>
      )
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
