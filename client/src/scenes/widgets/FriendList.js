import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import User from "components/User";
import axios from "axios";
import { setFriends } from "state";
import { useEffect } from "react";

function FriendList() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const { palette } = useTheme();

  const getUserFriends = () => {
    axios
      .get(`http://localhost:3001/user/${currentUser._id}/friends`)
      .then((response) => {
        dispatch(setFriends({ friends: response.data }));
      })
      .catch((err) => {
        console.log("getUserFriends err: ", err);
      });
  };

  useEffect(() => {
    getUserFriends();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {currentUser.friends.map((friend) => (
          <User
            key={friend._id}
            postUserId={friend._id}
            postUsername={friend.username}
            location={friend.occupation}
            userPicture={friend.profilePic}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}

export default FriendList;
