export interface CONTACT {
  id?: number;
  userId: number;
  fullName: string;
  phoneNumber: string;
  photoUrl: string;
  address: CONTACT_ADDRESS[];
}
export interface CONTACT_ADDRESS {
  title: string;
  value: string;
}
