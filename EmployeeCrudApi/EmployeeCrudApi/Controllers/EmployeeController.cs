using EmployeeCrudApi.Data;
using EmployeeCrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCrudApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet]
        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        [HttpPost]
 [HttpPost]
[HttpPost]
public async Task<IActionResult> Create([FromBody] Employee employee)
{
    // Validar si el nombre es nulo o vacío
    if (string.IsNullOrWhiteSpace(employee.Name))
    {
        return BadRequest("El nombre no puede estar vacío.");
    }

    // Validar longitud mínima del nombre completo
    if (employee.Name.Length < 2)
    {
        return BadRequest("El nombre debe tener al menos 2 caracteres.");
    }

    // Validar longitud máxima del nombre
    if (employee.Name.Length > 100)
    {
        return BadRequest("El nombre no puede exceder los 100 caracteres.");
    }

    // Validar que cada parte del nombre tenga al menos dos letras
    var nameParts = employee.Name.Split(' ');
    foreach (var part in nameParts)
    {
        if (part.Length < 2)
        {
            return BadRequest("Cada parte del nombre debe tener al menos 2 caracteres.");
        }
    }

    // Validar que el nombre no contenga caracteres especiales o números innecesarios
    var regex = new System.Text.RegularExpressions.Regex(@"^[a-zA-ZÀ-ÿ'´ ]+$");
    if (!regex.IsMatch(employee.Name))
    {
        return BadRequest("El nombre contiene caracteres no permitidos.");
    }

    // Verificar si el empleado ya existe
    var exists = await _context.Employees.AnyAsync(e => e.Name == employee.Name);
    if (exists)
    {
        return BadRequest("El empleado ya existe.");
    }

    // Formatear el nombre y apellido
    for (int i = 0; i < nameParts.Length; i++)
    {
        if (i == nameParts.Length - 1)
        {
            // El último es el apellido, convertirlo en mayúsculas
            nameParts[i] = nameParts[i].ToUpper();
        }
        else
        {
            // El nombre con la primera letra en mayúscula
            nameParts[i] = char.ToUpper(nameParts[i][0]) + nameParts[i].Substring(1).ToLower();
        }
    }
    employee.Name = string.Join(" ", nameParts);

    // Asignar la fecha de creación
    employee.CreatedDate = DateTime.Now;

    // Agregar y guardar el empleado
    await _context.Employees.AddAsync(employee);
    await _context.SaveChangesAsync();

    return Ok("Empleado creado exitosamente.");
}


        [HttpPut]
        public async Task Update([FromBody] Employee employee)
        {
            Employee employeeToUpdate = await _context.Employees.FindAsync(employee.Id);
            employeeToUpdate.Name = employee.Name;
            await _context.SaveChangesAsync();
        }

        [HttpDelete]
        public async Task Delete(int id)
        {
            var employeeToDelete = await _context.Employees.FindAsync(id);
            _context.Remove(employeeToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
