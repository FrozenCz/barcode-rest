import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLocationDTO {
  @IsString()
  @MinLength(5)
  name: string;
}

export class SaveNfcDTO {
  @IsString()
  nfcId: string;
}

export class SaveChangesDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssetChangeDTO)
  assets: AssetChangeDTO[];
}

export class AssetChangeDTO {
  @IsNumber()
  id: number;

  @IsBoolean()
  found: boolean;

  @IsString()
  @IsOptional()
  locationConfirmedUuid: string;
}
