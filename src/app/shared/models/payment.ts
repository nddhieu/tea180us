export class Payment{
  paymentDescription: string;
  cardDetail:string;
  cartNetwork:string;
  tokenizationData: {
    token:string,
    type:string
  }
  type:string;
  billingAddress:google.payments.api.Address;

}
