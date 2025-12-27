import { ApiProperty } from '@nestjs/swagger'

import { IS_ENUM, IsIn, IsInt, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator'

import { IsNotEmpty } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({ description: '名称' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string

  @ApiProperty({ description: '备注' })
  @IsString()
  @IsOptional()
  @Length(2, 40)
  note: string = ''

  @ApiProperty({ description: '状态' })
  @IsInt()
  @Min(0)
  @IsIn([0, 1])
  @IsNotEmpty()
  status: number
}
