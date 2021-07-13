import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Şifre Gösterme - Gizleme
  showPassword: boolean = false;
  // LOGIN FORMUNU DOĞRULAMALARIYLA BERABER OLUŞTURDUK
  loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(
          '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
    ],
  });

  constructor(private formBuilder: FormBuilder, private authService:AuthService) {}

  ngOnInit(): void {}
  // FORM ALANININ HATALI OLUP OLMADIĞINI KONTROL ETMEK İÇİN
  fieldHasError(fieldName: string): boolean {
    const formField = this.loginForm.controls[fieldName];
    return formField?.invalid && formField?.touched ? true : false;
  }
  // FORM ALANINDAKİ HATAYI YAKALAMAK İÇİN
  getErrorMessage(fieldName: string): string {
    const formField = this.loginForm.get(fieldName);
    const fieldErrors = this.loginForm.controls[fieldName].errors;
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
      : 'Bilinmeyen hata';
  }
  // FORMU SUBMIT ETMEK İÇİN
  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
    }
  }
}
