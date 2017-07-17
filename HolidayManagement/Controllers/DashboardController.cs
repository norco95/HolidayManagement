using HolidayManagement.Models;
using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HolidayManagement.Repository;
using HolidayManagement.Migrations;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

namespace HolidayManagement.Controllers
{

  

    [Authorize]
    public class DashboardController : Controller
    {
        public UserDetailsRepository database = new UserDetailsRepository();
        public TeamRepository tdatabase = new TeamRepository();
        
        // GET: Dashboard
        public ActionResult Index()
        {
            
            var users = database.GetUsers();
            var teams = tdatabase.GetTeams();
            var roleStore = new RoleStore<IdentityRole>();
            var roleMngr = new RoleManager<IdentityRole>(roleStore);


            var roles = roleMngr.Roles.ToList();
            DashboardViewModels dashboard = new DashboardViewModels()
            {
                Userlist = users,
                TeamList=teams,
                RoleList = roles
            };
         
            return View(dashboard);
           
        }
       


    }
}