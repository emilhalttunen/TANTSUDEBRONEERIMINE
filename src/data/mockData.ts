import { Dance, Event, Partner, User, Booking } from '../types';

export const mockDances: Dance[] = [
  {
    id: '1',
    name: 'Samba',
    description: 'Elav, rütmiline Brasiilia päritolu tants.',
    imageUrl: 'https://images.pexels.com/photos/5851031/pexels-photo-5851031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Valss',
    description: 'Sujuv tants, mida iseloomustavad pikad, voolavad liigutused.',
    imageUrl: 'https://images.pexels.com/photos/8412416/pexels-photo-8412416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Tango',
    description: 'Kirglik tants dramaatiliste liigutuste ja poosidega.',
    imageUrl: 'https://images.pexels.com/photos/1653060/pexels-photo-1653060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    name: 'Cha-cha-cha',
    description: 'Lõbus ja flirtiv Kuuba päritolu tants.',
    imageUrl: 'https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '5',
    name: 'Quickstep',
    description: 'Kiire seltskonnatants, mida iseloomustavad kiired liigutused.',
    imageUrl: 'https://images.pexels.com/photos/2229872/pexels-photo-2229872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '6',
    name: 'Salsa',
    description: 'Populaarne tants, mille arendasid välja Kuuba ja Puerto Rico immigrandid.',
    imageUrl: 'https://images.pexels.com/photos/2253913/pexels-photo-2253913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '7',
    name: 'Jive',
    description: 'Elav tantsustiil, mis pärineb Ameerika Ühendriikidest.',
    imageUrl: 'https://images.pexels.com/photos/7245263/pexels-photo-7245263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '8',
    name: 'Viini valss',
    description: 'Klassikaline Viini valss, elegantne seltskonnatants.',
    imageUrl: 'https://images.pexels.com/photos/12932754/pexels-photo-12932754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Anna M.',
    imageUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 'advanced',
    available: true
  },
  {
    id: '2',
    name: 'Toomas K.',
    imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 'intermediate',
    available: true
  },
  {
    id: '3',
    name: 'Sofia R.',
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 'advanced',
    available: false
  },
  {
    id: '4',
    name: 'Markus L.',
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 'beginner',
    available: true
  },
  {
    id: '5',
    name: 'Elena T.',
    imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 'intermediate',
    available: true
  },
  {
    id: '6',
    name: 'Daniel S.',
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 'advanced',
    available: true
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Sügiball',
    date: '2025-10-21',
    time: '18:00',
    location: 'Estonia Kontserdisaal',
    description: 'Iga-aastane sügisball erinevate tantsustiilidega. Liitu meiega elegantse tantsuõhtu nautimiseks.',
    dances: mockDances,
    imageUrl: 'https://images.pexels.com/photos/442404/pexels-photo-442404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    title: 'Sündmus 1: Kuupäev ja kellaeg',
    date: '2025-11-15',
    time: '19:00',
    location: 'Kristallisaal',
    description: 'Eriüritus, mis tutvustab Ladina-Ameerika tantse. Täiuslik elava rütmiga tantsude austajatele.',
    dances: mockDances.filter(d => ['Samba', 'Cha-cha-cha', 'Salsa', 'Jive'].includes(d.name)),
    imageUrl: 'https://images.pexels.com/photos/2240766/pexels-photo-2240766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    title: 'Sündmus 2: Kuupäev ja kellaeg',
    date: '2025-12-05',
    time: '20:00',
    location: 'Lossi Ballisaal',
    description: 'Talvine ballitantsude tähistamine klassikaliste tantsude ja elegantse õhkkonnaga.',
    dances: mockDances.filter(d => ['Valss', 'Tango', 'Quickstep', 'Viini valss'].includes(d.name)),
    imageUrl: 'https://images.pexels.com/photos/3916019/pexels-photo-3916019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    title: 'Sündmus 3: Kuupäev ja kellaeg',
    date: '2026-01-20',
    time: '18:30',
    location: 'Sinine Ballisaal',
    description: 'Uue aasta tantsupidu koos töötubade ja esinemistega.',
    dances: mockDances,
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Test Kasutaja',
    email: 'test@example.com',
    password: 'password123'
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    eventId: '1',
    danceId: '3',
    partnerId: '2',
    confirmed: true
  }
];