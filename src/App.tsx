import { Component } from 'react';
import Header from './components/Header/Header.tsx';
import Search from './components/Search/Search.tsx';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Search />
      </div>
    );
  }
}

export default App;
