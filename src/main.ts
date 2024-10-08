import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.RUN_PORT;
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(corsOptions);

  // Soket Adapter로 연결
  app.useWebSocketAdapter(new IoAdapter(app));
  // 서버 포트 세팅
  await app.listen(port, () => {
    Logger.log(`Server Started at ${port}port`)
  });
}
bootstrap();
