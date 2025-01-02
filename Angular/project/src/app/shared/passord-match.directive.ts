import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
        return null
    }

    return password.value === confirmPassword.value ? null : {passwordMismatch: true}
}

// export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
//     const password = group.get('password')?.value;
//     const confirmPassword = group.get('confirmPassword')?.value;
  
//     if (!password || !confirmPassword) {
//         return null
//     }

//     return password === confirmPassword ? null : { passwordMismatch: true };
//   }