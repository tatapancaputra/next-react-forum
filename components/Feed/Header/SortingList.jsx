export default function SortingList({ data, selected, onSort }) {
  return (
    <select
      className='feed-sorting-list btn btn-sm btn-wh'
      value={selected}
      onChange={(e) => {
        onSort(e.target.value);
      }}
    >
      {data.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
