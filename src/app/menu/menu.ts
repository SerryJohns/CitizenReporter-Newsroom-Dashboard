export class Menu {
    id: number;
    name: String;
    url: String;
    icon: String;
}

export const DATA_MENU: Menu[] = [
    { id: 1, name: 'Overview', icon: 'chart_icon.png', url: ''},
    { id: 2, name: 'Analytics', icon: 'eye_icon.png', url: ''},
    { id: 3, name: 'Stories', icon: 'clock_icon.png', url: ''},
    { id: 4, name: 'Assignments', icon: 'tag_icon.png', url: ''}
];

export const NOTIFICATION_MENU: Menu[] = [
    { id: 1, name: 'Notifications', icon: 'envelope_icon.png', url: ''}
];
