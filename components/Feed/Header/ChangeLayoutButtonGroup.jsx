export default function ChangeLayoutButtonGroup({ layout, onChangeLayout }) {
  return (
    <div className='feed-change-layout-button-group btn-group'>
      <button
        title='Card view'
        className='btn btn-sm btn-wh'
        disabled={layout === 'card'}
        onClick={() => {
          onChangeLayout('card');
        }}
      >
        <span className='material-icons-outlined txt-md'>preview</span>
      </button>
      <button
        title='List view'
        className='btn btn-sm btn-wh'
        disabled={layout === 'list'}
        onClick={() => {
          onChangeLayout('list');
        }}
      >
        <span className='material-icons-outlined txt-md'>
          format_list_bulleted
        </span>
      </button>
    </div>
  );
}
