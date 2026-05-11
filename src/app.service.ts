import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class AppService {
  getHello() {
    return {'message': 'Hello World!'};
  }

  getAsset(filename: string) {
    
    const filePath = path.join(process.cwd(), '../assets', filename);
    console.log(filePath);
    return fs.readFileSync(filePath);
  }

  async convertPNGToMusicXML(file: any) { // Absolute Pfade für Docker Mounts
    console.log('Received file:', file);
    //Convert png to pdf
    

    
    const fileName = file.originalname;
        //Save the uploaded file to a temporary location
    const tempFilePath = path.join(process.cwd(), 'uploads', fileName);
    console.log('Saving file to:', tempFilePath);
    fs.writeFileSync(tempFilePath, file.buffer);
    console.log('after file to:', tempFilePath);

    
    // return { message: 'File uploaded successfully', path: tempFilePath };

    const hostInputPath = path.resolve('./uploads');
    const hostOutputPath = path.resolve('./results');

    // Docker Befehl:
    // --rm: Container nach Beendigung löschen
    // -v: Verzeichnisse spiegeln
    const dockerCmd = `docker run --rm \
      -v "${hostInputPath}:/input" \
      -v "${hostOutputPath}:/output" \
      toprock/audiveris`;

    try {
      console.log(`Starte OCR für: ${fileName}...`);
      
      // Ausführung des Docker-Befehls
      let res =await execPromise(dockerCmd);
      console.log('Docker-Ausgabe:', res);
      console.error('Docker-Fehlerausgabe:', res.stderr);

      // Das Resultat hat meist die Endung .mxl oder .xml
      const outputFileName = fileName.replace(/\.[^/.]+$/, "") + ".mxl";
      return path.join(hostOutputPath, outputFileName);
      
    } catch (error) {
      console.log('Fehler bei der Docker-Verarbeitung');
      return error;
      // throw new InternalServerErrorException('OCR-Verarbeitung fehlgeschlagen');
    }
  }
  }

