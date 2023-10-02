export const deleteProperties = (items: any[]) => {
    items.forEach((item: any) => {
        delete item.id;
        delete item.emploeeId;
        delete item.companyId;
    });
};