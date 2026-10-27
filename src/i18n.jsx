import { createContext, useContext, useEffect, useState } from 'react'

export const languages = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'fr', label: 'FR', dir: 'ltr' },
  { code: 'ar', label: 'ع', dir: 'rtl' },
]

const strings = {
  en: {
    nav: { menu: 'Menu', story: 'Our story', visit: 'Visit', book: 'Book a table', top: 'Back to top' },
    loader: 'Good morning',
    window: { a: 'Rabat is waking up.', b: 'The shutters open.' },
    hero: {
      kicker: 'Brunch house · Rabat',
      title: ['Good mornings', 'start here.'],
      sub: 'Breakfast specialists in the heart of Rabat. Fresh, generous, made to order — from Moroccan classics to all-day brunch favourites.',
      cta: 'See the menu',
      scroll: 'Scroll — the sun is rising',
    },
    intro: {
      label: 'The morning table',
      text: 'At Hera, breakfast isn’t a quick bite. It’s the best part of the day. We’re a brunch house in Rabat devoted to the morning table: freshly squeezed juices, slow-brewed coffee, fluffy pancakes, eggs done every way, and Moroccan favourites like msemen, baghrir and amlou served warm with honey. Everything is made fresh, to order, and meant to be shared. Come early, stay long.',
      highlights: ['msemen', 'baghrir', 'amlou', 'honey', 'pancakes', 'coffee', 'juices'],
    },
    trad: {
      label: 'Our story',
      brunch: 'Brunch',
      title: ['Two traditions,', 'one table.'],
      left: 'The Moroccan breakfast we grew up with',
      right: 'The brunch classics the world loves',
      body: 'Warm msemen and baghrir, olive oil and amlou, fresh cheese and mint tea poured from height — next to eggs Benedict, avocado toast, French toast, buttery croissants and stacks of pancakes.',
    },
    menu: {
      label: 'The menu',
      title: 'Made fresh, to order, meant to be shared.',
      all: 'All',
      swipe: 'Swipe the dishes to change category',
      cats: { moroccan: 'Moroccan', eggs: 'Eggs', sweet: 'Sweet', drinks: 'Juice & coffee' },
      items: {
        msemen: ['Msemen', 'Flaky square pancakes, served warm with honey and amlou.'],
        baghrir: ['Baghrir', 'The thousand-hole pancake, served warm with honey.'],
        amlou: ['Amlou & olive oil', 'Almond, argan and honey spread, with olive oil.'],
        cheese: ['Fresh cheese', 'Fresh cheese, olive oil and warm bread.'],
        benedict: ['Eggs Benedict', 'Poached eggs, hollandaise, toasted muffin.'],
        eggs: ['Eggs your way', 'Fried, scrambled, poached or as an omelette.'],
        avocado: ['Avocado toast', 'Smashed avocado on toasted bread.'],
        pancakes: ['Pancakes', 'A fluffy stack, finished with honey.'],
        french: ['French toast', 'Golden, soft in the middle, made to order.'],
        croissant: ['Croissants', 'Buttery and flaky, for a good start.'],
        juice: ['Fresh juices', 'Squeezed every morning.'],
        coffee: ['Slow-brewed coffee', 'Taken slowly, the way mornings should be.'],
        tea: ['Mint tea', 'Poured from height, as it should be.'],
      },
    },
    moments: {
      label: 'Every morning',
      items: [
        ['Cooked to order', 'Every plate is made the moment you order it.'],
        ['Squeezed every morning', 'Our juices are pressed fresh, every day.'],
        ['Poured from height', 'Mint tea, served the way we grew up with it.'],
      ],
    },
    marquee: ['Come early', 'Stay long', 'تعال بكري', 'Viens tôt', 'Good mornings start here'],
    visit: {
      label: 'Visit',
      title: 'Your table in Rabat.',
      text: 'A quiet coffee before work, a long weekend brunch with friends, or a family celebration — Hera is your table in Rabat.',
      open: 'Open now',
      closed: 'Closed now',
      opensAt: 'Opens at',
      closesAt: 'Kitchen closes at',
      time: 'Rabat time',
      hours: 'Hours',
      everyDay: 'Every day',
      address: 'Address',
      addressFallback: 'Rabat, Morocco',
      follow: 'Follow',
      directions: 'Get directions',
      book: 'Book a table',
      message: 'Message us on Instagram',
    },
    footer: { tagline: 'Rabat’s home of breakfast.', rights: 'All rights reserved', sign: 'Good mornings start here.' },
  },

  fr: {
    nav: { menu: 'Carte', story: 'Notre histoire', visit: 'Venir', book: 'Réserver', top: 'Haut de page' },
    loader: 'Bonjour',
    window: { a: 'Rabat se réveille.', b: 'Les volets s’ouvrent.' },
    hero: {
      kicker: 'Maison de brunch · Rabat',
      title: ['Les bons matins', 'commencent ici.'],
      sub: 'Spécialistes du petit-déjeuner au cœur de Rabat. Frais, généreux, préparé à la commande — des classiques marocains aux incontournables du brunch.',
      cta: 'Voir la carte',
      scroll: 'Défilez — le soleil se lève',
    },
    intro: {
      label: 'La table du matin',
      text: 'Chez Hera, le petit-déjeuner n’est pas un en-cas pressé. C’est le meilleur moment de la journée. Nous sommes une maison de brunch à Rabat dédiée à la table du matin : jus pressés minute, café infusé lentement, pancakes moelleux, œufs de toutes les façons, et les favoris marocains comme le msemen, le baghrir et l’amlou, servis chauds avec du miel. Tout est préparé frais, à la commande, et pensé pour être partagé. Venez tôt, restez longtemps.',
      highlights: ['msemen', 'baghrir', 'amlou', 'miel', 'pancakes', 'café', 'jus'],
    },
    trad: {
      label: 'Notre histoire',
      brunch: 'Brunch',
      title: ['Deux traditions,', 'une seule table.'],
      left: 'Le petit-déjeuner marocain de notre enfance',
      right: 'Les classiques du brunch que le monde adore',
      body: 'Msemen et baghrir chauds, huile d’olive et amlou, fromage frais et thé à la menthe versé de haut — à côté des œufs Bénédicte, de l’avocado toast, du pain perdu, des croissants au beurre et des piles de pancakes.',
    },
    menu: {
      label: 'La carte',
      title: 'Préparé frais, à la commande, pour être partagé.',
      all: 'Tout',
      swipe: 'Glissez les plats pour changer de catégorie',
      cats: { moroccan: 'Marocain', eggs: 'Œufs', sweet: 'Sucré', drinks: 'Jus & café' },
      items: {
        msemen: ['Msemen', 'Crêpes feuilletées carrées, servies chaudes avec miel et amlou.'],
        baghrir: ['Baghrir', 'La crêpe aux mille trous, servie chaude avec du miel.'],
        amlou: ['Amlou & huile d’olive', 'Pâte d’amandes, huile d’argan et miel, avec huile d’olive.'],
        cheese: ['Fromage frais', 'Fromage frais, huile d’olive et pain chaud.'],
        benedict: ['Œufs Bénédicte', 'Œufs pochés, sauce hollandaise, muffin toasté.'],
        eggs: ['Œufs à votre façon', 'Au plat, brouillés, pochés ou en omelette.'],
        avocado: ['Avocado toast', 'Avocat écrasé sur pain grillé.'],
        pancakes: ['Pancakes', 'Une pile moelleuse, nappée de miel.'],
        french: ['Pain perdu', 'Doré, fondant à cœur, préparé à la commande.'],
        croissant: ['Croissants', 'Pur beurre et feuilletés, pour bien commencer.'],
        juice: ['Jus frais', 'Pressés chaque matin.'],
        coffee: ['Café infusé lentement', 'À savourer sans se presser, comme un vrai matin.'],
        tea: ['Thé à la menthe', 'Versé de haut, comme il se doit.'],
      },
    },
    moments: {
      label: 'Chaque matin',
      items: [
        ['Préparé à la commande', 'Chaque assiette est cuisinée au moment où vous commandez.'],
        ['Pressé chaque matin', 'Nos jus sont pressés frais, tous les jours.'],
        ['Versé de haut', 'Le thé à la menthe, servi comme à la maison.'],
      ],
    },
    marquee: ['Venez tôt', 'Restez longtemps', 'تعال بكري', 'Come early', 'Les bons matins commencent ici'],
    visit: {
      label: 'Venir',
      title: 'Votre table à Rabat.',
      text: 'Un café tranquille avant le travail, un long brunch entre amis le week-end ou une fête en famille — Hera est votre table à Rabat.',
      open: 'Ouvert',
      closed: 'Fermé',
      opensAt: 'Ouvre à',
      closesAt: 'Cuisine jusqu’à',
      time: 'Heure de Rabat',
      hours: 'Horaires',
      everyDay: 'Tous les jours',
      address: 'Adresse',
      addressFallback: 'Rabat, Maroc',
      follow: 'Suivre',
      directions: 'Itinéraire',
      book: 'Réserver une table',
      message: 'Écrivez-nous sur Instagram',
    },
    footer: { tagline: 'La maison du petit-déjeuner à Rabat.', rights: 'Tous droits réservés', sign: 'Les bons matins commencent ici.' },
  },

  ar: {
    nav: { menu: 'القائمة', story: 'قصتنا', visit: 'زورونا', book: 'احجز طاولة', top: 'العودة إلى الأعلى' },
    loader: 'صباح الخير',
    window: { a: 'الرباط تستيقظ.', b: 'تُفتح النوافذ.' },
    hero: {
      kicker: 'بيت البرانش · الرباط',
      title: ['الصباحات الجميلة', 'تبدأ من هنا.'],
      sub: 'متخصصون في الفطور في قلب الرباط. طازج، سخي، ويُحضَّر عند الطلب — من الكلاسيكيات المغربية إلى أشهى أطباق البرانش طوال اليوم.',
      cta: 'اكتشف القائمة',
      scroll: 'مرّر للأسفل — الشمس تشرق',
    },
    intro: {
      label: 'مائدة الصباح',
      text: 'في هيرا، الفطور ليس وجبة سريعة، بل هو أجمل لحظات اليوم. نحن بيت برانش في الرباط مكرّس لمائدة الصباح: عصائر معصورة طازجة، قهوة مُحضّرة على مهل، بان كيك هشّ، بيض بكل الطرق، ومفضّلات مغربية مثل المسمن والبغرير وأملو تُقدَّم ساخنة مع العسل. كل شيء يُحضَّر طازجاً عند الطلب، ومصنوع للمشاركة. تعال باكراً، وابقَ طويلاً.',
      highlights: ['مسمن', 'بغرير', 'أملو', 'العسل', 'قهوة', 'عصائر'],
    },
    trad: {
      label: 'قصتنا',
      brunch: 'برانش',
      title: ['تقليدان،', 'ومائدة واحدة.'],
      left: 'الفطور المغربي الذي كبرنا عليه',
      right: 'كلاسيكيات البرانش التي يحبها العالم',
      body: 'مسمن وبغرير ساخنان، زيت الزيتون وأملو، جبن طري وأتاي بالنعناع يُسكب من عُلُو — إلى جانب بيض بنديكت، توست الأفوكادو، الخبز الفرنسي المحمّص، كرواسون بالزبدة وأكوام من البان كيك.',
    },
    menu: {
      label: 'القائمة',
      title: 'طازج، عند الطلب، ومصنوع للمشاركة.',
      all: 'الكل',
      swipe: 'اسحب الأطباق لتغيير الفئة',
      cats: { moroccan: 'مغربي', eggs: 'البيض', sweet: 'حلو', drinks: 'عصير وقهوة' },
      items: {
        msemen: ['مسمن', 'رقائق مربعة مورّقة، تُقدَّم ساخنة مع العسل وأملو.'],
        baghrir: ['بغرير', 'فطيرة الألف ثقب، ساخنة مع العسل.'],
        amlou: ['أملو وزيت الزيتون', 'لوز وزيت أركان وعسل، مع زيت الزيتون.'],
        cheese: ['جبن طري', 'جبن طري، زيت زيتون وخبز ساخن.'],
        benedict: ['بيض بنديكت', 'بيض مسلوق بدون قشرة، صلصة هولنديز وخبز مافن محمّص.'],
        eggs: ['البيض على ذوقك', 'مقلي، مخفوق، مسلوق أو أومليت.'],
        avocado: ['توست الأفوكادو', 'أفوكادو مهروس على خبز محمّص.'],
        pancakes: ['بان كيك', 'طبقات هشّة مع العسل.'],
        french: ['الخبز الفرنسي المحمّص', 'ذهبي، طري من الداخل، يُحضَّر عند الطلب.'],
        croissant: ['كرواسون', 'بالزبدة ومورّق، لبداية صباح جميلة.'],
        juice: ['عصائر طازجة', 'تُعصر كل صباح.'],
        coffee: ['قهوة على مهل', 'تُحضَّر بهدوء، كما يجب أن تكون الصباحات.'],
        tea: ['أتاي بالنعناع', 'يُسكب من عُلُو، كما ينبغي.'],
      },
    },
    moments: {
      label: 'كل صباح',
      items: [
        ['يُحضَّر عند الطلب', 'كل طبق يُطهى لحظة طلبك.'],
        ['يُعصر كل صباح', 'عصائرنا تُعصر طازجة كل يوم.'],
        ['يُسكب من عُلُو', 'أتاي بالنعناع، كما في البيت.'],
      ],
    },
    marquee: ['تعال بكري', 'ابقَ طويلاً', 'Come early', 'Viens tôt', 'الصباحات الجميلة تبدأ من هنا'],
    visit: {
      label: 'زورونا',
      title: 'مائدتك في الرباط.',
      text: 'قهوة هادئة قبل العمل، برانش طويل مع الأصدقاء في عطلة نهاية الأسبوع، أو احتفال عائلي — هيرا هي مائدتك في الرباط.',
      open: 'مفتوح الآن',
      closed: 'مغلق الآن',
      opensAt: 'يفتح على',
      closesAt: 'المطبخ حتى',
      time: 'توقيت الرباط',
      hours: 'أوقات العمل',
      everyDay: 'كل يوم',
      address: 'العنوان',
      addressFallback: 'الرباط، المغرب',
      follow: 'تابعونا',
      directions: 'الاتجاهات',
      book: 'احجز طاولة',
      message: 'راسلنا على إنستغرام',
    },
    footer: { tagline: 'بيت الفطور في الرباط.', rights: 'جميع الحقوق محفوظة', sign: 'الصباحات الجميلة تبدأ من هنا.' },
  },
}

const LangContext = createContext(null)

function initialLang() {
  try {
    const saved = localStorage.getItem('hera-lang')
    if (strings[saved]) return saved
  } catch {}
  const nav = (navigator.language || 'en').slice(0, 2)
  return strings[nav] ? nav : 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const meta = languages.find((l) => l.code === lang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = meta.dir
    try {
      localStorage.setItem('hera-lang', lang)
    } catch {}
  }, [lang, meta.dir])

  return <LangContext.Provider value={{ lang, setLang, t: strings[lang], dir: meta.dir }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
