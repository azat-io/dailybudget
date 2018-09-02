import uuid from 'uuid/v4'
import chalk from 'chalk'

import database from '../database'

class CategoriesController {
  all (request, response) {
    database.get().collection('categories')
      .find().toArray((error, docs) => {
        if (error) {
          this._onError(error)
          return response.sendStatus(500)
        }
        response.send(docs)
      })
  }

  findById ({ body: { id } }, response) {
    database.get().collection('categories')
      .findOne({ _id: id }, (error, docs) => {
        if (error) {
          this._onError(error)
          return response.sendStatus(500)
        }
        response.send(docs)
      })
  }

  create ({ body: { name, icon, color } }, response) {
    const category = {
      _id: uuid(),
      name,
      icon,
      color,
    }
    database.get().collection('categories')
      .insert(category, (error, result) => {
        if (error) {
          this._onError(error)
          return response.sendStatus(500)
        }
        response.send(category)
      })
  }

  update ({ params: { id }, body: { name, icon } }, response) {
    const category = {
      _id: id,
      name,
      icon,
    }
    database.get().collection('categories')
      .updateOne({ _id: id }, category, (error, result) => {
        if (error) {
          this._onError(error)
          return response.sendStatus(500)
        }
        response.send(category)
      })
  }

  delete ({ params: { id } }, response) {
    database.get().collection('categories')
      .deleteOne({ _id: id }, (error, result) => {
        if (error) {
          this._onError(error)
          return response.sendStatus(500)
        }
        response.sendStatus(200)
      })
  }

  _onError (error) {
    console.log(chalk.bold.red('Error:'), error)
  }
}

export default new CategoriesController()
