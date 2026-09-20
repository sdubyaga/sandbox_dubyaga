import { URLS } from './urls';

export const TOC_NAVIGATION = [
    {
        name: 'Forms',
        section: 'FORMS',
        links: [['PRACTICE_FORM', URLS.PRACTICE_FORM]],
    },
    {
        name: 'Alerts, Frame & Windows',
        section: 'ALERTS_FRAME_WINDOWS',
        links: [
            ['BROWSER_WINDOWS', URLS.BROWSER_WINDOWS],
            ['ALERTS', URLS.ALERTS],
            ['FRAMES', URLS.FRAMES],
            ['NESTED_FRAMES', URLS.NESTED_FRAMES],
            ['MODAL_DIALOGS', URLS.MODAL_DIALOGS],
        ],
    },
    {
        name: 'Widgets',
        section: 'WIDGETS',
        links: [
            ['ACCORDIAN', URLS.ACCORDIAN],
            ['AUTO_COMPLETE', URLS.AUTO_COMPLETE],
            ['DATE_PICKER', URLS.DATE_PICKER],
            ['SLIDER', URLS.SLIDER],
            ['PROGRESS_BAR', URLS.PROGRESS_BAR],
            ['TABS', URLS.TABS],
            ['TOOL_TIPS', URLS.TOOL_TIPS],
            ['MENU', URLS.MENU],
            ['SELECT_MENU', URLS.SELECT_MENU],
        ],
    },
    {
        name: 'Interactions',
        section: 'INTERACTIONS',
        links: [
            ['SORTABLE', URLS.SORTABLE],
            ['SELECTABLE', URLS.SELECTABLE],
            ['RESIZABLE', URLS.RESIZABLE],
            ['DROPPABLE', URLS.DROPPABLE],
            ['DRAGABBLE', URLS.DRAGABBLE],
        ],
    },
    {
        name: 'Book Store Application',
        section: 'BOOK_STORE_APPLICATION',
        links: [
            ['LOGIN', URLS.LOGIN],
            ['BOOK_STORE', URLS.BOOK_STORE],
            ['PROFILE', URLS.PROFILE],
            ['BOOK_STORE_API', URLS.BOOK_STORE_API],
        ],
    },
] as const;
