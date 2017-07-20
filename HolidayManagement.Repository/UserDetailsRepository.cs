using HolidayManagement.Repository.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.Linq;

namespace HolidayManagement.Repository
{
    public class UserDetailsRepository : BaseRepository<UserDetails>, IUserDetailsRepository
    {
        public UserDetails GetUserDetailsById(int userDetailsId)
        {
            return DbContext.UsersDetails.FirstOrDefault(x => x.ID == userDetailsId);
        }

        public List<UserDetails> GetUsers()
        {
            var users = DbContext.UsersDetails.ToList();

            foreach (var user in users)
            {
                if (user.Team != null)
                    user.Team.Users = null;

            }


           
            return users;
        }
    }
}

   
