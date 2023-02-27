import { UserService } from './../../services/user.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required]
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

      this.userService.findUserByUsername(username)
        .subscribe({
          next: () => {
            this.openSnackBar('Sucesso!', 'Fechar');
            this.router.navigateByUrl('main/login');
          },
        });
    }
    this.openSnackBar('Usuário não encontrado!', 'Fechar');
    }

    voltar() {
      this.router.navigateByUrl('/main/login');
    }

  }

