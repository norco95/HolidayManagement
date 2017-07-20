using HolidayManagement.Repository.Interfaces;
using HolidayManagement.Repository.Models;
using System.Collections.Generic;
using System.Linq;
using System;

namespace HolidayManagement.Repository
{
    public class VacationRepository : BaseRepository<Vacation>, IVacationRepository
    {
        public Vacation GetVacationById(int vacationId)
        {
            return DbContext.Vacations.FirstOrDefault(x => x.ID == vacationId);
        }

        public List<Vacation> GetVacations()
        {
            var vacations= DbContext.Vacations.ToList();

            foreach (var vac in vacations)
            {
                if (vac.State != null)
                    vac.State.Vacations = null;

              
                  
                if (vac.Users.Team != null)
                    vac.Users.Team.Users = null;
                
               
            }

            return vacations;


        }

      
    }
}
