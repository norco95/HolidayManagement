function VacationMondel(data) {


    this.id = ko.observable(null);
    this.stateid = ko.observable(null);
    this.userid = ko.observable(null);
    this.startdate = ko.observable(null);
    this.enddate = ko.observable(null);
    this.date = ko.observable(null);
    if (data != null) {
        this.id = ko.observable(data.ID);
        this.stateid = ko.observable(data.StateId);
        this.userid = ko.observable(date.UserId);
        this.startdate = ko.observable(data.StartDate);
        this.enddate = ko.observable(data.EndDate);
        this.date = ko.observable(data.Date);

    }

};