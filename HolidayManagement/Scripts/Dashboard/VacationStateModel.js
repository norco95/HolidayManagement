function BankHollyDayModel(data) {

    
    this.Description = ko.observable(null);
    this.Id = ko.observable(null);
    if (data != null) {

        this.Id(data.ID);
        this.Month(data.Description);
   

    }


};