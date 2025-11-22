import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { env } from "process";
import { environment } from "../../environments/environment";
import { API_ROUTES } from "../consts/api-routes";
import { Observable } from "rxjs";
import { Paciente, PacienteDetalhado } from "../interfaces/paciente.interface";

const  PACIENTES  = API_ROUTES.PACIENTES;
@Injectable({
    providedIn: 'root'
})
export class PacienteService {
    private http = inject(HttpClient);
    private baseURL = environment.apiURL + PACIENTES.BASE;

findAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.baseURL}/${PACIENTES.GET.ALL}`, {
      withCredentials: true,
    });
  }

  findAllInativos(incluirInativos: boolean): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.baseURL}/${PACIENTES.GET.ALL_INATIVOS(incluirInativos)}`, {
      withCredentials: true,
    });
  }
  findById(id: string): Observable<PacienteDetalhado> {
    return this.http.get<PacienteDetalhado>(`${this.baseURL}/${PACIENTES.GET.DETAIL(id)}`, {
      withCredentials: true,
    });
  }

  create(body: PacienteDetalhado): Observable<PacienteDetalhado> {
    return this.http.post<PacienteDetalhado>(`${this.baseURL}/${PACIENTES.POST.CREATE}`, body, {
      withCredentials: true,
    });
  }

  update(id: string, body: PacienteDetalhado): Observable<PacienteDetalhado> {
    return this.http.put<PacienteDetalhado>(`${this.baseURL}/${PACIENTES.PUT.UPDATE(id)}`, body, {
      withCredentials: true,
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${PACIENTES.DELETE.DELETE(id)}`, {
      withCredentials: true,
    });
  }

}