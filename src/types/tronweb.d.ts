declare module 'tronweb' {
  export interface TronWebOptions {
    fullHost?: string;
    privateKey?: string;
  }

  export default class TronWeb {
    constructor(options?: TronWebOptions);
    address: {
      fromPrivateKey(privateKey: string): string;
    };
    trx: {
      getBalance(address: string): Promise<string>;
      sign(transaction: any): Promise<any>;
      sendRawTransaction(transaction: any): Promise<{ txid: string }>;
    };
    fromSun(sun: string): string;
    toSun(trx: string): string;
    contract(): {
      at(address: string): Promise<any>;
    };
    transactionBuilder: {
      sendTrx(to: string, amount: string, from: string): Promise<any>;
    };
    defaultAddress: {
      hex: string;
    };
  }
}

