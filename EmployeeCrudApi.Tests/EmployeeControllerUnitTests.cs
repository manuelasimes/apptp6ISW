
using EmployeeCrudApi.Controllers;
using EmployeeCrudApi.Data;
using EmployeeCrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Xunit;

namespace EmployeeCrudApi.Tests
{
    public class EmployeeControllerTests
    {
        private ApplicationDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new ApplicationDbContext(options);
        }

        [Fact]
        public async Task GetAll_ReturnsListOfEmployees()
        {
            var context = GetInMemoryDbContext();
            context.Employees.AddRange(
                new Employee { Id = 1, Name = "John Doe" },
                new Employee { Id = 2, Name = "Jane Doe" }
            );
            context.SaveChanges();

            var controller = new EmployeeController(context);

            var result = await controller.GetAll();

            Assert.Equal(2, result.Count);
            Assert.Equal("John Doe", result[0].Name);
            Assert.Equal("Jane Doe", result[1].Name);
        }

        [Fact]
        public async Task GetById_ReturnsEmployeeById()
        {
            var context = GetInMemoryDbContext();
            context.Employees.Add(new Employee { Id = 1, Name = "John Doe" });
            context.SaveChanges();

            var controller = new EmployeeController(context);

            var result = await controller.GetById(1);

            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal("John Doe", result.Name);
        }

        [Fact]
        public async Task Create_AddsEmployee()
        {
            var context = GetInMemoryDbContext();
            var controller = new EmployeeController(context);

            var newEmployee = new Employee { Id = 3, Name = "New Employee" };

            await controller.Create(newEmployee);

            var employee = await context.Employees.FindAsync(3);
            Assert.NotNull(employee);
            Assert.Equal("New EMPLOYEE", employee.Name); // Verifica el formato esperado
        }

        // Nuevas pruebas unitarias

        [Fact]
        public async Task Create_ReturnsBadRequest_WhenNameIsEmpty()
        {
            var context = GetInMemoryDbContext();
            var controller = new EmployeeController(context);
            var newEmployee = new Employee { Id = 4, Name = "" };

            var result = await controller.Create(newEmployee);

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("El nombre no puede estar vacío.", badRequestResult.Value);
        }

        [Fact]
        public async Task Create_ReturnsBadRequest_WhenNameIsTooShort()
        {
            var context = GetInMemoryDbContext();
            var controller = new EmployeeController(context);
            var newEmployee = new Employee { Id = 5, Name = "A" };

            var result = await controller.Create(newEmployee);

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("El nombre debe tener al menos 2 caracteres.", badRequestResult.Value);
        }

        [Fact]
        public async Task Create_ReturnsBadRequest_WhenNameIsTooLong()
        {
            var context = GetInMemoryDbContext();
            var controller = new EmployeeController(context);
            var longName = new string('A', 101);
            var newEmployee = new Employee { Id = 6, Name = longName };

            var result = await controller.Create(newEmployee);

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("El nombre no puede exceder los 100 caracteres.", badRequestResult.Value);
        }

        [Fact]
        public async Task Create_ReturnsBadRequest_WhenNameHasInvalidCharacters()
        {
            var context = GetInMemoryDbContext();
            var controller = new EmployeeController(context);
            var newEmployee = new Employee { Id = 7, Name = "John123 Doe!" };

            var result = await controller.Create(newEmployee);

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("El nombre contiene caracteres no permitidos.", badRequestResult.Value);
        }

        [Fact]
        public async Task Create_CreatesEmployee_WhenNameIsValid()
        {
            var context = GetInMemoryDbContext();
            var controller = new EmployeeController(context);
            var newEmployee = new Employee { Id = 8, Name = "John Doe" };

            var result = await controller.Create(newEmployee);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Empleado creado exitosamente.", okResult.Value);

            var employee = await context.Employees.FindAsync(8);
            Assert.NotNull(employee);
            Assert.Equal("John DOE", employee.Name);  // Verifica el formato del nombre
        }

        [Fact]
        public async Task Update_UpdatesEmployee()
        {
            var context = GetInMemoryDbContext();
            var existingEmployee = new Employee { Id = 1, Name = "Old Name" };
            context.Employees.Add(existingEmployee);
            context.SaveChanges();

            var controller = new EmployeeController(context);

            var updatedEmployee = new Employee { Id = 1, Name = "Updated Name" };

            await controller.Update(updatedEmployee);

            var employee = await context.Employees.FindAsync(1);
            Assert.NotNull(employee);
            Assert.Equal("Updated Name", employee.Name);
        }

        [Fact]
        public async Task Delete_RemovesEmployee()
        {
            var context = GetInMemoryDbContext();
            var employeeToDelete = new Employee { Id = 1, Name = "John Doe" };
            context.Employees.Add(employeeToDelete);
            context.SaveChanges();

            var controller = new EmployeeController(context);

            await controller.Delete(1);

            var employee = await context.Employees.FindAsync(1);
            Assert.Null(employee); // Verifica que el empleado fue eliminado
        }
    }
}
