
export interface Users{
    id:number;
    username:string;
    rut:string;
    email:string;
    password:string;
    isactive:boolean;
}
export interface User{
    username:string;
    rut:string;
    email:string;
    password:string;
    isactive:boolean;
}

export interface Profesor{
    id:number;
    username:string;
    rut:string;
    email:string;
    password:string;
    isactive:boolean;
    direccion:string;
}