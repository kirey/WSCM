import { SubMenuItem } from './subMenuItem.model';

export class MenuItem {
    title: string;
    route: string;
    allowAll?: boolean;
    isOpen?: boolean;

    dropdown?: SubMenuItem[];
}