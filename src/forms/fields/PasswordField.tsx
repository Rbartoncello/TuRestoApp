import React, {FC} from 'react';
import {Pressable} from 'react-native';
import useChange from '../hooks/useChange';
import {DynamicFieldProps} from '../types.ts';
import {useBoolean} from '../../hooks';
import {TextInput} from '../../components';
import {getFieldError} from '../utils';
import {EyeIcon} from '../../assets/icons';
import {createInputStyles} from './styles.ts';

const PasswordField: FC<DynamicFieldProps> = ({
  field,
  form,
  config,
  onChange,
  ...props
}) => {
  const styles = createInputStyles();
  const [secureEntry, setSecureEntry] = useBoolean(true);
  const handleChange = useChange(form, field, onChange);
  return (
    <TextInput
      {...field}
      {...props}
      keyboardType={secureEntry ? undefined : 'visible-password'}
      secureTextEntry={secureEntry}
      rightIcon={
        <Pressable onPress={setSecureEntry.toggle}>
          {secureEntry ? <EyeIcon /> : <EyeIcon />}
        </Pressable>
      }
      errorMessage={getFieldError(form, field)}
      onChange={handleChange}
      onBlur={() => form.handleBlur(field.name)}
      label={config.label}
      placeholder={config.placeholder}
      containerStyle={[styles.container]}
    />
  );
};

export default PasswordField;
