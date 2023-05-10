"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleData = exports.adminData = exports.roles = exports.status = exports.Paggination = void 0;
var Paggination;
(function (Paggination) {
    Paggination[Paggination["count"] = 3] = "count";
})(Paggination = exports.Paggination || (exports.Paggination = {}));
var status;
(function (status) {
    status[status["pending"] = 1] = "pending";
    status[status["approved"] = 2] = "approved";
    status[status["rejected"] = 3] = "rejected";
    status[status["unknown"] = 4] = "unknown";
})(status = exports.status || (exports.status = {}));
exports.roles = {
    ADMIN: 1,
    OWNER: 2
};
exports.adminData = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: "12345",
        role: exports.roles.ADMIN
    }
];
exports.roleData = [
    {
        _id: exports.roles.ADMIN,
        name: "admin"
    },
    {
        _id: exports.roles.OWNER,
        name: "owner"
    }
];
// type stringArray = string[]
// export type StringArray = stringArray[] 
//# sourceMappingURL=constant.js.map