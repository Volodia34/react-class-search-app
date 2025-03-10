import { render } from '@testing-library/react';
import MyApp from '../layout';
import { AppProps } from 'next/app';
import store from '@modules/core/states/store';
import { Provider } from 'react-redux';
import { Router } from 'next/router';

jest.mock('@modules/core/context/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@modules/core/components/ErrorBoundary/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const mockComponent = () => <div>Mock Component</div>;

describe('_app', () => {
  test('renders child component', () => {
    const props: AppProps = {
      Component: mockComponent,
      pageProps: {},
      router: {} as Router,
    };
    const { getByText } = render(
      <Provider store={store}>
        <MyApp {...props}>
          <div>Mock Component</div>
        </MyApp>
      </Provider>
    );
    expect(getByText('Mock Component')).toBeInTheDocument();
  });
});
