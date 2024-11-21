interface Component {
    id: string;
    title: string;
    description: string;
    maxWidth: number;
    backgroundColor: string;
}
export interface Metadata {
    port: string;
    components: Component[];
}
export declare const addScreenShotToPath: (imageString: string, id: string, path: string, localhostUrl: string, port: string, showDiffInGrayScale: boolean) => Promise<{
    status: string;
}>;
export declare const generateHtmlFile: (path: string, metaData: Metadata, localhostUrl: string, port: string, maxWidth: number, backgroundColor: string) => Promise<{
    status: string;
}>;
export {};
