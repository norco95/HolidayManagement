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
      
        public List<UserDetails> Userlist { get; set; }

        public List<Team> TeamList { get; set; }
        public List<IdentityRole> RoleList { get; internal set; }
    }
}