//-- NPM Packages
import {expect} from 'chai';
import {} from 'sinon';
import {base, en, en_US, en_CA, Faker} from '@faker-js/faker';

//-- Project Code
import {getTestingModule} from '@src';

/**
 * The fake data provider.
 */
const fake = new Faker({
    locale: [en_CA, en_US, en, base]
});

/**
 * The module under test.
 */
const testModule = getTestingModule();

describe('module:index', () => {
    before(() => {
        const envFakerSeed = process.env['FAKER_SEED'] ?? null;
        let fakerSeed =
            envFakerSeed === null ? fake.seed() : parseInt(envFakerSeed);
        if (!isFinite(fakerSeed)) {
            fakerSeed = fake.seed();
        }
        console.debug(`Using "${fakerSeed}" for testing "module:index"`);
        fake.seed(fakerSeed);
    });
    describe('.helloWorld()', () => {
        it('should return "Hello world!"', () => {
            //-- Given

            //-- When
            const r = testModule.helloWorld();

            //-- Then
            expect(r).to.equal('Hello world!');
        });
    });
});
