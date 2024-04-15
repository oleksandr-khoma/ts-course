interface IUnionIndexSignature {
    [key: string]: number | string;
}

interface IFuncIndexSignature {
    [key: string]: (...args: any[]) => any;
}

interface IArrayIndexSignature {
    [key: number]: any;
}

interface ISpecificProps {
    name: string;
    [key: string]: any;
}

interface IBaseIndexSignature {
    [key: string]: any;
}

interface IExtendedIndexSignature extends IBaseIndexSignature {
    specificProperty: string;
}

function checkValues(obj: IBaseIndexSignature, keys: string[]): boolean {
    return keys.every(key => typeof obj[key] === 'number');
}
