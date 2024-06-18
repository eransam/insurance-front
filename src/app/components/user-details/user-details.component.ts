import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../Services/user.service';
import { InsurancePolicyService } from '../../Services/insurance-policy.service';
import { InsurancePolicyFormComponent } from '../insurance-policy-form/insurance-policy-form.component';
import { User } from '../../models/user.module';
import { InsurancePolicy } from '../../models/insurance-policy.module';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  policies: InsurancePolicy[] = [];
  filteredPolicies: InsurancePolicy[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private policyService: InsurancePolicyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(+userId);
    }
  }

  loadUser(userId: number): void {
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user;
      this.loadPolicies(userId);
    });
  }

  loadPolicies(userId: number): void {
    this.policyService.getPolicies().subscribe((policies) => {
      this.policies = policies.filter((policy) => policy.userId === userId);
      this.filteredPolicies = [...this.policies];
    });
  }

  filterPolicies(event: any): void {
    const filterDate = event.value;
    this.filteredPolicies = this.policies.filter(
      (policy) => new Date(policy.startDate) >= new Date(filterDate)
    );
  }

  openAddPolicyDialog(): void {
    const dialogRef = this.dialog.open(InsurancePolicyFormComponent, {
      data: { userId: this.user?.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.policyService
          .addPolicy(result)
          .subscribe(() => this.loadPolicies(this.user?.id!));
      }
    });
  }

  editPolicy(policy: InsurancePolicy): void {
    const dialogRef = this.dialog.open(InsurancePolicyFormComponent, {
      data: policy,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.policyService
          .updatePolicy(policy.id, result)
          .subscribe(() => this.loadPolicies(this.user?.id!));
      }
    });
  }

  deletePolicy(id: number): void {
    this.policyService
      .deletePolicy(id)
      .subscribe(() => this.loadPolicies(this.user?.id!));
  }
}
