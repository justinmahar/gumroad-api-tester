/**
 * Combines an array of class names into one string, ignoring any undefined items.
 * @param classNames Array of class names to combine. Any undefine items will be ignored.
 * @returns A string combining all class names.
 */
export const combineClassNames = (...classNames: (string | undefined)[]): string => {
  return classNames.filter((cn) => cn && !!cn.trim()).join(' ');
};

export const fallbackSrc = (src: string) => {
  return (event: any) => {
    if (event?.target?.src) {
      event.target.src = src;
    }
  };
};
