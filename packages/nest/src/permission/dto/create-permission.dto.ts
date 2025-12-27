import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Length, Matches, IsOptional, IsIn, IsInt, Min } from 'class-validator'

export class CreatePermissionDto {
  @ApiProperty({ description: '名称', example: '系统关联' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string

  @ApiProperty({ description: '备注', example: '系统关联权限' })
  @IsString()
  @IsOptional()
  @Length(2, 200)
  note: string = ''

  @ApiProperty({
    description: '代码: 模块.子模块:操作',
    example: 'sys.ass:all',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  @Matches(/^[a-z0-9]+(\.[a-z0-9]+)*:[a-z0-9]+$/)
  code: string

  @ApiProperty({ description: '状态' })
  @IsInt()
  @Min(0)
  @IsIn([0, 1])
  @IsNotEmpty()
  status: number
}
