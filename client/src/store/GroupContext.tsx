import { UserGroup } from '@putiikki/group';
import React, { createContext, useState, ReactNode, useMemo, Dispatch, SetStateAction, useContext, use, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import axios, { AxiosResponse } from 'axios';
import { ItemType } from '@putiikki/item';

interface GroupProviderProps {
  children: ReactNode;
}

const API_URL = import.meta.env.VITE_API_URL;
const initialGroup = { name: '', isLeader: false, uuid: '' }

const GroupContext = createContext<{
  group: UserGroup,
  setGroup: Dispatch<SetStateAction<UserGroup>>
  userPoints: number,
  updateUserPoints: (points: number, sourceType: ItemType, sourceId: string) => Promise<AxiosResponse>
}>({
  group: initialGroup,
  setGroup: () => { },
  userPoints: 0,
  updateUserPoints: async () => Promise.resolve({} as AxiosResponse)
});

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [group, setGroup] = useState<UserGroup>(initialGroup)
  const [userPoints, setUserPoints] = useState<number>(0);
  const { currentUser } = useAuth();

  const updateUserPoints = async (points: number, sourceType: ItemType, sourceId: string): Promise<AxiosResponse> => {
    if (!group.uuid || !currentUser.username) {
      // Return a dummy AxiosResponse if early return is needed
      return Promise.resolve({} as AxiosResponse);
    }
    try {
      const response = await axios.post(`${API_URL}/transactions`, {
        username: currentUser.username,
        group: group.uuid,
        points,
        sourceType,
        sourceId
      });
      setUserPoints(prev => prev + points);
      return response;
    } catch (error) {
      // Show error in UI
      console.error("Error updating user points:", error);
      // TODO:
      // Return a dummy AxiosResponse on error
      // Should return error to notification?
      return Promise.resolve({} as AxiosResponse);
    }
  };

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!group.uuid || !currentUser.username) {
        setUserPoints(0);
        return
      };
      try {
        const response = await axios.get(`${API_URL}/groups/${group.uuid}/users/${currentUser.username}`);
        setUserPoints(response.data.points);
      } catch (error) {
        console.error("Error fetching user points:", error);
        setUserPoints(0);
      }
    }
    fetchUserPoints();
  }, [currentUser, group, userPoints]);

  const value = useMemo(() => ({
    group,
    setGroup,
    userPoints,
    updateUserPoints
  }), [group, userPoints]);

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
}

export const useGroup = () => {
  return useContext(GroupContext)
};
