import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Repository } from 'typeorm'
import { Role } from './entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async create(dto: CreateRoleDto) {
    const role = this.roleRepository.create({
      name: dto.name,
      note: dto.note,
      status: dto.status,
    })

    await this.roleRepository.save(role)

    return role.id
  }

  async getAll() {
    return await this.roleRepository.find({
      select: {
        id: true,
        name: true,
        note: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async get(id: number) {
    return await this.roleRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        note: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        permissions: {
          id: true,
          name: true,
          note: true,
        },
      },
      relations: {
        permissions: true,
      },
    })
  }

  async update(id: number, dto: UpdateRoleDto) {
    await this.roleRepository.update(id, {
      name: dto.name,
      note: dto.note,
      status: dto.status,
    })
    return id
  }

  async remove(id: number) {
    await this.roleRepository.softDelete(id)
    return id
  }

  async delete(id: number) {
    await this.roleRepository.delete(id)
    return id
  }
}
