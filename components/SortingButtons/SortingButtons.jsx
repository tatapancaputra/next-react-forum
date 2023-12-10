export default function SortingButtons({ data, selected, onSort }) {
  return (
    <div className='sorting-buttons fx fx-cgap-md'>
      {data.map((item) => (
        <button
          key={item.value}
          className='btn btn-sm btn-wh'
          disabled={selected === item.value}
          onClick={() => {
            onSort(item.value);
          }}
        >
          <span className='material-icons-outlined txt-md'>{item.icon}</span>
          {item.name}
        </button>
      ))}
    </div>
  );
}
