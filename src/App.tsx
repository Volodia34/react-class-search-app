import { Component } from 'react';
import Header from '@modules/shared/components/header/Header.tsx';
import SearchForm from '@modules/topControls/components/SearchForm.tsx';
import { fetchItems } from '@modules/core/lib/apiService.ts';
import ResultsList from '@modules/resultsSection/components/ResultsList.tsx';
import { Item } from './types/Item.ts';

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

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchTerm') || '';
    this.performSearch(savedQuery);
  }

  performSearch = async (query: string) => {
    this.setState({ loading: true, error: null });
    try {
      const items: Item[] = await fetchItems(query);
      this.setState({ data: items, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      }
    }
  };

  render() {
    return (
      <div>
        <Header />
        <SearchForm onSearch={this.performSearch} />
        <main>
          <ResultsList
            loading={this.state.loading}
            error={this.state.error}
            data={this.state.data}
          />
        </main>
      </div>
    );
  }
}

export default App;
