export const handleThreadVoting = (newVote, voteInfo) => {
  const voteInfoCopy = [...voteInfo];
  const voteIndex = voteInfoCopy.findIndex((i) => i.id === newVote.id);
  if (voteIndex === -1) {
    voteInfoCopy.push(newVote);
  } else {
    voteInfoCopy[voteIndex].voteWeight === newVote.voteWeight
      ? voteInfoCopy.splice(voteIndex, 1)
      : voteInfoCopy.splice(voteIndex, 1, newVote);
  }
  return voteInfoCopy;
};

export const getThreadVoteInfo = (voteInfo, vote) => {
  const isVoted = voteInfo.find((i) => i.id === vote.id);
  let upVote = false;
  let downVote = false;
  let voteWeight = 0;
  if (isVoted) {
    voteWeight = isVoted.voteWeight;
    upVote = voteWeight === 1;
    downVote = voteWeight === -1;
  }

  return { upVote, downVote, voteWeight };
};
