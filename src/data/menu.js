// Menu items. Names and descriptions live in i18n.js under menu.items[id].
// `photo` is the card image; without one, `dish` picks the illustration in components/Dish.jsx.
// `shape` is the photo's frame from lib/shapes.js: Moroccan shapes for the Moroccan table,
// brunch shapes for the rest (an egg for eggs, a honey drop for pancakes, a bean for coffee…).
// The photos are stand-in stock images until Hera's own are ready (see CREDITS.md).
// TODO: add prices (`price: 45`) once Hera shares the menu. Cards without a price show none.
export const categories = ['moroccan', 'eggs', 'sweet', 'drinks']

export const menu = [
  { id: 'msemen', category: 'moroccan', dish: 'msemen', photo: '/media/menu/msemen.webp', shape: 'msemen' },
  { id: 'baghrir', category: 'moroccan', dish: 'baghrir', photo: '/media/menu/baghrir.webp', shape: 'baghrir' },
  { id: 'amlou', category: 'moroccan', dish: 'amlou', photo: '/media/menu/amlou.webp', shape: 'star' },
  { id: 'cheese', category: 'moroccan', dish: 'cheese', photo: '/media/menu/cheese.webp', shape: 'lattice' },
  { id: 'benedict', category: 'eggs', dish: 'benedict', photo: '/media/menu/benedict.webp', shape: 'egg' },
  { id: 'eggs', category: 'eggs', dish: 'eggs', photo: '/media/menu/eggs.webp', shape: 'sun' },
  { id: 'avocado', category: 'eggs', dish: 'avocado', photo: '/media/menu/avocado.webp', shape: 'rosette' },
  { id: 'pancakes', category: 'sweet', dish: 'pancakes', photo: '/media/menu/pancakes.webp', shape: 'drop' },
  { id: 'french', category: 'sweet', dish: 'french', photo: '/media/menu/french.webp', shape: 'egg2' },
  { id: 'croissant', category: 'sweet', dish: 'croissant', photo: '/media/menu/croissant.webp', shape: 'crescent' },
  { id: 'juice', category: 'drinks', dish: 'juice', photo: '/media/menu/juice.webp', shape: 'slice' },
  { id: 'coffee', category: 'drinks', dish: 'coffee', photo: '/media/menu/coffee.webp', shape: 'bean' },
  { id: 'tea', category: 'drinks', dish: 'tea', photo: '/media/menu/tea.webp', shape: 'teaglass' },
]
