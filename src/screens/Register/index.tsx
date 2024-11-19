import React, {useRef, useState} from 'react';
import type {FormikErrors, FormikHelpers} from 'formik';
import {Field, Formik} from 'formik';
import {Image, Pressable, Switch, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import type {FormValues} from './types';
import {validationSchema, validationAnonymusSchema } from './validationSchema';
import {Button, Container, LoadingOverlay, Text, Title} from '../../components';
import {ErrorFeedback, PasswordField, TextField} from '../../forms/fields';
import useNavigator from '../../hooks/useNavigation.ts';
import ArrowLeft from '../../assets/icons/ArrowLeft.tsx';
import {useLogin} from '../../state/session/actions.tsx';
import {useSessionStore} from '../../state/session/slice.ts';
import {NumberField} from '../../forms';
import LabelInput from '../../components/LabelInput/LabelInput.tsx';
import {MailIcon, QRIcon, UserIcon} from '../../assets/icons';
import colors from '../../theme/colors.ts';
import QRScanner from '../../components/QRScanner';
import {useBoolean} from '../../hooks';
import {procesarString} from '../../utils/string.ts';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

const initialValues: FormValues = {
  idNumber: undefined,
  name: '',
  lastname: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const RegisterScreen = () => {
  const {signUp} = useLogin();
  const [active, setActive] = useBoolean(false);
  const {status} = useSessionStore();
  const {goBack} = useNavigator();

  const [imageUri, setImageUri] = useState(
    require('../../assets/images/profile.png'),
  );
  const [isAnonymus, setClientAnonymus] = useState(false);

  const selectImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    await launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.errorCode) {
      } else if (response.assets && response.assets.length > 0) {
        setImageUri({uri: response.assets[0].uri});
      }
    });
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    await signUp(
      values.idNumber ? values.idNumber : '11111111',
      values.lastname,
      values.name,
      values.email,
      values.password,
      imageUri.uri,
    );
    if (!status.isError) {
      actions.resetForm({});
    }
  };

  const handleReadQR = async (
    qrData: string,
    setValues: (
      values: React.SetStateAction<FormValues>,
      shouldValidate?: boolean | undefined,
    ) => Promise<void | FormikErrors<FormValues>>,
  ) => {
    const data = procesarString(qrData);
    await setValues(
      {
        idNumber: Number(data[4]),
        lastname: data[1],
        name: data[2],
        email: '',
        password: '',
        passwordConfirm: '',
      },
      true,
    );
    setActive.off();
  };

  const idNumberRef = useRef();
  const lastnameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <Container style={{backgroundColor: colors.grayBackground}}>
      {status.isFetching && <LoadingOverlay />}
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <ArrowLeft width={30} height={30} />
        </Pressable>
        <View>
          <Title style={styles.title}>Nuevo Cliente</Title>
        </View>
      </View>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validateOnMount
        validationSchema={!isAnonymus ? validationSchema : validationAnonymusSchema}>
        {({submitForm, setValues, values, dirty, status: state, isValid}) => (
          <View style={styles.content}>
            {!isAnonymus ? (
              <View style={styles.qrButtonContainer}>
                <Text style={styles.text}>Escanea tu DNI</Text>
                <TouchableOpacity
                  onPress={setActive.on}
                  style={styles.qrButton}>
                  <QRIcon width={100} height={100} />
                </TouchableOpacity>
                <Text style={styles.text}>O completá: </Text>
              </View>
            ) : (
              <></>
            )}
            <View
              style={
                !isAnonymus ? styles.formContent : styles.formContentAnnymus
              }>
              <View>
                <TouchableOpacity
                  onPress={() => selectImage()}
                  style={styles.imageProfileContainer}>
                  {imageUri && <Image source={imageUri} style={styles.image} />}
                </TouchableOpacity>
              </View>
              <View style={styles.switchButtonContainer}>
                <Text>Cliente Anonimo: </Text>
                <Switch
                  value={isAnonymus}
                  onValueChange={() => setClientAnonymus(prev => !prev)}
                />
              </View>
              {isAnonymus ? (
                <Field
                  component={TextField}
                  name="name"
                  config={{
                    placeholder: 'Nombre',
                    label: <LabelInput label={'Nombre'} required={true} />,
                    returnKeyType: 'next',
                  }}
                  innerRef={nameRef}
                  nextInnerRef={emailRef}
                  leftIcon={
                    <UserIcon
                      color={colors.blue_500}
                      width={25}
                      height={25}
                      style={styles.iconLeft}
                    />
                  }
                  value={values.name}
                />
              ) : (
                <>
                  <Field
                    component={NumberField}
                    name="idNumber"
                    config={{
                      placeholder: '12345678',
                      label: <LabelInput label={'DNI'} required={true} />,
                      returnKeyType: 'next',
                    }}
                    innerRef={idNumberRef}
                    nextInnerRef={lastnameRef}
                    leftIcon={
                      <UserIcon
                        color={colors.blue_500}
                        width={25}
                        height={25}
                        style={styles.iconLeft}
                      />
                    }
                    value={values.idNumber}
                    maxLength={8}
                  />
                  <Field
                    component={TextField}
                    name="lastname"
                    config={{
                      placeholder: 'Apellido',
                      label: <LabelInput label={'Apellido'} required={true} />,
                      returnKeyType: 'next',
                    }}
                    innerRef={lastnameRef}
                    nextInnerRef={nameRef}
                    leftIcon={
                      <UserIcon
                        color={colors.blue_500}
                        width={25}
                        height={25}
                        style={styles.iconLeft}
                      />
                    }
                    value={values.lastname}
                  />
                  <Field
                    component={TextField}
                    name="name"
                    config={{
                      placeholder: 'Nombre',
                      label: <LabelInput label={'Nombre'} required={true} />,
                      returnKeyType: 'next',
                    }}
                    innerRef={nameRef}
                    nextInnerRef={emailRef}
                    leftIcon={
                      <UserIcon
                        color={colors.blue_500}
                        width={25}
                        height={25}
                        style={styles.iconLeft}
                      />
                    }
                    value={values.name}
                  />
                  <Field
                    component={TextField}
                    name="email"
                    config={{
                      placeholder: 'ejemplo@gmail.com',
                      label: (
                        <LabelInput
                          label={'Correo electronico'}
                          required={true}
                        />
                      ),
                      returnKeyType: 'next',
                      keyboardType: 'email-address',
                    }}
                    innerRef={emailRef}
                    nextInnerRef={passwordRef}
                    leftIcon={
                      <MailIcon
                        color={colors.blue_500}
                        width={25}
                        height={25}
                        style={styles.iconLeft}
                      />
                    }
                    value={values.email}
                  />
                  <Field
                    component={PasswordField}
                    name="password"
                    config={{
                      placeholder: 'Contraseña',
                      label: (
                        <LabelInput label={'Contraseña'} required={true} />
                      ),
                      returnKeyType: 'next',
                    }}
                    innerRef={passwordRef}
                    nextInnerRef={passwordConfirmRef}
                    value={values.password}
                  />
                  <Field
                    component={PasswordField}
                    name="passwordConfirm"
                    config={{
                      placeholder: 'Confirmar contraseña',
                      label: (
                        <LabelInput
                          label={'Confirmar contraseña'}
                          required={true}
                        />
                      ),
                    }}
                    innerRef={passwordConfirmRef}
                    value={values.passwordConfirm}
                  />
                </>
              )}
            </View>
            {dirty && status.isError && (
              <ErrorFeedback config={{label: `${state}`}} />
            )}
            <View style={styles.button}>
              <Button
                onPress={submitForm}
                disabled={!isValid || !imageUri.uri}
                title="Registrar"
                accessibilityLabel="btn-login-submit"
              />
            </View>
            <QRScanner
              active={active}
              onRead={e => handleReadQR(e.data, setValues)}
              reactivate={true}
              reactivateTimeout={500}
              showMarker={true}
            />
          </View>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterScreen;
