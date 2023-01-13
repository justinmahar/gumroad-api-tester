/// <reference types="react" />
import { DivPropsWithoutRef } from 'react-html-props';
interface Props extends DivPropsWithoutRef {
    json: unknown;
}
export declare const ContextualResults: ({ json, ...divProps }: Props) => JSX.Element;
export {};
