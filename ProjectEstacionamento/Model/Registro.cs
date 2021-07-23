using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectEstacionamento.Model
{
    [Table("Registro")]
    public class Registro
    {
        [Column("Id")]
        public int Id { get; set; }

        [Column("Veiculo")]
        public string Veiculo { get; set; }
        
        [Column("Placa")]
        public string Placa { get; set; }

        [Column("Entrada")]
        public DateTime Entrada { get; set; }

        [Column("Saida")]
        public DateTime Saida { get; set; }
    }
}
