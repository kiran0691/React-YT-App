import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from  './components/search_bar';
import VideoDetail from './components/video_details';
import VideoList from './components/video_list';
const API_KEY = 'AIzaSyAiHYuzxBdcNMqi2cRVYYDdepHC3RTpMUk';

class App extends  Component{
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.onVideoSearch('sufboards');
  }
    // console.log(selectedVideo);

  onVideoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ videos: videos, selectedVideo: videos[0]});
    });
  }

  render() {

    const videoSearch = _.debounce((term) => {this.onVideoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={ term => videoSearch(term) } />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          videos={this.state.videos}
          onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
