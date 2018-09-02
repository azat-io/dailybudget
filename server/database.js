import { MongoClient } from 'mongodb'
import isNil from 'lodash/isNil'

class DataBase {
  constructor () {
    this.state = {
      database: null,
    }
  }

  connect (url, done) {
    if (!isNil(this.state.database)) {
      return done()
    }
    MongoClient.connect(url, { useNewUrlParser: true, autoIndexId: false }, (error, client) => {
      if (error) {
        return done(error)
      }
      this.state.database = client.db(process.env.DB_NAME)
      done()
    })
  }

  get () {
    return this.state.database
  }
}

const database = new DataBase()

export default database
