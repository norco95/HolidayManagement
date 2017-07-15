function TeamModel(data)
{

    this.Name =[];
    this.Id = ko.observable(0);
    if(data!=null)
    {
        this.Name=data.Description;
        this.Id(data.ID);
    }


};