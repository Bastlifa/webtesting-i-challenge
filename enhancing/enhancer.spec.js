const enhancer = require('./enhancer.js');
// test away!

describe('enhancer module', () =>
{
    describe('repair function', () =>
    {
        it('should set the durability to 100', () =>
        {
            const item = {name: "spear", enhancement: 3, durability: 73}
            const expectedOutput = 100
            const actualOutput = enhancer.repair({item}).durability
            expect(actualOutput).toBe(expectedOutput)
        })
    })

    describe('succeed function', () =>
    {
        it('increases enhancement by 1', () =>
        {
            const expectedOutput = 5
            const actualOutput = enhancer.succeed({name: "club", durability: 34, enhancement: 4}).enhancement
            expect(actualOutput).toBe(expectedOutput)
        })
        it('should have a cap of 20', () =>
        {
            const expectedOutput = 20
            const actualOutput = enhancer.succeed({name: "club", durability: 34, enhancement: 20}).enhancement
            expect(actualOutput).toBe(expectedOutput)
        })
        it('should not alter the durability of the item', () =>
        {
            const expectedOutput = 43
            const actualOutput = enhancer.succeed({name: "sword", durability: 43, enhancement: 4}).durability
            expect(actualOutput).toBe(expectedOutput)
        })
    })
    
    describe('fail function', () =>
    {
        it('should lower durability by 5, if enhancement is less than 15', () =>
        {
            const expectedOutput = 62
            const actualOutput = enhancer.fail({name: "sword", enhancement: 4, durability: 67}).durability
            expect(actualOutput).toBe(expectedOutput)
        })
        it('should lower durability by 10, if enhancement is greater than or equal to 15', () =>
        {
            const expectedOutput = 45
            const actualOutput = enhancer.fail({name: "sword", enhancement: 17, durability: 55}).durability
            expect(actualOutput).toBe(expectedOutput)
        })
        it('should lower enhancement by 1, if enhancement is greater than 16', () =>
        {
            const expectedOutput = 16
            const actualOutput = enhancer.fail({name: "sword", enhancement: 17, durability: 55}).enhancement
            expect(actualOutput).toBe(expectedOutput)
        })
        it('should keep enhancement the same, if enhancement is less than or equal to 16', () =>
        {
            const expectedOutput = 16
            const actualOutput = enhancer.fail({name: "sword", enhancement: 16, durability: 55}).enhancement
            expect(actualOutput).toBe(expectedOutput)
        })
    })
    
    describe('get function', () =>
    {
        it('Should return an item with a bonus prefix when it has a positive enhancement level', () =>
        {
            const expectedOutput = JSON.stringify({ name: '[+5] Sword', enhancement: 5, durability: 48 })
            const actualOutput = JSON.stringify(enhancer.get({ name: 'Sword', enhancement: 5, durability: 48 }))
            expect(actualOutput).toBe(expectedOutput)
        })
        it('Should return the same item when it has a 0 enhancement level', () =>
        {
            const expectedOutput = JSON.stringify({ name: 'Sword', enhancement: 0, durability: 48 })
            const actualOutput = JSON.stringify(enhancer.get({ name: 'Sword', enhancement: 0, durability: 48 }))
            expect(actualOutput).toBe(expectedOutput)
        })
    })
})