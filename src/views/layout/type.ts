interface MeanItem {
    id: string;
    name: string;
    routeLink?: string;
    childrens?: MeanItem[];
};


export type {
    MeanItem
}