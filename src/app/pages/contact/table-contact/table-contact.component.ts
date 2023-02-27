import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { IObjetctContact, IContact } from '../../../models/contact';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-table-contact',
  templateUrl: './table-contact.component.html',
  styleUrls: ['./table-contact.component.scss']
})
export class TableContactComponent implements OnInit {

  contact: IContact[]

  displayedColumns = [
    'Nome',
    'E-mail',
    'Título',
    'Mensagem',
  ];
  dataSource = new MatTableDataSource<IContact>();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContactInformation()
  }

  getContactInformation() {
    this.contactService.getAllContact().subscribe((res: IObjetctContact) => {
      console.log(res)
      this.dataSource.data = res.content
    });
  }

  @ViewChild('paginator') paginator: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

}
