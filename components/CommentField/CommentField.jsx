import './CommentField.scss';

export default function CommentField() {
  return (
    <section className='comment-field fx fx-col fx-rgap-xl'>
      <label className='txt-bold'>Berikan komentar</label>
      <input
        type='text'
        placeholder='Tulis komentar menarik atau mention replykgpt untuk ngobrol seru'
      />
      <section className='fx fx-end'>
        <button
          className='btn btn-sm btn-wh'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Kirim
        </button>
      </section>
    </section>
  );
}
