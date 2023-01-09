import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { Box, Divider, Typography, IconButton, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setFriends } from "state";

function User({ postUserId, postUsername, location, userPicture }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [isFriend, setIsFriend] = useState(
    currentUser.friends.includes(postUserId)
  );

  const updateFriend = () => {
    axios
      .patch(`http://localhost:3001/user/${currentUser._id}/${postUserId}`)
      .then((response) => {
        console.log(isFriend);
        console.log(response.data);
        dispatch(setFriends({ friends: response.data }));
        setIsFriend(!isFriend);
      })
      .catch((err) => {
        console.log("updateFriend error: ", err);
      });
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicture} size="55px" />
        <Box>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
              },
            }}
          >
            {postUsername}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {location}
          </Typography>
        </Box>
      </FlexBetween>
      {postUsername !== currentUser.username && (
        <IconButton
          onClick={() => updateFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
}

export default User;
