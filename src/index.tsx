import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import router from "./Router";
import { client } from "./apollo";
import { lightTheme } from './styles/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 14px;
}

html {
  height: 100%;
}

body {
  height: 100%;
  background: #fafafa;
  & > div#__next {
    height: 100%;
  }
}

* {
  box-sizing: border-box;
}

a {
  color: black;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

h1,h2,h3,h4,h5,h6 {
  margin: 0;
}

button {
  border: 0;
  background-color: white;
  cursor: pointer;
}

ul, ol {
  padding: 0;
}
li {
  list-style: none;
}
`;

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <RouterProvider router={router}/>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>
);