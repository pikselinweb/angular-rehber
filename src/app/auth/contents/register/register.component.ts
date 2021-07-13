import { Component, OnInit } from '@angular/core';
// ANGULAR FORM ÖZELLİKLERİ
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //şifre gizleme gösterme
  showPassword: boolean = false;
  registerForm: FormGroup;

  constructor(private authService: AuthService) {
    // OLUŞTURULURKEN FORMU TANIMLADIK
    this.registerForm = this.initRegisterForm;
  }

  ngOnInit(): void {}
  get initRegisterForm() {
    return new FormGroup(
      {
        fullName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(
            '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ]),
        passwordConfirm: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),

          Validators.pattern(
            '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),

          this.passwordMatchValidator(),
        ]),

        bio: new FormControl('', [Validators.maxLength(200)]),
      },
      { updateOn: 'blur' }
    );
  }
  // FORM ALANININ HATALI OLUP OLMADIĞINI KONTROL ETMEK İÇİN
  fieldHasError(fieldName: string): boolean {
    const formField = this.registerForm.controls[fieldName];
    return formField?.invalid && formField?.touched ? true : false;
  }
  // FORM ALANINDAKİ HATAYI YAKALAMAK İÇİN
  getErrorMessage(fieldName: string): string {
    const formField = this.registerForm.get(fieldName);
    const fieldErrors = this.registerForm.controls[fieldName].errors;
    return formField?.hasError('required')
      ? 'Alan boş bırakılamaz'
      : formField?.hasError('email')
      ? 'Lütfen geçerli bir mail adresi giriniz.'
      : formField?.hasError('minlength')
      ? `Belirlenen karakter sınırının altındasınız
      (${fieldErrors?.minlength?.actualLength} / ${fieldErrors?.minlength?.requiredLength})`
      : formField?.hasError('maxlength')
      ? `Belirlenen karakter sınırının üstündesiniz
      (${fieldErrors?.maxlength?.actualLength} / ${fieldErrors?.maxlength?.requiredLength})`
      : formField?.hasError('pattern')
      ? 'Şifre alanı en az bir büyük harf, bir küçük harf ve #?!@$%^&*- özel karakterlerinden birini içermelidir.'
      : formField?.hasError('mismatch')
      ? 'Girdiğiniz şifreler eşleşmemektedir.'
      : 'Bilinmeyen hata';
  }
  // FORMU SUBMIT ETMEK İÇİN
   onRegisterSubmit() {
    if (this.registerForm.valid) {
     this.authService.register(this.registerForm.value);
    }
  }
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordVal = this.registerForm?.get('password')?.value;
      const forbidden = control.value !== passwordVal;
      return forbidden ? { mismatch: true } : null;
    };
  }
}
