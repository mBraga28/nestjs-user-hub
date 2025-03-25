import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import CreateUserPayload from '../interfaces/create-user-payload.interface';
import { RoleIdMapping } from 'src/auth/enums/roles.enum';

@Injectable()
export class UserService  {

    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOne(id: string) {
        return await this.prisma.user.findUnique({ 
          where: { id },
          include: { role: { select: { name: true }} } 
        });
    }

    async findUserByEmail(email: string ) {
      return await this.prisma.user.findUnique({ 
          where:  { email },
          include: { role: { select: { name: true } } }
      });
    }

    async create(createUserPayload: CreateUserPayload){
      const roleKey = createUserPayload.accountType.toLowerCase();
      const roleId = RoleIdMapping[roleKey as keyof typeof RoleIdMapping];
      if (!roleId) {
        throw new Error('Invalid account type');
      }

      const { accountType, ...data } = createUserPayload;
      return await this.prisma.user.create({
        data: { 
          ...data, 
          password: bcrypt.hashSync(createUserPayload.password, Number(process.env.SALT)),
          roleId
        }
      });      
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
      const { roleId, ...dataToUpdate } = updateUserDto;
      if (dataToUpdate.password) {
        dataToUpdate.password = bcrypt.hashSync(dataToUpdate.password, Number(process.env.SALT));
      }
      return await this.prisma.user.update({
        where: { id },
        data: dataToUpdate,
      });
    }

    async remove(id: string) {
        return await this.prisma.user.delete({ where: { id } });
    }
}
