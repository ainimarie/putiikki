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

export const Shop = () => {
  const [rewards, setRewards] = useState([]);
  const [rewardsLoading, setRewardsLoading] = useState<boolean>(true);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { updateUserPoints, userPoints, group } = useGroup();
  const { openNotification } = useNotification();

  const buyReward = async (rewardPoints: number, uuid: string) => {
    setPurchaseLoading(true);
    if (currentUser !== null) {
      if (rewardPoints >= userPoints) {
        openNotification({
          message: 'Ei tarpeeksi pisteitä', severity: Severity.Error
        })
        setPurchaseLoading(false);
        return;
      }
      await updateUserPoints(-rewardPoints, 'reward', uuid)
        .then(response => {
          if (response.data === 'ok')

            openNotification({
              message: 'Ostettu', severity: Severity.Success
            })
        })
        .catch(error => openNotification({ message: error.message, severity: Severity.Error }))
        .finally(() => setPurchaseLoading(false));
    }
  }

  const fetchRewards = async () => {
    setRewardsLoading(true);
    await axios.get(`${API_URL}/groups/${group.uuid}/rewards`)
      .then(response =>
        setRewards(response.data)
      )
      .catch((_error) => { throw new Error("Failed to fetch rewards") })
      .finally(() => setRewardsLoading(false));
  }
  useEffect(() => {
    fetchRewards()
  }, [group])

  if (rewardsLoading) return <Loading />

  return (
    <>
      <Grid container direction="row"
        columns={{ xs: 1, sm: 8, md: 8 }}
        sx={{
          alignItems: "stretch",
        }}>

        {rewards.length > 0
          ? rewards.map((reward: Item, index: number) => {
            return (
              <Grid size={{ lg: 4, md: 4, xs: 4, sm: 8 }} key={`grid-${index}`} >
                <ItemCard
                  item={reward}
                  key={`reward-${index}`}
                  handlePoints={(points: number) => buyReward(points, reward.uuid)}
                  buttonTitle='Osta'
                  isLoading={purchaseLoading}
                />
              </Grid>
            )
          }) :
          <>Ei palkintoja tällä hetkellä</>}
      </Grid >
    </>
  );
}
