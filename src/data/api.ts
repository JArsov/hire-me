import client from '../config/axiosConfig';
import { GetChildrenParams, GetChildrenResponse } from '../types/models';

export const getChildrenList = async () => {
  const url = '/daycare/tablet/group';
  const params: GetChildrenParams = {
    groupId: '86413ecf-01a1-44da-ba73-1aeda212a196',
    institutionId: 'dc4bd858-9e9c-4df7-9386-0d91e42280eb',
  };

  const response = await client.get<GetChildrenResponse>(url, {
    params,
  });

  return response.data.children;
};

export const checkIn = async (childId: string, pickupTime: string) => {
  const url = `v2/children/${childId}/checkins`;
  const data = {
    pickupTime,
  };

  const response = await client.post(url, data);
  return response.data;
};

export const checkOut = async (childId: string) => {
  const url = `v2/children/${childId}/checkout`;

  const response = await client.post(url);

  return response.data;
};
