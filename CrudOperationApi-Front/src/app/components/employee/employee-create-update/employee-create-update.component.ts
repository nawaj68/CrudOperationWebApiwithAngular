import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { distinctUntilChanged } from 'rxjs';
import { FormExtension } from 'src/app/configs/form-extension';
import { City } from 'src/app/models/city.model';
import { Country } from 'src/app/models/country.model';
import { Employee } from 'src/app/models/employee.model';
import { State } from 'src/app/models/state.model';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-create-update',
  templateUrl: './employee-create-update.component.html',
  styleUrls: ['./employee-create-update.component.scss']
})
export class EmployeeCreateUpdateComponent implements OnInit {

  errors: any;
  formData: any;

  employeeId: number;
  employeeForm: FormGroup;
  employeeFormValue: any;
  isEdit = false;

  picture: any;
  avaterPreview: any;
  employee: Employee;
  
  countryId: number;
  countries: Country[];
  filteredCountries: Country[];

  stateId: number;
  states: State[];
  filteredStates: State[];

  cityId: number;
  cities: City[];
  filteredCities: City[];

  public uploader: FileUploader;
  uploadUrl: string;

  genders = [
    {value: "Male", text: "Male"},
    {value: "Female", text: "Female"},
    {value: "Other", text: "Other"},
  ];


  constructor(
    public http: HttpClient,
    public fb: FormBuilder,
    public employeeService: EmployeeService,
    public countryService: CountryService,
    public stateService: StateService,
    public cityService: CityService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private acRoute: ActivatedRoute  ) {   }

  ngAfterViewInit(): void {  }

  ngOnInit(): void {
    this.acRoute.params.subscribe((params) => (this.employeeId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.employeeId;
    this.employeeForm = this.form;
    this.employeeForm.patchValue({ id: this.employeeId });
    this.getEmployeeDetail(this.employeeId);
    this.uploader = new FileUploader({});
    this.getCountry();
    this.employeeForm
      .get("countryId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (countryId: number) => {
          this.countryId = countryId;
          this.getState(countryId);
        },
      });
    this.employeeForm
      .get("stateId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (stateId: number) => {
          this.stateId = stateId;
          this.getCity(stateId);
        },
      });
    
  }

  getEmployeeDetail(employeeId: any) {
    if (!this.employeeId) return;
    this.employeeService.getEmployeeDetail(employeeId).subscribe({
      next: (res: any) => {
        if (res) {
          this.employee = res;
          this.form = res;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getCountry() {
    this.countryService.getAllCountryDetail().subscribe({
      next: (res: any) => {
        console.log(res)
        if (res) {
          this.countries = res;
          this.filteredCountries = res;
        }
      }
    });
  }

  getState(countryId?: number) {
    if (!countryId) return;
    this.stateService.getDropdownByCountry(countryId).subscribe({
      next: (res: any) => {
        if (res) {
          this.states = res;
          this.filteredStates = res;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getCity(stateId?: number) {
    if (!stateId) return;
    this.cityService.getDropdownByState(stateId).subscribe({
      next: (res: any) => {
        if (res) {
          this.cities = res;
          this.filteredCities = res;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  
  get form(): any {
    return this.fb.group({
      id: [0],
      name:["", Validators.required],
      address: ["", Validators.required],
      gender: ["Male", [Validators.required]],
      ssc: [false],
      hsc: [false],
      bsc: [false],
      msc: [false],
      countryId: [],
      stateId: [],
      cityId: [],
      picture: [""],
      pictureFile: []
    });
  }

  set form(data: any) {
    if (data !== null) {
      this.employeeForm.patchValue({
        id: data.id,
        name: data.name,
        address: data.address,
        gender: data.gender,
        ssc: data.ssc,
        hsc: data.hsc,
        bsc: data.bsc,
        msc: data.msc,
        countryId: data.countryId,
        stateId: data.stateId,
        cityId: data.cityId,
        picture: data.picture
      });

      this.avaterPreview = data.picture ? `${environment.baseUrl}/images/${data.picture}` : "";
      this.picture = data.picture;

    }
  }

  save(): void {
    this.errors = (this.employeeForm);
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.employeeFormValue = this.employeeForm.getRawValue();
    this.employeeForm.patchValue({ picture: this.picture });
    this.formData = FormExtension.toFormData(this.employeeForm);

    if (this.employeeFormValue.id > 0) {
      this.employeeService.updateEmployeeDetail(this.employeeFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          // this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['employeeList']);
        },
      });
    } else {
      console.log(this.formData)
      this.employeeService.addEmployeeDetail(this.formData).subscribe({
        next: (n: any) => {
          // this.messageService.success(this.message.saveSucess);
          this.router.navigate(['employeeList']);
        },
      });
    }
  }

  reset(): void {
    this.employeeForm.reset(this.form.value);
  }

  clearEmployee(): void {
    this.employeeForm.reset();
    this.employeeForm.markAsUntouched();
    // FormExtension.markAllAsUntoched(this.employeeForm);
  }

  uploadFileAttach($event: any) {
    const reader = new FileReader();
    const file = $event.target.files[0];
    console.log(file);
    this.employeeForm.get("image")?.updateValueAndValidity();
    // this.cd.markForCheck();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.employeeForm.patchValue({
          pictureFile: file,
        });
        this.picture = file;
        this.avaterPreview = reader.result as string;
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
      reader.onerror = () => { };
    }

    console.log(this.employeeForm);
    // reader.readAsDataURL(file)
  }
}
