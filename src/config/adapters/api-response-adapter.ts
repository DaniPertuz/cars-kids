import { AnyApiResponse } from '../../infrastructure/interfaces';

export const adaptApiResponse = (response: any): AnyApiResponse => {
  const dataKey = Object.keys(response).find(key => !['limit', 'next', 'page', 'prev', 'sum', 'total'].includes(key));
  const data = dataKey ? response[dataKey] : [];

  return {
    limit: response.limit,
    next: response.next,
    page: response.page,
    prev: response.prev,
    sum: response.sum,
    total: response.total,
    data
  };
};
