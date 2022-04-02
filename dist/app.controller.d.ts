import { AppService } from './app.service';
import { CreateBarcodeDTO, UpdateStatesDTO } from "./dto/createBarcodeDTO";
import { BarcodeEntity } from "./entitties/barcode.entity";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    createBarcode(createBartcodeDTO: CreateBarcodeDTO): Promise<BarcodeEntity>;
    getBarcodes(): Promise<BarcodeEntity[]>;
    updateStates(updateStatesDTO: UpdateStatesDTO[]): Promise<BarcodeEntity[]>;
    resetStatuses(): Promise<BarcodeEntity[]>;
}
