import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ErrorLogInterface {
  id?: string;
  error_message: string;
  error_code: number;
  occurred_at?: any;
  resolved_at?: any;
  user_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface ErrorLogGetQueryInterface extends GetQueryInterface {
  id?: string;
  error_message?: string;
  user_id?: string;
  organization_id?: string;
}
