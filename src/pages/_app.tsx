import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@modules/core/context/ThemeContext';
import store from '@modules/core/states/store';
import ErrorBoundary from '@modules/core/components/ErrorBoundary/ErrorBoundary';
import '../index.css';
import '../App.css';
import '../modules/resultsSection/components/DetailCard.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <ThemeProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>
);

export default MyApp;
