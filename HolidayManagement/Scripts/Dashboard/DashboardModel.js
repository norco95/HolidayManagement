function DashboardModel()
{
    var _self=this;
    this.teams = ko.observableArray(null);
    this.users = ko.observableArray(null);
    this.roles = ko.observableArray(null);
    this.manageUser = new UserModel();
   
    

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

        _self.teams(teams);
        _self.users(users);
        _self.roles(roles);
    } 
    
    this.isVisibleModal= ko.observable(true);
    this.email=ko.observable(null);
    this.errmes = ko.observable();
    this.isVisibleEdit = ko.observable(true);
    this.isVisibleCreate = ko.observable(false);

 
   
   
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
     this.createUser = function() {    
         $.ajax({
             type: "POST",
             url: "/Account/CreateUser/",
             data: {
                 hireDate: _self.manageUser.hireDate,
                 firstName: _self.manageUser.firstName,
                 lastName: _self.manageUser.lastName,
                 maxDays: _self.manageUser.maxDays,
                 
                IdentityUser: {
                        Email: _self.manageUser.email 
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
       
        
    };
 
    
    




function InitializeDashboardModel(data) {
    DashboardModel.instance = new DashboardModel();
 
    DashboardModel.instance.initialize(data);
 
    ko.applyBindings(DashboardModel.instance);
}
