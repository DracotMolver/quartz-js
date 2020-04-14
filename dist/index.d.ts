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
    readonly valuesByKeys: (keys: any[], values: any[]) => (content: any) => boolean;
    readonly valueByKey: (key: string, value: string) => (arg0: any) => boolean;
    readonly everyValue: (value: string | number | boolean, values: any[]) => boolean;
    readonly someValues: (arr: any[], values: any[]) => boolean;
    readonly someValue: (value: string | number | boolean, values: any[]) => boolean;
    readonly oneValue: (value: any) => (arg0: any) => boolean;
    readonly unique: (key: any) => (arg0: any) => boolean;
};
export var is: {
    readonly moreOrEqual: (value: any, size: number, isMoreOnly?: boolean) => boolean;
    readonly lessOrEqual: (value: any, size: number, isLessOnly?: boolean) => boolean;
    readonly exactSize: (value: any, size: number) => boolean;
    readonly password: (rules?: {
        minLength: number;
        maxLength: number;
        minAlpha: number;
        minNumber: number;
        minSameChar: number;
        allowSpace: boolean;
    }) => (arg0: string) => any;
    readonly truthty: (value: any) => boolean;
    readonly number: (value: string | number) => boolean;
    readonly email: (value: string) => boolean;
    readonly falsy: (value: any) => boolean;
    readonly alpha: (value: string) => boolean;
    readonly nan: (value: any) => boolean;
    readonly run: (value: string) => boolean;
    readonly url: (value: string) => boolean;
    readonly ip: (value: string) => boolean;
};
