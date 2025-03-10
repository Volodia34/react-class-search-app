'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from '@modules/core/context/ThemeContext';
import store from '@modules/core/states/store';
import ErrorBoundary from '@modules/core/components/ErrorBoundary/ErrorBoundary';
import '../index.css';
import '../App.css';
import '../modules/resultsSection/components/DetailCard.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html>
    <body>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
