using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HolidayManagement.Repository.Models
{
    public class Vacation
    {
        [Key]
        public int ID { get; set; }

        public int StateId { get; set; }

        public int UserId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime Date { get; set; }

        public int Vacationsdays { get; set; }

        public string Reason { get; set; }

        [ForeignKey("StateId")]
        public virtual VacationState State {get;set;}
        [ForeignKey("UserId")]
        public virtual UserDetails Users { get; set; }



    }
}
