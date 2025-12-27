import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'
import { Transform } from 'class-transformer'

export class PageQueryBaseDto {
  @ApiProperty({ description: '页码', default: 1 })
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  @Transform(({ value }) => parseInt(value || '1'))
  current: number = 1

  @ApiProperty({ description: '步长', default: 10 })
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  @Transform(({ value }) => parseInt(value || '10'))
  size: number = 10

  @ApiProperty({ description: '搜索关键词' })
  @IsString()
  @IsOptional()
  keyword: string = ''

  @ApiProperty({ description: '升序排序字段' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : typeof value === 'string' ? value.split(',').filter(Boolean) : [],
  )
  asc: string[] = []

  @ApiProperty({ description: '降序排序字段' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : typeof value === 'string' ? value.split(',').filter(Boolean) : [],
  )
  desc: string[] = []
}
