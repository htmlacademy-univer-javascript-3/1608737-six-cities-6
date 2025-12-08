export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  previewImage: string;
};

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    bedrooms: 3,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge'],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    previewImage: 'img/apartment-01.jpg',
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.0,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Heating', 'Kitchen'],
    host: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    images: ['img/room.jpg', 'img/apartment-01.jpg'],
    previewImage: 'img/room.jpg',
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Kitchen'],
    host: {
      name: 'Oliver',
      avatarUrl: 'img/avatar.svg',
      isPro: false,
    },
    images: ['img/apartment-02.jpg', 'img/apartment-01.jpg'],
    previewImage: 'img/apartment-02.jpg',
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 5.0,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    bedrooms: 4,
    maxAdults: 6,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Kitchen', 'Dishwasher', 'Fridge'],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    images: ['img/apartment-03.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg'],
    previewImage: 'img/apartment-03.jpg',
  },
  {
    id: '5',
    title: 'Charming apartment in the heart of Paris',
    type: 'Apartment',
    price: 150,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.35222,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.85661,
      longitude: 2.35222,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    description: 'A beautiful apartment located in the heart of Paris with stunning views.',
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Coffee machine'],
    host: {
      name: 'Sophie',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg'],
    previewImage: 'img/apartment-01.jpg',
  },
  {
    id: '6',
    title: 'Cozy room near Eiffel Tower',
    type: 'Room',
    price: 90,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.35222,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.85837,
      longitude: 2.29448,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.2,
    description: 'A cozy room with a great view of the Eiffel Tower.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Heating'],
    host: {
      name: 'Pierre',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    images: ['img/room.jpg'],
    previewImage: 'img/room.jpg',
  },
  {
    id: '7',
    title: 'Modern apartment in Cologne',
    type: 'Apartment',
    price: 110,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.93753,
        longitude: 6.96028,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.93753,
      longitude: 6.96028,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    description: 'Modern apartment in the center of Cologne.',
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Washing machine', 'Kitchen'],
    host: {
      name: 'Hans',
      avatarUrl: 'img/avatar.svg',
      isPro: false,
    },
    images: ['img/apartment-02.jpg'],
    previewImage: 'img/apartment-02.jpg',
  },
  {
    id: '8',
    title: 'Luxury apartment in Brussels',
    type: 'Apartment',
    price: 140,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.85045,
        longitude: 4.34878,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.85045,
      longitude: 4.34878,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
    description: 'Luxury apartment in the capital of Belgium.',
    bedrooms: 3,
    maxAdults: 5,
    goods: ['Wi-Fi', 'Washing machine', 'Kitchen', 'Dishwasher'],
    host: {
      name: 'Marie',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    images: ['img/apartment-03.jpg'],
    previewImage: 'img/apartment-03.jpg',
  },
  {
    id: '9',
    title: 'Comfortable room in Hamburg',
    type: 'Room',
    price: 75,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.55108,
        longitude: 9.99368,
        zoom: 13,
      },
    },
    location: {
      latitude: 53.55108,
      longitude: 9.99368,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.8,
    description: 'Comfortable room in Hamburg city center.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Heating'],
    host: {
      name: 'Klaus',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    images: ['img/room.jpg'],
    previewImage: 'img/room.jpg',
  },
  {
    id: '10',
    title: 'Stylish apartment in Dusseldorf',
    type: 'Apartment',
    price: 125,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.22774,
        longitude: 6.77346,
        zoom: 13,
      },
    },
    location: {
      latitude: 51.22774,
      longitude: 6.77346,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.3,
    description: 'Stylish apartment in Dusseldorf.',
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Kitchen', 'Coffee machine'],
    host: {
      name: 'Anna',
      avatarUrl: 'img/avatar.svg',
      isPro: false,
    },
    images: ['img/apartment-01.jpg'],
    previewImage: 'img/apartment-01.jpg',
  },
];

