import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from './shared/service/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  
  opened = false;
  private _destroy$ = new Subject<any>();
  constructor(private utilsSvc:UtilsService){}

  
  
  ngOnDestroy(): void {
    this._destroy$.next({});
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.utilsSvc.sidebarOpened$
    .pipe(takeUntil(this._destroy$))
      .subscribe(res=>{
        this.opened = res;
      })
  }



}
