import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsurancePolicy } from '../../models/insurance-policy.module';

@Component({
  selector: 'app-insurance-policy-form',
  templateUrl: './insurance-policy-form.component.html',
  styleUrls: ['./insurance-policy-form.component.scss'],
})
export class InsurancePolicyFormComponent implements OnInit {
  policyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InsurancePolicyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InsurancePolicy
  ) {
    this.policyForm = this.fb.group({
      policyNumber: [data ? data.policyNumber : '', Validators.required],
      insuranceAmount: [data ? data.insuranceAmount : '', Validators.required],
      startDate: [data ? data.startDate : '', Validators.required],
      endDate: [data ? data.endDate : '', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.policyForm.valid) {
      this.dialogRef.close(this.policyForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
