function DashboardModel()
{
 
    var _self=this;
    this.teams = ko.observableArray(null);
    this.users = ko.observableArray(null);
    this.initialize = function (data) {

     var users= _.map(data.Userlist, function (user, index) {
            return new UserModel(user);
          


     });

     var teams = _.map(data.TeamList, function (team, index) {
         return new TeamModel(team);



     });

    
     this.manageUser = new UserModel();

    
     create = ko.observable(0);
     hireDate = ko.observable();
     firstName = ko.observable();
     lastName = ko.observable();
     maxDays = ko.observable();
     email = ko.observable();
  
     createUser = function()
     {
    
         $.ajax({
             type: "POST",
             url: "/Account/CreateUser/",
             data: {
                 hireDate: hireDate,
                 firstName: firstName,
                 lastName: lastName,
                 maxDays: maxDays,
                 email:email,
             },
             success: function (msg) {
                 // Do something interesting here.
             },
             dataType: "json"
         });
         window.open("https://www.w3schools.com");

     }
       
        _self.teams(teams);
      _self.users(users);
    };
 
    
    
}



function InitializeDashboardModel(data) {
    DashboardModel.instance = new DashboardModel();
 
    DashboardModel.instance.initialize(data);
 
    ko.applyBindings(DashboardModel.instance);
}
