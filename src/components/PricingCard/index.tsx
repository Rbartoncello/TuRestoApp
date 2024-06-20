import React from 'react';
import {PricingCard, PricingCardProps} from '@rneui/themed';

interface PricingCardComponentProps extends PricingCardProps {
  title: string;
}

const Pricing: React.FunctionComponent<PricingCardComponentProps> = ({
  title,
  ...props
}) => {
  return (
    <>
      <PricingCard {...props} title={title} />
    </>
  );
};

export default Pricing;
