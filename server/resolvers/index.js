import {
  categories,
} from './queries'

import {
  addCategory,
} from './mutations'

const resolvers = {
  Query: {
    categories,
    category: categories,
  },
  Mutation: {
    addCategory,
  },
}

export default resolvers
