using HolidayManagement.Models;
using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HolidayManagement.Repository;
using HolidayManagement.Migrations;

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
            DashboardViewModels dashboard = new DashboardViewModels()
            {
                Userlist = users,
                TeamList=teams
            };
         
            return View(dashboard);
           
        }
       


    }
}