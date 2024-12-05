import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  onLogout() {
    const token = localStorage.getItem('token');

    this.http
      .delete('http://localhost:8000/api/sessions/current', {
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/login');
        },
      });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.http
        .get('http://localhost:8000/api/users/current', {
          headers: {
            accept: 'application/json',
            authorization: `Bearer ${token}`,
          },
        })
        .subscribe({
          next: (response) => {
            this.user = response;
          },
          error: () => {
            this.router.navigateByUrl('/login');
          },
        });
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
