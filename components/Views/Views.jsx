import { kFormatter } from '@utils/common';

export default function Views({ totalViews }) {
  return (
    <div className='views fx fx-cgap-md' title='Views'>
      <span className='material-icons-outlined txt-md'>visibility</span>
      {kFormatter(totalViews)}
    </div>
  );
}
