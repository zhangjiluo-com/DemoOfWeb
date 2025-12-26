import {
  Body,
  Controller,
  Post,
  Headers,
  HttpException,
  HttpStatus,
  Request,
  Get,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { Public } from "src/shared/decorators/public.decorator";

@ApiTags("用户")
@ApiHeader({ name: "Authorization" })
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: "登录",
    description: "支持手机号、邮箱、用户名密码登录",
  })
  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @ApiOperation({ summary: "检查登录状态" })
  @Get("check")
  async check(@Request() req) {
    return {
      isValid: !!req.user,
    };
  }
}
