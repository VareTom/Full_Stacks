import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// Enums
import { LanguageCodes } from 'src/shared/enums/LanguageCodes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isDarkMode: boolean = true;
  
  LanguageCodes = LanguageCodes;
  
  constructor(public translate: TranslateService) { }
  
  ngOnInit(): void {
  }
  
  onSwitchTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }
  
  onChangeCurrentLang(code: LanguageCodes): void {
    console.log(code)
    localStorage.setItem('languageCode', code);
    this.translate.use(code);
  }

}
