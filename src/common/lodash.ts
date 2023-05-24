/* eslint-disable no-unused-vars */

const lodash = {
    values: (obj: object) => Object.keys(obj).map((key: string | number) => obj[key as keyof typeof obj]),
    find: (array: Array<any>, callback: (item: object | string | number) => boolean) => array.find((item: object | string | number) => callback(item)),
    filter: (array: Array<any>, callback: (item: object | string | number) => boolean) => array.filter((item: object | string | number) => callback(item)),
    findIndex: (array: Array<any>, callback: (item: object | string | number) => boolean) => array.findIndex((item: object | string | number) => callback(item)),
    isObjectEmpty: (obj: object) => !obj || !!(Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype),
    map: (array: Array<any>, callback: (item: object | string | number) => object | string | number) => array.map((item: object | string | number) => callback(item)),
};

export default lodash;
