

import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { OrderService } from "src/order/order.service";
import { Response } from "express";
import { ClientService } from "src/client/client.service";
import { createOrderPdfOutputhPath, orderGeneralConditions, phoneNumbers } from "./utils/constants";
import * as puppeteer from 'puppeteer';
import { cssMark } from "./utils/template";
import { InjectOrderDataContent, InjectReceiptDataContent } from "./utils/interfaces";
import { formatDate } from "src/utils/dateFormatter";
import { ReceiptService } from "src/receipt/receipt.service";
import { ReceiptModel } from "src/receipt/receipt.model";

@Injectable({})

export class PdfGeneratorService {

    constructor(private orderService: OrderService, private receiptService: ReceiptService) { }

    

    async createBufferPdf(content: string): Promise<Buffer> {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent(content);

            const buffer = await page.pdf({ path: createOrderPdfOutputhPath, format: 'A4' });

            await browser.close();

            return buffer;
        } catch (error) {
            throw new InternalServerErrorException(`Error in createBufferPdf: ${error}`);
        }


    }

    injectReceiptContent(receiptDataContent: InjectReceiptDataContent): string {
        const { id, firstName, lastName, description, user, createdAt, total, guarantee } = receiptDataContent;
        const formattedDate = formatDate(createdAt);
        const htmlContent: string = `
     
                <div class="orden-container">
            <div class="orden-sub-container">
                <div class="header-container">
                    <div class="img-container">
                        <img src="https://iili.io/Jq0wfQj.png" alt="Jq0wfQj.png" border="0" />
                    </div>
                    <div class="order-title-container">
                        <h2>Orden de servicio</h2>
                    </div>
                </div>
                
                <div class="quilmac-data-container">
                    <ul class="phone-numbers-container">
                    ${phoneNumbers.map((order, i) => {
            if (i < phoneNumbers.length - 1) {
                return `<li>${order}</li>`
            }
        }).join('')}
                    </ul>
                    <ul class="order-data-container">
                        <li class="data-li"><span class="li-pre">Recibo #:</span> ${id}</li>
                        <li class="data-li"><span class="li-pre">Día:</span> ${formattedDate}</li>
                        <li class="data-li"><span class="li-pre">Creada por:</span> ${user}</li>
                    </ul>
                </div>
                <ul class="client-data-container">
                    <li class="client-data-li">
                        <p class="data-li-title">Nombre y apellido:</p>
                        <p>${firstName} ${lastName}</p>
                    </li>
                    <li class="client-data-li">
                        <p class="data-li-title">Descripción:</p>
                        <p>${description}</p>
                    </li>
                    <li class="client-data-li">
                        <p class="data-li-title">Total</p>
                        <p>${total}</p>
                    </li>
                    <li class="client-data-li">
                        <p class="data-li-title">Garantía</p>
                        <p>${guarantee}</p>
                    </li>
                </ul>
                <div class="underline"></div>
            </div>
        </div>
      
        `;
        return htmlContent;
    }

    injectOrderContent(orderDataContent: InjectOrderDataContent): string {
        const { firstName, lastName, device, code, user, createdAt, id } = orderDataContent;
        const formattedDate = formatDate(createdAt);
        const htmlContent: string = `
     
                <div class="orden-container">
            <div class="orden-sub-container">
                <div class="header-container">
                    <div class="img-container">
                        <img src="https://iili.io/Jq0wfQj.png" alt="Jq0wfQj.png" border="0" />
                    </div>
                    <div class="order-title-container">
                        <h2>Orden de servicio</h2>
                    </div>
                </div>
                
                <div class="quilmac-data-container">
                    <ul class="phone-numbers-container">
                    ${phoneNumbers.map((order, i) => {
            if (i < phoneNumbers.length - 1) {
                return `<li class="data-li">${order}</li>`
            }
        }).join('')}
                    </ul>
                    <ul class="order-data-container">
                        <li class="data-li"><span class="li-pre">Orden #:</span> ${id}</li>
                        <li class="data-li"><span class="li-pre">Día:</span> ${formattedDate}</li>
                        <li class="data-li"><span class="li-pre">Creada por:</span> ${user}</li>
                    </ul>
                </div>
                <ul class="client-data-container">
                    <li class="client-data-li">
                        <p class="data-li-title">Nombre y apellido:</p>
                        <p>${firstName.toUpperCase()} ${lastName.toUpperCase()}</p>
                    </li>
                    <li class="client-data-li">
                        <p class="data-li-title">Equipo:</p>
                        <p>${device.toUpperCase()}</p>
                    </li>
                    <li class="client-data-li">
                        <p class="data-li-title">Código:</p>
                        <p>${code}</p>
                    </li>
                    <li class="client-data-li">
                        <p class="data-li-title">Problema detectado:</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde aperiam rerum perferendis saepe nobis sequi quisquam dignissimos pariatur fuga repudiandae cumque sed vitae deserunt tempore sunt, animi ducimus recusandae quos.</p>
                    </li>
                </ul>
                <div class="general-conditions">
                    <h2>Condiciones generales</h2>
                    <ul class="general-conditions-ul">
                    ${orderGeneralConditions.map(order => {
            return `<li>*${order}</li>`
        }).join('')}
                    </ul>
                </div>
            </div>
        </div>
      
        `;
        return htmlContent;
    }

    async createReceiptPdf(receiptId: number): Promise<Buffer> {
        const receipt = await this.receiptService.getOneReceipt(receiptId);
        const { id, description, total } = receipt;
        const receiptContent: InjectReceiptDataContent = {
            id,
            description,
            total,
            firstName: receipt.client.first_name,
            lastName: receipt.client.last_name,
            user: receipt.createdBy.username,
            guarantee: receipt.guaranteeTime.description,
            createdAt: receipt.createdAt,
            paymentMethod: receipt.paymentMethod.method
        };
        const htmlCode = this.injectReceiptContent(receiptContent);
        const content = `<html><head><style>${cssMark}</style></head><body>${htmlCode}</body></html > `;
        const buffer = this.createBufferPdf(content);
        console.log(buffer);
        return buffer;
    }

    async createOrderPdf(orderId: number): Promise<Buffer> {
        const order = await this.orderService.getOrder(orderId);
        const { id, device, code, entry, createdAt } = order;
        const orderContent: InjectOrderDataContent = {
            id,
            device,
            code,
            entry,
            createdAt,
            firstName: order.client.first_name,
            lastName: order.client.last_name,
            user: order.createdBy.username
        }
        const htmlCode = this.injectOrderContent(orderContent);
        const content = `<html><head><style>${cssMark}</style></head><body>${htmlCode}</body></html > `;
        const buffer = this.createBufferPdf(content);
        return buffer;
    }

}