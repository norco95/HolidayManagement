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
using System.Web.Security;

namespace HolidayManagement.Controllers
{



    [Authorize]
    public class DashboardController : Controller
    {
        public UserDetailsRepository database = new UserDetailsRepository();
        public VacationRepository vacation = new VacationRepository();
        public VacationStateRepository vacationstate = new VacationStateRepository();
        public TeamRepository tdatabase = new TeamRepository();
        public BankHolidayRepository bank = new BankHolidayRepository();

        // GET: Dashboard
        public ActionResult Index()
        {


            var users = database.GetUsers();
            var teams = tdatabase.GetTeams();
            var roleStore = new RoleStore<IdentityRole>();
            var roleMngr = new RoleManager<IdentityRole>(roleStore);
            var banks = bank.GetBankHolidays();
            var vacations = CreateVacationList();
            var vacationstates = vacationstate.GetVacationStates();
            var actualUsermaxdays = maxdays();
            var actualuservacations = actualUsermaxdays-actuservacations();



            var roles = roleMngr.Roles.ToList();
            DashboardViewModels dashboard = new DashboardViewModels()
            {
                Userlist = users,
                TeamList = teams,
                RoleList = roles,
                VacationList = vacations,
                VacationStateList = vacationstates,
                BankHollyDayList = banks,
                ActualUserMaxDays= actualUsermaxdays,
                ActUserVacation= Convert.ToInt32(actualuservacations)

            };

            return View(dashboard);

        }

       private List<Vacation> CreateVacationList()
        {
            List<Vacation> vacationlist = new List<Vacation> { };
            VacationRepository vacations = new VacationRepository();
            HolidayManagementContext database = new HolidayManagementContext();
            var vac = vacations.GetVacations();
            foreach(var v in vac)
            {
                if(v.StateId==1 || v.StateId==4)
                {
                    vacationlist.Add(v);
                }
            }

           return vacationlist;
        }



        private int? maxdays()
        {
            HolidayManagementContext database = new HolidayManagementContext();
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDbContext.Create()));
            var currentUser = manager.FindById(User.Identity.GetUserId()).Id;
            var user = database.UsersDetails.FirstOrDefault(i => i.UID == currentUser);
            var maxday = user.MaxDays;
            return maxday;
        }

        [HttpPost]
        public ActionResult Accept(Vacation data)
        {
            HolidayManagementContext database = new HolidayManagementContext();
            bool success = false;
            var message = "";
            var vacation = database.Vacations.FirstOrDefault(i => i.ID == data.ID);

            vacation.StateId = 2;

            database.SaveChanges();
            success = true;
            var vacations = CreateVacationList();

            return Json(new { success = success, messages = message,vac=vacations}, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult Decline(Vacation data)
        {
            HolidayManagementContext database = new HolidayManagementContext();
            bool success = false;
            var message = "";
            var vacation = database.Vacations.FirstOrDefault(i => i.ID == data.ID);

            vacation.StateId = 3;
            vacation.Reason = data.Reason;

            database.SaveChanges();
            success = true;
            var vacations = CreateVacationList();

            return Json(new { success = success, messages = message, vac = vacations }, JsonRequestBehavior.DenyGet);
        }


        private int actuservacations()
        {

            HolidayManagementContext database = new HolidayManagementContext();
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDbContext.Create()));
            var currentUser = manager.FindById(User.Identity.GetUserId()).Id;
            var user = database.UsersDetails.FirstOrDefault(i => i.UID == currentUser);
            var actualuservacations = database.Vacations.Where(i => i.StateId != 3 && i.UserId == user.ID);
            int sumdays = 0;
            foreach (var act in actualuservacations)
            {
                sumdays += act.Vacationsdays;
            }

            return sumdays;
        }            
            



        [HttpPost]
        public ActionResult AddHoliday(Vacation data)
        {

            bool success = false;
            string message = "";

            if (data.EndDate<data.StartDate)
            {
                success = false;
                message = "invalid date input";
            }        
        else
            { 

         

            HolidayManagementContext database = new HolidayManagementContext();
            Vacation vac = new Vacation();
            vac = data;
            vac.Date = DateTime.Now;

            var userID = User.Identity.GetUserId();
            

            if (!string.IsNullOrEmpty(userID))
            {
                var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDbContext.Create()));
                var currentUser = manager.FindById(User.Identity.GetUserId()).Id;
                var user = database.UsersDetails.FirstOrDefault(i => i.UID == currentUser);


                if (data.UserId != 0)
                    vac.UserId = data.UserId;
                else
                {
                  
                    vac.UserId = user.ID;
                }


                double uservacationdays = (vac.EndDate - vac.StartDate).TotalDays;

                int countdays = 0;
                var bankholidays = database.BankHolidays.Where(i => i.Month >= data.StartDate.Month && i.Month <= data.EndDate.Month);

                var day = data.StartDate;
                for(int i=0;i<=uservacationdays;i++)
                {

                    if(!(day.DayOfWeek== DayOfWeek.Saturday || day.DayOfWeek== DayOfWeek.Sunday))
                    {
                        countdays++;
                    }
                    
                    day=day.AddDays(1);
                }

                foreach(var bank in bankholidays)
                {
                    if(bank.Month==data.StartDate.Month&&bank.Day>=data.StartDate.Day)
                    {
                        if (bank.Month == data.EndDate.Month && bank.Day <= data.EndDate.Day)
                        {
                            countdays--;
                        }
                    }

                   
                    if(bank.Month>data.StartDate.Month&&bank.Month<data.EndDate.Month)
                    {
                        countdays--;
                    }

                }


                    //  var actualuservacations = database.Vacations.Where(i => i.StateId != 3  && i.UserId==vac.UserId);
                    var actualuservacations = actuservacations();
              

                if (user.MaxDays >=countdays+actualuservacations)
                {
                    vac.StateId = 1;
                    vac.Vacationsdays = countdays;
                    database.Vacations.Add(vac);
                    database.SaveChanges();
                   
                    success = true;
                }
                else
                {
                   
                    message = "not enought day";
                }

            }



     }




            var VR = CreateVacationList();
            return Json(new { success = success, messages = message, vac=VR }, JsonRequestBehavior.DenyGet);




        }

    }
}
