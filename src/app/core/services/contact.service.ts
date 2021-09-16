import { Injectable } from '@angular/core';
// Api servisi
import { ApiService } from './api.service';
// bildirim göstermek için snackbar
import { SnackbarService } from './snackbar.service';
// istek interface
import { HTTP_REQ } from '@models/common';
// rehber interface
import { CONTACT } from '@models/contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private apiService: ApiService,
    private snackService: SnackbarService
  ) {}
  // Kullanıcıya bağlı rehber listesi
  async contactList(userId: number): Promise<CONTACT[]> {
    const httpData: HTTP_REQ = { url: 'contacts', params: { userId } };
    const { success, error, data } = await this.apiService.get(httpData);
    if (success) {
      return data;
    } else {
      this.snackService.snackMessage({
        message:
          error?.message || 'Rehber bilgileri alınırken bir sorun oluştu',
      });
      return [];
    }
  }

  // yeni rehber ekleme
  async addContact(contactData: CONTACT): Promise<CONTACT | null> {
    const httpData: HTTP_REQ = { url: 'contacts', body: contactData };
    const { success, error, data } = await this.apiService.post(httpData);
    if (success) {
      return data;
    } else {
      this.snackService.snackMessage({
        message: error?.message || 'Rehber bilgisi eklenirken bir sorun oluştu',
      });
      return null;
    }
  }

  // rehberi güncelleme
  async updateContact(contactData: CONTACT): Promise<CONTACT | null> {
    const httpData: HTTP_REQ = {
      url: `api/contacts/put/${contactData.id}`,
      body: contactData,
    };
    const { success, error, data } = await this.apiService.put(httpData);
    if (success) {
      return data;
    } else {
      this.snackService.snackMessage({
        message:
          error?.message || 'Rehber bilgisi güncellenirken bir sorun oluştu',
      });
      return null;
    }
  }

  // rehberi silme
  async deleteContact(contactData: CONTACT): Promise<boolean> {
    const httpData: HTTP_REQ = {
      url: `api/contacts/delete/${contactData.id}`,
    };
    const { success, error } = await this.apiService.delete(httpData);
    if (success) {
      return true;
    } else {
      this.snackService.snackMessage({
        message:
          error?.message || 'Rehber bilgisi silinirken bir sorun oluştu',
      });
      return false;
    }
  }
}
