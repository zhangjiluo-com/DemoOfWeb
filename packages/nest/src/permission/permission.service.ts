import { Injectable } from '@nestjs/common'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from './entities/permission.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = this.permissionRepository.create({
      name: createPermissionDto.name,
      note: createPermissionDto.note,
      code: createPermissionDto.code,
    })

    await this.permissionRepository.save(permission)

    return permission.id
  }

  getAll() {
    return this.permissionRepository.find({
      select: {
        id: true,
        name: true,
        note: true,
        code: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  get(id: number) {
    return this.permissionRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        note: true,
        code: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    await this.permissionRepository.update(id, {
      name: updatePermissionDto.name,
      note: updatePermissionDto.note,
      code: updatePermissionDto.code,
      // status: updatePermissionDto.status,
    })
    return id
  }

  async remove(id: number) {
    await this.permissionRepository.softDelete(id)
    return id
  }

  async delete(id: number) {
    await this.permissionRepository.delete(id)
    return id
  }
}
