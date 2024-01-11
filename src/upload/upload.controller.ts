import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as crypto from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';

@ApiTags('서버에 파일(이미지 포함) 올리기')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('sendToServer')
  @ApiOperation({
    summary: '파일을 서버쪽으로 upload',
    description: '파일을 서버에 올린다. 해당 파일 이름은 한번만 응답된다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          // 사용자가 업로드한 파일의 원래 이름을 사용하여 저장
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalName = file.originalname.replace(/\s/g, ''); // 공백 제거
          const extension = extname(originalName);
          const fileNameWithoutExtension = sanitizeFilename(
            originalName.split('.')[0],
          );
          const fileName = `${fileNameWithoutExtension}-${uniqueSuffix}${extension}`;
          const decodedFileName = decodeURIComponent(fileName);
          // const encodedFileName = encodeURIComponent(fileName); // 한글이름도 안전하게 인코딩
          callback(null, decodedFileName);
        },
      }),
    }),
  )
  downloadFile(@UploadedFile('file') file) {
    return file;
  }
}

function sanitizeFilename(filename: string): string {
  const hash = crypto.createHash('md5').update(filename).digest('hex');
  const sanitizedFilename = hash + '_' + filename;
  return sanitizedFilename;
}
