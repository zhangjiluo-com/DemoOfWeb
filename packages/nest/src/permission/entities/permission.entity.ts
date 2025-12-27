import { Role } from 'src/role/entities/role.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm'

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255, unique: true })
  name: string

  @Column('varchar', { length: 255 })
  note: string

  @Column('varchar', { length: 255, unique: true })
  code: string

  @Column('int', { default: 0 })
  status: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  removedAt: Date

  @ManyToMany(() => Role, role => role.permissions, { onDelete: 'CASCADE' })
  roles: Role[]
}
