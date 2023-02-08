import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { IObjetctUser, IUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit {
  student: IUser[]

  displayedColumns = [
    'Nome',
    'Username',
    'E-mail',
    'Cargo',
  ];
  dataSource = new MatTableDataSource<IUser>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserInformation()
  }

  getUserInformation() {
    this.userService.getAllUsers().subscribe((res: IObjetctUser) => {
      console.log(res)
      this.dataSource.data = res.content
    });
  }

  @ViewChild('paginator') paginator: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

}
