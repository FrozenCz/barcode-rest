import { Injectable } from '@nestjs/common';
import { CreateBarcodeDTO, UpdateStatesDTO } from './dto/createBarcodeDTO';
import { BarcodeEntity } from './entitties/barcode.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createBarcode(createBartcodeDTO: CreateBarcodeDTO): Promise<BarcodeEntity> {
    const barcode = new BarcodeEntity();
    barcode.name = createBartcodeDTO.name;
    return barcode.save();
  }

  getBarcodes(): Promise<BarcodeEntity[]> {
    return BarcodeEntity.find();
  }

  async resetStatuses(): Promise<BarcodeEntity[]> {
    const allBarcodes = await BarcodeEntity.find();
    return Promise.all(
      allBarcodes.map(async (u) => {
        u.found = false;
        return await u.save();
      }),
    ).then(() => {
      return BarcodeEntity.find();
    });
  }

  updateStates(updateStatesDTO: UpdateStatesDTO[]): Promise<BarcodeEntity[]> {
    return Promise.all(
      updateStatesDTO.map(async (u) => {
        const bar = await BarcodeEntity.findOne({ id: u.barcodeId });
        bar.found = u.found;
        return await bar.save();
      }),
    ).then(() => {
      return BarcodeEntity.find();
    });
  }
}
