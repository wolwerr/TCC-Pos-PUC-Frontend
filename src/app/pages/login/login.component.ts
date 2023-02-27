import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
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
            this.authService.navigateToHome();            
            this.openSnackBar('Login feito com Sucesso!', 'Fechar');
            this.router.navigateByUrl('/home')
          },
        });
    }
    this.openSnackBar('Usuário ou senha errados, digite novamente!', 'Fechar');
    }
    esqueciSenha() {
      this.router.navigateByUrl('main/esqueciSenha')
    }

  }

