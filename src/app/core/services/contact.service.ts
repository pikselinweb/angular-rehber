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
}
