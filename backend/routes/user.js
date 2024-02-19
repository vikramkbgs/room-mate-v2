const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  let users;
  if (req.query.name) {
    users = await req.models.user.fetchUserByName(req.query.name);
  } else if (req.query.email) {
    users = await req.models.user.findUserByEmail(req.query.email);
  } else {
    users = await req.models.user.fetchAllUsers();
  }
  usersWithAvatars = await req.models.avatar.getAvatarImages(users);
  res.json(usersWithAvatars);
  next();
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const result = await req.models.user.createNewUser(
      body.email,
      body.password
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Failed to create new user:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

router.put("/", async (req, res, next) => {
  try {
    const updateUser = await req.models.user.updateUser(
      req.body.email,
      req.body.photoID,
      req.body.name,
      req.body.age,
      req.body.city,
      req.body.bio,
      req.body.gender,
      req.body.desired_roommates,
      req.body.hasResidence
    );
    res.json(updateUser);
  } catch (err) {
    console.error("Failed to update user:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

router.post("/preferences", async (req, res, next) => {
  const addPrefstoUser = await req.models.user.addPref(
    req.body.email,
    req.body.apartment,
    req.body.house,
    req.body.condo,
    req.body.nightPerson,
    req.body.morningPerson,
    req.body.extrovert,
    req.body.introvert,
    req.body.smoker,
    req.body.bringFriendsOver,
    req.body.loud,
    req.body.shareFood,
    req.body.messy,
    req.body.pets,
    req.body.relationship
  );
  res.json(addPrefstoUser);
  next();
});

router.get("/preferences", async (req, res, next) => {
  if (req.query.email) {
    const PrefByEmail = await req.models.user.findPrefByEmail(req.query.email);
    res.json(PrefByEmail);
    next();
  }
});

router.put("/preferences", async (req, res, next) => {
  try {
    const updateUser = await req.models.user.updatePref(
      req.body.email,
      req.body.apartment,
      req.body.house,
      req.body.condo,
      req.body.nightPerson,
      req.body.morningPerson,
      req.body.extrovert,
      req.body.introvert,
      req.body.smoker,
      req.body.bringFriendsOver,
      req.body.loud,
      req.body.shareFood,
      req.body.messy,
      req.body.pets,
      req.body.relationship
    );
    res.json(updateUser);
  } catch (err) {
    console.error("Failed to update user preferences:", err);
    res.status(500).json({ message: err.toString() });
  }
  next();
});

router.delete("/", async (req, res, next) => {
  const deletePref = await req.models.user.deletePref(req.body.email);
  const deleteUser = await req.models.user.deleteUser(req.body.email);
  res.status(204).end();
  next();
});

module.exports = router;
