import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../pages/auth/auth.service';
import { UtilsService } from '../../service/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _authSvc:AuthService, private utilsSvc:UtilsService) { }

  ngOnInit(): void {
  }

  onExit():void{
    this._authSvc.logout();
    this.utilsSvc.openSidebar(false);
  }

}
