import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(public servicioPaises : PaisesService) {

    this.currentUser = servicioPaises.logedUser;
  }

  ngOnInit(): void {
  }

}
