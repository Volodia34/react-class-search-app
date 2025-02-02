import { Component } from 'react';
import Header from '@modules/shared/components/header/Header.tsx';
import SearchForm from '@modules/topControls/components/SearchForm.tsx';

interface Item {
  name: string;
  description: string;
}

interface AppState {
  data: Item[];
  loading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      error: null,
    };
  }

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
