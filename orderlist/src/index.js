import React from 'react';
import {render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './routes/App';
import { ThemeProvider } from 'react-css-themr';
import configureStore from './store/configureStore'
import theme from './theme';

const store = configureStore();


const renderApp = (AppComponent) => {
  render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppComponent />
      </Provider>
    </ThemeProvider>,
    document.getElementById('root')
  )
}

renderApp(App);
