import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent {
  name: string = '';

  constructor(private personService: PersonService) { }

  addPerson(): void {
    if (!this.name.trim()) {
      return;
    }

    this.personService.createPerson(this.name)
      .subscribe(response => {
        console.log('Person created:', response);
        this.name = '';
      });
  }
}
