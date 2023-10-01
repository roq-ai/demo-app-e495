import queryString from 'query-string';
import { SupportStaffInterface, SupportStaffGetQueryInterface } from 'interfaces/support-staff';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSupportStaffs = async (
  query?: SupportStaffGetQueryInterface,
): Promise<PaginatedInterface<SupportStaffInterface>> => {
  return fetcher('/api/support-staffs', {}, query);
};

export const createSupportStaff = async (supportStaff: SupportStaffInterface) => {
  return fetcher('/api/support-staffs', { method: 'POST', body: JSON.stringify(supportStaff) });
};

export const updateSupportStaffById = async (id: string, supportStaff: SupportStaffInterface) => {
  return fetcher(`/api/support-staffs/${id}`, { method: 'PUT', body: JSON.stringify(supportStaff) });
};

export const getSupportStaffById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/support-staffs/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteSupportStaffById = async (id: string) => {
  return fetcher(`/api/support-staffs/${id}`, { method: 'DELETE' });
};
