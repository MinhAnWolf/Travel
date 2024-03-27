import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  // {
  //   navCap: 'Home',
  // },
  {
    displayName: 'Home',
    iconName: 'home',
    route: '/dashboard',
  },
  {
    displayName: 'My trip',
    iconName: 'pennant',
    route: '/extra/my-trip',
  },
  {
    displayName: 'Friend',
    iconName: 'users',
    route: '/extra/friend',
  },
  {
    displayName: 'Calenda',
    iconName: 'calendar',
    route: '/extra/calenda',
  },
  {
    displayName: 'Messages',
    iconName: 'message',
    route: '/extra/messages',
  },
  {
    displayName: 'Map',
    iconName: 'map',
    route: '/extra/map',
  },
  {
    displayName: 'Setting',
    iconName: 'settings',
    route: '/extra/setting',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Badge',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    route: '/ui-components/tooltips',
  },
  // {
  //   navCap: 'Auth',
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'lock',
  //   route: '/authentication/login',
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'user-plus',
  //   route: '/authentication/register',
  // },
  // {
  //   navCap: 'Extra',
  // },
  // {
  //   displayName: 'Icons',
  //   iconName: 'mood-smile',
  //   route: '/extra/icons',
  // },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'aperture',
  //   route: '/extra/sample-page',
  // },
];
