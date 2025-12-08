export type Review = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    id: '1',
    date: '2019-04-24',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4,
  },
  {
    id: '2',
    date: '2019-05-15',
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    comment: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    rating: 5,
  },
  {
    id: '3',
    date: '2019-06-20',
    user: {
      name: 'Oliver',
      avatarUrl: 'img/avatar.svg',
      isPro: false,
    },
    comment: 'The building is green and from 18th century. A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 3,
  },
];
