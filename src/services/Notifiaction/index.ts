import {ROLES} from '../../state/users/interfaces.ts';

export const sendNotification = async (rol: ROLES, message: string) => {
  console.log('dd');
  const response = await fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Basic MjQyM2RlZjctMTY0ZS00ZWMxLWExNDMtM2NlNTg2ZDViNjZk',
    },
    body: JSON.stringify({
      app_id: '1c10bc19-cbe8-42cb-ac43-f398591db961',
      include_aliases: {external_id: [rol]},
      target_channel: 'push',
      data: {foo: 'bar'},
      contents: {en: message},
    }),
  });

  const data = await response.json();
  console.log('Respuesta de OneSignal:', data);
};
