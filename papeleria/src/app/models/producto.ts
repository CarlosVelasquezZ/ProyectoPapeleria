export class Producto{
    constructor(
        public _id:string,
        public nombre:string,
        public stock:string,
        public precio:string,
        public categoria:string,
        public subcategoria:string,
        public proveedor:string,
        public imagen:string,
    ){}
}