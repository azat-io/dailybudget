async function categories (parent, args, { Category }) {
  const allCategories = await Category.find()
  return allCategories
}

export default categories
