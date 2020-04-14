export var tools: {
    readonly upperParagraph: (text: string, byWord?: boolean) => string;
    readonly camelCase: (text: string) => string;
    readonly compress: (array: any[], key: string, value: string) => any;
    readonly compose: (...func: any[]) => (arg0: any) => any;
    readonly obj2Arr: (obj: any) => any[];
    readonly pipeVal: (func: Function) => (arg0: any) => any;
    readonly clone: (obj1: any, obj2: any) => any;
    readonly pipe: (...func: any[]) => (arg0: any) => any;
};
export var has: {
    readonly valueByKey: (key: string, value: any) => (arg0: any) => boolean;
    readonly everyValue: (value: string | number | boolean, values: any[]) => boolean;
    readonly someValues: (arr: any[], values: any[]) => boolean;
    readonly someValue: (value: string | number | boolean, values: any[]) => boolean;
    readonly oneValue: (value: any) => (arg0: any) => boolean;
    readonly unique: (key: any) => (arg0: any) => boolean;
};
export var is: any;
