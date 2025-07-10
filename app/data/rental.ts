export interface Rental{
    id:number;
    Brand:string;
    Model:string;
    Year:number; 
    Price:number;
    Status:string;
}

const Cars : Rental[] = [
    { id:0, Brand:"BMW", Model:"M4", Year:2022, Price:30, Status:"Approved",},
    { id:1, Brand:"BMW", Model:"M3", Year:2020, Price:35, Status:"Rejected",},
    { id:2, Brand:"BMW", Model:"M2", Year:2024, Price:20, Status:"Panding",},
    { id:3, Brand:"BMW", Model:"M5", Year:2025, Price:50, Status:"Approved",},
    { id:4, Brand:"AMG", Model:"G63", Year:2024, Price:80, Status:"Approved",},
]

export default Cars;