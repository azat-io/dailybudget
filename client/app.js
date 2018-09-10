import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render } from 'react-dom'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import { normalize, selection } from 'polished'
import Home from 'containers/Home'
import Categories from 'containers/Categories'
import NotFound from 'containers/NotFound'

import Header from 'components/Header'
import Main from 'components/Main'
import Footer from 'components/Footer'

import rootReducer from 'reducers'

import theme from 'etc/theme'

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${API_PREFIX}/api`,
  }),
  cache: new InMemoryCache(),
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())

injectGlobal`
  ${normalize()}

  ${selection({
    background: theme.primaryColor,
    color: theme.primaryContrastColor,
  })}

  html,
  body {
    font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-size: 17px;
    width: 100%;
    height: 100%;
    color: ${theme.textColor};
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  #app {
    height: 100%;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  min-height: 100%;
`

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Container>
            <Header />
            <Main>
              <Switch>
                <Route exact path={'/'} component={Home} />
                <Route path={'/categories'} component={Categories} />
                <Route component={NotFound} />
              </Switch>
            </Main>
            <Footer />
          </Container>
        </ThemeProvider>
      </Router>
    </Provider>
  </ApolloProvider>
)

render(<App />, document.getElementById('app'))
