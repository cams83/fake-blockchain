import { hash, isHashProofed } from '../src/helpers'

describe('helpers', () => {
    it('should hash data', () => {
        const hashedData = hash('test')
        expect(hashedData).toBeTruthy()
    })
    it('should check if hash is proofed', () => {
        const proofedHash = isHashProofed({ hash:
            '0000f6bcd4621d373cade4e832627b4f6',
            difficulty: 4,
            prefix: '0'
        })
        expect(proofedHash).toBeTruthy()
    })
})