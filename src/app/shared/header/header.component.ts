import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn$: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.isLoggedIn$ = this.authService.isTokenPresent();
  }

  onLogout() {
    this.authService.logout();

        this.router.navigateByUrl('/home')
        location.reload();
  }

  login() {
    this.authService.isTokenPresent;
    this.router.navigateByUrl('/main/login')
  }
}
