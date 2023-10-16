import { Voucher } from "./Voucher";

export interface Campaign {
    id: string;
    name: string;
    validityStart: Date;
    validityEnd: Date;
    amount: number;
    currency: string;
    prefix: string;
    vouchers: Voucher[];
}