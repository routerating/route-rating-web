import { Gym, Route, User, Wall } from '.';

export interface WallPage extends Page {
  content: Wall[];
}

export interface GymPageType extends Page {
  content: Gym[];
}

export interface UserPage extends Page {
  content: User[];
}

export interface RoutePage extends Page {
  content: Route[];
}

export interface Page {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
