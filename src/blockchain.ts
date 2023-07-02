import { hash, isHashProofed } from './helpers'
import Block, {BlockPayload, BlockHeader} from './block'
import MinedData from './mineddata'


export class BlockChain {
  _chain: Block[] = []
  private powPrefix = '0'

  constructor (private readonly difficulty: number = 4) {
    this.chain.push(this.createGenesisBlock())
  }

  get chain (): Block[] {
    return this._chain
  }

  private createGenesisBlock (): Block {
    const payload = <BlockPayload>{
      sequence: 0,
      timestamp: +new Date(),
      data: 'Genesis Block',
      previousHash: ''
    }
    return {
      header: <BlockHeader>{
        nonce: 0,
        blockHash: hash(JSON.stringify(payload))
      },
      payload
    }
  }

  createBlockPayload (data: any): BlockPayload  {
    const payload = <BlockPayload>{
      sequence: this.lastBlock.payload.sequence + 1,
      timestamp: +new Date(),
      data,
      previousHash: this.getPreviousBlockHash()
    }

    console.log(`Created block payload ${payload.sequence}: ${JSON.stringify(payload, null, 2)}`)
    return payload
  }

  private getPreviousBlockHash (): string {
    return this.lastBlock.header.blockHash
  }

  private get lastBlock (): Block {
    return this.chain[this.chain.length - 1]
  }

  mineBlock (payload: BlockPayload): MinedData {
    let nonce = 0
    const startTime = +new Date()

    while (true) {
      const blockHash = hash(JSON.stringify(payload))
      const proofingHash = hash(blockHash + nonce)

      if (isHashProofed({
        hash: proofingHash,
        difficulty: this.difficulty,
        prefix: this.powPrefix
      })) {
        const endTime = +new Date()
        const shortHash = blockHash.slice(0, 12)
        const mineTime = (endTime - startTime) / 1000

        console.log(`Mined block ${payload.sequence} in ${mineTime} seconds. Hash: ${shortHash} (${nonce} attempts)`)

        return {
          minedBlock: { payload: { ...payload }, header: { nonce, blockHash } },
          minedHash: proofingHash,
          shortHash,
          mineTime
        }
      }
      nonce++
    }
  }

  pushBlock (block: Block): Block[] {
    if (this.verifyBlock(block)) this.chain.push(block)
    console.log(`Pushed block #${JSON.stringify(block, null, 2)}`)
    return this.chain
  }

  verifyBlock (block: Block): boolean {
    if (block.payload.previousHash !== this.getPreviousBlockHash()) {
      console.error(`Invalid block #${block.payload.sequence}: Previous block hash is "${this.getPreviousBlockHash().slice(0, 12)}" not "${block.payload.previousHash.slice(0, 12)}"`)
      return false
    }

    if (!isHashProofed({
      hash: hash(hash(JSON.stringify(block.payload)) + block.header.nonce),
      difficulty: this.difficulty,
      prefix: this.powPrefix
    })) {
      console.error(`Invalid block #${block.payload.sequence}: Hash is not proofed, nonce ${block.header.nonce} is not valid`)
      return false
    }

    return true
  }
}
