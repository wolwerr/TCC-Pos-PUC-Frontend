import { UserService } from './../../services/user.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.scss']
})
export class TrocarSenhaComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;
  id: number;
  public user: IUser = {} as IUser;
  formGroup: FormGroup;
  isEdit: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activeRouter: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
    this.fillUserForm();
  }

  success = 'Salvo com sucesso!';
  action = 'fechar';

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  public async onSubmit() {
    if(this.formGroup.valid){
        await this.userService.updateSenha(this.id, this.user);
        this.openSnackBar(this.success, this.action);
    setTimeout(() => {
      this.router.navigateByUrl('/main/login');
    });
  }else{
    this._snackBar.open('Preencha a senha', 'fechar');
  }}

    voltar() {
      this.router.navigateByUrl('/main/login');
    }

    getErrorSenha() {
      return this.formGroup.get('password')?.hasError('required')
        ? 'Este campo é obrigatório'
        : this.formGroup.get('password')?.hasError('pattern')
        ? 'Senha inválida, favor trocar'
        : '';
    }

    get password() {
      return this.formGroup.get('password') as FormControl;
    }

    createForm() {
      this.formGroup = this.formBuilder.group({
        password: [null, [Validators.required]],
      });
    }

    private fillUserForm() {
      if (this.activeRouter.snapshot.paramMap.get('id')) {
        this.isEdit = true;
        this.id = Number.parseInt(this.activeRouter.snapshot.paramMap.get('id')!);
        this.userService.findUserById(this.id).subscribe({
          next: (res) => {
            this.formGroup.patchValue(res);
          },
          error: (ex) => {
            console.log(ex);
          },
        });
      }
    }

  }

