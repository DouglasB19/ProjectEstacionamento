﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectEstacionamento.Configuracao;
using ProjectEstacionamento.Model;

namespace ProjectEstacionamento.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroController : ControllerBase
    {
        private readonly Contexto _context;

        public RegistroController(Contexto context)
        {
            _context = context;
        }

        // GET: api/Registro
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Registro>>> GetRegistro()
        {
            return await _context.Registro.ToListAsync();
        }

        // GET: api/Registro/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Registro>> GetRegistro(int id)
        {
            var registro = await _context.Registro.FindAsync(id);

            if (registro == null)
            {
                return NotFound();
            }

            return registro;
        }

        // PUT: api/Registro/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegistro(int id, [FromForm]Registro registro)
        {
            if (id != registro.Id)
            {
                return BadRequest();
            }

            _context.Entry(registro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Registro
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Registro>> PostRegistro([FromForm]Registro registro)
        {
            _context.Registro.Add(registro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegistro", new { id = registro.Id }, registro);
        }

        // DELETE: api/Registro/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistro(int id)
        {
            var registro = await _context.Registro.FindAsync(id);
            if (registro == null)
            {
                return NotFound();
            }

            _context.Registro.Remove(registro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegistroExists(int id)
        {
            return _context.Registro.Any(e => e.Id == id);
        }
    }
}
