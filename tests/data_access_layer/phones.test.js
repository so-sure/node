const { expect } = require('chai');
const phones = require('../../src/data_access_layer/phones')
const testUtils = require('../utils')

describe('external_access_layer/phones', function() {
    before(async function () {
        testUtils.clearData();
    });

    describe('getPhoneById', function() {
        it('returns a inserted phone with given id', async function() {
            const expected = {
                id: 1,
                make: 'LG',
                model: 'G6',
                storage: 32,
                monthly_premium: '4.49',
                excess: 75
              };
            await testUtils.postTestData(expected);

            const actual = await phones.getPhoneById(1)
            expect(actual).to.deep.equal(expected);
        });
    });

    describe('deletePhoneById', function() {
        it('deletes an inserted phone with given id', async function() {
            const expected = {
                id: 10,
                make: 'LG',
                model: 'G6',
                storage: 32,
                monthly_premium: '4.49',
                excess: 75
              };
            await testUtils.postTestData(expected);
            await phones.deletePhoneById(10)

            const actual = await phones.getPhoneById(10)

            expect(actual).to.be.undefined;
        });
    });

    describe('updatePhone', function() {
        it('deletes an inserted phone with given id', async function() {
            const originalPhone = {
                id: 11,
                make: 'LG',
                model: 'G6',
                storage: 32,
                monthly_premium: '4.49',
                excess: 75
              };
            await testUtils.postTestData(originalPhone);

            const updatedPhone = {
                ...originalPhone,
                // Lets update the storage and increase the monthly premium
                storage: 32,
                monthly_premium: '9.49',
              };

            await phones.updatePhone(updatedPhone)

            const actual = await phones.getPhoneById(11)

            expect(actual).to.deep.equal(updatedPhone);
        });
    });
});
