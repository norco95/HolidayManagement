function TeamModel(data)
{

    this.Name =[];
    this.Id = 0;
    if(data!=null)
    {
        this.Name=data.Description;
        this.Id = data.Id;
    }


};