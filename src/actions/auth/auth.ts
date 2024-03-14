import carskidsApi from '../../config/api/carskidsApi';
import { AuthResponse, IUser } from '../../infrastructure/interfaces';

const returnUserToken = async (data: AuthResponse) => {
  const user: IUser = {
    email: data.email,
    name: data.name,
    password: data.password,
    role: data.role,
    status: data.status
  };

  return {
    user,
    token: data.token
  };
};

export const authLogin = async (email: string, password: string) => {
  try {
    const { data } = await carskidsApi.post<AuthResponse>('auth/login', {
      email,
      password
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
