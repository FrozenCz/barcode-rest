import { IsString, MinLength } from 'class-validator';

export class CreateLocationDTO {
  @IsString()
  @MinLength(5)
  name: string;
}

export class SaveNfcDTO {
  @IsString()
  nfcId: string;
}
