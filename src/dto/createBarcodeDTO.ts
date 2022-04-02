import { IsString, MinLength } from 'class-validator';

export class CreateBarcodeDTO {
  @IsString()
  @MinLength(3)
  name: string;
}

export class UpdateStatesDTO {
  barcodeId: number;
  found: boolean;
}
