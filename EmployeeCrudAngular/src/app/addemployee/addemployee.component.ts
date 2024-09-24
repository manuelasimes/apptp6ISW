import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Importa solo el servicio
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, FormsModule],  // NO incluir ToastrModule aquí
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AddemployeeComponent implements OnInit {
  newEmployee: Employee = new Employee(0, '', '');
  employeesList: Employee[] = [];
  submitBtnText: string = "Create";
  imgLoadingDisplay: string = 'none';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService  // Inyecta el servicio de Toastr
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const employeeId = params['id'];
      if (employeeId) this.editEmployee(employeeId);
    });
  }

  addEmployee(employee: Employee) {
    if (employee.name.trim() === "") {
      this.toastr.error("El nombre no puede estar vacío.");
      return;
    }

    if (employee.name.length < 2) {
      this.toastr.error("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (employee.name.length > 100) {
      this.toastr.error("El nombre no puede exceder los 100 caracteres.");
      return;
    }

    const nameParts = employee.name.split(' ');
    for (let part of nameParts) {
      if (part.length < 2) {
        this.toastr.error("Cada parte del nombre debe tener al menos 2 caracteres.");
        return;
      }
    }

    const regex = /^[a-zA-ZÀ-ÿ'´ ]+$/;
    if (!regex.test(employee.name)) {
      this.toastr.error("El nombre contiene caracteres no permitidos.");
      return;
    }

    for (let i = 0; i < nameParts.length; i++) {
      if (i === nameParts.length - 1) {
        nameParts[i] = nameParts[i].toUpperCase();
      } else {
        nameParts[i] = nameParts[i][0].toUpperCase() + nameParts[i].substring(1).toLowerCase();
      }
    }
    employee.name = nameParts.join(' ');

    // Evitar nombres repetidos
    const existingEmployee = this.employeesList.find(emp => emp.name === employee.name);
    if (existingEmployee) {
      this.toastr.error("El nombre del empleado ya existe.");
      return;
    }

    // Añadir empleado a la lista local
    if (employee.id === 0) {
      employee.id = this.employeesList.length + 1; // Generar un ID local
      employee.createdDate = new Date().toISOString();
      this.employeesList.push(employee);
      this.toastr.success("Empleado creado exitosamente.");
    } else {
      const index = this.employeesList.findIndex(emp => emp.id === employee.id);
      if (index !== -1) {
        this.employeesList[index] = employee;
        this.toastr.success("Empleado actualizado exitosamente.");
      }
    }

    // Resetear el formulario
    this.newEmployee = new Employee(0, '', '');
    this.submitBtnText = "Create";
    this.imgLoadingDisplay = 'none';
  }

  editEmployee(employeeId: number) {
    const employee = this.employeesList.find(emp => emp.id === employeeId);
    if (employee) {
      this.newEmployee.id = employee.id;
      this.newEmployee.name = employee.name;
      this.submitBtnText = "Edit";
    }
  }
}
