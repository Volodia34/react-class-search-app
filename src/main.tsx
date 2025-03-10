import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import NotFound from '@modules/core/components/NotFound/NotFound.tsx';
import DetailPanel from '@modules/resultsSection/components/DetailPanel.tsx';
import ErrorBoundary from '@modules/core/components/ErrorBoundary/ErrorBoundary.tsx';
import { ThemeProvider } from '@modules/core//context/ThemeContext.tsx';
import store from '@modules/core/states/store.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="details/:id" element={<DetailPanel />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
