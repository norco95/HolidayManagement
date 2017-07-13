function DashboardModel()
{
	this.test=ko.observable("alma");
}

function InitializeDashboardModel(data) {
    DashboardModel.instance = new DashboardModel();
 
    DashboardModel.instance.initialize(data);
 
    ko.applyBindings(DashboardModel.instance);
}
