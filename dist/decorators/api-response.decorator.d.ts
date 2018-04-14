export declare const ApiResponse: (metadata: {
    status: number;
    description?: string;
    type?: any;
    isArray?: boolean;
    examples?: any;
}) => (target: any, key?: any, descriptor?: PropertyDescriptor) => any;
