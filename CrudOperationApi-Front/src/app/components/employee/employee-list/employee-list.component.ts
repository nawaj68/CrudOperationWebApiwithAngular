import {Component, OnInit} from "@angular/core";
import { Employee } from "src/app/models/employee.model";
import { EmployeeService } from "src/app/services/employee.service";
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {


  employeeId: number;
  employee: Employee;
  employees: Employee[];

  displayedColumns: string[] = ["picture","name","address","gender","country","state","city","action"];
  dataSource: any;

  isLoadingResults = true;

  constructor(
    public employeeService: EmployeeService) {}

  ngOnInit(): void {

    this.employeeService.getAllEmployeeDetail()
    .subscribe(response => {
      this.dataSource=response;
      console.log(this.dataSource)
    });
  }

  remove(employeeId: number): void {
    if (employeeId) {
      var ans = confirm("Do you want to delete customer with Id: " + employeeId);  
      if(ans)
      {
        this.employeeService.delete(employeeId).subscribe((e) => {
          // this.messageService.success(this.message.deleteSuccess);
          // this.reload(true);
        });
      }
      
    }
  }
}
