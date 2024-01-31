import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { BandModule } from '../bands.module';
import { Test } from '@nestjs/testing';
import { BandService } from './bands.service';

describe('BandsService', () => {
  let testApp: INestApplication;
  let bandsService: {
    findAll: () => [{ id: 0; name: 'Test0' }, { id: 1; name: 'Test1' }];
    findAny: () => [{ id: 0; name: 'Test0' }, { id: 1; name: 'Test1' }];
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BandModule],
    })
      .overrideProvider(BandService)
      .useValue(bandsService)
      .compile();
    testApp = moduleRef.createNestApplication();
    await testApp.init();
    await testApp.getHttpAdapter().getInstance().ready();
  });

  it(`GraphQL findAll`, () => {
    return request(testApp.getHttpServer())
      .post('/graphql')
      .set({})
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.data.findAll).toEqual([
          { id: 0, name: 'Test0' },
          { id: 1, name: 'Test1' },
        ]);
      });
  });
  afterAll(async () => {
    await testApp?.close();
  });
});
