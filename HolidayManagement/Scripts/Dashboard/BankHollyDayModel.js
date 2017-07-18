function BankHollyDayModel(data) {

    this.Day = ko.observable(null);
    this.Month = ko.observable(null);
    this.Description = ko.observable(null);
    this.Id = ko.observable(null);
    if (data != null) {
     
        this.Id(data.ID);
        this.Month(data.Month);
        this.Day(data.Day);
        this.Description(data.Description);

    }


};