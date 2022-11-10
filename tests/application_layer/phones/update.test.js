
const chai = require('chai');
const { expect } = chai;
const testUtils = require('../../utils');

const phones = require('../../../src/application_layer/phones/update');
const dataAccessLayer = require('../../../src/data_access_layer/phones');

describe('application_layer/phones', function() {
  before(async function () {
    testUtils.clearData();
  });

  describe('update phone', function() {
    it('fails if input id invalid', async function() {
      const invalidRequest = {
        'params': {
          'phoneId': 44,
        },
      };
      expect(
        phones.parseInputParameters(invalidRequest)
      ).to.throw;
    });

    it('fails if request body is invalid', async function() {
      const invalidRequest = {
        'params': {
          'phoneId': '44',
        },
        'body': {
          'make': 1,
        },
      };
      expect(
        phones.parseInputParameters(invalidRequest)
      ).to.throw;
    });


    it('updates phone if valid path id and body provided', async function() {
      const testPhoneId = '1';
      const originalPhone = {
        'id':              testPhoneId,
        'make':            'LG',
        'model':           'G6',
        'storage':         32,
        'monthly_premium': 4.49,
        'excess':          75,
      };

      await testUtils.postTestData(originalPhone);

      delete originalPhone.id;

      const updatedPhone = {
        ...originalPhone,
        // Lets just update the storage
        'storage': 64,
      };

      const validRequest = {
        'params': {
          'id': testPhoneId,
        },
        'body': {
          ...updatedPhone,
        },
      };

      const parsed = await phones.parseInputParameters(validRequest);
      const actual = await dataAccessLayer.updatePhone(parsed);

      expect(actual).to.deep.equal({
        'id': testPhoneId,
        ...updatedPhone,
      });
    });
  });
});
