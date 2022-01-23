import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api';
import { DeleteModel } from '../core/models/deleteModel';
import { ListResponseModel } from '../core/models/response/listResponseModel';
import { ResponseModel } from '../core/models/response/responseModel';
import { SingleResponseModel } from '../core/models/response/singleResponseModel';
import { ServiceRepository } from '../core/services/service-repository';
import { UrlModel } from '../models/urlModel';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor(private httpClient: HttpClient) {}

  add(addModel: UrlModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(apiUrl + 'urls/add', addModel);
  }

  addWithEntity(addModel: UrlModel): Observable<SingleResponseModel<UrlModel>> {
    return this.httpClient.post<SingleResponseModel<UrlModel>>(
      apiUrl + 'urls/addwithentity',
      addModel
    );
  }

  delete(deleteModel: UrlModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      apiUrl + 'urls/delete',
      deleteModel
    );
  }

  update(updateModel: UrlModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      apiUrl + 'urls/update',
      updateModel
    );
  }

  redirect(urlModel: UrlModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      apiUrl + 'urls/redirect',
      urlModel
    );
  }

  getAll(): Observable<ListResponseModel<UrlModel>> {
    return this.httpClient.get<ListResponseModel<UrlModel>>(
      apiUrl + 'urls/getall'
    );
  }

  getById(id: string): Observable<SingleResponseModel<UrlModel>> {
    return this.httpClient.get<SingleResponseModel<UrlModel>>(
      apiUrl + 'urls/getbyid?id=' + id
    );
  }

  getByKeyword(keyword: string): Observable<SingleResponseModel<UrlModel>> {
    return this.httpClient.get<SingleResponseModel<UrlModel>>(
      apiUrl + 'urls/getbykeyword?keyword=' + keyword
    );
  }

  getByCode(code: string): Observable<SingleResponseModel<UrlModel>> {
    return this.httpClient.get<SingleResponseModel<UrlModel>>(
      apiUrl + 'urls/getbycode?code=' + code
    );
  }
}
