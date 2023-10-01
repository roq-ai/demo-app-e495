const mapping: Record<string, string> = {
  customers: 'customer',
  developers: 'developer',
  'error-logs': 'error_log',
  organizations: 'organization',
  'support-staffs': 'support_staff',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
