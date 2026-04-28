import { User } from '../types/user';

type RandomUserApiResponse = {
  results: Array<{
    login: { uuid: string };
    name: { first: string; last: string };
    email: string;
    phone: string;
    dob: { age: number };
    picture: { large: string; medium: string };
    location: {
      city: string;
      country: string;
      state: string;
      street: { name: string; number: number };
    };
  }>;
};

const USERS_ENDPOINT = 'https://randomuser.me/api/?results=30&seed=sipy';

const compareUsers = (left: User, right: User) =>
  `${left.lastName} ${left.firstName}`.localeCompare(`${right.lastName} ${right.firstName}`, 'es', {
    sensitivity: 'base',
  });

export const mapUser = (user: RandomUserApiResponse['results'][number]): User => {
  const fullName = `${user.name.first} ${user.name.last}`;

  return {
    id: user.login.uuid,
    firstName: user.name.first,
    lastName: user.name.last,
    fullName,
    email: user.email,
    phone: user.phone,
    avatar: user.picture.large ?? user.picture.medium,
    age: user.dob.age,
    location: {
      city: user.location.city,
      country: user.location.country,
      state: user.location.state,
      street: `${user.location.street.number} ${user.location.street.name}`,
    },
  };
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(USERS_ENDPOINT);

  if (!response.ok) {
    throw new Error('No fue posible obtener los usuarios.');
  }

  const data = (await response.json()) as RandomUserApiResponse;

  return data.results.map(mapUser).sort(compareUsers);
};
