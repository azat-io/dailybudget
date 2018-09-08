import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import map from 'lodash/map'

import categories from './categories.gql'

const Categories = ({ data: { categories } }) => (
  <ul>
    {
      map(categories, ({ name }) => (
        <li key={name}>
          { name }
        </li>
      ))
    }
  </ul>
)

Categories.propTypes = {
  data: PropTypes.object.isRequired,
}

export default graphql(categories)(Categories)
