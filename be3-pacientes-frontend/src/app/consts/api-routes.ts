import { ALL } from "dns";

export const API_ROUTES = {
    CONVENIOS:{
        BASE: '/convenios',
        GET:{
            ALL: '',
            DETAIL: (id: string) => `/convenios/${id}`,
        },
        POST: {
            CREATE: '',
        },
        PUT: {
            UPDATE: (id: string) => `/convenios/${id}`,
        },
        DELETE: {
            DELETE: (id: string) => `/convenios/${id}`,
        }
    },
    PACIENTES:{
        BASE: '/pacientes',
        GET:{
            ALL: '',
            DETAIL: (id: string) => `/pacientes/${id}`,
            ALL_INATIVOS:(incluirInativos: boolean) => `/pacientes?incluirInativos=${incluirInativos??false}`,
        },
        POST: {
            CREATE: '',
        },
        PUT: {
            UPDATE: (id: string) => `/pacientes/${id}`,
        },
        DELETE: {
            DELETE: (id: string) => `/pacientes/${id}`,
        }
    }

};



