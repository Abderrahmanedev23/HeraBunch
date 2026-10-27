// Menu items. Names and descriptions live in i18n.js under menu.items[id].
// `dish` picks the illustration in components/Dish.jsx.
// TODO: add prices (`price: 45`) once Hera shares the menu. Rows without a price show none.
export const categories = ['moroccan', 'eggs', 'sweet', 'drinks']

export const menu = [
  { id: 'msemen', category: 'moroccan', dish: 'msemen' },
  { id: 'baghrir', category: 'moroccan', dish: 'baghrir' },
  { id: 'amlou', category: 'moroccan', dish: 'amlou' },
  { id: 'cheese', category: 'moroccan', dish: 'cheese' },
  { id: 'benedict', category: 'eggs', dish: 'benedict' },
  { id: 'eggs', category: 'eggs', dish: 'eggs' },
  { id: 'avocado', category: 'eggs', dish: 'avocado' },
  { id: 'pancakes', category: 'sweet', dish: 'pancakes' },
  { id: 'french', category: 'sweet', dish: 'french' },
  { id: 'croissant', category: 'sweet', dish: 'croissant' },
  { id: 'juice', category: 'drinks', dish: 'juice' },
  { id: 'coffee', category: 'drinks', dish: 'coffee' },
  { id: 'tea', category: 'drinks', dish: 'tea' },
]
