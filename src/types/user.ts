export type UserLocation = {
  city: string;
  country: string;
  state: string;
  street: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  age: number;
  location: UserLocation;
};

export type UsersResponse = {
  results: User[];
};
