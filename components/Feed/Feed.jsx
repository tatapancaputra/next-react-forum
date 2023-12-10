'use client';

import { getThreadList } from '@api/communities';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Thread from '../Thread/Thread';
import Header from './Header/Header';

export default function Feed({ communityId, itemPerPage }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('lastpost'); // *lastpost, thread, popular, trending
  const [threads, setThreads] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [layout, setLayout] = useState('list'); // *list, card

  const changeOrder = (orderBy) => {
    setSort(orderBy);
    setPage(1); // go back to the first page whenever the order is changed
    setThreads([]); // clear all the threads as it will refecth the threads with new order
  };

  useEffect(() => {
    const fetchThreadList = async (communityId, page, limit, sort) => {
      const result = await getThreadList(communityId, page, limit, sort);
      const { data, meta } = result;
      setThreads([...threads, ...data]);
      setHasMore(meta.total > meta.page);
    };

    fetchThreadList(communityId, page, itemPerPage, sort);
  }, [communityId, page, itemPerPage, sort]);

  return (
    <section className='feed w-full fx fx-col fx-rgap-lg'>
      <Header
        sort={sort}
        onSort={changeOrder}
        layout={layout}
        onChangeLayout={setLayout}
      />
      <InfiniteScroll
        className='card-list fx fx-col fx-rgap-lg'
        dataLength={threads.length}
        next={() => {
          setPage(page + 1);
        }}
        hasMore={hasMore}
        loader={<p className='txt-center'>Loading...</p>}
        endMessage={<p className='txt-center'>No more data to load.</p>}
      >
        {threads.map((item) => (
          <Thread key={item.id} data={item} layout={layout} />
        ))}
      </InfiniteScroll>
    </section>
  );
}
