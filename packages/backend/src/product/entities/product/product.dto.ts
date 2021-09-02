import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductListDto {
  @ApiProperty({
    description: `number of records by which db should start fetching data`,
    required: false,
    example: '0',
  })
  @IsOptional()
  offset: number;

  @ApiProperty({
    description: `number of records to be fetched`,
    required: false,
    example: '10',
  })
  @IsOptional()
  limit: number;

  @ApiProperty({
    description:
      'Pass stringified object in key value pair. Eg: sort:{"name":"DESC"} ',
    required: false,
    example: '{"name":"DESC"}',
  })
  @IsOptional()
  sort: string;

  @ApiProperty({
    description: `Pass the user input as stringified object in key value pair. 
    Eg: for user input of 'ha' add the following in http request filters:{"name":"ha"} `,
    required: false,
    example: '{"name":"ha"}',
  })
  @IsOptional()
  filters: string;
}

export class AddNewProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isVisible: boolean;
}
export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isVisible: boolean;
}
