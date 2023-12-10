'use client';

import Link from 'next/link';
import SortingButtons from '../../SortingButtons/SortingButtons';
import ChangeLayoutButtonGroup from './ChangeLayoutButtonGroup';
import SortingList from './SortingList';

const threadSorts = [
  {
    name: 'Teraktif',
    value: 'lastpost',
    icon: 'forum',
  },
  {
    name: 'Terbaru',
    value: 'thread',
    icon: 'schedule',
  },
  {
    name: 'Terpopuler',
    value: 'popular',
    icon: 'local_fire_department',
  },
  {
    name: 'Disukai',
    value: 'trending',
    icon: 'thumb_up',
  },
];

export default function Header({ sort, onSort, layout, onChangeLayout }) {
  return (
    <nav className='feed-header fx fx-content-between'>
      <Link className='btn btn-sm btn-wh black' href='/'>
        <span className='material-icons-outlined txt-md'>home</span>
      </Link>
      <section className='sorting-desktop hide-mobile'>
        <SortingButtons data={threadSorts} selected={sort} onSort={onSort} />
      </section>
      <section className='sorting-mobile hide-desktop'>
        <SortingList data={threadSorts} selected={sort} onSort={onSort} />
      </section>
      <ChangeLayoutButtonGroup
        layout={layout}
        onChangeLayout={onChangeLayout}
      />
    </nav>
  );
}
