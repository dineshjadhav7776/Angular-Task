import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Validators, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/Services/crud.service';
import { TaskData } from 'src/app/classes/TaskData';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tableDatas;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageSize = 5;
  searchKey;
  signupForm;
  @ViewChild('closebutton') closebutton;

  oldtask : TaskData;
  newtask : TaskData;
  isEditMode: boolean = false;
  closeResult: string;
  submitted: boolean;

  listData: MatTableDataSource<any>
 
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
  sortedTask: TaskData[];
   countrys = ['INDIA','PAKISTAN','ENGLAND','IRANLAND','NEPAL','CHINA','SHREELANKA','NEWZANLAND','AUSTRILIA']

   constructor(private fb: FormBuilder,
               private crud: CrudService,
               private modalService: NgbModal,
             ) {}

   ngOnInit() {
     this.tabelDataFunction();
     this.onPaginator();
      this.signupForm= this.fb.group({
      country_name:['',[Validators.required]],
      currancy_name: ['',[Validators.required]],
      a_code:['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.minLength(3), Validators.maxLength(3)]],
      n_code: ['',[Validators.required, Validators.min(10),Validators.max(9999)]],
      status:['', Validators.required]
    });
   
  }

  displayedColumns: string[] = [
    'country_Name',
    'currancy_Name',
    'alphabetic_code',
    'numeric_Code',
    'stutus',
    'action'
  ];

  ngAfterViewInit() {
    this.onPaginator();
  }

  public onPaginator() {
    this.listData.paginator = this.paginator;
  }

  SearchData() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreatetask(content) {
    this.isEditMode = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.signupForm.reset();
  }

  onDeleteTask(element){
    if(confirm('Are you sure you want to delete this task?')) {
      this.crud.deleteTask(element);
     this.tabelDataFunction();
     this.onPaginator();
    }
  }

  onEditTask(content,element) {
    this.oldtask = element;
    this.isEditMode = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.signupForm.controls['country_name'].setValue('ENGLAND');
    this.signupForm.controls['currancy_name'].setValue(element.currancy_name);
    this.signupForm.controls['status'].setValue(element.status);
    this.signupForm.controls['n_code'].setValue( element.n_code);
    this.signupForm.controls['a_code'].setValue(element.a_code);
  }

  onUpdatetask() {
    this.newtask = this.signupForm.value;
    for(let i = 0; i < this.tableDatas.length; i++) {
        if(this.tableDatas[i].newtask == this.oldtask) {
        this.tableDatas[i].newtask = this.newtask;
        }
    }
      this.crud.updateTask(this.oldtask, this.newtask);
      
      alert('Record Updated successfully')
      this.tabelDataFunction();
      this.onPaginator();
      this.signupForm.reset();
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public tabelDataFunction() {
    this.tableDatas = this.crud.getTotalTasks();
    this.listData = new MatTableDataSource(this.tableDatas);
    return this.listData;
  }

  onAddtask() {
    this.submitted = true;
    this.crud.addTask(this.signupForm.value);
    alert('Record Added successfully')
    this.tabelDataFunction();
    this.onPaginator();
    this.signupForm.reset();
  }

  sortTask(sort: Sort) {
    const data = this.tableDatas.slice();
    if (!sort.active || sort.direction === '') {
       this.listData = data;
       return;
    }
    this.listData = data.sort((a, b) => {
       const isAsc = sort.direction === 'asc';
       switch (sort.active) {
          case 'countryname': return compare(a.country_name, b.country_name, isAsc);
          case 'currancyname': return compare(a.currancy_name, b.currancy_name, isAsc);
          case 'a_code': return compare(a.a_code, b.a_code, isAsc);
          case 'n_code': return compare(a.n_code, b.n_code, isAsc);
          case 'status': return compare(a.status, b.status, isAsc);
          default: return 0;
       }
    });
 }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



