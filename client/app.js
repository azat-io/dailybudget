import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render } from 'react-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { normalize, selection } from 'polished'

import Home from 'containers/Home'
import Categories from 'containers/Categories'
import SignUp from 'containers/SignUp'
import NotFound from 'containers/NotFound'

import Header from 'components/Header'
import Main from 'components/Main'
import Footer from 'components/Footer'

import rootReducer from 'reducers'

import theme from 'etc/theme'

const httpLink = createHttpLink({
  uri: `${API_PREFIX}/api`,
})

const authLink = setContext((request, { headers }) => {
  const token = localStorage.getItem('TOKEN')
  console.log('token', token)
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetchOptions: {
    credentials: 'include',
  },
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  ${({ theme }) => selection({
    background: theme.primaryColor,
    color: theme.primaryContrastColor,
  })}

  html,
  body {
    font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-size: 17px;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.textColor};
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
            <GlobalStyle />
            <Header />
            <Main>
              <Switch>
                <Route exact path={'/'} component={Home} />
                <Route path={'/categories'} component={Categories} />
                <Route path={'/sign-up'} component={SignUp} />
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
