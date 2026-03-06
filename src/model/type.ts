export interface CustomerModel {
    custID: string;
    custTitle: string;
    custName: string;
    DOB: string;
    salary: number;
    custAddress: string;
    city: string;
    province: string;
    postalcode: string;
}

export interface ItemModel{
    itemCode: string;
    description: string;
    packSize: string;
    unitPrice: number;
    qtyOnHand: number;
}

// export interface OrderModel{
//     orderID: string;
//     orderDate: Date;
//     custID: string;
// }


