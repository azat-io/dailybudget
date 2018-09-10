import {
  categories,
  users,
} from './queries'

import {
  addCategory,
  signUp,
} from './mutations'

const resolvers = {
  Query: {
    categories,
    category: categories,
    users,
  },
  Mutation: {
    addCategory,
    signUp,
  },
}

export default resolvers
