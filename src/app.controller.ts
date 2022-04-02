import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateBarcodeDTO, UpdateStatesDTO } from "./dto/createBarcodeDTO";
import { BarcodeEntity } from "./entitties/barcode.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('barcode')
  createBarcode(
    @Body(ValidationPipe)
    createBartcodeDTO: CreateBarcodeDTO,
  ): Promise<BarcodeEntity> {
    return this.appService.createBarcode(createBartcodeDTO);
  }

  @Get('barcodes')
  getBarcodes(): Promise<BarcodeEntity[]> {
    return this.appService.getBarcodes();
  }

  @Post('barcodes')
  updateStates(updateStatesDTO: UpdateStatesDTO[]): Promise<BarcodeEntity[]> {
    return this.appService.updateStates(updateStatesDTO);
  }

  @Get('barcodes/reset')
  resetStatuses(): Promise<BarcodeEntity[]> {
    return this.appService.resetStatuses();
  }



}
