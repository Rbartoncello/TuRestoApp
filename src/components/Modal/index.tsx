import React, {FC, PropsWithChildren} from 'react';
import styles from './styles.tsx';
import {Button, Container, Dialog} from '../index.ts';
import {View} from 'react-native';

interface ModalProps extends PropsWithChildren {
  id?: string;
  accessibilityLabel?: string;
  title?: string;
  message?: string;
  active: boolean;
  setActive: {off: any};
  onConfirm: () => void;
}

const Modal: FC<ModalProps> = ({
  id,
  accessibilityLabel,
  title,
  message,
  active,
  setActive,
  onConfirm,
  children,
}) => {
  return (
    <Dialog
      id={id}
      accessibilityLabel={accessibilityLabel}
      title={title}
      message={message}
      onClose={setActive.off}
      visible={active}
      style={styles.modal}
      styleMessage={styles.message}>
      <Container style={styles.container}>
        <View>
          {children}
          <Button
            accessibilityLabel="btn-confirm"
            onPress={onConfirm}
            buttonStyle={styles.confirm}
            containerStyle={styles.containerConfirm}>
            Aceptar
          </Button>
        </View>
      </Container>
    </Dialog>
  );
};

export default Modal;
