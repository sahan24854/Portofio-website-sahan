import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'works'>;

// Shared so the index, the homepage section, and getStaticPaths always agree —
// a divergent draft filter would ship links to pages that were never built.
export async function getWorks(): Promise<Work[]> {
  const works = await getCollection('works', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return works.sort((a, b) => a.data.order - b.data.order);
}
