import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-user'),
  api: icon('ic-ecommerce'),
  settings: icon('ic-user'),
  gethelp: icon('ic-gethelp'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    items: [
      { title: 'Dashboard', path: paths.app.root, icon: ICONS.dashboard },
      {
        title: 'Customers',
        path: paths.app.settings.root,
        icon: ICONS.settings,
        children: [
          { title: 'Customers', path: paths.app.settings.timezone },
          { title: 'Password Reset', path: paths.app.settings.api },
          { title: 'Update Email', path: paths.app.settings.api },
          { title: 'Block/Unblock Email', path: paths.app.settings.api },
        ],
      },
      {
        title: 'Users',
        path: paths.app.settings.root,
        icon: ICONS.settings,
        children: [
          { title: 'Users', path: paths.app.settings.timezone },
          { title: 'Logs', path: paths.app.settings.timezone },
        ],
      },
      { title: 'Api', path: paths.app.Api, icon: ICONS.dashboard },
      {
        title: 'Admin Panel Login',
        path: paths.app.settings.root,
        icon: ICONS.settings,
        children: [
          { title: 'Login to PSB Admin', path: paths.app.settings.timezone },
          { title: 'Login to PEM Admin', path: paths.app.settings.timezone },
          { title: 'Login to PFB Admin', path: paths.app.settings.timezone },
          { title: 'Login to PEV Admin', path: paths.app.settings.timezone },
        ],
      },
    ],
  },
];
