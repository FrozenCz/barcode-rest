import { BaseEntity } from 'typeorm';
export declare class BarcodeEntity extends BaseEntity {
    id: number;
    name: string;
    found: boolean;
}
