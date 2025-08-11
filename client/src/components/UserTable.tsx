import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";
import { useGroup } from "../store/GroupContext";
import { colors } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

type GroupWithMembers = {
  name: string;
  uuid: string;
  members: {
    username: string;
    name: string;
    points: number;
  }[];
};

export const UserTable = () => {
  const { group } = useGroup();
  const [groupsLoading, setGroupsLoading] = useState<boolean>(false);
  const [ownedGroups, setOwnedGroups] = useState<GroupWithMembers>();

  const fetchGroupMembers = async () => {
    setGroupsLoading(true);
    await axios
      .get(`${API_URL}/groups/${group.uuid}/users`)
      .then((response) => setOwnedGroups(response.data))
      .catch((_error) => {
        throw new Error("Failed to fetch owned groups");
      })
      .finally(() => setGroupsLoading(false));
  };
  useEffect(() => {
    fetchGroupMembers();
  }, [group]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Jäsen</TableCell>
            <TableCell>Nimi</TableCell>
            <TableCell align="right">Pisteet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupsLoading ? (
            <>hetki</>
          ) : (
            ownedGroups?.members.map((member) => (
              <TableRow
                key={member.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {member.username}
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell align="right">{member.points}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
