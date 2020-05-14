import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Books';
  activatedComponent;
  color = '#ed6491';
  showLoadingIndicator = true;

  constructor(
    private router: Router
  ) { }


  ngOnInit() {
    this.activatedComponent = 'home';

    this.router.events.subscribe(
      (routerEvent) => {

        if (routerEvent instanceof NavigationStart) {
          this.showLoadingIndicator = true;
        }


        if (routerEvent instanceof NavigationEnd) {
          this.showLoadingIndicator = false;
        }
      }
    )
  }
}