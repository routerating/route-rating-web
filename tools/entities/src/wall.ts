import { Route } from './route';

export interface Wall {
  gymId: string;
  id: string;
  name: string;
  routes: Route[];
  types: WallTypes[];
}

export enum WallTypes {
  LEAD = 'LEAD',
  BOULDER = 'BOULDER',
  TOP_ROPE = 'TOP_ROPE',
  AUTO_BELAY = 'AUTO_BELAY',
}
