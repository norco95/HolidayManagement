function RoleModel(data) {

    this.Name=ko.observable(null);
    this.Id = ko.observable(0);
    if (data != null) {
        this.Name (data.Name);
        this.Id(data.Id);
    }


};