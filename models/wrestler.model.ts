// models/wrestler.model.ts
import { Document } from "mongodb";

interface Wrestler {
  fullName: string;
  school: string[];
  weightClass: string[];
  seasonRecord: string[];

}

export interface WrestlerDocument extends Document, Wrestler {}