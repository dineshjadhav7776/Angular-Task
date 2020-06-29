import { Injectable } from '@angular/core';
import { TaskData } from '../classes/TaskData';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  tasks =[];
  tableDatas : TaskData;

  constructor() { }
  getTotalTasks() {
    if(localStorage.getItem('tasks') === null) {
      this.tasks = [];
    } else {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return this.tasks;
  }

  addTask(task: TaskData) {
    this.tasks.push(task);
    let tasks = [];
    if(localStorage.getItem('tasks') === null) {
      tasks = [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.push(task); 
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  deleteTask(task: TaskData) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (task == this.tasks[i]) {
        this.tasks.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }
  }
  
  updateTask(oldtask:TaskData, newtask:TaskData) {
    let emps = JSON.parse(localStorage.getItem('tasks'));
    console.log(emps);
    
    for(let i = 0; i <emps.length; i++) {
      if(emps[i].country_name == oldtask.country_name && emps[i].currancy_name == oldtask.currancy_name &&  
        emps[i].a_code == oldtask.a_code && emps[i].n_code == oldtask.n_code 
        && emps[i].status == oldtask.status ) {
        emps[i].country_name = newtask.country_name;
        emps[i].currancy_name = newtask.currancy_name;
        emps[i].a_code = newtask.a_code;
        emps[i].n_code = newtask.n_code;
        emps[i].status = newtask.status;
      }
  }
  localStorage.setItem('tasks', JSON.stringify(emps));
  }
}
