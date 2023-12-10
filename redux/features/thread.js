import { createSlice } from '@reduxjs/toolkit';

const THREAD_FATURE_KEY = 'thread';

const initialState = {
  voteInfo: [],
};

export const thread = createSlice({
  name: THREAD_FATURE_KEY,
  initialState,
  reducers: {
    setVoteInfo: (state, { payload }) => ({
      ...state,
      voteInfo: payload,
    }),
  },
});

export const { setVoteInfo } = thread.actions;

export default thread.reducer;
