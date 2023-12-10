import Comments from '@components/Comments/Comments';
import Views from '@components/Views/Views';
import Voting from '@components/Voting/Voting';
import { setVoteInfo } from '@redux/features/thread';
import { formatDateTime } from '@utils/common';
import { getThreadVoteInfo, handleThreadVoting } from '@utils/voting';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import './Thread.scss';

const isListLayout = (layout) => layout === 'list';

export default function Thread({ data, layout }) {
  const dispatch = useDispatch();

  const voteInfo = useSelector((state) => state.threadReducer.voteInfo);
  const { upVote, downVote, voteWeight } = getThreadVoteInfo(voteInfo, data);

  const handleVoting = (id, voteWeight) => {
    dispatch(setVoteInfo(handleThreadVoting({ id, voteWeight }, voteInfo)));
  };

  return (
    <article className='thread card fx fx-col fx-rgap-xl p-xl'>
      <section className='card-header fx fx-cgap-md txt-sm'>
        <div className='thread-starter-username'>
          {data.thread_starter.display_name_html}
        </div>
        <span>•</span>
        <div className='posted-date gray-light'>
          {formatDateTime(data.dateline)}
        </div>
      </section>
      <section
        className={
          'card-body fx ' +
          (isListLayout(layout)
            ? 'fx-cgap-xl fx-content-between'
            : 'fx-col fx-rgap-xl')
        }
      >
        <h1 className='thread-title txt-lg txt-bold'>
          <Link className='black' href={`/thread/${data.id}/${data.slug}`}>
            {data.title}
          </Link>
        </h1>
        {data.thumbnail?.url ? (
          <Link className='black' href={`/thread/${data.id}/${data.slug}`}>
            <Image
              src={data.thumbnail.url}
              alt={data.thumbnail.url}
              width={80}
              height={80}
              loading='lazy'
              className='fx'
              style={{
                objectFit: 'cover',
                borderRadius: 6,
                width: isListLayout(layout) ? '80px' : '100%',
                height: isListLayout(layout) ? '80px' : 'auto',
              }}
            />
          </Link>
        ) : isListLayout(layout) ? null : (
          <Link className='black' href={`/thread/${data.id}/${data.slug}`}>
            <p className='content-preview'>{data.content.snippet}</p>
          </Link>
        )}
      </section>
      <section className='card-footer fx fx-cgap-xl txt-sm'>
        <Voting
          id={data.id}
          upVote={upVote}
          downVote={downVote}
          voteWeight={voteWeight}
          totalReputations={
            data.first_post?.meta.vote_info.total_reputations ?? 0
          }
          onVote={handleVoting}
        />
        <Views totalViews={data.meta.total_views} />
        <Comments totalReplies={data.meta.total_replies} />
      </section>
    </article>
  );
}
