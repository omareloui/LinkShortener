import { connect } from "~~/server/db";

export default eventHandler(async () => {
  await connect();
});
