import { Injectable, Logger } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";

// 模拟用户数据
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    nickname: "管理员",
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    nickname: "普通用户",
  },
];

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async login(loginDto: LoginDto) {
    this.logger.log(`用户登录请求: ${JSON.stringify(loginDto)}`);

    try {
      // 查找用户
      const user = users.find((u) => u.username === loginDto.username);

      if (!user) {
        this.logger.warn(`用户不存在: ${loginDto.username}`);
        throw new Error("用户名或密码错误");
      }

      // 验证密码
      if (user.password !== loginDto.password) {
        this.logger.warn(`密码错误: ${loginDto.username}`);
        throw new Error("用户名或密码错误");
      }

      // 生成模拟token
      const token = `mock_token_${Date.now()}_${user.id}`;

      this.logger.log(`用户登录成功: ${loginDto.username}`);

      return {
        code: 200,
        message: "登录成功",
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
          },
        },
      };
    } catch (error) {
      this.logger.error(`登录失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async logout(token: string) {
    this.logger.log(`用户退出登录: ${token}`);

    try {
      // 模拟退出登录逻辑
      // 在实际应用中，这里可能需要将token加入黑名单
      this.logger.log(`用户退出登录成功: ${token}`);

      return {
        code: 200,
        message: "退出登录成功",
      };
    } catch (error) {
      this.logger.error(`退出登录失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  async validateToken(token: string) {
    this.logger.log(`校验登录凭证: ${token}`);

    try {
      // 模拟token验证逻辑
      // 在实际应用中，这里可能需要解析和验证JWT token
      const isValid = token.startsWith("mock_token_");

      if (!isValid) {
        this.logger.warn(`无效的token: ${token}`);
        throw new Error("无效的登录凭证");
      }

      this.logger.log(`登录凭证有效: ${token}`);

      return {
        code: 200,
        message: "登录凭证有效",
        data: {
          isValid: true,
        },
      };
    } catch (error) {
      this.logger.error(`校验登录凭证失败: ${error.message}`, error.stack);
      throw error;
    }
  }
}
