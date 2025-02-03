import { Component } from 'react';
import Header from '@modules/shared/components/header/Header.tsx';
import SearchForm from '@modules/topControls/components/SearchForm.tsx';
import { fetchItems } from '@modules/core/lib/apiService.ts';
import ResultsList from '@modules/resultsSection/components/ResultsList.tsx';
import { Item } from './types/Item.ts';
import ErrorBoundary from '@modules/core/components/ErrorBoundary/ErrorBoundary.tsx';

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

  handleErrorButtonClick = () => {
    throw new Error('Test error for ErrorBoundary!');
  };

  render() {
    return (
      <ErrorBoundary>
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
          <footer style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={this.handleErrorButtonClick}
              style={{ padding: '8px 16px' }}
            >
              Error Button
            </button>
          </footer>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
