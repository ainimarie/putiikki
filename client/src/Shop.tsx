import { Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Reward } from "./components/Reward";

type Reward = {
    name: string,
    price: number,
    description?: string
}



export const Shop = () => {

    const [rewards, setRewards] = useState([]);

    const fetchRewards = async () => await axios.get('http://localhost:3000/rewards')
        .then(response =>
            setRewards(response.data)
        )
        .catch(error => console.log(error))

    useEffect(() => {
        fetchRewards()
    }, [])

    return (
        // <Box sx={{ flexGrow: 1 }} >
        <Grid container direction="row"
            sx={{
                alignItems: "stretch",
            }}>
            {rewards.length > 0 && rewards.map((item: Reward, index: number) => {
                return (<Grid size={4} key={`grid-${index}`}>
                    <Reward reward={item} key={`reward-${index}`} />
                </Grid>)
            })}

        </Grid>
        // </Box>
    );
}