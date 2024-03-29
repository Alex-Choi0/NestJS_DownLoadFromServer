import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadFileModule } from './download-file/download-file.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [ConfigModule.forRoot(), DownloadFileModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
