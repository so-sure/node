
const chai = require('chai');
const { expect } = chai;
const testUtils = require('../../utils')

const phones = require('../../../src/application_layer/phones/delete')

describe('application_layer/phones', function() {
    before(async function () {
        testUtils.clearData();
    });

    describe('delete phone', function() {
        it('fails if input id invalid', async function() {
            const invalidRequest = {
                params: {
                    phoneId : 44
                }
            }
            expect(
                phones.handleRequest(invalidRequest)
            ).to.throw;
        });

        it('returns the deleted phone id if valid id provided', async function() {
            const expected = {
                id: '1',
                make: 'LG',
                model: 'G6',
                storage: 32,
                monthly_premium: 4.49,
                excess: 75
              };
            await testUtils.postTestData(expected);

            const validRequest = {
                params: {
                    phoneId : '1'
                }
            }

            const actual = await phones.handleRequest(validRequest);

            expect(actual).to.equal(expected.id);
        });
    });
});
