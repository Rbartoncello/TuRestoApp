import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Client, CLIENT_STATES, ROLES} from '../../state/users/interfaces.ts';
import colors from '../../theme/colors.ts';
import {useUsersActions} from '../../state/users/actions.tsx';
import {useUsersStore} from '../../state/users/slice.ts';
import {Container, LoadingOverlay, Title} from '../../components';
import UseBoolean from '../../hooks/useBoolean.ts';
import ModalWithOptions from '../../components/ModalWithOptions';
import LabelInput from '../../components/LabelInput/LabelInput.tsx';

const PendingClientsScreen = () => {
  const [pendingClients, setPendingClients] = useState<Client[]>([]);
  const [active, setActive] = UseBoolean(false);
  const {getUsers, uploadUser} = useUsersActions();
  const {users, status} = useUsersStore();
  const [userSelected, setUserSelected] = useState<Client | undefined>(
    undefined,
  );

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPendingClients(
      users.filter(
        user =>
          user.rol === ROLES.CLIENT &&
          user.state === CLIENT_STATES.PENDING_APPROVAL,
      ) as Client[],
    );
  }, [users]);

  const handleAccept = async () => {
    await uploadUser({...userSelected, state: CLIENT_STATES.ACCEPTED});
    setActive.off();
  };

  const handleReject = async () => {
    await uploadUser({...userSelected, state: CLIENT_STATES.REFUSED});
    setActive.off();
  };

  const renderItem = ({item}: {item: Client}) => (
    <TouchableOpacity
      style={{flexDirection: 'row', justifyContent: 'space-around'}}
      onPress={() => {
        setUserSelected(item);
        setActive.on();
      }}>
      <Text style={{color: colors.gray_500}}>{item.lastname}</Text>
      <Text style={{color: colors.gray_500}}>{item.name}</Text>
      <Text style={{color: colors.gray_500}}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <Container style={{backgroundColor: colors.grayBackground}}>
      {status.isFetching && <LoadingOverlay />}
      <View style={{flex: 1, backgroundColor: colors.grayBackground}}>
        <Title style={{fontSize: 25, textAlign: 'center'}}>
          Lista de clientes pendientes aprobación
        </Title>
        <FlatList
          data={pendingClients}
          renderItem={renderItem}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: colors.white2,
                padding: 5,
                borderRadius: 10,
                elevation: 5,
              }}>
              <Text
                style={{color: colors.black, fontSize: 16, fontWeight: 'bold'}}>
                Apellido
              </Text>
              <Text
                style={{color: colors.black, fontSize: 16, fontWeight: 'bold'}}>
                Nombre
              </Text>
              <Text
                style={{color: colors.black, fontSize: 16, fontWeight: 'bold'}}>
                Correo electronico
              </Text>
            </View>
          }
          contentContainerStyle={{
            backgroundColor: colors.white,
            elevation: 8,
            padding: 15,
            borderRadius: 25,
            gap: 20,
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <ModalWithOptions
        active={active}
        setActive={setActive}
        onConfirm={handleAccept}
        onReject={handleReject}
        textAccept={'Aceptar'}
        textReject={'Rechazar'}>
        <View style={{gap: 10, marginBottom: 25}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <LabelInput label={'Nombre: '} />
            <Text style={{color: colors.gray_500}}>{userSelected?.name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <LabelInput label={'Apellido:'} />
            <Text style={{color: colors.gray_500}}>
              {userSelected?.lastname}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <LabelInput label={'Correo:'} />
            <Text style={{color: colors.gray_500}}>{userSelected?.email}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <LabelInput label={'DNI:'} />
            <Text style={{color: colors.gray_500}}>{userSelected?.dni}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <LabelInput label={'Estado:'} />
            <Text style={{color: colors.gray_500}}>{userSelected?.state}</Text>
          </View>
        </View>
      </ModalWithOptions>
    </Container>
  );
};

export default PendingClientsScreen;
