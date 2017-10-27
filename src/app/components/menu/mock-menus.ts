import { Menu } from './../../models/menu.model';

const menuIconsPath = './../../assets/images/icons/';

export const dataMenu: Menu[] = [
    { id: 1, name: 'Overview', icon: `${menuIconsPath}chart_icon.png`, url: ''},
    { id: 2, name: 'Analytics', icon: `${menuIconsPath}eye_icon.png`, url: ''},
    { id: 4, name: 'Assignments', icon: `${menuIconsPath}tag_icon.png`, url: '/assignments'},
    { id: 2, name: 'Analytics', icon: `${menuIconsPath}eye_icon.png`, url: 'analytics'}
];

export const notificationMenu: Menu[] = [
    { id: 1, name: 'Notifications', icon: `${menuIconsPath}envelope_icon.png`, url: '/push-notifications'}
];
