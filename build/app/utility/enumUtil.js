"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusHelper = void 0;
const constant_1 = require("./constant");
class OrderStatusHelper {
    convertStringToEnumValue(orderStatus) {
        if (orderStatus === "pending")
            return constant_1.status.pending;
        else if (orderStatus === "approved")
            return constant_1.status.approved;
        else if (orderStatus === "rejected")
            return constant_1.status.rejected;
        else
            return constant_1.status.unknown;
    }
    convertEnumValueToString(orderStatus) {
        if (orderStatus === constant_1.status.pending)
            return "pending";
        else if (orderStatus === constant_1.status.approved)
            return "approved";
        else if (orderStatus === constant_1.status.rejected)
            return "rejected";
        else
            return "unknown";
    }
}
exports.orderStatusHelper = new OrderStatusHelper();
//# sourceMappingURL=enumUtil.js.map