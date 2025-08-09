import { Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { ItemCard } from "./components/ItemCard";
import { useAuth } from "./auth/useAuth";
import { Severity, useNotification } from "./store/NotificationContext";
import { Loading } from "./layout/Loading";
import { Item } from '@putiikki/item'
import { useGroup } from "./store/GroupContext";

const API_URL = import.meta.env.VITE_API_URL;

export const Penalties = () => {

  const [penalties, setPenalties] = useState([]);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [penaltiesLoading, setPenaltiesLoading] = useState<boolean>(false);
  const { openNotification } = useNotification();
  const { currentUser } = useAuth();
  const { updateUserPoints, group } = useGroup();

  const getPenalty = async (penaltyPoints: number, uuid: string) => {
    if (currentUser !== null) {
      setPurchaseLoading(true);
      await updateUserPoints(-penaltyPoints, 'penalty', uuid)
        .then(response => {
          if (response.data === 'ok')
            openNotification({ message: `Menetit ${penaltyPoints} pistettä!`, severity: Severity.Error })

        })
        .catch(error => openNotification({ message: error.message, severity: Severity.Error }))
        .finally(() => setPurchaseLoading(false));
    }
  }

  const fetchPenalties = async () => {
    setPenaltiesLoading(true);
    await axios.get(`${API_URL}/groups/${group.uuid}/penalties`)
      .then(response =>
        setPenalties(response.data)
      )
      .catch(_error => { throw new Error("Failed to fetch penalties") })
      .finally(() => setPenaltiesLoading(false));
  }

  useEffect(() => {
    fetchPenalties()
  }, [group])

  if (penaltiesLoading) return <Loading />

  return (
    <Grid container direction="row"
      columns={{ xs: 1, sm: 8, md: 8 }}
      sx={{
        alignItems: "stretch",
      }}>
      {penalties.length > 0
        ? penalties.map((penalty: Item, index: number) => {
          return (
            <Grid size={{ lg: 4, md: 4, xs: 4, sm: 8 }} key={`grid-${index}`}>
              <ItemCard
                item={penalty}
                key={`reward-${index}`}
                handlePoints={(points: number) => getPenalty(points, penalty.uuid)}
                buttonTitle='Vähennä'
                isLoading={purchaseLoading}
                isPenalty
              />
            </Grid>
          )
        })
        : <>Ei rangaistuksia tällä hetkellä</>}
    </Grid>
  );
}
