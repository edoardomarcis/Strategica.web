import { authors } from './authors';

const SITE = 'https://www.wearestrategica.com';

const publisher = { '@type': 'Organization' as const, name: 'Strategica', url: SITE };

export function organization() {
  return {
    '@context': 'https://schema.org',
    ...publisher,
    logo: `${SITE}/logo.png`,
    description: 'Consulenza strategica per PMI italiane. Aiutiamo le aziende a costruire il loro sistema operativo.',
    address: { '@type': 'PostalAddress', addressLocality: 'Milano', addressCountry: 'IT' },
    contactPoint: { '@type': 'ContactPoint', email: 'hello@wearestrategica.com', contactType: 'customer service' },
  };
}

export function website() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Strategica', url: SITE };
}

export function service(name: string) {
  return { '@context': 'https://schema.org', '@type': 'Service', name, provider: publisher };
}

export function article(post: {
  slug: string;
  data: { title: string; description: string; pubDate: Date; author: string; coverImage?: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.pubDate.toISOString(),
    author: authors[post.data.author]
      ? {
          '@type': 'Person',
          name: post.data.author,
          jobTitle: authors[post.data.author].role,
          sameAs: [authors[post.data.author].linkedin],
          image: `${SITE}${authors[post.data.author].photo}`,
          url: `${SITE}/chi-siamo`,
        }
      : { '@type': 'Person', name: post.data.author, url: SITE },
    publisher,
    url: `${SITE}/blog/${post.slug}`,
    ...(post.data.coverImage ? { image: `${SITE}${post.data.coverImage}` } : {}),
  };
}
