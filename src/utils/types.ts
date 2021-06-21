export type ValType = {
  from: string;
  to: string;
  send: number;
  receive: number;
  recipientEmail: string;
  recipientName: string;
  swiftOrBICcode: string;
  accNumberOrIBAN: string;
  transferFee: number;
  rate: number;
  isEurope: boolean;
};
