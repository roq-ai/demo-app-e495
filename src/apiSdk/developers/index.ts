import queryString from 'query-string';
import { DeveloperInterface, DeveloperGetQueryInterface } from 'interfaces/developer';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDevelopers = async (
  query?: DeveloperGetQueryInterface,
): Promise<PaginatedInterface<DeveloperInterface>> => {
  return fetcher('/api/developers', {}, query);
};

export const createDeveloper = async (developer: DeveloperInterface) => {
  return fetcher('/api/developers', { method: 'POST', body: JSON.stringify(developer) });
};

export const updateDeveloperById = async (id: string, developer: DeveloperInterface) => {
  return fetcher(`/api/developers/${id}`, { method: 'PUT', body: JSON.stringify(developer) });
};

export const getDeveloperById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/developers/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteDeveloperById = async (id: string) => {
  return fetcher(`/api/developers/${id}`, { method: 'DELETE' });
};
