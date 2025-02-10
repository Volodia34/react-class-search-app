import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from '@modules/core/components/NotFound/NotFound.tsx';
import DetailPanel from '@modules/resultsSection/components/DetailPanel.tsx';
import ErrorBoundary from '@modules/core/components/ErrorBoundary/ErrorBoundary.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
