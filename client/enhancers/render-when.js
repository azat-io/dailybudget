import { branch, renderNothing } from 'recompose'

export default predicate => branch(
  props => !predicate(props),
  renderNothing,
)
