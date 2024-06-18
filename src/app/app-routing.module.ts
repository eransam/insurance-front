import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { InsurancePolicyFormComponent } from './components/insurance-policy-form/insurance-policy-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent }, // Default route
  { path: 'user/:id', component: UserDetailsComponent }, // Route for user details
  { path: 'add-policy', component: InsurancePolicyFormComponent }, // Route for adding a new policy
  { path: 'edit-policy/:id', component: InsurancePolicyFormComponent }, // Route for editing a policy
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect to home for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
