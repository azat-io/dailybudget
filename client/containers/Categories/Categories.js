import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import map from 'lodash/map'

import Title from 'components/Title'

import categories from './categories.gql'

const Categories = ({ data: { categories } }) => (
  <div>
    <Title name={'Категории'} />
    <ul>
      {
        map(categories, ({ name }, index) => (
          <li key={`category-${index}`}>
            { name }
          </li>
        ))
      }
    </ul>
  </div>
)

Categories.propTypes = {
  data: PropTypes.object.isRequired,
}

export default graphql(categories)(Categories)
