import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, unmountComponentAtNode } from 'react-dom'
import Header from './Header'

it('Header renders without crashing', () => {
  const div = document.createElement('div')
  render(<Router>
    <Header />
  </Router>, div)
  unmountComponentAtNode(div)
})
