'use server';

import { GET } from '@utils/api';

const API_URL = `${process.env.BASE_URL}/api/threads`;

export const getThreadItem = async (threadId) => GET(`${API_URL}/${threadId}`);

export const getPostList = async (threadId, page, limit, sort) =>
  GET(`${API_URL}/${threadId}/posts/?page=${page}&limit=${limit}&sort=${sort}`);
