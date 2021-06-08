// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';



export class Product {




id? : number;
name?:string;
categoryname?:string;
promotion?: number;
code?:string;
initial_price?:number;
price?:number;
quantity?:number;
image?:string;
expdate?:Date;
generalrate?:number;
nature?:string;
matiere?:number;
energie?:number;
matiere_grasse?:number;
description?:string;


  constructor(
    id?: number, 
    name?: string, 
    categoryname?: string, 
    promotion?: number, 
    code?: string, 
    initial_price?: number, 
    price?: number, 
    quantity?: number, 
    image?: string, 
    expdate?: Date, 
    generalrate?: number, 
    nature?: string, 
    matiere?: number, 
    energie?: number, 
    matiere_grasse?: number, 
    acide_gras_sature?: number, 
    sucres?: number, 
    fibles?: number, 
    proteines?: number, 
    sel?: number, 
    fruits?: number,
    description?:string
) {
    this.id = id
    this.name = name
    this.categoryname = categoryname
    this.promotion = promotion
    this.code = code
    this.initial_price = initial_price
    this.price = price
    this.quantity = quantity
    this.image = image
    this.expdate = expdate
    this.generalrate = generalrate
    this.nature = nature
    this.matiere = matiere
    this.energie = energie
    this.matiere_grasse = matiere_grasse
    this.acide_gras_sature = acide_gras_sature
    this.sucres = sucres
    this.fibles = fibles
    this.proteines = proteines
    this.sel = sel
    this.fruits = fruits
    this.description=description
  }
acide_gras_sature?:number;
sucres?:number;
fibles?:number;
proteines?:number;
sel?:number;
fruits?:number; 






 }
  // Color Filter
  export interface ColorFilter {
    color?: ProductColor;
  }
