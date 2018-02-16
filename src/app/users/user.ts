// import { Area } from '../areas/area';

export class User {
  id: number;
  username: string;
  area_id: number;
  active: boolean;
  created: Date;
  modified: Date;
  areas_pai: Object;
  areas_child: Object;
}
