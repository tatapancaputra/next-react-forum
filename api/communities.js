'use server';

import { GET } from '@utils/api';

const API_URL = `${process.env.BASE_URL}/api/communities`;

export const getThreadList = async (communityId, page, limit, sort) =>
  GET(
    `${API_URL}/${communityId}/threads?page=${page}&limit=${limit}&sort=${sort}`
  );
