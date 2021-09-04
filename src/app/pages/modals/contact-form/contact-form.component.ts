import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
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
  // ADRES FORMUNU YÜKLEMEK İÇİN
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
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      address: this.fb.array(
        [this.createAdressField()],
        Validators.compose([Validators.required])
      ),
    });
  }
  // Form bilgilerini konsola yazdırmak
  submitContactForm() {
    console.log(this.contactForm.value);
  }
  // ADRES ALANLARINI FORM DİZİSİ OLARAK ÇEKMEK İÇİN
  get addressFields() {
    return this.contactForm.get('address') as FormArray;
  }
  // BAŞLIK VE İÇERİKTEN ADRES ALANI OLUŞTURMAK İÇİN
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
  // DİNAMİK ADRES ALANLARI EKLEMEK İÇİN
  addAdressField() {
    this.addressFields.push(this.createAdressField());
    // console.log(
    //   this.contactForm,
    //   this.formArrayField({
    //     fieldName: 'title',
    //     arrayField: { fieldIndex: 0, formArrayName: 'address' },
    //   })
    // );
  }
  // FORM ALANININ HATALI OLUP OLMADIĞINI KONTROL ETMEK İÇİN
  fieldHasError(fieldName: string): boolean {
    const formField = this.contactForm.controls[fieldName];
    return formField?.invalid && formField?.touched ? true : false;
  }
  // FORM DİZİSİNDEN ELEMAN ÇEKMEK İÇİN
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
  // FORM DİZİSİNDE HATA VARSA
  formArrayFieldHasError(fieldData: FORM_FIELD): boolean {
    const formField = this.formArrayField(fieldData);
    return formField?.invalid && formField?.touched ? true : false;
  }

  // FORM ALANINDAKİ HATAYI YAKALAMAK İÇİN
  getErrorMessage(fieldData: FORM_FIELD): string {
    const formField = fieldData?.arrayField
      ? this.formArrayField(fieldData)
      : this.contactForm.get(fieldData.fieldName);
    const fieldErrors = formField?.errors;
    return formField?.hasError('required')
      ? 'Alan boş bırakılamaz'
      : formField?.hasError('minlength')
      ? `Belirlenen karakter sınırının altındasınız
      (${fieldErrors?.minlength?.actualLength} / ${fieldErrors?.minlength?.requiredLength})`
      : formField?.hasError('maxlength')
      ? `Belirlenen karakter sınırının üstündesiniz
      (${fieldErrors?.maxlength?.actualLength} / ${fieldErrors?.maxlength?.requiredLength})`
      : 'Bilinmeyen hata';
  }
}
