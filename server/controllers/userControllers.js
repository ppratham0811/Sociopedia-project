import User from "../models/User";

export const getUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  return res.status(201).json(user);
};

export const getUserFriends = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (user) {
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, username, location, occupation, profilePic }) => {
        return { _id, firstName, lastName, username, location, occupation, profilePic };
      }
    );
    return res.status(201).json(formattedFriends);
  } else {
    return res.send("User doesn't exist");
  }
};

export const updateFriends = async (req, res, next) => {
  const { userId, friendId } = req.params;
  const loggedUser = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (loggedUser.friends.includes(friendId)) {
    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });
  } else {
    loggedUser.friends.push(friendId);
    friend.friends.push(userId);
    await loggedUser.save();
    await friend.save();
  }
  const friends = await Promise.all(
    loggedUser.friends.map((id) => User.findById(id))
  );
  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, username, location, occupation, profilePic }) => {
      return { _id, firstName, lastName, username, location, occupation, profilePic };
    }
  );
  return res.status(201).json(formattedFriends);
};
