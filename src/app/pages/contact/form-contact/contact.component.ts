import { ContactService } from './../../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isEdit: boolean = false;
  formGroup: FormGroup;
  public contact: IContact = {} as IContact;
  titleAlert: string = 'Este campo é obrigatório';
  id: number;
  success = 'Salvo com sucesso!';
  action = 'fechar';

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private contactService: ContactService,
    private activeRouter: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.fillContactForm();
  }

  createForm() {
    let emailRegex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  this.formGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    email: [null, [Validators.required, Validators.pattern(emailRegex)]],
    subject: [null, [Validators.required]],
    message: [null, [Validators.required]],
    // copy: [null, [Validators.required]],
  });
}

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get email() {
    return this.formGroup.get('email')as FormControl;
  }

  get subject() {
    return this.formGroup.get('subject')as FormControl;
  }

  get message() {
    return this.formGroup.get('message') as FormControl;
  }

  // get copy() {
  //   return this.formGroup.get('copy')as FormControl;
  // }


  getErrorName() {
    return this.formGroup.get('name')?.hasError('required')
    ? 'Este campo é obrigatório'
    : this.formGroup.get('name')?.hasError('minlength')
      ? 'O nome precisa ter no mínimo 3 caracteres'
    : '';
  }

  getErrorEmail() {
    return this.formGroup.get('email')?.hasError('required')
      ? 'Este campo é obrigatório'
      : this.formGroup.get('email')?.hasError('pattern')
      ? 'Não é um endereço de e-mail válido'
      : '';
  }

  getErrorSubject() {
    return this.formGroup.get('subject')?.hasError('required')
      ? 'Este campo é obrigatório'
      : '';
  }

  getErrorMessage() {
    return this.formGroup.get('message')?.hasError('required')
      ? 'Este campo é obrigatório'
      : '';
  }

  // getErrorCopy() {
  //   return this.formGroup.get('copy')?.hasError('required')
  //     ? 'Este campo é obrigatório'
  //     : '';
  // }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000
    });
  }

  public async saveContact() {
    try {
          if(this.isEdit) {
        await this.contactService.updateContact(this.id, this.contact);
        this.formGroup.reset();
        this.openSnackBar(this.success, this.action);
      } else {
        await this.contactService.postContact(this.contact);
        alert('Mensagem enviada com sucesso!');
        this.formGroup.reset();
        this.openSnackBar(this.success, this.action);
      }
    } catch (e: any) {
      console.log('error');
      console.log(this.contact);

      return;
    }
    setTimeout(() => {
      this.router.navigateByUrl('/main/contacts')
    });
  }

private fillContactForm() {
  if (this.activeRouter.snapshot.paramMap.get('id')) {
    this.isEdit = true;
    this.id = Number.parseInt(this.activeRouter.snapshot.paramMap.get('id')!);
    this.contactService.findContactsById(this.id).subscribe({
      next: (res) => {
        this.formGroup.patchValue(res);
      },
      error: (ex) => {
        console.log(ex);
      },
    });
  }
}

  deleteContact() {
    if (confirm('Você está prestes a apagar esse registro, esta ação não pode ser desfeita!'))
    {
    this.contactService.deleteContact(this.id).subscribe({
      next: () => {
    this.openSnackBar('Contato excluído com sucesso!', 'Fechar');
    setTimeout(() => {
      this.router.navigateByUrl('/main/contacts')
      }, 1000);
  }}

    )}
  }
}

