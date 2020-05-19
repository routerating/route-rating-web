import { Wall } from '.';

export interface Gym {
  address: string;
  authorizedEditors: string[];
  city: string;
  email: string;
  id: string;
  logoUrl: string;
  name: string;
  phoneNumber: string;
  photoUrl: string;
  state: string;
  walls: Wall[] | null;
  website: string;
  zipCode: string;
}
