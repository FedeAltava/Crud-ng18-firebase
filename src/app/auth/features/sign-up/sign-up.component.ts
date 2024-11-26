import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';

interface FormSingup {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './sign-up.component.html',
})
export default class SignUpComponent {
  constructor(private authService: AuthService,private router:Router) {}

  private _formBuilder = inject(FormBuilder);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }
  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSingup>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) return;
    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;
      console.log({ email, password });
      await this.authService.singUp({ email, password });
      toast.success('user created succesfully');
      this.router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('error to create user');
    }
  }
}
