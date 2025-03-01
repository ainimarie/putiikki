import { Stack, Typography, CircularProgress } from "@mui/material";


export const Loading = () => {

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        my: 10,
      }}>
      <Typography variant="h5" gutterBottom>Pieni hetki...</Typography>
      <CircularProgress />
    </Stack>)
};
