function UserModel(data) {
    
    
        this.email = ko.observable(null);
        this.firstName = ko.observable(null);
        this.lastName = ko.observable(null);
        this.hireDate = ko.observable(null);
        this.maxDays = ko.observable(null);
        if (data != null) {
            if (data.IdentityUser!=null)
            this.email(data.IdentityUser.Email);
            this.firstName(data.FirstName);
            this.lastName(data.LastName);
            var dateStr = data.HireDate.getFullYear().toString() +
                  data.HireDate.getMonth().toString() +
               data.HireDate.getDate().toString() +
                 data.HireDate.getHours().toString() +
                 data.HireDate.getMinutes().toString() +
                  data.HireDate.getSeconds().toString();

            this.hireDate(dateStr);
            this.maxDays(data.MaxDays);

        }

};