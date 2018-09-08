async function addCategory (parent, { name, icon }, { Category }) {
  const newCategory = await new Category({
    name,
    icon,
  }).save()
  return newCategory
}

export default addCategory
