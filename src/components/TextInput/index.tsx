import type {InputProps} from '@rneui/themed';
import {Input} from '@rneui/themed';
import React, {FC, Ref} from 'react';
import {ReturnKeyTypeOptions, StyleProp, View, ViewStyle} from 'react-native';
import {useBoolean, useEvent} from '../../hooks';
import ErrorInputMessage from '../ErrorInputMessage/ErrorInputMessage.tsx';
import colors from '../../theme/colors.ts';
import typography from '../../theme/typography.ts';
import styles from './styles.ts';

interface TextInputProps extends InputProps {
  name?: string;
  placeholder?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  containerStyle?: StyleProp<ViewStyle>;
  onChange?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  innerRef?: Ref<any>;
  accessibilityLabel?: string;
}

const TextInput: FC<TextInputProps> = ({
  name,
  placeholder = 'placeholder',
  containerStyle,
  onChange,
  onFocus,
  onBlur,
  innerRef,
  accessibilityLabel,
  disabled,
  errorMessage,
  ...props
}) => {
  const [isFocused, setIsFocused] = useBoolean(false);
  const handleFocus = useEvent(() => {
    setIsFocused.on();
    onFocus?.();
  });
  const handleBlur = useEvent(() => {
    setIsFocused.off();
    onBlur?.();
  });
  const inputContainerStyle = [
    containerStyle,
    //errorMessage ? styles.errorInput : undefined,
    isFocused ? styles.focusedInput : undefined,
    disabled ? styles.disabled : undefined,
  ];
  return (
    <View>
      <Input
        id={name}
        accessibilityLabel={accessibilityLabel}
        autoCapitalize="none"
        placeholderTextColor={colors.gray_300}
        onChangeText={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        labelProps={{numberOfLines: 1}}
        placeholder={placeholder}
        labelStyle={styles.label}
        inputContainerStyle={inputContainerStyle}
        ref={innerRef}
        disabled={disabled}
        errorStyle={styles.error}
        style={{fontFamily: typography.fontFamily.Plus_Jakarta_Sans_400}}
        {...props}
      />
      {errorMessage && <ErrorInputMessage message={errorMessage} />}
    </View>
  );
};

export default TextInput;
