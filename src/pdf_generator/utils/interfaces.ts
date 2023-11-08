export interface InjectOrderDataContent {
    id: number,
    firstName: string,
    lastName: string, 
    entry: string,
    device: string,
    code: string,
    user: string,
    createdAt: Date,
}

export interface InjectReceiptDataContent {
    id: number,
    firstName: string,
    lastName: string,
    description: string,
    user: string,
    createdAt: Date, 
    total: number,
    guarantee: string,
    paymentMethod: string
}
