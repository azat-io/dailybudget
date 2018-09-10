import jwt from 'jsonwebtoken'

async function signUp (parent, { email, password }, { User }) {
  const user = await User.findOne({ email })
  if (user) {
    throw new Error('User already exists')
  }
  const createToken = (user, secret, expiresIn) => {
    const { email } = user
    return jwt.sign({ email }, secret, { expiresIn })
  }
  const newUser = await new User({
    email,
    password,
  }).save()
  return ({
    token: createToken(newUser, process.env.SECRET, '1hr'),
  })
}

export default signUp
