const knex = require("../config/knex");
const USERS_TABLE = "users";
const REQ_TABLE = "requests";

const fetchAllReq = async () => {
  const query = knex(REQ_TABLE);
  const results = await query;
  return results;
};

const fetchReqByRecipient = async (to) => {
  const query = knex(REQ_TABLE)
    .where({ to })
    .crossJoin(USERS_TABLE, "users.email", "requests.from");
  const results = await query;
  return results;
};

const fetchReqBySender = async (from) => {
  const query = knex(REQ_TABLE)
    .where({ from })
    .crossJoin(USERS_TABLE, "users.email", "requests.to");
  const results = await query;
  return results;
};

const fetchReq = async (to, from) => {
  const query = knex(REQ_TABLE).where({ to, from });
  const results = await query;
  return results;
};

const createRequest = async (to, from, message) => {
  const query = knex(REQ_TABLE).insert({ to, from, message });
  const result = await query;
  return result;
};

const acceptRequest = async (to, from, accepted) => {
  const query = knex(REQ_TABLE).update({ accepted }).where({ to, from });
  const results = await query;
  return results;
};

const deleteRequest = async (to, from) => {
  const query = knex(REQ_TABLE).delete().where({ to, from });
  const results = await query;
  return results;
};

module.exports = {
  fetchAllReq,
  fetchReqByRecipient,
  fetchReqBySender,
  fetchReq,
  createRequest,
  acceptRequest,
  deleteRequest,
};
