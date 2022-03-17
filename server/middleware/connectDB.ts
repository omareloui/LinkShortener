import { connect } from "~~/server/db";

export default async () => {
  await connect();
};
