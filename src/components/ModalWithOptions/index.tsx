import React, {FC, PropsWithChildren} from 'react';
import {useThemedStyles} from '../../hooks';
import {createStyles} from './styles.tsx';
import {Button, Container, Dialog} from '../index.ts';

interface ModalConfirmProps extends PropsWithChildren {
  id?: string;
  accessibilityLabel?: string;
  title?: string;
  message?: string;
  active: boolean;
  setActive: {off: any};
  onConfirm: () => void;
  onReject: () => void;
  textAccept: string;
  textReject: string;
}

const ModalWithOptions: FC<ModalConfirmProps> = ({
  id,
  accessibilityLabel,
  title,
  message,
  active,
  setActive,
  onConfirm,
  onReject,
  textAccept,
  textReject,
  children,
}) => {
  const [styles] = useThemedStyles(createStyles);

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
      {children}
      <Container style={styles.container}>
        <Button
          accessibilityLabel="btn-confirm"
          onPress={onConfirm}
          buttonStyle={styles.confirm}
          containerStyle={styles.containerConfirm}>
          {textAccept}
        </Button>
        <Button
          accessibilityLabel="btn-confirm"
          onPress={onReject}
          buttonStyle={styles.cancel}
          containerStyle={styles.containerCancel}>
          {textReject}
        </Button>
      </Container>
    </Dialog>
  );
};

export default ModalWithOptions;
