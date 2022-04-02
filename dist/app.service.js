"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const barcode_entity_1 = require("./entitties/barcode.entity");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    createBarcode(createBartcodeDTO) {
        const barcode = new barcode_entity_1.BarcodeEntity();
        barcode.name = createBartcodeDTO.name;
        return barcode.save();
    }
    getBarcodes() {
        return barcode_entity_1.BarcodeEntity.find();
    }
    async resetStatuses() {
        const allBarcodes = await barcode_entity_1.BarcodeEntity.find();
        return Promise.all(allBarcodes.map(async (u) => {
            u.found = false;
            return await u.save();
        })).then(() => {
            return barcode_entity_1.BarcodeEntity.find();
        });
    }
    updateStates(updateStatesDTO) {
        return Promise.all(updateStatesDTO.map(async (u) => {
            const bar = await barcode_entity_1.BarcodeEntity.findOne({ id: u.barcodeId });
            bar.found = u.found;
            return await bar.save();
        })).then(() => {
            return barcode_entity_1.BarcodeEntity.find();
        });
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map