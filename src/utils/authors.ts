export interface Author {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  photo: string;
}

export const authors: Record<string, Author> = {
  'Edoardo Marcis': {
    name: 'Edoardo Marcis',
    role: 'Strategia & Growth',
    bio: 'Ex startup e open innovation. Strategie di crescita, design thinking e project management strategico. Lettore compulsivo, meditatore. Lo trovi in un surf spot o sul tatami a fare jiu-jitsu.',
    linkedin: 'https://linkedin.com/in/edoardomarcis',
    photo: '/images/team/edoardo.jpg',
  },
  'Andrea Cavaliere': {
    name: 'Andrea Cavaliere',
    role: 'Performance & Facilitazione',
    bio: 'Oltre 3M€ di budget adv gestiti multi-piattaforma. OKR coach, facilitatore certificato LEGO® Serious Play. Fotografo, videomaker, papà di un border collie.',
    linkedin: 'https://www.linkedin.com/in/andreacavaliere-/',
    photo: '/images/team/andrea.jpg',
  },
};
