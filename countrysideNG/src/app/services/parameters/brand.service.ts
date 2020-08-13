import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from '../security.service';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-config';
import { BrandModel} from '../../models/parameters/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  entity = 'brand';
  token: String = '';


  constructor(private http: HttpClient, private securityService: SecurityService) { 
    this.token = this.securityService.getToken();
  }

/**
 * Get al record of a collection
 */

  getAllRecords(): Observable<BrandModel[]>{
    return this.http.get<BrandModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`);
  }

  /**
   * get record by id
   * @param id id to search
   */
  getRecordById(id: String): Observable<BrandModel>{
    return this.http.get<BrandModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}`);
  }


  /**
   * Add new record to brand
   * @param record record data
   */
  saveNewRecord(record: BrandModel): Observable<BrandModel>{
    return this.http.post<BrandModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
  EditRecord(record: BrandModel):Observable<BrandModel>{
    return this.http.put<BrandModel>(`${ServiceConfig.BASE_URL}${this.entity}/${record.id}`, record, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
  DeleteRecord(recordId: String):Observable<any>{
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

}

