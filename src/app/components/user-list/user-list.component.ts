import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../../models/user.module';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  selectUser(user: User): void {
    // Navigate to User Details page
    // Implement navigation logic here
  }

  openUserForm(user?: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '300px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (user) {
          // Update existing user
          this.userService.updateUser(user.id, result).subscribe(() => this.loadUsers());
        } else {
          // Add new user
          this.userService.addUser(result).subscribe(() => this.loadUsers());
        }
      }
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => this.loadUsers());
  }
}
