import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  data:any;
  employeeId: number;
  employees: Employee[];

  constructor(
    public employeeService: EmployeeService,
    private acRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.acRoute.params.subscribe((params) => (this.employeeId = params["id"] ? Number(params["id"]) : 0));
    this.employeeService.getEmployeeDetail(this.employeeId)
    .subscribe(response => {
      this.data=response;
      console.log(response)
    });
  }

 

}
