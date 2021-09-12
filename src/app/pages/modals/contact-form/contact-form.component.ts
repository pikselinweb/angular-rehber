import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '@core/services';
import { CONTACT, CONTACT_ADDRESS } from '@models/contacts';
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
  constructor(
    private fb: FormBuilder,
    // modala gelen data
    @Inject(MAT_DIALOG_DATA) public data: any,
    // rehber servisi
    private contactService: ContactService,
    // modal kontrolü
    private dialogRef: MatDialogRef<ContactFormComponent>
  ) {
    // GELEN FORM DEĞERİ
    const defaultFormData: CONTACT = this.data?.contact;
    // REHBER FORMUNU OLUŞTURMAK VE SABİT ALANLARI DOLDURMAK
    this.contactForm = this.initContactForm(defaultFormData);
    // ADRES ALANLARINI OLUŞTURMAK - DOLDURMAK
    this.initAddressFormArray(defaultFormData?.address);
  }

  ngOnInit(): void {}
  // ADRES FORMUNU YÜKLEMEK İÇİN
  private initContactForm(defaultFormData: CONTACT) {
    return this.fb.group({
      fullName: [
        defaultFormData?.fullName || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
      ],
      phoneNumber: [
        defaultFormData?.phoneNumber || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      address: this.fb.array([], Validators.compose([Validators.required])),
    });
  }
  // ADRES DİZİNİS DİNAMİK OLUŞTURMAK İÇİN
  private initAddressFormArray(addressArray: CONTACT_ADDRESS[]) {
    if (addressArray?.length > 0) {
      addressArray.forEach((fAddress) => {
        this.addAdressField(fAddress);
      });
    } else {
      this.addAdressField();
    }
  }
  // Form bilgilerini kaydetmek
  async submitContactForm() {
    const { fullName, phoneNumber, address } = this.contactForm.value;
    const cFormData: CONTACT = {
      fullName,
      phoneNumber,
      address,
      userId: this.data?.userId,
      photoUrl: this.generatePUrl(fullName),
    };
    // rehber bilgisi id
    const cId = this.data?.contact?.id
    // güncelleme ya da oluşturma işlemi
    const result = cId
      ? await this.contactService.updateContact({...cFormData,id:cId})
      : await this.contactService.addContact(cFormData);
    if (result?.id) {
      this.dialogRef.close(result);
    }
  }
  // ADRES ALANLARINI FORM DİZİSİ OLARAK ÇEKMEK İÇİN
  get addressFields() {
    return this.contactForm.get('address') as FormArray;
  }
  // FORM DİZİSİNİ SINIRLAMA
  get allowAddAddressField() {
    return this.addressFields?.length < 5 ? true : false;
  }
  // FORM ELEMANI SİLME ONAYI
  get allowDeleteAddressField() {
    return this.addressFields?.length > 1 ? true : false;
  }

  // BAŞLIK VE İÇERİKTEN ADRES ALANI OLUŞTURMAK İÇİN
  createAdressField(contactAddress?: CONTACT_ADDRESS) {
    return this.fb.group({
      title: [
        contactAddress?.title || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ]),
      ],
      value: [
        contactAddress?.value || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(140),
        ]),
      ],
    });
  }
  // DİNAMİK ADRES ALANLARI EKLEMEK İÇİN
  addAdressField(contactAddress?: CONTACT_ADDRESS) {
    this.addressFields.push(this.createAdressField(contactAddress));
    // console.log(
    //   this.contactForm,
    //   this.formArrayField({
    //     fieldName: 'title',
    //     arrayField: { fieldIndex: 0, formArrayName: 'address' },
    //   })
    // );
  }
  // ADDRESS FORM DİZİSİNDEN ELEMAN SİLMEK İÇİN
  removeAddressField(fieldIndex: number) {
    this.addressFields.removeAt(fieldIndex);
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
  // profil resmi oluşturmak
  private generatePUrl(name: string) {
    const strName = this.slugifyString(name);
    return `https://avatars.dicebear.com/api/bottts/${strName}.svg`;
  }
  // string verisini temizlemek
  private slugifyString(strVal: string) {
    return strVal
      .toString() // Cast to string
      .toLowerCase() // Convert the string to lowercase letters
      .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
      .trim() // Remove whitespace from both sides of a string
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -
  }
}
