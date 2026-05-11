import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServerService } from './server.service';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import OsmdAudioPlayer from 'osmd-audio-player';
import { HeaderComponent } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent
    
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ng-client');
   @ViewChild('osmdContainer') container!: ElementRef;

  file: File | null = null;
  activeOsmd: OpenSheetMusicDisplay | null = null;


  constructor(private server: ServerService) {}

  setFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  async getMidi() {
     if (!this.container) return;

    // Übergeben Sie das nativeElement statt eines Strings
    const osmd = new OpenSheetMusicDisplay(this.container.nativeElement);
    let file2 = JSON.parse(JSON.stringify(this.file));
    console.log(this.file);
        const formData = new FormData();
    // Der Name 'file' muss exakt mit dem Namen im NestJS FileInterceptor übereinstimmen!
    if(this.file)
    formData.append('file', this.file); 

    console.log(formData);
    

    let res = await this.server.postMidi('midi', formData)
    console.log(res);
  }


  async getHelloWorld(){
    let res = await this.server.get('')
    
     console.log(res);
  }

  playMidi(){
     const player = new OsmdAudioPlayer();





    const osmd = new OpenSheetMusicDisplay('osmdCanvas');

    let file = '../assets/Never-Gonna-Give-You-Up-3.mid';
    
    // osmd.set


    // osmd.render()

    osmd.load("assets/MozartPianoSonata.musicxml").then(() => {
      osmd.render();
      return player.loadScore(osmd as any)
      
    }).catch(err => {
      console.error("Error loading MIDI file:", err);
    });

    player.play();

    

  }

  playAudio(){
    const player = new OsmdAudioPlayer();
    const osmd = new OpenSheetMusicDisplay("osmdCanvas");
    osmd.load("assets/MozartPianoSonata.musicxml").then(() => {
      osmd.render();
      return player.loadScore(osmd as any);
    }).then(() => {
      player.play();
    }).catch(err => {
      console.error("Error loading MIDI file:", err);
    });

    player.play();
  }

  // playOsmdAudio(){
  //   if (!this.activeOsmd) {
  //     console.error("No active OpenSheetMusicDisplay instance found.");
  //     return;
  //   }

  //   const player = new OsmdAudioPlayer();
  //   player.setOsmd(this.activeOsmd);
  //   player.play(this.activeOsmd);
  // }
}
