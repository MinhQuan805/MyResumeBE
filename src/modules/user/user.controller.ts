import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../schemas/user.schema';
import { UserService } from './user.service';
import { prefixAdmin, prefixApi } from '../../config/system';
import { Public } from '../decorator/customize';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
@Controller(prefixApi + '/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async index(@Query('keyword') keyword: string,
              @Query('status') status: string,
              @Query('page') page: number, 
              @Query('sortKey') sortKey: string, 
              @Query('sortValue') sortValue: string) {
      return this.userService.index(keyword, status, page, sortKey, sortValue);
  }

  @Public()
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto, 
             ): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch('/edit/:id')
  async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<{ success: boolean, message: string }> {
    return this.userService.update(id, updateUserDto);
  }

  @Get('/detail/:id')
  async detail(@Param('id') id: string): Promise<User> {
    return this.userService.detail(id);
  }


  @Delete('/delete')
  async delete() : Promise<{ success: boolean, message: string }> {
    return this.userService.delete();
  }


  @Public()
  @Post('/register')
  async register(@Body() registerUserDto: CreateAuthDto) {
    return this.userService.handleRegister(registerUserDto);
  }
}