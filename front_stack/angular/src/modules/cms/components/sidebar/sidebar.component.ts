import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isOpened: boolean = false;

  menuItems: any = [
    { text: this.translate.instant('titles.stacks'), icon: '', click: this.onShowStacks() },
    { text: this.translate.instant('titles.logout'), icon: '', click: this.onLogOut() }
  ]

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isOpened = !this.isOpened;
  }

  onLogOut(): void {
    // TODO:: call auth service logout
    console.log('logout')
  }

  onShowStacks(): void {
    console.log('stacks')
  }

  onShowProfile(): void {
    console.log('profile')
  }

}
