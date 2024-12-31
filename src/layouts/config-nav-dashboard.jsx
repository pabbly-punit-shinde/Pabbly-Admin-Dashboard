import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  one: icon('ic-user'),
  two: icon('ic-ecommerce'),
  settings: icon('ic-user'),
  gethelp: icon('ic-gethelp'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    items: [{ title: 'Dashboard', path: paths.app.root, icon: ICONS.one }],
  },

  {
    items: [
      {
        title: 'Customer',
        path: paths.app.customer.root,
        icon: ICONS.settings,
        children: [
          { title: 'Customers', path: paths.app.customer.customers },
          { title: 'Password Reset', path: paths.app.customer.passwordReset },
          { title: 'Update Email', path: paths.app.customer.updateEmail},
          { title: 'Block/Unblock Email', path: paths.app.customer.blockEmail},
        ],
      },
    ],
  },

  {
    items: [
      {
        title: 'User',
        path: paths.app.user.root,
        icon: ICONS.settings,
        children: [
          { title: 'Users', path: paths.app.user.users },
          { title: 'Logs', path: paths.app.user.logs },
        ],
      },
    ],
  },

  {
    items: [{ title: 'Api', path: paths.app.api, icon: ICONS.two }],
  },
];
