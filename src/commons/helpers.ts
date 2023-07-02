import HashProofedParams from './hashProofedParams'
import { BinaryLike, createHash } from 'crypto'

export function hash (data: BinaryLike) {
  return createHash('sha256').update(data).digest('hex')
}

export function isHashProofed ({ hash, difficulty = 4, prefix = '0' }: HashProofedParams) {
  const check = prefix.repeat(difficulty)
  return hash.startsWith(check)
}


