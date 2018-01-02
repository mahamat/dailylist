import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  userName:string = "";
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menu:MenuController,
    private authService:AuthServiceProvider,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.handleAuth();
    });
  }

  public handleAuth() {
    this.authService.authenticated$.subscribe(status => {
      if (status) {
        this.rootPage = 'HomePage';
        this.enableMenu(true);
      } else {
        this.rootPage = 'LoginPage';
        this.enableMenu(false);
      }
    });
  }

  enableMenu(loggedIn:boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.userName = this.authService.currentUserDisplayName;
  }

  logOut() {
    this.authService.logOut();
  }

}
