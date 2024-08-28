// api/wrestler.controller.ts
import { WrestlerModel } from "../models/wrestler.model";
import { getMongoClient } from "../utils/mongo";

async function getWrestlers() {
  const client = await getMongoClient();
  const collection = client.collection("wrestlers");
  const wrestlers = await collection.find().toArray();
  return wrestlers;
}

async function createWrestler(wrestler: Wrestler) {
  const client = await getMongoClient();
  const collection = client.collection("wrestlers");
  await collection.insertOne(wrestler);
  return wrestler;
}

async function deleteWrestler(id: string) {
  const client = await getMongoClient();
  const collection = client.collection("wrestlers");
  await collection.deleteOne({ _id: id });
  return id;
}

export { getWrestlers, createWrestler, deleteWrestler };