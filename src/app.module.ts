import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadFileModule } from './download-file/download-file.module';

@Module({
  imports: [ConfigModule.forRoot(), DownloadFileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
