/**
 * Combines an array of class names into one string, ignoring any undefined items.
 * @param classNames Array of class names to combine. Any undefine items will be ignored.
 * @returns A string combining all class names.
 */
export declare const combineClassNames: (...classNames: (string | undefined)[]) => string;
export declare const fallbackSrc: (src: string) => (event: any) => void;
