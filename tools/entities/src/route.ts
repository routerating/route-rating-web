import { WallTypes } from '.';

export interface Route {
  averageGrade: string;
  averageRating: number;
  gymId: string;
  holdColor: string;
  id: string;
  name: string;
  setter: string;
  types: WallTypes[];
  wallId: string;
}
