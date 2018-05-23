import { NgModule } from '@angular/core';

import { BytesConverterPipe } from '../pipes/bytesConverter.pipe';
import { ConvertTimeoutPipe } from './../pipes/convertTimeout.pipe';
import { ShortTextPipe } from "./../pipes/shortText.pipe";
import { SafeResourceUrl } from './../pipes/safeResourceUrl.pipe';
import { FilterDropdown } from "./../pipes/filterDropdown.pipe";
import { SafeStylePipe } from "./../pipes/safeStyle.pipe";
import { CapitalPipe } from './../pipes/capital.pipe';
import { KeysPipe } from './../pipes/keys.pipe';
import { SafeHtmlPipe } from './../pipes/safeHtml.pipe';

@NgModule({
    imports: [],
    exports: [
        BytesConverterPipe,
        ConvertTimeoutPipe,
        ShortTextPipe,
        SafeResourceUrl,
        FilterDropdown,
        SafeStylePipe,
        CapitalPipe,
        KeysPipe,
        SafeHtmlPipe
    ],
    declarations: [
        BytesConverterPipe,
        ConvertTimeoutPipe,
        ShortTextPipe,
        SafeResourceUrl,
        FilterDropdown,
        SafeStylePipe,
        CapitalPipe,
        KeysPipe,
        SafeHtmlPipe
    ],
    providers: [FilterDropdown],
})
export class PipesModule { }
