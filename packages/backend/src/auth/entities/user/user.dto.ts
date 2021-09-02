import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  role: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class UserListDto {
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

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
