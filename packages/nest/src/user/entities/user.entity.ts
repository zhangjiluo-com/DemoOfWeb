import { Role } from 'src/role/entities/role.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255, unique: true })
  name: string

  @Column('varchar', { length: 255, unique: true })
  username: string

  @Column('varchar', { length: 255, unique: true, nullable: true })
  email: string | null = null

  @Column('varchar', { length: 11, unique: true, nullable: true })
  phone: string | null = null

  @Column('varchar', { length: 255 })
  password: string

  @Column('int', { default: 0 })
  status: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  removedAt: Date

  @ManyToMany(() => Role, role => role.users, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'userRoles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[]
}
