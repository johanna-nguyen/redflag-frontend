import { Component, signal } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {


  showForm = signal(false);
  results = signal<any[]>([]);

  form = {
    firstName: '',
    lastName: '',
    nationality: '',
    birthDate: '',
    jobFields: '',
    behaviorTypes: [] as string[]
  };

  countries: string[] = [
  'France',
  'USA',
  'UK',
  'Germany',
  'Spain',
  'Italy',
  'Vietnam',
  'Japan',
  'China',
  'Korea'
];
  jobFields: string[] = [
  'Technology',
  'Software Engineering',
  'Data Science',
  'Artificial Intelligence',
  'Cyber Security',
  'Finance',
  'Banking',
  'Accounting',
  'Marketing',
  'Sales',
  'Human Resources',
  'Education',
  'Healthcare',
  'Medicine',
  'Pharmaceutical',
  'Legal',
  'Government',
  'Military',
  'Construction',
  'Architecture',
  'Design',
  'Media & Communication',
  'Journalism',
  'Entertainment',
  'Hospitality',
  'Tourism',
  'Logistics',
  'Manufacturing',
  'Retail',
  'E-commerce',
  'Research & Development',
  'Agriculture',
  'Energy',
  'Consulting',
  'Other'
];

behaviorTypes: string[] = [
  'Flirting',
  'Cheating',
  'Narcissism',
  'Manipulation',
  'Lying',
  'Gaslighting',
  'Emotional Abuse',
  'Verbal Abuse',
  'Controlling Behavior',
  'Jealousy Issues',
  'Infidelity Patterns',
  'Love Bombing',
  'Ghosting',
  'Disrespectful Behavior',
  'Aggressive Behavior',
  'Harassment',
  'Stalking',
  'Self-centered Behavior',
  'Dishonesty',
  'Other'
];

  constructor(private api: Api) {}

  /*

  ngOnInit() {
    this.api.getAll().subscribe((data: any) => {
      console.log("DATA:", data); // data trả về từ API
      this.results.set(data);
    });
  }
*/

toggleBehavior(value: string, event: any) {
  if (event.target.checked) {
    this.form.behaviorTypes.push(value);
  } else {
    this.form.behaviorTypes =
      this.form.behaviorTypes.filter(b => b !== value);
  }
}
  openForm() {
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }

  search(event: any) {
    const value = event.target.value;

    if (!value) {
      this.results.set([]);
      return;
    }

    this.api.search(value).subscribe((data: any) => {
      this.results.set(data);
    });
  }

  submit() {

    // validation 1 chữ cái
    if (this.form.firstName.length !== 1 || this.form.lastName.length !== 1) {
      alert('First & Last name must be 1 letter');
      return;
    }

    this.api.create(this.form).subscribe(() => {
      alert('Submitted!');
      this.closeForm();
    });
  }
  
}
