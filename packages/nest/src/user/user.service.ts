import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Like, Repository } from 'typeorm'
import { Role } from 'src/role/entities/role.entity'
import { GetUserPageDto } from './dto/get-user-page.dto'
import { getQueryOrder } from 'src/shared/utils/getQueryOrder'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateUserDto) {
    const roleIds = dto.roleIds

    const roles = await this.roleRepository.findBy({
      id: In(roleIds),
    })

    if (roles.length !== roleIds.length) {
      console.warn('有角色不存在', roleIds)
    }

    const user = this.userRepository.create({
      name: dto.name,
      username: dto.username,
      email: dto.email,
      password: dto.password,
      roles: roles,
    })

    await this.userRepository.save(user)

    return user.id
  }

  getAll() {
    return this.userRepository.find({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        status: true,
      },
    })
  }

  async getPage(dto: GetUserPageDto) {
    const [list, total] = await this.userRepository.findAndCount({
      where: {
        name: Like(`%${dto.keyword}%`),
        username: Like(`%${dto.keyword}%`),
        email: Like(`%${dto.keyword}%`),
        phone: Like(`%${dto.keyword}%`),
      },
      order: getQueryOrder(
        ['id', 'name', 'username', 'email', 'phone', 'status', 'createdAt', 'updatedAt', 'removedAt'],
        dto.asc,
        dto.desc,
      ),
      skip: (dto.current - 1) * dto.size,
      take: dto.size,
    })

    return {
      list,
      total,
      current: dto.current,
      size: dto.size,
    }
  }

  async get(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        status: true,
        roles: {
          id: true,
          name: true,
          note: true,
          status: true,
        },
      },
      relations: {
        roles: true,
      },
    })

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND)
    }

    return user
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.get(id)

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND)
    }

    await this.userRepository.update(id, {
      name: dto.name,
      username: dto.username,
      email: dto.email,
      phone: dto.phone,
    })

    return id
  }

  async remove(id: number) {
    await this.userRepository.softDelete(id)
    return id
  }

  async delete(id: number) {
    await this.userRepository.delete(id)
    return id
  }
}
