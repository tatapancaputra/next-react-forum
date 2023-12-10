import { getThreadList } from '@api/communities';
import Feed from '@components/Feed/Feed';

export async function generateMetadata({ params }) {
  const result = await getThreadList(params.id, 1, 1, 'lastpost');
  const { name: title, description } = result.data[0].community;
  return {
    title,
    description,
  };
}

export default function page({ params }) {
  return <Feed communityId={params.id} itemPerPage={20} />;
}
