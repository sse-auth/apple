/// <reference types="react" />
export interface AppleLoginProps {
    clientId: string;
    redirectURI: string;
    autoLoad?: boolean;
    scope?: string;
    state?: string;
    responseType?: string | "code" | "id_token";
    responseMode?: string | "query" | "fragment" | "form_post";
    nonce?: string;
    usePopup?: boolean;
    designProp?: {
        height?: number;
        width?: number;
        color?: string | "white" | "black";
        border?: boolean;
        type?: string | "sign-in" | "continue";
        border_radius?: number;
        scale?: number;
        locale?: string;
    };
    callback?: (d: any) => void;
    render?: (props: {
        onClick: (e?: any) => void;
        disabled?: boolean;
    }) => JSX.Element;
}
declare const AppleLogin: (props: AppleLoginProps) => JSX.Element;
export { AppleLogin };
export default AppleLogin;
//# sourceMappingURL=index.d.ts.map