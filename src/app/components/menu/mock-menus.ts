import { Menu } from './../../models/menu.model';

const menuIconsPath = './../../assets/images/icons/';

export const dataMenu: Menu[] = [
    { id: 4, name: 'Assignments', icon: `${menuIconsPath}tag_icon.png`, url: '/assignments'},
    { id: 3, name: 'Stories', icon: `${menuIconsPath}clock_icon.png`, url: '/stories'}
];

export const analyticsMenu: Menu[] = [
    { id: 1, name: 'Overview', icon: `${menuIconsPath}chart_icon.png`, url: 'analytics'},
    { id: 2, name: 'Event Summary', icon: `${menuIconsPath}summary.png`, url: 'events-summary'}
];

export const notificationMenu: Menu[] = [
    { id: 1, name: 'Notifications', icon: `${menuIconsPath}envelope_icon.png`, url: '/push-notifications'}
];
