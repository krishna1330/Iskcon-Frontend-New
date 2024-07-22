import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {

  profilePhotoUrl: string | ArrayBuffer | null = null;
  signaturePhotoUrl: string | ArrayBuffer | null = null;

  constructor() { }

  registrationForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  registrationService = inject(RegistrationService);

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      photo: [null, [Validators.required]],
      signature: [null, [Validators.required]],
      occupation: [''],
      companyName: [''],
      fatherName: ['', Validators.required],
      fatherDOB: ['', Validators.required],
      motherName: ['', Validators.required],
      motherDOB: ['', Validators.required],
      spouseName: [''],
      spouseDOB: [''],
      child1_Name: [''],
      child1_DOB: [''],
      child2_Name: [''],
      child2_DOB: [''],
      rDoorNumber: ['', Validators.required],
      rStreet: ['', Validators.required],
      rLandmark: ['', Validators.required],
      rDistrict: ['', Validators.required],
      rPincode: ['', Validators.required],
      rState: ['', Validators.required],
      wDoorNumber: [''],
      wStreet: [''],
      wLandmark: [''],
      wDistrict: [''],
      wPincode: [''],
      wState: [''],
    })
  }

  toggleOccupationFields() {
    const occupationFields = document.getElementById('occupationFields') as HTMLElement;
    occupationFields.style.display = occupationFields.style.display === 'none' ? 'block' : 'none';

    const workAddressFields = document.getElementById('workAddressFields') as HTMLElement;
    workAddressFields.style.display = workAddressFields.style.display === 'none' ? 'block' : 'none';
  }

  toggleSpouseFields() {
    const spouseFields = document.getElementById('spouseFields') as HTMLElement;
    spouseFields.style.display = spouseFields.style.display === 'none' ? 'block' : 'none';
  }

  toggleChildrenFields() {
    const childrenFields = document.getElementById('childrenFields') as HTMLElement;
    childrenFields.style.display = childrenFields.style.display === 'none' ? 'block' : 'none';
  }

  onProfilePhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => this.profilePhotoUrl = e.target!.result as string | ArrayBuffer;
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSignaturePhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => this.signaturePhotoUrl = e.target!.result as string | ArrayBuffer;
      reader.readAsDataURL(input.files[0]);
    }
  }

  onRegister() {
    if (this.registrationForm.valid || true) {
        const formData = new FormData();

      formData.append('FirstName', this.registrationForm.get('firstName')!.value);
      formData.append('LastName', this.registrationForm.get('lastName')!.value);
      formData.append('DOB', this.registrationForm.get('dob')!.value);
      formData.append('Email', this.registrationForm.get('email')!.value);
      formData.append('Phone', this.registrationForm.get('phone')!.value);
      formData.append('Photo', this.registrationForm.get('photo')!.value);
      formData.append('Signature', this.registrationForm.get('signature')!.value);
      formData.append('FatherName', this.registrationForm.get('fatherName')!.value);
      formData.append('FatherDOB', this.registrationForm.get('fatherDOB')!.value);
      formData.append('MotherName', this.registrationForm.get('motherName')!.value);
      formData.append('MotherDOB', this.registrationForm.get('motherDOB')!.value);
      formData.append('SpouseName', this.registrationForm.get('spouseName')!.value);
      formData.append('SpouseDOB', this.registrationForm.get('spouseDOB')!.value);
      formData.append('Child1_Name', this.registrationForm.get('child1_Name')!.value);
      formData.append('Child1_DOB', this.registrationForm.get('child1_DOB')!.value);
      formData.append('Child2_Name', this.registrationForm.get('child2_Name')!.value);
      formData.append('Child2_DOB', this.registrationForm.get('child2_DOB')!.value);
      formData.append('ResidenceDoorNumber', this.registrationForm.get('rDoorNumber')!.value);
      formData.append('ResidenceStreet', this.registrationForm.get('rStreet')!.value);
      formData.append('ResidenceLandmark', this.registrationForm.get('rLandmark')!.value);
      formData.append('ResidenceDistrict', this.registrationForm.get('rDistrict')!.value);
      formData.append('ResidencePincode', this.registrationForm.get('rPincode')!.value);
      formData.append('ResidenceState', this.registrationForm.get('rState')!.value);
      formData.append('Occupation', this.registrationForm.get('occupation')!.value);
      formData.append('CompanyName', this.registrationForm.get('companyName')!.value);
      formData.append('WorkDoorNumber', this.registrationForm.get('wDoorNumber')!.value);
      formData.append('WorkStreet', this.registrationForm.get('wStreet')!.value);
      formData.append('WorkLandmark', this.registrationForm.get('wLandmark')!.value);
      formData.append('WorkDistrict', this.registrationForm.get('wDistrict')!.value);
      formData.append('WorkPincode', this.registrationForm.get('wPincode')!.value);
      formData.append('WorkState', this.registrationForm.get('wState')!.value);

      this.registrationService.newRegistration(formData).subscribe({
        next: (response: HttpResponse<string>) => {
          if (response.status === 200) {
            alert('Registration successful');
          }
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    }
  }
}
