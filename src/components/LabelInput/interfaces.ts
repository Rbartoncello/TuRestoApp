import {TextProps} from '@rneui/themed';

export interface LabelInputProps extends TextProps {
  label: string;
  required?: boolean;
}
