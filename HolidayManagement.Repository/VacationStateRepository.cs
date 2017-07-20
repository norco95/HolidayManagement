using HolidayManagement.Repository.Interfaces;
using HolidayManagement.Repository.Models;
using System.Collections.Generic;
using System.Linq;

namespace HolidayManagement.Repository
{
    public class VacationStateRepository : BaseRepository<VacationState>, IVacationStateRepository
    {
        public VacationState GetVacationStateById(int vacationStateId)
        {
            return DbContext.VacationStates.FirstOrDefault(x => x.ID == vacationStateId);
        }

        public List<VacationState> GetVacationStates()
        {
          
            var vacationStates = DbContext.VacationStates.ToList();


            foreach (var state in vacationStates)
            {
                if (state.Vacations != null)
                    foreach (var vacation in state.Vacations)
                    {
                        vacation.State = null;

                        if (vacation.Users.Team != null)
                            vacation.Users.Team.Users = null;
                    }
            }

            return vacationStates;
        }
    }
}
