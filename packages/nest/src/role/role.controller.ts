import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/shared/decorators/public.decorator'

@Public()
@ApiTags('角色')
@ApiHeader({ name: 'Authorization' })
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '创建角色' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  @ApiOperation({ summary: '查询所有角色' })
  @Get()
  getAll() {
    return this.roleService.getAll()
  }

  @ApiOperation({ summary: '查询角色详情' })
  @Get(':id')
  get(@Param('id') id: number) {
    return this.roleService.get(id)
  }

  @ApiOperation({ summary: '更新角色' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto)
  }

  @ApiOperation({ summary: '删除角色' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id)
  }

  @ApiOperation({ summary: '【非常危险的】永久删除角色' })
  @Delete(':id/dangerous')
  delete(@Param('id') id: number) {
    return this.roleService.delete(id)
  }
}
