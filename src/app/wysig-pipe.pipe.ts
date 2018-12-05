import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl
} from '@angular/platform-browser';


@Pipe({
  name: 'safe'
})

 /**
   * This is a custom pipe to bypass Security in the HTML wysig Fields in the editor, get's injected there
   */
export class WysigPipe implements PipeTransform {

  constructor(protected _sanitizer: DomSanitizer) {

  }

  public transform(value: string, type = 'html'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    if (value === null) {
      return null;
    }
    
    switch (type) {
      case 'html':
        return this._sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this._sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this._sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this._sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }

}
