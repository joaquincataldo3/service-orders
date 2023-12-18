import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ReceiptModel } from "./receipt.model";
import { CreateReceiptDto } from "./dto/dto";
import { ClientService } from "src/client/client.service";
import { UserModel } from "src/user/user.model";

@Injectable({})

export class ReceiptService {

    constructor(@InjectModel(ReceiptModel)
    private receiptModel: typeof ReceiptModel,
        private clientService: ClientService) { }

    async getAllReceipts(page: number, userId?: number): Promise<ReceiptModel[]> {
        const limit = 5;
        const offset = limit * (page - 1);
        const whereClause = userId ? { userId } : {};
        return this.receiptModel.findAll({
            where: whereClause,
            include: ['createdBy', 'client', 'orderStatus', 'updatedBy', 'paymentMethod', 'guaranteeTime'],
            limit,
            offset
        });
    }

    async getOneReceipt(receiptId: number) {
        const receipt = await this.receiptModel.findByPk(receiptId, {
            include: ['createdBy', 'client', 'orderStatus', 'updatedBy', 'paymentMethod', 'guaranteeTime']
        });
        if (!receipt) throw new NotFoundException('Receipt not found');
        return receipt;
    }

    async createReceipt(createReceiptDto: CreateReceiptDto, activeUser: UserModel) {
        const { first_name, last_name } = createReceiptDto;
        const { id } = activeUser;
        const clientId = await this.clientService.getClientId(first_name, last_name);
        const receipt = await this.receiptModel.create({
            ...createReceiptDto,
            createdAt: Date.now(),
            client_id: clientId,
            created_by_id: id
        });
        return receipt;
    }

    async updateOneReceipt(updateOneReceiptDto: CreateReceiptDto, activeUser: UserModel, receiptId: string) {
        const { first_name, last_name } = updateOneReceiptDto;
        const { id } = activeUser;
        const clientId = await this.clientService.getClientId(first_name, last_name);
        const [affectedCount]: [number] = await this.receiptModel.update({
            ...updateOneReceiptDto,
            createdAt: Date.now(),
            client_id: clientId,
            last_updated_by_id: id
        }, {
            where: {
                id: receiptId
            }
        });
        if (affectedCount == 0) throw new NotFoundException('Recibo no encontrado en updateOneReceipt');
        // update no devuelve el recurso actualizado, si no que devuelve el numero de filas afectadas, por eso hay que buscar el recibo
        const receipt = await this.receiptModel.findByPk(receiptId);
        return receipt;
    }


}