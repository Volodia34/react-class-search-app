import { Component } from 'react';
import Header from '@modules/shared/components/header/Header.tsx';
import SearchForm from '@modules/topControls/components/SearchForm.tsx';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <SearchForm />
      </div>
    );
  }
}

export default App;
