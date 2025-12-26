import {
  Body,
  Controller,
  Post,
  Headers,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("用户模块")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "登录" })
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Post("logout")
  async logout(@Headers("authorization") token: string) {
    try {
      if (!token) {
        throw new Error("缺少认证令牌");
      }
      // 移除 Bearer 前缀
      const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;
      return await this.authService.logout(actualToken);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post("validate")
  async validateToken(@Headers("authorization") token: string) {
    try {
      if (!token) {
        throw new Error("缺少认证令牌");
      }
      // 移除 Bearer 前缀
      const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;
      return await this.authService.validateToken(actualToken);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
