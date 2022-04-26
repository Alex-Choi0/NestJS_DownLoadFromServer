import {
  Controller,
  Get,
  Query,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';

@ApiTags('서버로부터 다운로드 받기')
@Controller('download-file')
export class DownloadFileController {
  @Get()
  @ApiQuery({
    name: 'fn',
    description: '다운로드 받을 파일이름을 입력한다.(존재해야함)',
    required: true,
    type: String,
    example: 'test.txt',
  })
  async download(
    @Query('fn') fileName: string,
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    // 프로젝트 폴더 경로를 나타내 준다
    console.log('process.cwd() : ', process.cwd());

    // stream file을 생성해 준다.
    const file = createReadStream(join(process.cwd(), `uploads/${fileName}`));

    // // 아래는 res.set을 이용하여 Content-Type, Content-Disposition를 다른걸로 변경이 가능합니다.
    // // Content-Type의 Default는 application/octet-stream
    // res.set({
    //   'Content-Type': 'application/json',
    //   'Content-Disposition': 'attachment; filename="package.json"',
    // });

    // 입력한 fileName으로 전달할 파일 이름을 설정합니다.
    res.set({
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });
    // stream file을 client쪽으로 전달한다.
    return new StreamableFile(file);
  }
}

// 참고자료
// https://docs.nestjs.com/techniques/streaming-files
