interface ModalBodyProps {
    title: string;
    body?: any;
    onDismiss: () => void;
}
export declare const ModalBody: (props: ModalBodyProps) => import("react/jsx-runtime").JSX.Element;
export declare const Loader: ({ offset, batchSize, }: {
    offset: number;
    batchSize: number;
}) => import("react/jsx-runtime").JSX.Element;
export {};
