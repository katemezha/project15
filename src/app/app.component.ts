import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  MyWorker,
  MyWorkerType,
} from './shared/worker.model';

import { HttpWorkerService } from './shared/services/http-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Список сотрудников';
  workers: MyWorker[];
  myWorkerType = MyWorkerType;
  workerEdit: any;
  id: any;
  name: any;
  surname: any;
  phone: any
  type: any;
  modal = false;
  searchStr = '';


  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    id: new FormControl(''),
  });

  public mask = ['+', 7, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor(private httpWorkerService: HttpWorkerService) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      this.workers = await this.httpWorkerService.getWorkers();
    } catch (err) {
      console.log(err);
    }
  }

  getByType(type: number) {
    return this.workers.filter((worker) => worker.type === type);
  }

  async onDeleteById(id: number) {
    try {
      await this.httpWorkerService.deleteWorker(id);
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }


  async onAddWorker(worker: MyWorker) {
    try {
      let id =
        this.workers.length > 0
          ? this.workers[this.workers.length - 1].id + 1
          : 1;
      worker.id = id;
    await this.httpWorkerService.postWorker(worker);
  } catch (err) {
    console.error(err);
  } finally {
    this.getData();
  }
  }

  onEditById(worker){
    this.workerEdit = worker;
    this.modal = !this.modal;
    this.id = this.workerEdit.id;
    this.name = this.workerEdit.name;
    this.surname = this.workerEdit.surname;
    this.phone = this.workerEdit.phone;
    this.type = this.workerEdit.type;
  }


  onEditData(){
    for(let i = 0; i < this.workers.length; i++){
      if(this.workers[i].id == this.editForm.get("id").value){
        this.workers[i].name = this.name;
        this.workers[i].surname = this.surname;
        this.workers[i].phone = this.phone;
        this.workers[i].type = this.type;
        this.updateData(this.workers[i]);
        this.modal = !this.modal;
      }
    }
  }

  async updateData(data: MyWorker){
    try{
      await this.httpWorkerService.editWorker(data);
    } catch (err){
      console.log(err);
    }
  }

  onClose(): void{
    this.modal = !this.modal;
  }
}