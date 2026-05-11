import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('midi')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMidiFile(@UploadedFile() file:any) {
    console.log(file);
    return this.appService.convertPNGToMusicXML(file);
    // Logic to handle MIDI file upload and processing
    return { message: 'MIDI file uploaded successfully' };
  }


  // @Get('assets/:filename')
  // getAsset(@Param('filename') filename: string) {
  //   console.log(filename);
  //   return this.appService.getAsset(filename);
  //   // Logic to serve static assets like MIDI files
  //   return { message: `Serving asset: ${filename}` };
  // }
}
