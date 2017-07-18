function DaysModel(data) {

    this.Day = ko.observable(null);
    this.Month = ko.observable(null);
    this.Description = ko.observable(null);
    this.Freeday = ko.observable(0);
    this.BankHolliday = new BankHollyDayModel();
    if (data != null) {

       
        this.Month(data.Month);
        this.Day(data.Day);
        this.Description(data.Description);
        this.Freeday(data.Freeday);
        this.BankHolliday = new BankHollyDayModel(data);

    }


};