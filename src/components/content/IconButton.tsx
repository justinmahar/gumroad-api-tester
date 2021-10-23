import { IconType } from '@react-icons/all-files';
import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { combineClassNames } from '../component-utils';

interface IconButtonProps extends ButtonProps {
  /** Make button block-level by wrapping with div that has grid display */
  block?: boolean;
  /** The icon to use */
  icon: IconType;
  /** True to position icon at the end. Positions at start otherwise. */
  end?: boolean;
  /** Enable text wrapping. */
  wrap?: boolean;
}

export const IconButton = ({ block, icon, end, wrap, ...props }: IconButtonProps): JSX.Element => {
  const Icon = icon;
  const iconOnly = typeof props.children === 'undefined';

  const buttonElement = (
    <Button {...props} className={combineClassNames(iconOnly ? 'position-relative' : undefined, props.className)}>
      {iconOnly && (
        <>
          <Icon className="position-absolute top-50 start-50 translate-middle" />
          <Icon className="invisible" />
        </>
      )}
      {!iconOnly && (
        <div
          className={combineClassNames(
            'd-flex align-items-center justify-content-center gap-2',
            wrap ? 'flex-wrap' : 'text-nowrap',
          )}
        >
          {<Icon className={end ? 'order-last' : undefined} />}
          <div>{props.children}</div>
        </div>
      )}
    </Button>
  );

  return block ? <div className="d-grid">{buttonElement}</div> : buttonElement;
};
