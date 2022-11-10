
const chai = require('chai');
const { expect } = chai;
const testUtils = require('../../utils');

const applicationLayer = require('../../../src/application_layer');

describe('application_layer/phones/update', function() {
  before(async function () {
    testUtils.clearData();
  });

  describe('update phone', function() {
    it('fails if input id invalid', async function() {
      const invalidRequest = {
        'params': {
          'id': true,
        },
      };

      expect(
        applicationLayer.phones.update.parseInputParameters(invalidRequest)
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
        applicationLayer.phones.update.parseInputParameters(invalidRequest)
      ).to.throw;
    });


    it.only('updates phone if valid path id and body provided', async function() {
      const testPhoneId = '1';
      const originalPhone = {
        'make':            'LG',
        'model':           'G6',
        'storage':         32,
        'monthly_premium': 4.49,
        'excess':          75,
      };

      await testUtils.postTestData({
          ...originalPhone,
          'id': testPhoneId,
      });

      const updatedPhone = {
        ...originalPhone,
        // Lets update the storage
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

      const actual = await applicationLayer.phones.update.parseInputParameters(validRequest);

      expect(actual).to.deep.equal({
        'id': testPhoneId,
        ...updatedPhone,
      });
    });
  });
});
