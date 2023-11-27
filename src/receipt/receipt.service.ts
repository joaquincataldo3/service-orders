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
    private clientService: ClientService) {}

    async getAllReceipts(){
        try {
            const receipts = await this.receiptModel.findAll();
            return receipts;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Error en getAllOrders: ${error}`);
        }
    }

    async getOneReceipt(receiptId: number) {
        try {
            const receipt = await this.receiptModel.findByPk(receiptId, {
                include: ['createdBy', 'paymentMethod', 'guaranteeTime', 'client']
            });
            if(!receipt) throw new NotFoundException('Recibo no encontrado');
            return receipt;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Error en getOneReceit: ${error}`)
        }
    }

    async createReceipt (createReceiptDto: CreateReceiptDto, activeUser: UserModel) {
        try {
            const {first_name, last_name} = createReceiptDto;
            console.log(createReceiptDto);
            const {id} = activeUser;
            const clientId = await this.clientService.getClientId(first_name, last_name);
            const receipt = await this.receiptModel.create({
                ...createReceiptDto, 
                createdAt: Date.now(),
                client_id: clientId,
                created_by_id: id
            });
            return receipt;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Error en createReceipt: ${error}`)
        }
    }

    async updateOneReceipt (updateOneReceiptDto: CreateReceiptDto, activeUser: UserModel, receiptId: string) {
        try {
            const {first_name, last_name} = updateOneReceiptDto;
            const {id} = activeUser;
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
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Error en createReceipt: ${error}`)
        }
    }


}