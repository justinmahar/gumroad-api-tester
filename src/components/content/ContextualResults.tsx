import React from 'react';
import { Stack } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { IconButton } from './IconButton';
import { DivProps, DivPropsWithoutRef } from 'react-html-props';

interface Props extends DivPropsWithoutRef {
  json: unknown;
}

export const ContextualResults = ({ json, ...divProps }: Props): JSX.Element => {
  if (typeof json === 'object') {
    const results = json as Record<string, any>;
    let products: Record<string, any>[] = [];
    if (results.products && Array.isArray(results.products)) {
      products = results.products as Record<string, any>[];
    } else if (results.product) {
      products = [results.product as Record<string, any>];
    }

    if (products.length > 0) {
      const resultsElements = products
        .filter((product) => !!product.name && !!product.short_url)
        .map((product, index) => (
          <Stack direction="horizontal" key={`product-${index}`} gap={2}>
            <a
              className="gumroad-button"
              href={`https://gumroad.com/l/${(product.short_url as string).replace(/\/$/, '').replace(/.*\//, '')}`}
            >
              {product.name}
            </a>
            <a href={product.short_url} target="_blank" rel="noopener noreferrer">
              <IconButton icon={FaExternalLinkAlt} variant="link" />
            </a>
          </Stack>
        ));
      if (resultsElements.length > 0) {
        return (
          <Stack gap={3} {...divProps}>
            {resultsElements}
          </Stack>
        );
      }
    }
  }
  return <></>;
};
