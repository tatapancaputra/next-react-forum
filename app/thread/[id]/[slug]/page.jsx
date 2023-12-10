import { getThreadItem } from '@api/threads';
import ThreadDetail from '@components/ThreadDetail/ThreadDetail';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { title, content } = (await getThreadItem(params.id)).data;
  return {
    title: title || '',
    description: content?.text || title || '',
  };
}

export default async function page({ params }) {
  const { data } = await getThreadItem(params.id);
  return data ? <ThreadDetail data={data} /> : notFound();
}
