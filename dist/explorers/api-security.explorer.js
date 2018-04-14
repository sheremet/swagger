"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
exports.pushCustomSecurities = (security, method) => {
    const customSecurities = Reflect.getMetadata(constants_1.DECORATORS.API_SECURITY, method);
    if (customSecurities && customSecurities.length) {
        for (const sec of customSecurities) {
            const customSecurity = Object.assign({}, sec);
            const propName = customSecurity.securityPropName;
            delete customSecurity.securityPropName;
            security.push({ [propName]: customSecurity });
        }
    }
};
exports.exploreGlobalApiSecurityMetadata = metatype => {
    const bearer = Reflect.getMetadata(constants_1.DECORATORS.API_BEARER, metatype);
    const oauth2 = Reflect.getMetadata(constants_1.DECORATORS.API_OAUTH2, metatype);
    const security = [];
    bearer && security.push({ bearer });
    oauth2 && security.push({ oauth2 });
    exports.pushCustomSecurities(security, metatype);
    return security.length > 0 ? { security } : undefined;
};
exports.exploreApiSecurityMetadata = (instance, prototype, method) => {
    const bearer = Reflect.getMetadata(constants_1.DECORATORS.API_BEARER, method);
    const oauth2 = Reflect.getMetadata(constants_1.DECORATORS.API_OAUTH2, method);
    const security = [];
    bearer && security.push({ bearer });
    oauth2 && security.push({ oauth2 });
    exports.pushCustomSecurities(security, method);
    return security.length ? security : undefined;
};
