import { ReactElement } from 'react';
export declare const defaultConfig: {
    path: string;
    localhostUrl: string;
    port: string;
    batchSize: number;
    maxWidth: number;
    backgroundColor: string;
    showDiffInGrayScale: boolean;
    quality: number;
};
export interface ScreenshotConfig {
    path?: string;
    localhostUrl?: string;
    port?: string;
    batchSize?: number;
    maxWidth?: number;
    backgroundColor?: string;
    showDiffInGrayScale?: boolean;
    quality?: number;
}
export interface Components {
    component: (props?: any) => ReactElement;
    title: string;
    id: string;
    description?: string;
    showDiffInGrayScale?: boolean;
    maxWidth?: number;
    backgroundColor?: string;
    quality?: number;
}
export declare const useScreenShotTest: (components: Components[], screenshotConfig?: ScreenshotConfig) => import("react/jsx-runtime").JSX.Element;
