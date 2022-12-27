import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateBarcodeDTO,
  SetLocationDTO,
  UpdateStatesDTO,
} from './dto/createBarcodeDTO';
import { BarcodeEntity } from './entitties/barcode.entity';
import { CreateLocationDTO, SaveNfcDTO } from "./dto/locations.dto";
import { LocationEntity } from './entitties/location.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('barcodes')
  createBarcode(
    @Body(ValidationPipe)
    createBartcodeDTO: CreateBarcodeDTO,
  ): Promise<BarcodeEntity> {
    return this.appService.createBarcode(createBartcodeDTO);
  }

  @Patch('barcodes/:id')
  setLocation(
    @Body(ValidationPipe)
    setLocationDto: SetLocationDTO,
    @Param('id', ParseIntPipe) barcodeId: number,
  ): Promise<BarcodeEntity> {
    return this.appService.setLocation(barcodeId, setLocationDto.locationUuid);
  }

  @Delete('barcodes/:id')
  async deleteBarcode(
    @Param('id', ParseIntPipe) barcodeId: number,
  ): Promise<BarcodeEntity> {
    const barcode = await BarcodeEntity.findOneOrFail(barcodeId);
    return barcode.remove();
  }

  @Get('barcodes')
  getBarcodes(): Promise<BarcodeEntity[]> {
    return this.appService.getBarcodes();
  }

  @Post('barcodes')
  updateStates(
    @Body(ValidationPipe) updateStatesDTO: UpdateStatesDTO[],
  ): Promise<BarcodeEntity[]> {
    return this.appService.updateStates(updateStatesDTO);
  }

  @Get('barcodes/reset')
  resetStatuses(): Promise<BarcodeEntity[]> {
    return this.appService.resetStatuses();
  }

  @Get('locations')
  getLocations(): Promise<LocationEntity[]> {
    return this.appService.getLocations();
  }

  @Post('locations')
  createLocation(
    @Body(ValidationPipe) createLocationDTO: CreateLocationDTO,
  ): Promise<LocationEntity> {
    return this.appService.createLocation(createLocationDTO);
  }

  @Patch('locations/:uuid')
  saveNfcId(
    @Body(ValidationPipe) saveNfcId: SaveNfcDTO,
    @Param('uuid') locationUuid: string,
  ): Promise<LocationEntity> {
    return this.appService.saveNfcId(locationUuid, saveNfcId);
  }
}
