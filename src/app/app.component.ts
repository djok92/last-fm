import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private translate: TranslateService ) {
    this.translate.addLangs(['en', 'rs']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|rs/) ? browserLang : 'en');
    console.log('app constructor\n\n\n\n\n', this.translate)
  }
  title = 'last-fm';
}
