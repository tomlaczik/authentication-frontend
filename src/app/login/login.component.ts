import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  onLogin() {
    this.http
      .post('http://localhost:8000/api/sessions', this.loginForm.value, {
        headers: { accept: 'application/json' },
      })
      .subscribe({
        next: (response) => {
          if ('token' in response && typeof response.token == 'string') {
            localStorage.setItem('token', response.token);
          }
        },
      });
  }
}
