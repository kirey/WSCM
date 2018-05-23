import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeResourceUrl'
})

export class SafeResourceUrl implements PipeTransform {
    public constructor(private domSanitizer: DomSanitizer) {}

    transform(value: any): any {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
    }
}