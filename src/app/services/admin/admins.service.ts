import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  private apiUrl = 'http://localhost:3000/admins';

  constructor( private http: HttpClient) { }

  getAdmins() {
    return this.http.get(this.apiUrl);
  }

  addAdmin(admin: any) {
    return this.http.post(this.apiUrl, admin);
  }

  updateAdmin(id: string, admin: any) {
    return this.http.put(`${this.apiUrl}/${id}`, admin);
  }

  deleteAdmin(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
