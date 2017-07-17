function TeamModel(data)
{

    this.Name =ko.observable(null);
    this.Id = ko.observable(0);
    if(data!=null)
    {
        this.Name=data.Description;
        this.Id(data.ID);
    }


};