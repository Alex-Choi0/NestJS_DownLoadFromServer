import { PartialType } from '@nestjs/mapped-types';
import { CreateDownloadFileDto } from './create-download-file.dto';

export class UpdateDownloadFileDto extends PartialType(CreateDownloadFileDto) {}
