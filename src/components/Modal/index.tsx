import {FC} from 'react';
import {IconProps} from '../../types';
import {useThemedStyles} from '../../hooks';
import {createStyles} from './styles.tsx';
import {Button, Container, Dialog} from '../index.ts';

interface ModalProps extends IconProps {
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
      <Container style={styles.container}>
        <Button
          accessibilityLabel="btn-confirm"
          onPress={onConfirm}
          buttonStyle={styles.confirm}
          containerStyle={styles.containerConfirm}>
          Aceptar
        </Button>
      </Container>
    </Dialog>
  );
};

export default Modal;
