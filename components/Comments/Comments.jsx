import { kFormatter } from '@utils/common';

export default function Comments({ totalReplies }) {
  return (
    <div className='comments fx fx-cgap-md' title='Komentar'>
      <span className='material-icons-outlined txt-md'>forum</span>
      {kFormatter(totalReplies)}
    </div>
  );
}
