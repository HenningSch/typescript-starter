import { CommonModule } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ServerService } from '../server.service';


interface Song {
  artist: string;
  title: string;
  image: string;
  duration: string;
  status?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [AccordionModule, CarouselModule, TagModule, ButtonModule,CommonModule
  ]
})

export class HomeComponent{
  currentLevel = 'Jazz';

  server = inject(ServerService);


  categories: { name: string; image: string; songs: Song[] }[] = [
    { name: 'Klassik', image: 'assets/klassik.jpg', songs: [
      {
      title: 'Beethoven - Symphony No. 5',
      artist: 'Beethoven',
      image: 'assets/musicSheet.jpeg',
      duration: '7:05',
      status: 'new'
    },
          {
      title: 'Beethoven - Symphony No. 5',
      artist: 'Beethoven',
      image: 'assets/musicSheet.jpeg',
      duration: '7:05',
      status: 'new'
    },
     {
      artist: 'Mozart',
      title: 'Eine kleine Nachtmusik',
      image: 'assets/musicSheet.jpeg',
      duration: '5:30',
      status: 'trending'
    },
    {
      artist: 'Bach',
      title: 'Brandenburg Concerto No. 3',
      image: 'assets/musicSheet.jpeg',
      duration: '8:45',
      status: undefined
    }
  ] },
    
    { name: 'Jazz', image: 'assets/jazz.jpg', songs: [
      {
        artist: 'Miles Davis',
        title: 'So What oder auch michael wendler mag brot',
        image: 'assets/musicSheet.jpeg',
        duration: '9:22'
      },
      {
        artist: 'John Coltrane',
        title: 'Giant Steps',
        image: 'assets/musicSheet.jpeg',
        duration: '8:45'
      }] },
    { name: 'Pop', image: 'assets/pop.jpg', songs: [
      {
        artist: 'Michael Jackson',
        title: 'Thriller',
        image: 'assets/musicSheet.jpeg',
        duration: '5:57'
      },
      {
        artist: 'Madonna',
        title: 'Like a Virgin',
        image: 'assets/musicSheet.jpeg',
        duration: '3:38'
      }] },
    { name: 'Rock', image: 'assets/rock.jpg', songs: [
      {
        artist: 'Led Zeppelin',
        title: 'Stairway to Heaven',
        image: 'assets/musicSheet.jpeg',
        duration: '8:02'
      },
      {
        artist: 'Queen',
        title: 'Bohemian Rhapsody',
        image: 'assets/musicSheet.jpeg',
        duration: '5:55'
      }] },
    { name: 'Folk', image: 'assets/folk.jpg', songs: [
      {
        artist: 'Bob Dylan',
        title: 'Blowin\' in the Wind',
        image: 'assets/musicSheet.jpeg',
        duration: '2:48'
      },
      {
        artist: 'Joan Baez',
        title: 'Diamonds and Rust',
        image: 'assets/baez.jpg',
        duration: '4:03'
      }] },
    { name: 'Blues', image: 'assets/blues.jpg', songs: [
      {
        artist: 'B.B. King',
        title: 'The Thrill Is Gone',
        image: 'assets/bb.jpg',
        duration: '5:24'
      },
      {
        artist: 'Muddy Waters',
        title: 'Mannish Boy',
        image: 'assets/muddy.jpg',
        duration: '3:45'
      }] },
  ];

}