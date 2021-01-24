export class Order{
    constructor(
    public orderId: Number,
    public personId: Number,
    public bookIds: String,
    public totalItems:Number,
    public totalMoney:Number,
    public status:String){

    }
}