import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  user_id: string;
  company_name?: string;
  contact_number?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  company_name?: string;
  contact_number?: string;
}
