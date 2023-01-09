import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar/Navbar";
import React, { useEffect } from "react";
import UserWidget from "scenes/widgets/UserWidget";
import { useSelector } from "react-redux";
import NewPostWidget from "scenes/widgets/NewPostWidget";
import AllPosts from "scenes/widgets/AllPosts";
import FriendList from "scenes/widgets/FriendList";

function HomePage() {
  const { _id, username, profilePic } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user);
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <Box>
        <Navbar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNotMobile ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box flexBasis={isNotMobile ? "26%" : undefined}>
            <UserWidget userId={_id} username={username} profilePic={profilePic} />
          </Box>
          <Box
            flexBasis={isNotMobile ? "42%" : undefined}
            mt={isNotMobile ? undefined : "2rem"}
          >
            <NewPostWidget profilePic={profilePic} />
            <AllPosts />
          </Box>
          {isNotMobile && <Box flexBasis="26%"><FriendList /></Box>}
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
