import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isCollapsed = false;
  confirmModal?: NzModalRef;
  constructor(private authService: AuthService,
              private modalService: NzModalService) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Voulez vous vraiment vous déconnecter?',
      nzContent: '',
      nzOnOk: () => {
        this.authService.logout();
      }
    });
  }

}
