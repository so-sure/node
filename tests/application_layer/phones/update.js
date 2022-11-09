

const chai = require('chai');
const { expect } = chai;
const testUtils = require('../../utils')

const phones = require('../../../src/application_layer/phones/update')

describe('application_layer/phones', function() {
    before(async function () {
        testUtils.clearData();
    });

    describe('update phone', function() {
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

        it('fails if request body is invalid', async function() {
            const invalidRequest = {
                params: {
                    phoneId : '44'
                },
                body: {
                    make: 1
                }
            }
            expect(
                phones.handleRequest(invalidRequest)
            ).to.throw;
        });


        it('updates phone if valid path id and body provided', async function() {
            const testPhoneId = '1';
            const originalPhone = {
                id: testPhoneId,
                make: 'LG',
                model: 'G6',
                storage: 32,
                monthly_premium: 4.49,
                excess: 75
              };

            await testUtils.postTestData(originalPhone);

            delete originalPhone.id;

            const updatedPhone = {
                ...originalPhone,
                // Lets just update the storage
                storage: 64
            };

            const validRequest = {
                params: {
                    phoneId: testPhoneId
                },
                body: {
                    ...updatedPhone
                }
            }

            const actual = await phones.handleRequest(validRequest);

            expect(actual).to.deep.equal({
                id: testPhoneId,
                ...updatedPhone
            });
        });
    });
});
