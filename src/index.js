import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
const API_KEY = 'AIzaSyCCrS4DQxMGfQsxuNMcaIS3mx-VWb9msm0';


// Create default component to generate HTML.  
// This is a stateless, functional component when defined like this, whereas searchbar is defined using class so it has state
// If we want a component to have state we need to use class
// const App = () => {
//   return (
//     <div>
//       <SearchBar />
//     </div>
//   );
// }

class App extends Component {
  constructor(props){
    super(props);
    this.state = { videos: [], selectedVideo: null };
    this.videoSearch('surfboards');
  }

  videoSearch(term)
  {
    YTSearch({ key: API_KEY, term: term },  (data) => { //If this was function(data) {this.setState...} we hit problems with this not being defined!
      this.setState({videos: data, selectedVideo: data[0]}); 
    });
  }
  
  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300); //Create throttled version of videoSearch so it only searches every 300ms not every key press
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
      </div>
    )
  }
}

// Render the HTML to the 'container' DOM element in index.html
ReactDOM.render(<App />, document.querySelector('.container'));
