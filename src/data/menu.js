// Menu items. Names and descriptions live in i18n.js under menu.items[id].
// `photo` is the card image; without one, `dish` picks the illustration in components/Dish.jsx.
// The photos are stand-in stock images until Hera's own are ready (see CREDITS.md).
// TODO: add prices (`price: 45`) once Hera shares the menu. Cards without a price show none.
export const categories = ['moroccan', 'eggs', 'sweet', 'drinks']

export const menu = [
  { id: 'msemen', category: 'moroccan', dish: 'msemen', photo: '/media/menu/msemen.webp' },
  { id: 'baghrir', category: 'moroccan', dish: 'baghrir', photo: '/media/menu/baghrir.webp' },
  { id: 'amlou', category: 'moroccan', dish: 'amlou', photo: '/media/menu/amlou.webp' },
  { id: 'cheese', category: 'moroccan', dish: 'cheese', photo: '/media/menu/cheese.webp' },
  { id: 'benedict', category: 'eggs', dish: 'benedict', photo: '/media/menu/benedict.webp' },
  { id: 'eggs', category: 'eggs', dish: 'eggs', photo: '/media/menu/eggs.webp' },
  { id: 'avocado', category: 'eggs', dish: 'avocado', photo: '/media/menu/avocado.webp' },
  { id: 'pancakes', category: 'sweet', dish: 'pancakes', photo: '/media/menu/pancakes.webp' },
  { id: 'french', category: 'sweet', dish: 'french', photo: '/media/menu/french.webp' },
  { id: 'croissant', category: 'sweet', dish: 'croissant', photo: '/media/menu/croissant.webp' },
  { id: 'juice', category: 'drinks', dish: 'juice', photo: '/media/menu/juice.webp' },
  { id: 'coffee', category: 'drinks', dish: 'coffee', photo: '/media/menu/coffee.webp' },
  { id: 'tea', category: 'drinks', dish: 'tea', photo: '/media/menu/tea.webp' },
]
