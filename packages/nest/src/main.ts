import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PORT } from "./config/constants";
import { TransformResponseInterceptor } from "./shared/interceptors/transform-response.interceptor";
import { HttpExceptionFilter } from "./shared/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["verbose", "debug", "log", "warn", "error", "fatal"],
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  // 设置全局路由前缀
  app.setGlobalPrefix("api");

  // 配置全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // 配置全局CORS
  app.enableCors();

  // 配置全局响应拦截器
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  // 配置Swagger文档
  const config = new DocumentBuilder()
    .setTitle("NestJS API文档")
    .setDescription("API文档")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup("docs/swagger", app as any, document, {
    jsonDocumentUrl: "docs/swagger/json",
  });

  await app.listen(PORT);
}
bootstrap();
