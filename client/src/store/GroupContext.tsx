import { Group } from '@putiikki/group';
import React, { createContext, useState, ReactNode, useMemo, Dispatch, SetStateAction, useContext } from 'react';

interface GroupProviderProps {
  children: ReactNode;
}

const initialGroup = { name: '', leader: '', uuid: '', members: null }

const GroupContext = createContext<{
  group: Group,
  setGroup: Dispatch<SetStateAction<Group>>
}>({
  group: initialGroup,
  setGroup: () => { }
});

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [group, setGroup] = useState<Group>(initialGroup)

  const value = useMemo(() => ({
    group,
    setGroup
  }), [group]);

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
}

export const useGroup = () => {
  return useContext(GroupContext)
};
