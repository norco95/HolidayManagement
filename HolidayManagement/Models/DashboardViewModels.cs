using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;

namespace HolidayManagement.Models
{
    public class DashboardViewModels
    {
        public int actualYear { get; set; }

        public int actualMonth { get; set; }

        public List<UserDetails> Userlist { get; set; }

        public List<Team> TeamList { get; set; }
        public List<IdentityRole> RoleList { get; internal set; }

        public List<Vacation> VacationList { get; set; }

        public List<VacationState> VacationStateList { get; set; }

        public List<Days> DayList { get; set; }
        public List<BankHoliday> BankHollyDayList { get; internal set; }
    }
}