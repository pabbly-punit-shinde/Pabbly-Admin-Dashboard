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
    items: [
      { title: 'One', path: paths.app.root, icon: ICONS.one },
      { title: 'Two', path: paths.app.two, icon: ICONS.two },
    ],
  },

  {
    items: [
      {
        title: 'Settings',
        path: paths.app.settings.root,
        icon: ICONS.settings,
        children: [
          { title: 'Time Zone', path: paths.app.settings.timezone },
          { title: 'API', path: paths.app.settings.api },
  
        ],
      },
    ],
  },
  {
    items: [
      { title: 'Get Help', path: paths.app.gethelp, icon: ICONS.gethelp },
    ],
  },

];
