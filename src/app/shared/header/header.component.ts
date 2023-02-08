import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import { Router } from '@angular/router';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn$: boolean;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private appService: AppService,) {
    this.isLoggedIn$ = this.authService.isTokenPresent();
  }

  onLogout() {
    
    this.authService.logout();
        this.appService.showMessage('Logout feito com sucesso!', 'fechar');
        this.router.navigateByUrl('/home')
        location.reload();
  }

  login() {
    this.authService.isTokenPresent;
    this.router.navigateByUrl('/main/login')
  }
}
