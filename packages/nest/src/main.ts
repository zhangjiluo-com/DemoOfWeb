import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["verbose", "debug", "log", "warn", "error", "fatal"],
  });

  // 配置全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // 配置Swagger文档
  const config = new DocumentBuilder()
    .setTitle("NestJS Authentication API")
    .setDescription("认证模块API文档")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup("docs", app as any, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
