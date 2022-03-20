import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartConfiguration, ChartType } from 'chart.js';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { ValueService } from '../../services/value.service';
import * as html2pdf from 'html2pdf.js'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
  //Para el Grafico
  dateValue = [];
  numValue: any = [];
  paramName = '';
  filtroParam;
  date;
  tittle = '';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private valueSvc: ValueService) { }

  ngOnInit(): void {

    const { end, selectedParam, start, piscina } = this.data.filtroParam.value;
   
    this.valueSvc.getReportById(piscina, selectedParam, start, end)
      .subscribe(values => {
        this.tittle = `${values.valParPool[0].parametro.piscina.camaronera}, ${values.valParPool[0].parametro.piscina.codigo}`
        values.valParPool.forEach(value => {
          let fecha = moment(value.createdAt).format("YY-MM-DD HH:mm:ss a")
          this.numValue.push(value.valor)
          this.dateValue.push(fecha)
          this.paramName = value.parametro.nombre;
          this.lineChartData.datasets = [{ data: this.numValue, label: this.paramName }]
        });

        this.chart?.update();

      }
      )

  }


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: null,
        label: '',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },

    ],
    labels: this.dateValue


  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},

      'y-axis-0':
      {
        position: 'left',
        min: 0
      },

    },

    plugins: {
      legend: { display: true },

    }

  };

  public lineChartType: ChartType = 'line';


  generatePDF(): void {
    const options = {
      margin: [15, 0, 15, 0],
      filename:`${this.paramName} - ${moment().format('YY-MM-DD')}`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        dpi: 192,
        scale:4,
        letterRendering: true,
        useCORS: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const content:Element = document.getElementById('graphic-to-export');
    html2pdf()
    .from(content)
    .set(options)
    .save()


    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'PDF Generado' ,
      showConfirmButton: false,
      timer: 2000
    })


    
  }


 

  





}
