export interface BlockHeader {
  nonce: number;
  blockHash: string;
}

export interface BlockPayload {
  sequence: number;
  timestamp: number;
  data: any;
  previousHash: string;
}

export default interface Block {
  header: BlockHeader
  payload: BlockPayload
}


