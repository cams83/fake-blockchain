import Block from "./block";

export default interface MinedData {
  minedBlock: Block;
  minedHash: string;
  shortHash: string;
  mineTime: number;
}
