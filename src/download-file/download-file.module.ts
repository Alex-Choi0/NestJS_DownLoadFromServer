import { Module } from '@nestjs/common';
import { DownloadFileController } from './download-file.controller';

@Module({
  controllers: [DownloadFileController],
})
export class DownloadFileModule {}
