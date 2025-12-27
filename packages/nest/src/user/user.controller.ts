import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Optional } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Public } from 'src/shared/decorators/public.decorator'
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PageQueryBaseDto } from 'src/shared/dto/page-query.dto'
import { StringArrayQuery } from 'src/shared/decorators/string-array-query.decorator'
import { GetUserPageDto } from './dto/get-user-page.dto'

@ApiTags('用户')
@ApiHeader({ name: 'Authorization' })
@Controller('users')
@Public()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: '查询所有用户' })
  @Get()
  getAll() {
    return this.userService.getAll()
  }

  @ApiOperation({ summary: '查询用户分页' })
  @Get('page')
  getPage(@Query() dto: GetUserPageDto) {
    return this.userService.getPage(dto)
  }

  @ApiOperation({ summary: '查询用户详情' })
  @Get(':id')
  get(@Param('id') id: number) {
    return this.userService.get(id)
  }

  @ApiOperation({ summary: '更新用户' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id)
  }

  @ApiOperation({ summary: '【非常危险的】永久删除用户' })
  @Delete(':id/dangerous')
  delete(@Param('id') id: number) {
    return this.userService.delete(id)
  }
}
