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
    bio: 'Fractional COO e consulente strategico: aiuta PMI e scale-up a crescere senza perdere il controllo. Dall\'idea alla messa a terra, passando per sistemi, governance e OKR. Lettore compulsivo, meditatore. Lo trovi in un surf spot o sul tatami a fare jiu-jitsu.',
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
  'Team Strategica': {
    name: 'Edoardo Marcis & Andrea Cavaliere',
    role: 'Strategica',
    bio: 'Un collettivo di professionisti con background diversi, uniti dalla stessa idea di cosa significhi fare consulenza davvero: capire prima di agire, e rendersi inutili quando il lavoro è fatto.',
    linkedin: 'https://linkedin.com/in/edoardomarcis',
    photo: '/images/team/edoardo.jpg',
  },
};
