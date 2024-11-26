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

export interface FormSingin{
 
    email: FormControl<string | null>;
    password: FormControl<string | null>;

}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export default class SignInComponent {
  constructor(private authService: AuthService, private router: Router) {}

  private _formBuilder = inject(FormBuilder);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }
  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSingin>({
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
      await this.authService.singin({ email, password });
      toast.success('Hi there!');
      this.router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('error to sign-in');
    }
  }
}
