import { Basket } from "src/app/Basket";
import { Product } from "src/app/modals/product.model";


export class Item {
    constructor() { }
    id?: number;
    quantity?: number;
    product?: Product;
    basket?: Basket;
}