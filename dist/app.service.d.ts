import { CreateBarcodeDTO, UpdateStatesDTO } from './dto/createBarcodeDTO';
import { BarcodeEntity } from './entitties/barcode.entity';
export declare class AppService {
    getHello(): string;
    createBarcode(createBartcodeDTO: CreateBarcodeDTO): Promise<BarcodeEntity>;
    getBarcodes(): Promise<BarcodeEntity[]>;
    resetStatuses(): Promise<BarcodeEntity[]>;
    updateStates(updateStatesDTO: UpdateStatesDTO[]): Promise<BarcodeEntity[]>;
}
