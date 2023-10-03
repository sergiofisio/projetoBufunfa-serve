export const deleteProperties = (items: any[], properties: string[], secondProperty?: string, secoundProperties?: string[]) => {

    items.forEach((item: any) => {
        properties.forEach((property: string) => delete item[property]);
        if (secondProperty) {
            if (item[secondProperty]) {
                secoundProperties?.forEach((property: string) => {
                    delete item[secondProperty][property]
                });
            }
        }
    });
};