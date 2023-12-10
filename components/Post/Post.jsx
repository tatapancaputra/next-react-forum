import CommentField from '@components/CommentField/CommentField';
import Comments from '@components/Comments/Comments';
import Voting from '@components/Voting/Voting';
import { setVoteInfo } from '@redux/features/thread';
import { formatDateTime } from '@utils/common';
import { getThreadVoteInfo, handleThreadVoting } from '@utils/voting';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Post({ data }) {
  const dispatch = useDispatch();

  const [showComment, setShowComment] = useState(false);

  const voteInfo = useSelector((state) => state.threadReducer.voteInfo);
  const { upVote, downVote, voteWeight } = getThreadVoteInfo(voteInfo, data);

  const handleVoting = (id, voteWeight) => {
    dispatch(setVoteInfo(handleThreadVoting({ id, voteWeight }, voteInfo)));
  };

  return (
    <article className='post card fx fx-col fx-rgap-xl p-xl'>
      <section className='card-header fx fx-items-center fx-cgap-lg txt-sm'>
        <Image
          src={data.user.avatar || ''}
          alt='avatar'
          width={28}
          height={28}
          loading='lazy'
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
        <div
          className='username'
          dangerouslySetInnerHTML={{
            __html: data.user.display_name_html || '',
          }}
        ></div>
        <div className='posted-date gray-light'>
          {formatDateTime(data.dateline)}
        </div>
      </section>
      <section className='card-content fx fx-col fx-rgap-xl'>
        <h1 className='post-title txt-lg py-md'>{data.title}</h1>
        <div
          className='post-content overflow-hidden'
          dangerouslySetInnerHTML={{ __html: data.content.html }}
        ></div>
      </section>
      <section className='card-footer fx fx-content-between txt-sm'>
        <section className='card-footer-left fx fx-cgap-xl'>
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
        </section>
        <section className='card-footer-right fx fx-cgap-xl'>
          <Comments totalReplies={data.meta.total_replies} />
          <div className='comments fx fx-cgap-md cursor-pointer' title='Balas'>
            <span
              className='material-icons-outlined txt-md'
              onClick={(e) => {
                e.stopPropagation();
                setShowComment(!showComment);
              }}
            >
              reply
            </span>
          </div>
        </section>
      </section>
      {showComment ? <CommentField /> : null}
    </article>
  );
}
