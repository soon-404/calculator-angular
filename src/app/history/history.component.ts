import { Component, OnInit } from '@angular/core';
import { UserData } from '../shared/model/data.model';
import { LocalService } from '../local-service/localService.service';
import { AlertService } from '../shared/alert-service/alertService.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  datas: UserData[] = []

  constructor( 
    private localStore: LocalService, private alertSvc: AlertService
  ){}
  
  ngOnInit() {
    this.datas = this.localStore.getData("userData");
  }

  onDelete(datas: UserData[], localStore: any) {
    if (datas.length === 0) {
      return;
    }

    localStore.clearData();
  }

  onAlert() {
    this.alertSvc.alertConfirmation(this.onDelete, this.datas, this.localStore);
  }
}
