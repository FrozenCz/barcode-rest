import { Injectable } from '@nestjs/common';
import { CreateBarcodeDTO, UpdateStatesDTO } from './dto/createBarcodeDTO';
import { BarcodeEntity } from './entitties/barcode.entity';
import { LocationEntity } from './entitties/location.entity';
import { CreateLocationDTO, SaveNfcDTO } from './dto/locations.dto';

@Injectable()
export class AppService {
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

  createLocation(
    createLocationDTO: CreateLocationDTO,
  ): Promise<LocationEntity> {
    const location = new LocationEntity();
    location.name = createLocationDTO.name;
    return location.save();
  }

  getLocations() {
    return LocationEntity.find();
  }

  async setLocation(barcodeId: number, locationUuid: string | null) {
    const barcode = await BarcodeEntity.findOneOrFail(barcodeId);
    if (locationUuid) {
      const location = await LocationEntity.findOneOrFail(locationUuid);
      barcode.Location = location;
    } else {
      barcode.Location = null;
    }
    return await barcode.save();
  }

  async saveNfcId(
    locationUuid: string,
    saveNfcId: SaveNfcDTO,
  ): Promise<LocationEntity> {
    const location = await LocationEntity.findOneOrFail(locationUuid);
    location.nfcId = saveNfcId.nfcId;
    return await location.save();
  }
}
