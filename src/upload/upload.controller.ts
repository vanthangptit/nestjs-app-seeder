import { Controller, Get, Res, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { Response } from 'express';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: 'Upload image' })
  @Get('/')
  uploadImage(@Res() res: Response) {
    return this.uploadService.uploadImage(res);
  }

  @ApiOperation({ summary: 'Get image name' })
  @Get('image-name')
  getImageName(@Res() res: Response, @Query('key') key: string) {
    return this.uploadService.getImageName(res, key);
  }
}
