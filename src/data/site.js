// Business details. Anything marked TODO is a placeholder to confirm with Hera before launch.
export const site = {
  name: 'Hera Brunch',
  city: 'Rabat',
  timeZone: 'Africa/Casablanca',

  // TODO: confirm real opening hours. Same hours every day for now.
  // day: 0 = Sunday … 6 = Saturday. Times are 24h "HH:MM" in Rabat time.
  hours: [0, 1, 2, 3, 4, 5, 6].map((day) => ({ day, open: '08:00', close: '16:00' })),

  // TODO: full street address and phone number.
  address: null,
  phone: null,

  instagram: 'https://www.instagram.com/herabrunch/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Hera+Brunch+Rabat',
  // TODO: add Glovo / booking links if Hera has them.
  glovo: null,

  // Files live in /public/media. Sources and licences: CREDITS.md.
  // Set a slot to null to show the illustrated version instead.
  media: {
    heroVideo: '/media/hero-latte.mp4',
    heroPoster: '/media/hero-latte.jpg',
    // "Every morning" cards, in order: cooked to order, squeezed every morning, poured from height.
    moments: [
      { video: '/media/moment-pancakes.mp4', poster: '/media/moment-pancakes.jpg' },
      { video: '/media/moment-juice.mp4', poster: '/media/moment-juice.jpg' },
      { video: '/media/moment-tea.mp4', poster: '/media/moment-tea.jpg' },
    ],
  },
}
