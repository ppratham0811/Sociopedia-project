import {Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import Form from "./Form";

function LoginPage() {
  const {palette} = useTheme();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={palette.background.alt}
        textAlign="center"
        p="1rem 6%"
      >
        <Typography fontWeight="bold" color="primary" fontSize="32px">
          Sociopedia
        </Typography>
      </Box>

      <Box
        width={isNotMobileScreen ? "50%" : "80%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={palette.background.alt}
      >
        <Typography textAlign="center" variant="h5" fontWeight="500" sx={{mb: "1.5rem"}}>
          Welcome to Sociopedia
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage