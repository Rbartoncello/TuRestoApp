import type {FormikErrors, FormikHelpers} from 'formik';
import {Field, Formik} from 'formik';
import React, {FC, useState} from 'react';
import {useRef} from 'react';
import {View} from 'react-native';
import {createStyles} from './styles';
import type {FormValues, LoginProps} from './types';
import validationSchema from './validationSchema';
import {Button, Container, LoadingOverlay, Title} from '../../components';
import {useThemedStyles} from '../../hooks';
import {ErrorFeedback, PasswordField, TextField} from '../../forms/fields';
import {useSessionStore} from '../../state/session/slice.ts';
import {useLogin} from '../../state/session/actions.tsx';
import {users} from '../../constans/users.ts';
import {SpeedDial} from '@rneui/themed';
import {UserIcon, UserListIcon, UserSwitchIcon} from '../../assets/icons';
import colors from '../../theme/base/colors.ts';

const initialValues: FormValues = {username: '', password: ''};

const Login: FC<LoginProps> = () => {
  const [styles] = useThemedStyles(createStyles);
  const [open, setOpen] = useState(false);
  const {status} = useSessionStore();
  const {login} = useLogin();
  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    actions.resetForm();
    await login(values.username, values.password);
  };

  const handleAutoComplete = async (
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => Promise<void | FormikErrors<FormValues>>,
    id: number,
  ) => {
    const user = users[id - 1];
    await setFieldValue('username', user.email, false);
    await setFieldValue('password', `${user.password}`, false);
  };

  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <Container style={{backgroundColor: colors.code}}>
      {status.isFetching && <LoadingOverlay />}
      <Title style={styles.title}>Inicio de sessión</Title>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validateOnMount
        validationSchema={validationSchema}
      >
        {({submitForm, dirty, status: state, setFieldValue}) => (
          <View style={styles.container}>
            <View style={styles.content}>
              <Field
                accessibilityLabel="txt-login-username"
                component={TextField}
                name="username"
                config={{
                  placeholder: 'Ingrese su correo electronico',
                  returnKeyType: 'next',
                  keyboardType: 'email-address',
                  label: 'Corre electronico',
                }}
                innerRef={usernameRef}
                nextInnerRef={passwordRef}
              />
              <Field
                accessibilityLabel="txt-login-password"
                component={PasswordField}
                name="password"
                config={{
                  placeholder: 'Ingrese contraseña',
                  label: 'Contraseña',
                }}
                innerRef={passwordRef}
              />
            </View>
            {!dirty && state?.isSubmitted && status.errorMessage && (
              <ErrorFeedback config={{label: status.errorMessage}} />
            )}

            <View style={styles.buttonContainer}>
              <Button
                onPress={submitForm}
                title="Ingresar"
                accessibilityLabel="btn-login-submit"
                buttonStyle={styles.button}
              />
            </View>
            <SpeedDial
              buttonStyle={{
                backgroundColor: colors.brandSecondary,
              }}
              style={styles.speedDial}
              isOpen={open}
              icon={<UserListIcon color={colors.white} />}
              openIcon={<UserSwitchIcon color={colors.white} />}
              onOpen={() => setOpen(!open)}
              onClose={() => setOpen(!open)}
            >
              {users.map((user, index) => (
                <SpeedDial.Action
                  key={index.toString()}
                  icon={<UserIcon color={colors.white} />}
                  title={user.rol}
                  onPress={() => {
                    handleAutoComplete(setFieldValue, Number(user.id));
                    setOpen(!open);
                  }}
                />
              ))}
            </SpeedDial>
          </View>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
