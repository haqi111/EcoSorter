import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, Req } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,) {}
      
      @Public()
      @Post('/create-users/')
        async createUser(
          @Body() createUsersDto: CreateUserDto,
          @Res() res: Response,
        ): Promise<Response> {
          try {
            const createdUser = await this.usersService.createUser(createUsersDto);
            return res.status(HttpStatus.CREATED).json({
              status_code: HttpStatus.CREATED,
              message: 'User Created Successfully',
              data: createdUser
            });
          } catch (error) {
            if (error.message.includes('duplicate key value')) {
              return res.status(HttpStatus.CONFLICT).json({
                message: 'User already exists',
              });
            }
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              message: 'Server Error, cannot create user',
            });
          }
        }
    
      @Get('/lists-users')
        async getAllUsers(@Res() res: Response): Promise<Response> {
          try {
            const users = await this.usersService.getAllUsers();
            return res.status(HttpStatus.OK).json({
              status_code: HttpStatus.OK,
              message: 'Successfully',
              data: users
            });
          } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              message: 'Server Error, cannot get data',
            });
          }
        }
        
      @Get('/detail-users/:id')
        async getUserById(
          @Param('id') id: string,
          @Res() res: Response,
          @Req() req: Request
        ): Promise<Response> {
          try {
            const user = await this.usersService.getUserById(id);
            if (!user) {
              return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server Error, cannot get data',
              });
            }
            return res.status(HttpStatus.OK).json({
              status_code: HttpStatus.OK,
              message: 'Successfully',
              data: user
            });
          } catch (error) {
            console.error(error);
            return res.status(HttpStatus.NOT_FOUND).json({
              status_code: HttpStatus.NOT_FOUND,
              message: 'User not found',
            });
          }
        }

      @Put('/update-user/:id')
        async updateUser(
          @Param('id') id: string,
          @Body() updateUserDto: UpdateUserDto,
          @Res() res: Response
        ): Promise<Response> {
          try {
            const updatedUser = await this.usersService.updateUser(id, updateUserDto);
            return res.status(HttpStatus.OK).json({
              status_code: HttpStatus.OK,
              message: 'User updated successfully',
              data: updatedUser
            });
          } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              message: 'Server Error, cannot update data',
            });
          }
        }

      @Delete('/delete-users/:id')
        async deleteUser(
          @Param('id') id: string,
          @Res() res: Response
        ): Promise<Response> {
          try {
            const deleted = await this.usersService.deleteUser(id);
            if (deleted) {
              return res.status(HttpStatus.OK).json({
                status_code: HttpStatus.OK,
                message: 'User deleted successfully'
              });
            } else {
              return res.status(HttpStatus.NOT_FOUND).json({
                status_code: HttpStatus.NOT_FOUND,
                message: 'User not found'
              });
            }
          } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              message: 'Server Error, cannot delete data',
            });
          }
        } 
}
