import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '@test-data/urls';

export interface SectionName  {
    ELEMENTS: Locator;
    FORMS: Locator;
    ALERTS_FRAME_WINDOWS: Locator;
    WIDGETS: Locator;
    INTERACTIONS: Locator;
    BOOK_STORE_APPLICATION: Locator;
};

export interface CategoryName  {
    TEXT_BOX: Locator;
    CHECK_BOX: Locator;
    RADIO_BUTTON: Locator;
    WEB_TABLES: Locator;
    BUTTONS: Locator;
    LINKS: Locator;
    BROKEN_LINKS_IMAGES: Locator,
    UPLOAD_AND_DOWNLOAD: Locator,
    DYNAMIC_PROPERTIES: Locator,
    PRACTICE_FORM: Locator,
    BROWSER_WINDOWS: Locator,
    ALERTS: Locator,
    FRAMES: Locator,
    NESTED_FRAMES: Locator,
    MODAL_DIALOGS: Locator,
    ACCORDIAN: Locator,
    AUTO_COMPLETE: Locator,
    DATE_PICKER: Locator,
    SLIDER: Locator,
    PROGRESS_BAR: Locator,
    TABS: Locator,
    TOOL_TIPS: Locator,
    MENU: Locator,
    SELECT_MENU: Locator,
    SORTABLE: Locator,
    SELECTABLE: Locator,
    RESIZABLE: Locator,
    DROPPABLE: Locator,
    DRAGABBLE: Locator,
    LOGIN: Locator,
    BOOK_STORE: Locator,
    PROFILE: Locator,
    BOOK_STORE_API: Locator
};

export class TOC extends BasePage {
    private sectionElements: Locator;
    private sectionForms: Locator;
    private sectionAlertsFrameWindows: Locator;
    private sectionWidgets: Locator;
    private sectionInteractions: Locator;
    private sectionBookStoreApplication: Locator;
    private categoryTextBox: Locator;
    private categoryCheckBox: Locator;
    private categoryRadioButton: Locator;
    private categoryWebTables: Locator;
    private categoryButtons: Locator;
    private categoryLinks: Locator;
    private categoryBrokenLinksImages: Locator;
    private categoryUploadAndDownload: Locator;
    private categoryDynamicProperties: Locator;
    private categoryPracticeForm: Locator;
    private categoryBrowserWindows: Locator;
    private categoryAlerts: Locator;
    private categoryFrames: Locator;
    private categoryNestedFrames: Locator;
    private categoryModalDialog: Locator;
    private categoryAccordion: Locator;
    private categoryAutoComplete: Locator;
    private categoryDatePicker: Locator;
    private categorySlider: Locator;
    private categoryProgressBar: Locator;
    private categoryTabs: Locator;
    private categoryToolTips: Locator;
    private categoryMenu: Locator;
    private categorySelectMenu: Locator;
    private categorySortable: Locator;
    private categorySelectable: Locator;
    private categoryResizable: Locator;
    private categoryDroppable: Locator;
    private categoryDragabble: Locator;
    private categoryLogin: Locator;
    private categoryBookStore: Locator;
    private categoryProfile: Locator;
    private categoryBookStoreAPI: Locator;
    public  Section: SectionName;
    public  Category: CategoryName;
    
    constructor (page: Page) {
        super(page,URLS.HOME);
        this.sectionElements = this.page.getByText('Elements');
        this.sectionForms = this.page.getByText('Forms');
        this.sectionAlertsFrameWindows = this.page.getByText('Alerts, Frame & Windows');
        this.sectionWidgets = this.page.getByText('Widgets');
        this.sectionInteractions = this.page.getByText('Interactions');
        this.sectionBookStoreApplication = this.page.getByText('Book Store Application');
        this.categoryTextBox = this.page.getByRole('link', { name: 'Text Box' });
        this.categoryCheckBox = this.page.getByRole('link', { name: 'Check Box' });
        this.categoryRadioButton = this.page.getByRole('link', { name: 'Radio Button'});
        this.categoryWebTables = this.page.getByRole('link', { name: 'Web Tables' });
        this.categoryButtons = this.page.getByRole('link', { name: 'Buttons' });
        this.categoryLinks = this.page.getByRole('link', { name: 'Links', exact: true});
        this.categoryBrokenLinksImages = this.page.getByRole('link', { name: 'Broken Links - Images' });
        this.categoryUploadAndDownload = this.page.getByRole('link', { name: 'Upload and Download' });
        this.categoryDynamicProperties = this.page.getByRole('link', { name: 'Dynamic Properties' });
        this.categoryPracticeForm = this.page.getByRole('link', { name: 'Practice Form' });
        this.categoryBrowserWindows = this.page.getByRole('link', { name: 'Browser Windows' });
        this.categoryAlerts = this.page.getByRole('link', { name: 'Alerts' });
        this.categoryFrames = this.page.getByRole('link', { name: 'Frames', exact: true });
        this.categoryNestedFrames = this.page.getByRole('link', { name: 'Nested Frames' });
        this.categoryModalDialog = this.page.getByRole('link', { name: 'Modal Dialogs' });
        this.categoryAccordion = this.page.getByRole('link', { name: 'Accordian' });
        this.categoryAutoComplete = this.page.getByRole('link', { name: 'Auto Complete' });
        this.categoryDatePicker = this.page.getByRole('link', { name: 'Date Picker' });
        this.categorySlider = this.page.getByRole('link', { name: 'Slider' });
        this.categoryProgressBar = this.page.getByRole('link', { name: 'Progress Bar' });
        this.categoryTabs = this.page.getByRole('link', { name: 'Tabs' });
        this.categoryToolTips = this.page.getByRole('link', { name: 'Tool Tips' });
        this.categoryMenu = this.page.getByRole('link', { name: 'Menu', exact: true });
        this.categorySelectMenu = this.page.getByRole('link', { name: 'Select Menu' });
        this.categorySortable = this.page.getByRole('link', { name: 'Sortable' });
        this.categorySelectable = this.page.getByRole('link', { name: 'Selectable' });
        this.categoryResizable = this.page.getByRole('link', { name: 'Resizable' });
        this.categoryDroppable = this.page.getByRole('link', { name: 'Droppable' });
        this.categoryDragabble = this.page.getByRole('link', { name: 'Dragabble' });
        this.categoryLogin = this.page.getByRole('link', { name: 'Login' });
        this.categoryBookStore = this.page.getByRole('link', { name: 'Book Store', exact: true });
        this.categoryProfile = this.page.getByRole('link', { name: 'Profile' });
        this.categoryBookStoreAPI = this.page.getByRole('link', { name: 'Book Store API' });

        this.Section = {
            ELEMENTS: this.sectionElements,
            FORMS: this.sectionForms,
            ALERTS_FRAME_WINDOWS: this.sectionAlertsFrameWindows,
            WIDGETS: this.sectionWidgets,
            INTERACTIONS: this.sectionInteractions,
            BOOK_STORE_APPLICATION: this.sectionBookStoreApplication
        };

        this.Category = {
            TEXT_BOX: this.categoryTextBox,
            CHECK_BOX: this.categoryCheckBox,
            RADIO_BUTTON: this.categoryRadioButton,
            WEB_TABLES: this.categoryWebTables,
            BUTTONS: this.categoryButtons,
            LINKS: this.categoryLinks,
            BROKEN_LINKS_IMAGES: this.categoryBrokenLinksImages,
            UPLOAD_AND_DOWNLOAD: this.categoryUploadAndDownload,
            DYNAMIC_PROPERTIES: this.categoryDynamicProperties,
            PRACTICE_FORM: this.categoryPracticeForm,
            BROWSER_WINDOWS: this.categoryBrowserWindows,
            ALERTS: this.categoryAlerts,
            FRAMES: this.categoryFrames,
            NESTED_FRAMES: this.categoryNestedFrames,
            MODAL_DIALOGS: this.categoryModalDialog,
            ACCORDIAN: this.categoryAccordion,
            AUTO_COMPLETE: this.categoryAutoComplete,
            DATE_PICKER: this.categoryDatePicker,
            SLIDER: this.categorySlider,
            PROGRESS_BAR: this.categoryProgressBar,
            TABS: this.categoryTabs,
            TOOL_TIPS: this.categoryToolTips,
            MENU: this.categoryMenu,
            SELECT_MENU: this.categorySelectMenu,
            SORTABLE: this.categorySortable,
            SELECTABLE: this.categorySelectable,
            RESIZABLE: this.categoryResizable,
            DROPPABLE: this.categoryDroppable,
            DRAGABBLE: this.categoryDragabble,
            LOGIN: this.categoryLogin,
            BOOK_STORE: this.categoryBookStore,
            PROFILE: this.categoryProfile,
            BOOK_STORE_API: this.categoryBookStoreAPI    
        }
    }
    
    async verifyPageIsLoaded(): Promise<void> {
        await expect(this.page.getByRole('link', { name: 'Selenium Online Training' })).toBeVisible();
    }
    
    async collapseSection(sectionName: Locator): Promise<void> {
        if (!(await sectionName.locator('.element-list.show').count() > 0)) {
            await sectionName.click();
        }
    }
    
    async expandSection(sectionName: Locator): Promise<void> {
        if (await sectionName.locator('.element-list.show').count() == 0) {
        await sectionName.click();
        }
    } 
    
    async openCategory(categoryName: Locator): Promise<void> {
        if (await categoryName.isVisible()) {
            await categoryName.click();
        }
    }        
}