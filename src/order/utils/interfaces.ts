export interface GetOrderParam {
    orderId: string
}

export interface GetReceiptParam {
    receiptId: string
}

export interface OrderPopulated {
    id: string,
    entry: string,
    device: string,
    code: string,
    createdAt: string,
    updatedAt?: string
}