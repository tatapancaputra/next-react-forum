import SortingButtons from '@components/SortingButtons/SortingButtons';

const postSorts = [
  {
    name: 'Terlama',
    value: 'oldest',
    icon: 'history',
  },
  {
    name: 'Terbaru',
    value: 'newest',
    icon: 'update',
  },
];

export default function Header({ sort, onSort }) {
  return (
    <nav className='thread-detail-header fx fx-content-between'>
      <section className='sorting fx fx-items-center fx-cgap-lg'>
        Urutan
        <SortingButtons data={postSorts} selected={sort} onSort={onSort} />
      </section>
    </nav>
  );
}
