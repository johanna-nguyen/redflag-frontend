import { Component, signal } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {

  categoryInput: string = '';
filteredCategories: string[] = [];
showDropdown = false;

  showForm = signal(false);
  results = signal<any[]>([]);

  form = {
    firstName: '',
    lastName: '',
    nationality: '',
    birthDate: '',
    job: '',
    category: [] as string[]
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
  jobs: string[] = [
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

categories: string[] = [
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


ngOnInit() {
  this.filteredCategories = this.categories;
}

onCategoryInput() {
  const keyword = this.categoryInput.toLowerCase().trim();

  this.filteredCategories = this.categories.filter(c =>
    c.toLowerCase().includes(keyword)
  );

  this.showDropdown = true;
}

addCategory(value: string) {
  if (!this.form.category.includes(value)) {
    this.form.category.push(value);
  }

  this.categoryInput = '';
  this.showDropdown = false;
}

removeCategory(value: string) {
  this.form.category = this.form.category.filter(c => c !== value);
}

selectFirstCategory() {
  if (this.filteredCategories.length > 0) {
    this.addCategory(this.filteredCategories[0]);
  }
}

closeDropdownOutside(event: any) {
  if (!event.target.closest('.category-wrapper')) {
    this.showDropdown = false;
  }
}

constructor(private api: Api) {}

  /*

  ngOnInit() {
    this.api.getAll().subscribe((data: any) => {
      console.log("DATA:", data); // data trả về từ API
      this.results.set(data);
    });
  }
*/



  openForm() {
    this.showForm.set(true);
    this.api.create// reset data mỗi khi mở form
  }

  closeForm() {
    this.showForm.set(false);
  }

  searchText: string = '';
  searchMessage: string = '';
  messageType: string ='';

onSearch() {
  const value = this.searchText.trim();

  // empty input
  if (!value) {
    this.messageType = 'error';
  this.searchMessage = 'Please enter a name to search.';
    return;
  }

  this.api.search(value).subscribe((data: any) => {
    this.results.set(data);

    if (!data || data.length === 0) {
  this.messageType = 'error';
  this.searchMessage = 'No results found.';
} else {
  this.messageType = 'success';
  this.searchMessage = `Found ${data.length} result(s).`;
}

    // clear input after search
    this.searchText = '';
    data = '' // Lưu dữ liệu trả về từ API vào biến data
  });
}

submit() {

  if (this.form.firstName.length !== 1 || this.form.lastName.length !== 1) {
    this.messageType = 'error';
    this.searchMessage = 'First & Last name must be 1 letter';
    return;
  }

  this.api.create(this.form).subscribe(() => {

    this.messageType = 'success';
    this.searchMessage = 'Report submitted successfully!';

    this.closeForm();

    this.form = {
      firstName: '',
      lastName: '',
      nationality: '',
      birthDate: '',
      job: '',
      category: [] as string[]
    };

  });
}
  
}
