
export interface Users{
    id:number;
    username:string;
    rut:string;
    email:string;
    password:string;
    carrera:string;
    isactive:boolean;
}
export interface User{
    username:string;
    rut:string;
    email:string;
    password:string;
    carrera:string;
    isactive:boolean;
}

export interface Clase{
    imagen:string;
    nombre:string;
    descripcion:string;
    profesor:string;
}

export interface Asignatura{
    rut:string;
    nombre:string;
    fecha:string;
    profesor:string;
}

export interface Justificativo{
    id:number;
    rut:string;
    nombre:string;
    comentario:string;
    fecha:string;
    profesor:string;
}