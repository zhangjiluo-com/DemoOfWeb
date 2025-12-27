import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ description: '名称', example: '张三' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string

  @ApiProperty({ description: '用户名', example: 'zhangsan' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  username: string

  @ApiProperty({ description: '邮箱', example: 'zhangsan@example.com' })
  @IsString()
  @IsEmail()
  @IsOptional()
  @Length(2, 60)
  email: string | null = null

  @ApiProperty({ description: '手机号', example: '13800000000' })
  @IsString()
  @IsPhoneNumber('CN')
  @IsOptional()
  @Length(11, 11)
  phone: string | null = null

  @ApiProperty({ description: '密码', example: 'admin123' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  password: string

  @ApiProperty({ description: '角色', example: [1, 2] })
  @IsArray()
  roleIds: number[]
}
