export class Card {
  constructor(
    public id : number,
    public userid : number,
    public photo: string,
    public brand: string,
    public price: number,
    public OnSale: number,
    public text ?: string,
  ) {
    this.photo = photo;
    this.brand = brand;
    this.price = price;
    this.text = text;
    this.OnSale = OnSale;
    this.id = id;
    this.userid = userid;

  }
}
