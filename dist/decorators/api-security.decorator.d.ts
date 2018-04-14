export interface IApiSecurityProperties {
    securityPropName: string;
    type: string;
    name: string;
    in: 'body' | 'query' | 'header';
}
export declare const ApiSecurity: (metadata: IApiSecurityProperties | IApiSecurityProperties[]) => (target: object, key?: any, descriptor?: any) => any;
