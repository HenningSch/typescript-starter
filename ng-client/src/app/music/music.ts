import { CommonModule } from '@angular/common';
import {  Component, computed, effect, ElementRef, inject, signal, viewChild, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-music',
  templateUrl: './music.html',
  styleUrls: ['./music.css'],
  imports: [CommonModule, ProgressBarModule, ButtonModule
  ]
})

export class MusicComponent{
  route = inject(ActivatedRoute);

    audioRef = viewChild<ElementRef<HTMLAudioElement>>('audioplayer');
    

currentTime = signal(0);
duration = signal(0);
progress = computed(() => {
  const d = this.duration();
  return d > 0 ? (this.currentTime() / d) * 100 : 0;
});

constructor() {
    effect(() => {
    const el = this.audioRef()?.nativeElement;
    if (el) {
      console.log('Audio ist jetzt bereit!', el);
    }
    console.log('Audio-Ref hat sich geändert:', this.audioRef());
  });

  
}

// Verbleibende Zeit (schon formatiert oder als Zahl)
remainingTime = computed(() => this.duration() - this.currentTime());

// Ein Signal, das sagt, ob der Song fast zu Ende ist (z.B. für Visuals)
isEnding = computed(() => this.remainingTime() < 10);

  
  
  // musicMp4 = computed(() => {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   return `assets/Bach.mp3`;
  //   return `assets/${id}.mp3`;
  // })

  songUrl = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
      return `assets/Bach.mp3`;
    return `assets/${id}.mp3`;
  })

  number = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id;
  })

//   playAudio(){
//     const audio = new Audio(this.musicMp4());

//     console.log(this.remainingTime());
// console.log(this.progress());
//     audio.play();


//   }



onMetadataLoaded() {
  // Wird gefeuert, wenn die Datei geladen ist und wir die Länge wissen
  console.log('Metadata loaded, duration:', this.audioRef());
  this.duration.set(this.audioRef()?.nativeElement.duration ?? 0); // in ms für DatePipe
}

playAudio() {
  const audio = this.audioRef()?.nativeElement;
  console.log(this.audioRef());
  if (audio) {
    audio.play();
  }
}

onTimeUpdate() {
  const audio = this.audioRef()?.nativeElement;
  console.log(audio);
  this.currentTime.set(audio?.currentTime ?? 0); // Aktuelle Sekunde
}

seek(event: any) {
  const pct = event.target.value;
  const audio = this.audioRef()?.nativeElement;
  if (audio) {
    audio.currentTime = (pct / 100) * audio.duration;
  }
}



/////////////////////////////////////////
// Im Component Class:
isPlaying = signal(false);

togglePlay() {
  const el = this.audioRef()?.nativeElement;
  if (!el) return;

  if (this.isPlaying()) {
    el.pause();
  } else {
    el.play();
  }
  this.isPlaying.set(!this.isPlaying());
}

prevSong() { console.log('Previous'); }
nextSong() { console.log('Next'); }


}