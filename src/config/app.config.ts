interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Customer'],
  tenantRoles: ['Owner', 'Administrator', 'Support Staff', 'End User', 'Developer'],
  tenantName: 'Organization',
  applicationName: 'demo app',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read personal information',
    'Edit personal information',
    'Read company information',
    'Edit company information',
  ],
  ownerAbilities: ['Manage user', 'Manage organization', 'Manage error_log', 'Manage developer'],
  getQuoteUrl: 'https://app.roq.ai/proposal/27f848fe-414a-4dd1-96d2-31a8f8431b1b',
};
