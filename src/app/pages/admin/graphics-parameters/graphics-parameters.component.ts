import { ChangeDetectionStrategy, Component, OnInit, Optional, ViewChild, OnDestroy, Inject } from '@angular/core';
import { ChartConfiguration, ChartData, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../services/api.service';
import { TemplateService } from '../services/template.service';
import { UserService } from '../services/user.service';
import { PoolService } from '../services/pool.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ParameterService } from '@admin/admin/services/parameter.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalTimeCensusComponent } from '../components/modal-time-census/modal-time-census.component';
@Component({
  selector: 'app-graphics-parameters',
  templateUrl: './graphics-parameters.component.html',
  styleUrls: ['./graphics-parameters.component.css'],

})
export class GraphicsParametersComponent implements OnInit, OnDestroy {

  private datosApi = [];
  private nombreParametrosApi = [];
  private valor_minimo = [];
  private valor_maximo = [];
  public barChartData: ChartDataset[];
  public barChartLabels = [];
  public barChartType: ChartType = 'bar';


  public barChartData1: ChartDataset[];
  public barChartLabels1 = [];

  public barChartData2: ChartDataset[];
  public barChartLabels2 = [];

  public barChartData3: ChartDataset[];
  public barChartLabels3 = [];

  public barChartData4: ChartDataset[];
  public barChartLabels4 = [];



  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  displayedColumns: string[] = ['nombre', 'valor', 'observacion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog: MatDialog, private apiSvc: ApiService, private templateSvc: TemplateService, private userSvc: UserService, private poolSvc: PoolService, private paramService: ParameterService) {


  }

  piscinasUsuarioDisponibles = [];
  selectedPool = null;
  plantillasPiscina = [];
  selectedPoolCensus = null;
  intervalActive = null;
  saveActive = null;
  selectedCensus = false;
  selectedStop = false;
 

  ngOnDestroy(): void {
    if (this.intervalActive) {
      clearInterval(this.intervalActive);
    }

    if(this.saveActive){
      clearInterval(this.saveActive);
    }
  }

  ngOnInit(): void {
    this.llamarPiscinasUsuario();

  }



  llamarPiscinasUsuario(): void {
    const user = JSON.parse(localStorage.getItem('user')!) || null;

    if (user.rol === 'supervisor') {
      this.poolSvc.getAll()
        .subscribe((piscinas => {
          this.piscinasUsuarioDisponibles.push(piscinas)
        }))
    } else if (user.rol === 'operador') {
      this.userSvc.getById(user.userId)
        .subscribe((pisiUsu => {
          this.piscinasUsuarioDisponibles.push(pisiUsu.piscinas);

        }))
    }

  }


  getParametroApi(): void {

    this.selectedPoolCensus = this.selectedPool;

    this.templateSvc.getTemplateByPool(this.selectedPool)
      .subscribe(res => {

        if (res.length > 0) {

          this.valor_minimo = [];
          this.valor_maximo = [];

          res.forEach(parametro => {
            this.valor_minimo.push(parametro.valor_minimo)
            this.valor_maximo.push(parametro.valor_maximo)
          })
        } else {
          this.valor_minimo = [];
          this.valor_maximo = [];
        }
      })



    this.nombreParametrosApi = [];
    this.datosApi = [];
    this.apiSvc.getAll()
      .subscribe(res => {
        this.nombreParametrosApi.push(Object.keys(res));
        this.datosApi.push(Object.values(res));
        this.cargarDatosApi();
      })

  }



  getPlantillaPiscina(): void {



  }

  stopPlantilla(): void {
    
    this.selectedCensus = false;
    if (this.intervalActive ) {
      clearInterval(this.intervalActive);
      clearInterval(this.saveActive);
    }

    this.getParametroApi();

  }


  guardarCenso(): void {
    this.selectedStop = false;
    const user = JSON.parse(localStorage.getItem('user')!) || null;
    this.paramService.newCensus(this.selectedPool, user.userId)
      .subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        })
      })
  }



  cargarDatosApi(): void {





    this.barChartData = [];
    this.barChartData.push({ data: [this.datosApi[0][0]], label: 'API' }, { data: [this.valor_minimo[0]], label: 'Valor_minimo' }, { data: [this.valor_maximo[0]], label: 'Valor_Maximo' });
    this.barChartLabels[0] = this.nombreParametrosApi[0][0];

    this.barChartData1 = [];
    this.barChartData1.push({ data: [this.datosApi[0][1]], label: 'API' }, { data: [this.valor_minimo[1]], label: 'Valor_minimo' }, { data: [this.valor_maximo[1]], label: 'Valor_Maximo' });
    this.barChartLabels1[0] = this.nombreParametrosApi[0][1];


    this.barChartData2 = [];
    this.barChartData2.push({ data: [this.datosApi[0][2]], label: 'API' }, { data: [this.valor_minimo[2]], label: 'Valor_minimo' }, { data: [this.valor_maximo[2]], label: 'Valor_Maximo' });
    this.barChartLabels2[0] = this.nombreParametrosApi[0][2];


    this.barChartData3 = [];
    this.barChartData3.push({ data: [this.datosApi[0][3]], label: 'API' }, { data: [this.valor_minimo[3]], label: 'Valor_minimo' }, { data: [this.valor_maximo[3]], label: 'Valor_Maximo' });
    this.barChartLabels3[0] = this.nombreParametrosApi[0][3];



    this.barChartData4 = [];
    this.barChartData4.push({ data: [this.datosApi[0][4]], label: 'API' }, { data: [this.valor_minimo[4]], label: 'Valor_minimo' }, { data: [this.valor_maximo[4]], label: 'Valor_Maximo' });
    this.barChartLabels4[0] = this.nombreParametrosApi[0][4];


  }



  onOpenModal(): void {
    this._dialog.open(ModalTimeCensusComponent,
      {
        height: '400px',
        width: '500px',

      }).afterClosed().subscribe(res => {
        console.log(res);

        if (res) {
          const { horasEncendido, minutosEncendido, minutosFrecuencia, horasFrecuencia } = res;


          let frecuencia = ((horasFrecuencia * 60) + minutosFrecuencia) * 60000;

          let encendido = ((horasEncendido * 60) + minutosEncendido) * 60000;

          this.getPlantillaPiscina();

        
          this.selectedCensus = true;

          setTimeout(() => { clearInterval(this.saveActive), this.selectedCensus = false, clearInterval(this.intervalActive), this.playAudio() }, encendido);


          this.saveActive = setInterval(() => {
              this.guardarCenso()
          }, frecuencia)


          this.intervalActive = setInterval(() => {
            this.getParametroApi();
          }, 1500)





        }





      })
  }

  playAudio():void{
    const audio = new Audio();
    audio.src = "assets/sounds/alarma.mp3"
    audio.load()
    audio.play()
  }






  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        max: 1
      },
      y: {
        min: 0,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return value + 'mg/l';
          }
        },

      }
    },
    plugins: {

      legend: {
        display: true,
      },



    }
  };

  public barChartOptions1: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        max: 1
      },
      y: {
        min: 0,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return value + 'ppt';
          }
        },

      }
    },
    plugins: {

      legend: {
        display: true,
      },

    }
  };


  public barChartOptions2: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        max: 1
      },
      y: {
        min: 0,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return value + '°C';
          }
        }
      }
    },
    plugins: {

      legend: {
        display: true,
      },

    }
  };


  public barChartOptions3: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        max: 1
      },
      y: {
        min: 0
      }
    },
    plugins: {

      legend: {
        display: true,
      },

    }
  };





}


