import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3001;

  app.use(helmet());
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT || port);

  console.log(`Application is running on port ${port}`);
}
void bootstrap();
