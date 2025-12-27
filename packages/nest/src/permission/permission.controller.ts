import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { Public } from 'src/shared/decorators/public.decorator'
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('权限')
@ApiHeader({ name: 'Authorization' })
@Controller('permissions')
@Public()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: '创建权限' })
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto)
  }

  @ApiOperation({ summary: '查询所有权限' })
  @Get()
  getAll() {
    return this.permissionService.getAll()
  }

  @ApiOperation({ summary: '查询权限详情' })
  @Get(':id')
  get(@Param('id') id: number) {
    return this.permissionService.get(id)
  }

  @ApiOperation({ summary: '更新权限' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePermissionDto) {
    return this.permissionService.update(id, dto)
  }

  @ApiOperation({ summary: '删除权限' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.permissionService.remove(id)
  }

  @ApiOperation({ summary: '【非常危险的】永久删除权限' })
  @Delete(':id/dangerous')
  delete(@Param('id') id: number) {
    return this.permissionService.delete(id)
  }
}
