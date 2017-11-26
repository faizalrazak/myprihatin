import { FormControl } from '@angular/forms';

export class AgeValidator {

    static isValid(control: FormControl): any {

      if (control.value >= 18){ return null; }

      return {"notOldEnough": true};
      
    }

}