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

export class SetLocationDTO {

  locationUuid: string | null;
}
