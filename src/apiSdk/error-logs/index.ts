import queryString from 'query-string';
import { ErrorLogInterface, ErrorLogGetQueryInterface } from 'interfaces/error-log';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getErrorLogs = async (
  query?: ErrorLogGetQueryInterface,
): Promise<PaginatedInterface<ErrorLogInterface>> => {
  return fetcher('/api/error-logs', {}, query);
};

export const createErrorLog = async (errorLog: ErrorLogInterface) => {
  return fetcher('/api/error-logs', { method: 'POST', body: JSON.stringify(errorLog) });
};

export const updateErrorLogById = async (id: string, errorLog: ErrorLogInterface) => {
  return fetcher(`/api/error-logs/${id}`, { method: 'PUT', body: JSON.stringify(errorLog) });
};

export const getErrorLogById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/error-logs/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteErrorLogById = async (id: string) => {
  return fetcher(`/api/error-logs/${id}`, { method: 'DELETE' });
};
