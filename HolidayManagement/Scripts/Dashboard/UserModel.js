function UserModel(data) {
    
    
        this.email = ko.observable(null);
        this.firstName = ko.observable(null);
        this.lastName = ko.observable(null);
        this.hireDate = ko.observable(null);
        this.maxDays = ko.observable(null);
        this.team= new TeamModel();
        this.id = ko.observable(null);
        if (data != null) {
            if (data.IdentityUser!=null)
            this.email(data.IdentityUser.Email);
            this.firstName(data.FirstName);
            this.lastName(data.LastName);
            this.hireDate(data.HireDate);
            this.maxDays(data.MaxDays);
            this.team = new TeamModel(data.team);
            this.id(data.ID);
           
         }

};