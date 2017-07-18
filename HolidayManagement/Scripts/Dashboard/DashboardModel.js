function DashboardModel()
{
    var _self=this;
    this.teams = ko.observableArray(null);
    this.toDate = ko.observable("");
    this.fromDate = ko.observable(null);
    this.users = ko.observableArray(null);
    this.roles = ko.observableArray(null);
    this.calendar = ko.observableArray(null);
    this.daysofmonth = ko.observableArray(null);
    this.banks=ko.observableArray(null);
    this.Month = ko.observable(null);
    this.isVisibleModal = ko.observable(true);
    this.email = ko.observable(null);
    this.errmes = ko.observable();
    this.isVisibleEdit = ko.observable(true);
    this.isVisibleCreate = ko.observable(false);
    this.actualmonth = ko.observable(null);
    this.actualyear = ko.observable(null);
    this.manageUser = new UserModel();
   


    this.newHoliday = function()
    {

        var s = _self.toDate();
        alert(s);
        //$.ajax({
        //    type: "POST",
        //    url: "/Dashboard/AddHoliday/",
        //    data: {
        //        StartDate: _self.fromDate(),
        //        EndDate: _self.toDate()
        //    },
        //    success: function (msg) {
        //        if (msg.success == true) {


        //            $("#myModals").modal("hide");
                 
        //        }
        //        else {
        //            _self.errmes(msg.messages);
        //        }
        //    },
        //    dataType: "json"
        //});
    }
    
    this.initialize = function (data) {

        var users= _.map(data.Userlist, function (user, index) {
            return new UserModel(user);
        });

        var teams = _.map(data.TeamList, function (team, index) {
            return new TeamModel(team);
        });

        var roles = _.map(data.RoleList, function (role, index) {
            return new RoleModel(role);
        });

        var banks = _.map(data.BankHollyDayList, function (bank, index) {
            return new BankHollyDayModel(bank);
        });
        _self.banks(banks);
        var weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
       
        var months = new Array(7);
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";

      

       
        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }
        var d = new Date();
        var n = d.getMonth();
        _self.actualmonth=n;
        var y = d.getFullYear();
        _self.actualyear = y;
        _self.Month(months[n]);
        var month = daysInMonth(n+1, y);
        var firstDay = new Date(y, n, 1);
        var l = firstDay.getDay()
        for (var i = 0; i < month; i++) {


            var s= new DaysModel();
            s.Day = i;

           
            s.Description = (i+1).toString()+" "+ weekday[l % 7].toString();
            l++;
            s.Month = n;
            if (l % 7 == 1 || l % 7 == 0) {
                s.Freeday(1);
            }
            else {
                s.Freeday(0);
            }
            banks.forEach(function (element) {
                if (element.Month() == (n+1) && element.Day() == i) {
                 
                    s.BankHolliday = element;
                    s.Freeday(1);
                }
            });
            _self.calendar.push(s);

        }

        _self.banks(banks);
        _self.teams(teams);
        _self.users(users);
        _self.roles(roles);
    

    } 
    
    this.createButtons = function(iseditvisible,data)
    {
       
            _self.isVisibleEdit(iseditvisible);
            _self.isVisibleCreate(!iseditvisible);
         
            if (iseditvisible == true)
            {
                _self.manageUser.id(data.id());
                _self.manageUser.email(data.email());
                _self.manageUser.firstName(data.firstName());
                _self.manageUser.lastName(data.lastName());
                _self.manageUser.hireDate(data.hireDate());
                _self.manageUser.maxDays(data.maxDays());
                
            }
            else
            {
                _self.manageUser.email("");
                _self.manageUser.firstName("");
                _self.manageUser.lastName("");
                _self.manageUser.hireDate("");
                _self.manageUser.maxDays("");
                _self.errmes("");
            }

    }
    
    this.next=function()
    {
        _self.calendar(null);

        var calendar = new Array();

        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var months = new Array(7);
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";
        if (_self.actualmonth == 11) {
            _self.actualyear = _self.actualyear +1;
            _self.actualmonth = 0;
        }
        else {
            _self.actualmonth = _self.actualmonth +1;
        }

        _self.Month(months[_self.actualmonth]);

        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }



        var month = daysInMonth(_self.actualmonth + 1, _self.actualyear);
        var firstDay = new Date(_self.actualyear, _self.actualmonth, 1);
        var l = firstDay.getDay()
        for (var i = 0; i < month; i++) {


            var s = new DaysModel();
            s.Day = i;


            s.Description = (i + 1).toString() + " " + weekday[l % 7].toString();
            l++;
            s.Month = _self.actualmonth;
            if (l % 7 == 1 || l % 7 == 0) {
                s.Freeday(1);
            }
            else {
                s.Freeday(0);
            }
            var mybanks = _self.banks();
            mybanks.forEach(function (element) {
                if (element.Month() == (_self.actualmonth + 1) && element.Day() == (i+1)) {

                    s.BankHolliday = element;
                    s.Freeday(1);
                }
            });
            calendar.push(s);

        }
        _self.calendar(calendar);


    }
     
    this.previous=function()
    {
        _self.calendar(null);
        var calendar = new Array();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var months = new Array(7);
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";
        if (_self.actualmonth == 0) {
            _self.actualyear = _self.actualyear - 1;
            _self.actualmonth = 11;
        }
        else
        {
            _self.actualmonth = _self.actualmonth - 1;
        }

        _self.Month(months[_self.actualmonth]);




        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }
       
       
       
        var month = daysInMonth(_self.actualmonth + 1, _self.actualyear);
        var firstDay = new Date(_self.actualyear, _self.actualmonth, 1);
        var l = firstDay.getDay()
        for (var i = 0; i < month; i++) {


           var s = new DaysModel();
            s.Day = i;


            s.Description = (i + 1).toString() + " " + weekday[l % 7].toString();
            l++;
           s.Month = _self.actualmonth;
            if (l % 7 == 1 || l % 7 == 0) {
                s.Freeday(1);
            }
            else {
                s.Freeday(0);
            }
            var mybanks = _self.banks();
            mybanks.forEach(function (element) {
                if (element.Month() == (_self.actualmonth + 1) && element.Day() == (i+1)) {

                    s.BankHolliday = element;
                    s.Freeday(1);
                }
            });
           calendar.push(s);

       }
        _self.calendar(calendar);


     





           
    }

    this.editUser=function()
    {
        $.ajax({
            type: "POST",
            url: "/Account/EditUser/",
            data: {
                hireDate: _self.manageUser.hireDate,
                firstName: _self.manageUser.firstName,
                lastName: _self.manageUser.lastName,
                maxDays: _self.manageUser.maxDays,
                id: _self.manageUser.id,
                IdentityUser: {
                    Email: _self.manageUser.email
                 
                },
                IdentityRole:
                    {
                        Id: _self.manageUser.role.Id
                    },
                teamId: _self.manageUser.team.ID,
               
            },
           
          

            success: function (msg) {

                if (msg.success == true) {


                   
                    var users = _.map(msg.newUser, function (user, index) {
                        return new UserModel(user);
                    })

                    _self.users(users);
                    $("#myModal").modal("hide");
                    _self.errmes(" ");


                }
                else {
                    _self.errmes(msg.messages);
                }
            }
        });
        
    }
     
    this.createUser = function () {
         $.ajax({
             type: "POST",
             url: "/Account/CreateUser/",
             data: {
                 hireDate: _self.manageUser.hireDate(),
                 firstName: _self.manageUser.firstName(),
                 lastName: _self.manageUser.lastName(),
                 maxDays: _self.manageUser.maxDays(),

                IdentityUser: {
                    Email: _self.manageUser.email(),
                    Roles: [{ RoleId: _self.manageUser.role.Id }]
                },
                
                
               
                teamId: _self.manageUser.team.ID
             },
             success: function (msg) {
                 if (msg.success == true) {     
                   
                    
                     _self.manageUser.id(msg.newUser.ID);
                
                     _self.users.push(_self.manageUser);

                

                     $("#myModal").modal("hide");
                     _self.errmes("");
                 
                     
                 }
                 else
                 {
                     _self.errmes(msg.messages);
                 }
              },
             dataType: "json"
         });
   }

    var setDateWithZero = function (date) {
        if (date < 10)
            date = "0" + date;

        return date;
    };

    var dateTimeReviver = function (value) {
        var match;

        if (typeof value === 'string') {
            match = /\/Date\((\d*)\)\//.exec(value);
            if (match) {
                var date = new Date(+match[1]);
                return date.getFullYear() + "-" + setDateWithZero(date.getMonth() + 1) + "-" + setDateWithZero(date.getDate()) +
                       "T" + setDateWithZero(date.getHours()) + ":" + setDateWithZero(date.getMinutes()) + ":" + setDateWithZero(date.getSeconds()) + "." + date.getMilliseconds();

            }
        }
        return value;
    };
 };
 
 function InitializeDashboardModel(data) {
    DashboardModel.instance = new DashboardModel();
 
    DashboardModel.instance.initialize(data);
 
    ko.applyBindings(DashboardModel.instance);
}
