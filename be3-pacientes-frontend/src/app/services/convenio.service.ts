import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { API_ROUTES } from "../consts/api-routes";
import { Observable } from "rxjs";
import { Convenio } from "../interfaces/convenio.interface";

const  PACIENTES  = API_ROUTES.CONVENIOS;
@Injectable({
    providedIn: 'root'
})
export class ConvenioService {
    private http = inject(HttpClient);
    private baseURL = environment.apiURL + PACIENTES.BASE;

findAll(): Observable<Convenio[]> {
    return this.http.get<Convenio[]>(`${this.baseURL}/${PACIENTES.GET.ALL}`, {
      withCredentials: true,
    });
  }


}