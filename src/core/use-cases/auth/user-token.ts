import { AuthResponse } from '../../../infrastructure/interfaces';

export const returnUserToken = async (data: AuthResponse) => {
  const { user, token } = data;

  return {
    user,
    token
  };
};
