import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layouts/main/main-layout.component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'pacientes',
        loadChildren: () =>
          import('./pages/pacientes/pacientes.routes').then(m => m.PACIENTES_ROUTES)
      },
      {
        path: 'convenios',
        loadComponent: () =>
          import('./pages/convenios/convenios.component').then(m => m.ConveniosComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];