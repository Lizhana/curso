const { Users, Courses, course_Inscription } = require("../database.js");

const createUser = async (name, lastName, code, birthday) => {
  const verificate = await userByCode(code);
  if (verificate.length) {
    code = code + "-P";
  }
  const newUser = await Users.create({
    name,
    lastName,
    birthday,
    code,
  });
  return newUser;
};

const userInscription = async (userId, courseId) => {
  const inscrited = await course_Inscription.create({
    UserId: userId,
    CourseId: courseId,
  });
  return inscrited;
};

const getAllUsers = async () => {
  const allUsers = await Users.findAll();
  return allUsers;
};

const userByCode = async (code) => {
  const userCode = await Users.findAll({
    where: {
      code,
    },
    include: Courses,
  });
  return userCode;
};

const userById = async (id) => {
  const userId = await Users.findByPk(id, { include: Courses });
  return userId;
};

const updateUser = async ({ id, data }) => {
  const userUpdate = await userById(id);
  if (!userUpdate) {
    throw new Error("No hay usuario con esa id");
  }
  userUpdate.set(data);
  await userUpdate.save();
  return userUpdate;
};

module.exports = {
  createUser,
  userByCode,
  userById,
  getAllUsers,
  updateUser,
  userInscription,
};
