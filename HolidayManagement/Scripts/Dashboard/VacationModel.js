function VacationMondel(data) {


    this.id = ko.observable(null);
    this.stateid = ko.observable(null);
    this.userid = ko.observable(null);
    this.startdate = ko.observable(null);
    this.enddate = ko.observable(null);
    this.date = ko.observable(null);
    this.users = new UserModel();
  
    if (data != null) {
        this.id = ko.observable(data.ID);
        this.stateid = ko.observable(data.StateId);
        this.userid = ko.observable(data.UserId);
        this.startdate = ko.observable(data.StartDate);
        this.enddate = ko.observable(data.EndDate);
        this.date = ko.observable(data.Date);
        this.users=new UserModel(data.Users)
        

    }

};