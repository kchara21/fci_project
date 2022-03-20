import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-time-census',
  templateUrl: './modal-time-census.component.html',
  styleUrls: ['./modal-time-census.component.css']
})
export class ModalTimeCensusComponent implements OnInit {



  censusDate: FormGroup


  
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<any>) { 
    this.censusDate = this.fb.group({
      horasEncendido:['',Validators.required],
      minutosEncendido:['',Validators.required],
      horasFrecuencia:['',Validators.required],
      minutosFrecuencia:['',Validators.required],
      
    })
  }

  ngOnInit(): void {
  }

  onSave():void{
    this.dialogRef.close(this.censusDate.value );
  }

    
 
  


}
