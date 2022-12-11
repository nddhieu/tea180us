export class AddOnItem{
  name !:String;
  isAdd:boolean;
  price:number;
  constructor(name, isAdd , price) {
    this.name = name;
    this.isAdd = isAdd;
    this.price = price;
  }
}
