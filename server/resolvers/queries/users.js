async function users (parent, args, { User }) {
  const allUsers = await User.find()
  return allUsers
}

export default users
