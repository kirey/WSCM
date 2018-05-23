import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeStyle'
})

export class SafeStylePipe implements PipeTransform {
    public constructor(private domSanitizer: DomSanitizer) {}

    transform(value: any, args: any[]): any {
        return this.domSanitizer.bypassSecurityTrustStyle(value);
    }
}