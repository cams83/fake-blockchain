import BlockChain from '../../src/domains/blockChain'

describe('BlockChain', () => {
    it('should create a genesis block', () => {
        const blockchain = new BlockChain()        
        expect(blockchain.chain[0].payload.sequence).toBe(0)
        expect(blockchain.chain[0].payload.timestamp).toBeTruthy()
        expect(blockchain.chain[0].payload.data).toBe('Genesis Block')
        expect(blockchain.chain[0].payload.previousHash).toBeFalsy()
        expect(blockchain.chain[0].header.nonce).toBe(0)
        expect(blockchain.chain[0].header.blockHash).toBeTruthy()
     })
    it('should create a block payload', () => {
       const blockchain = new BlockChain()
       const payload = blockchain.createBlockPayload('test')
       expect(payload.sequence).toBe(1)
       expect(payload.timestamp).toBeTruthy()
       expect(payload.data).toBe('test')
       expect(payload.previousHash).toBe(blockchain.chain[0].header.blockHash)
    })
    it('should mine a block', () => {
        const blockchain = new BlockChain()
        const payload = blockchain.createBlockPayload('test')
        const minedData = blockchain.mineBlock(payload)
        expect(minedData.minedBlock.payload.sequence).toBe(1)
        expect(minedData.minedBlock.payload.timestamp).toBeTruthy()     
        expect(minedData.minedBlock.payload.data).toBe('test')
        expect(minedData.minedBlock.payload.previousHash).toBe(blockchain.chain[0].header.blockHash)
        expect(minedData.minedBlock.header.nonce).toBeGreaterThan(0)
        expect(minedData.minedBlock.header.nonce).toBeLessThan(1000000)
        expect(minedData.minedBlock.header.blockHash).toBeTruthy()
        expect(minedData.minedHash).toBeTruthy()
        expect(minedData.shortHash).toBeTruthy()
        expect(minedData.mineTime).toBeTruthy()
    })
    it('should push a block', () => {
        const blockchain = new BlockChain()
        const payload = blockchain.createBlockPayload('test')
        const minedData = blockchain.mineBlock(payload)
        const chain = blockchain.pushBlock(minedData.minedBlock)
        const lastChainIndex = chain.length - 1
        expect(chain[lastChainIndex].payload.sequence).toBe(1)
        expect(chain[lastChainIndex].payload.timestamp).toBeTruthy()
        expect(chain[lastChainIndex].payload.data).toBe('test')
        expect(chain[lastChainIndex].payload.previousHash).toBe(blockchain.chain[chain.length - 2].header.blockHash)
    })
})

