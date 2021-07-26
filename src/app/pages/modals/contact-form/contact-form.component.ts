import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
interface FORM_FIELD {
  fieldName: string;
  arrayField?: FORM_ARRAY_FIELD;
}
interface FORM_ARRAY_FIELD {
  formArrayName: string;
  fieldIndex: number;
}
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.contactForm = this.initContactForm();
  }

  ngOnInit(): void {}
  private initContactForm() {
    return this.fb.group({
      fullName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
      address: this.fb.array(
        [this.createAdressField()],
        Validators.compose([Validators.required])
      ),
    });
  }
  get addressFields() {
    return this.contactForm.get('address') as FormArray;
  }
  createAdressField() {
    return this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ]),
      ],
      value: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(140),
        ]),
      ],
    });
  }
  addAdressField() {
    this.addressFields.push(this.createAdressField());
    console.log(
      this.contactForm,
      this.formArrayField({
        fieldName: 'title',
        arrayField: { fieldIndex: 0, formArrayName: 'address' },
      })
    );
  }
  // FORM ALANININ HATALI OLUP OLMADIĞINI KONTROL ETMEK İÇİN
  fieldHasError(fieldName: string): boolean {
    const formField = this.contactForm.controls[fieldName];
    return formField?.invalid && formField?.touched ? true : false;
  }
  formArrayField(fieldData: FORM_FIELD) {
    if (fieldData?.arrayField) {
      const fArray = this.contactForm.get(
        fieldData.arrayField.formArrayName
      ) as FormArray;
      const fGroup = fArray.controls[
        fieldData.arrayField.fieldIndex
      ] as FormGroup;
      return fGroup.get(fieldData.fieldName);
    } else {
      return null;
    }
  }
  formArrayFieldHasError(fieldData: FORM_FIELD): boolean {
    const formField = this.formArrayField(fieldData);
    return formField?.invalid && formField?.touched ? true : false;
  }

  // FORM ALANINDAKİ HATAYI YAKALAMAK İÇİN
  getErrorMessage(fieldData: FORM_FIELD): string {
    const formField = fieldData?.arrayField?this.formArrayField(fieldData):this.contactForm.get(fieldData.fieldName);
    const fieldErrors = formField?.errors;
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
}
