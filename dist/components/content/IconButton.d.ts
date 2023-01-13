/// <reference types="react" />
import { ButtonProps } from 'react-bootstrap';
import { IconBaseProps, IconType } from 'react-icons';
interface IconButtonProps extends ButtonProps {
    /** Make button block-level by wrapping with div that has grid display */
    block?: boolean;
    /** The icon to use */
    icon: IconType;
    /** True to position icon at the end. Positions at start otherwise. */
    end?: boolean;
    /** Enable text wrapping. */
    wrap?: boolean;
    /** Props for icon */
    iconProps?: IconBaseProps;
}
export declare const IconButton: ({ block, icon, end, wrap, ...props }: IconButtonProps) => JSX.Element;
export {};
