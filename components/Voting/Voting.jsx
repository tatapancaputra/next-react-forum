export default function Voting({
  id,
  upVote,
  downVote,
  voteWeight,
  totalReputations,
  onVote,
}) {
  return (
    <div className='voting fx fx-cgap-md'>
      <span
        className={`material-icons${
          upVote ? '' : '-outlined'
        } txt-md cursor-pointer`}
        title='Like'
        onClick={(e) => {
          e.stopPropagation();
          onVote(id, 1);
        }}
      >
        thumb_up
      </span>
      {totalReputations + voteWeight}
      <span
        className={`material-icons${
          downVote ? '' : '-outlined'
        } txt-md cursor-pointer`}
        title='Dislike'
        onClick={(e) => {
          e.stopPropagation();
          onVote(id, -1);
        }}
      >
        thumb_down
      </span>
    </div>
  );
}
