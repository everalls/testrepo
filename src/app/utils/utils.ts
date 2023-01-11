export const cloneObject = (sourceObject: any): any => {
 if (typeof(sourceObject !== 'object')) {
    return sourceObject;
 }
 return JSON.parse(JSON.stringify(sourceObject));
}

