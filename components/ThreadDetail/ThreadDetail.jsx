'use client';

import { getPostList } from '@api/threads';
import CommentField from '@components/CommentField/CommentField';
import Comments from '@components/Comments/Comments';
import Post from '@components/Post/Post';
import Views from '@components/Views/Views';
import Voting from '@components/Voting/Voting';
import { setVoteInfo } from '@redux/features/thread';
import { formatDateTime } from '@utils/common';
import { getThreadVoteInfo, handleThreadVoting } from '@utils/voting';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header/Header';

export default function ThreadDetail({ data }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('oldest'); // *oldest, newest
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const voteInfo = useSelector((state) => state.threadReducer.voteInfo);
  const { upVote, downVote, voteWeight } = getThreadVoteInfo(voteInfo, data);

  const handleVoting = (id, voteWeight) => {
    dispatch(setVoteInfo(handleThreadVoting({ id, voteWeight }, voteInfo)));
  };

  const changeOrder = (orderBy) => {
    setSort(orderBy);
    setPage(1); // go back to the first page whenever the order is changed
    setPosts([]); // clear all the posts as it will refecth the posts with new order
  };

  useEffect(() => {
    const fetchPostList = async (threadId, page, limit, sort) => {
      const result = await getPostList(threadId, page, limit, sort);
      const { data, meta } = result;
      setPosts([...posts, ...data]);
      setHasMore(meta.total > meta.page * meta.limit);
    };

    fetchPostList(data.id, page, 20, sort);
  }, [data, page, sort]);

  return (
    <section className='thread-detail w-full fx fx-col fx-rgap-lg'>
      <article className='card fx fx-col fx-rgap-xl p-xl'>
        <section className='card-header fx fx-items-center fx-cgap-lg txt-sm'>
          <Image
            src={data.first_post?.user.avatar || ''}
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
              __html: data.first_post?.user.display_name_html || '',
            }}
          ></div>
          <div className='posted-date gray-light'>
            {formatDateTime(data.dateline)}
          </div>
        </section>
        <section className='card-content fx fx-col fx-rgap-xl'>
          <h1 className='thread-title txt-lg py-md'>{data.title}</h1>
          <div
            className='thread-content overflow-hidden'
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
            <Views totalViews={data.meta.total_views} />
          </section>
          <section className='card-footer-right fx fx-cgap-xl'>
            <Comments totalReplies={data.meta.total_replies} />
          </section>
        </section>
        <CommentField />
      </article>
      <section className='thread-detail-post-list w-full fx fx-col fx-rgap-lg'>
        <Header sort={sort} onSort={changeOrder} />
        <InfiniteScroll
          className='card-list fx fx-col fx-rgap-lg'
          dataLength={posts.length}
          next={() => {
            setPage(page + 1);
          }}
          hasMore={hasMore}
          loader={<p className='txt-center'>Loading...</p>}
          endMessage={<p className='txt-center'>No more data to load.</p>}
        >
          {posts.map((item) => (
            <Post key={item.id} data={item} />
          ))}
        </InfiniteScroll>
      </section>
    </section>
  );
}
