import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";
import {throwError, timeout} from "rxjs";
import { Router } from '@angular/router';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private appService: AppService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
      if (this.form.valid) {
      let username = this.form.get('userName')!.value;
      let password = this.form.get('password')!.value;

      this.authService.login(username, password)
        .subscribe({
          next: (res) => {
            this.authService.setAccessToken(res.accessToken)
            this.authService.setRefreshToken(res.refreshToken);
            this.appService.showMessage('Sucesso!', 'fechar');
            this.authService.navigateToHome();
            this.router.navigateByUrl('/home')
          },
        });
    }
      this.appService.showMessage('Usuário ou senha errados, digite novamente!', 'fechar');
    }

  }

