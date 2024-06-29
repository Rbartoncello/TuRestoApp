import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {ListItem} from '@rneui/themed';
import colors from '../../theme/colors.ts';
import {useUsersActions} from '../../state/users/actions.tsx';
import {useUsersStore} from '../../state/users/slice.ts';
import {CLIENT_STATES, Client, ROLES} from '../../state/users/interfaces.ts';
import {Container, LoadingOverlay, Title} from '../../components';
import {useTablesActions} from '../../state/tables/actions.tsx';
import {useTablesStore} from '../../state/tables/slice.ts';
import {Table, TABLE_STATES} from '../../state/tables/interfaces.ts';

const WaitingClientsScreen = () => {
  const [waitingClients, setWaitingClients] = useState<Client[]>([]);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const {getUsers, uploadUser} = useUsersActions();
  const {getTables, uploadTable} = useTablesActions();
  const {users, status: userStatus} = useUsersStore();
  const {tables, status: tableStatus} = useTablesStore();

  useEffect(() => {
    getUsers();
    getTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setWaitingClients(
      users.filter(
        u => u.rol === ROLES.CLIENT && u.state === CLIENT_STATES.ACCEPTED,
      ) as Client[],
    );
  }, [users]);

  useEffect(() => {
    setAvailableTables(
      tables.filter(table => table.state === TABLE_STATES.EMPTY) as Table[],
    );
  }, [tables]);

  const handleAssign = async (client: Client, tableId: string) => {
    await uploadUser({
      ...client,
      state: CLIENT_STATES.SITTING,
      idTable: tableId,
    });
    await uploadTable({
      id: tableId,
      state: TABLE_STATES.CUSTOMER_WAITING_ATTENTION,
      clientId: client.email,
    });
  };

  const renderClientItem = ({item}: {item: Client}) => (
    <ListItem.Accordion
      key={item.id}
      isExpanded={expanded === item.id}
      onPress={() => setExpanded(expanded === item.id ? null : item.id)}
      content={
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            elevation: 2,
            backgroundColor: colors.gray_100,
            padding: 5,
          }}>
          <Text style={{color: colors.gray_500}}>{item.lastname}</Text>
          <Text style={{color: colors.gray_500}}>{item.name}</Text>
        </View>
      }>
      <ListItem.Content
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: colors.grayBackground,
          width: '70%',
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
          top: -15,
        }}>
        {availableTables.map(table => (
          <ListItem
            key={table.id}
            bottomDivider
            containerStyle={{
              backgroundColor: colors.grayBackground,
            }}
            style={{
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => handleAssign(item, table.id)}>
              <ListItem.Title
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>{`Mesa ${table.id}`}</ListItem.Title>
            </TouchableOpacity>
          </ListItem>
        ))}
      </ListItem.Content>
    </ListItem.Accordion>
  );

  return (
    <Container style={{backgroundColor: colors.grayBackground}}>
      {(userStatus.isFetching || tableStatus.isFetching) && <LoadingOverlay />}
      <Title style={{fontSize: 20, textAlign: 'center'}}>
        Clientes esperando asignacion:
      </Title>
      <FlatList
        data={waitingClients}
        renderItem={renderClientItem}
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
          </View>
        }
        style={{
          backgroundColor: colors.white,
          elevation: 8,
          padding: 15,
          borderRadius: 25,
          gap: 20,
        }}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  );
};

export default WaitingClientsScreen;
