using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HolidayManagement.Repository.Models
{
    public class VacationState
    {
        [Key]
        public int ID { get; set; }
        
        public string Description { get; set; }

        public virtual ICollection<Vacation> Vacations { get; set; }
        
    }
}
