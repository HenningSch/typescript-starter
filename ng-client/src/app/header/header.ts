import { CommonModule } from '@angular/common';
import {  Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [CommonModule, 
  ]
})

export class HeaderComponent{
  avatarUrl = 'assets/avatar.jpg';
  currentPage = 'home'

  private route = inject(ActivatedRoute);
  public server = inject(ServerService);

  toggleCurrentPage() {
    this.currentPage = this.currentPage === 'music' ? 'home' : 'music';
  }
    
}