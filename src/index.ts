import BlockChain from './domains/blockChain'

const blockchain = new BlockChain(Number(process.argv[2] || 4))
const blockNumber = +process.argv[3] || 10
let chain = blockchain.chain

for (let i = 1; i <= blockNumber; i++) {
  const payload = blockchain.createBlockPayload(`Block ${i}`)
  const minedData = blockchain.mineBlock(payload)
  console.log(`proofed hash: ${minedData.minedHash}`);
  chain = blockchain.pushBlock(minedData.minedBlock)
}

console.log('--- GENERATED CHAIN ---\n')
console.log(chain)
