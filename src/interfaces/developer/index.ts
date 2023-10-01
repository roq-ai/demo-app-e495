import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DeveloperInterface {
  id?: string;
  user_id: string;
  specialty?: string;
  experience_years?: number;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface DeveloperGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  specialty?: string;
}
