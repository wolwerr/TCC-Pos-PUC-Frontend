import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'Este campo é obrigatório';
  isEdit: boolean = false;
  id: number;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private activeRouter: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.createForm();
    this.fillUserForm();
  }

  public user: IUser = {} as IUser;

  success = 'Salvo com sucesso!';
  action = 'fechar';



  createForm() {
    let emailRegex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.pattern(emailRegex)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      role: [null, Validators.required],
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get username() {
    return this.formGroup.get('username') as FormControl;
  }

  get email() {
    return this.formGroup.get('email') as FormControl;
  }

  get password() {
    return this.formGroup.get('password') as FormControl;
  }

  get role() {
    return this.formGroup.get('role') as FormControl;
  }


  getErrorEmail() {
    return this.formGroup.get('email')?.hasError('required')
      ? 'Este campo é obrigatório'
      : this.formGroup.get('email')?.hasError('pattern')
      ? 'Não é um endereço de e-mail válido'
      : '';
  }

  getErrorName() {
    return this.formGroup.get('name')?.hasError('required')
    ? 'Este campo é obrigatório'
    : this.formGroup.get('name')?.hasError('minlength')
      ? 'O nome precisa ter no mínimo 3 caracteres'
    : '';
  }

  getErrorUserName() {
    return this.formGroup.get('username')?.hasError('required')
    ? 'Este campo é obrigatório'
    : this.formGroup.get('username')?.hasError('minlength')
      ? 'O nome precisa ter no mínimo 3 caracteres'
      : '';
  }

  getErrorSenha() {
    return this.formGroup.get('password')?.hasError('required')
    ? 'Este campo é obrigatório'
    : this.formGroup.get('password')?.hasError('minlength')
      ? 'A senha precisa ter no mínimo 6 caracteres'
      : '';
  }

  getErrorCargo() {
    return this.formGroup.get('role')?.hasError('required')
      ? 'Este campo é obrigatório'
      : '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000
    });
  }


  public async saveUser() {
    try {
          if(this.isEdit) {
        await this.userService.updateUser(this.id, this.user);
        this.formGroup.reset();
        this.openSnackBar(this.success, this.action);
      } else {
        await this.userService.postUser(this.user);
        this.formGroup.reset();
        this.openSnackBar(this.success, this.action);
      }
    } catch (e: any) {
      console.log('error');
      console.log(this.user);
      this.openSnackBar('Já existe um usuário cadastrado com esse username', this.action);
      return;
    }
    setTimeout(() => {
      this.router.navigateByUrl('/main/users')
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

  deleteUser() {
    if (confirm('Você está prestes a apagar esse registro, esta ação não pode ser desfeita!'))
    {
      this.userService.deleteUser(this.id).subscribe({
        next: (n) => {
          this.openSnackBar('Registro apagado com sucesso', 'fechar');
          this.router.navigateByUrl('/main/users');
        },
        error: (e) => {
          alert('Aluno não pode ser apagado pois está vinculado a uma classe!')
        }
      });
    } else {
      alert('cancelado!')
    }
  }
}

