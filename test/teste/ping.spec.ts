jest.mock('../../src/auth/authorize')

import { handler as Ping } from '../../src/teste/ping';

describe(
  'Ping',
  () => {

    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoxLCJpYXQiOjE1MTYyMzkwMjJ9.36u_AH0-syXAa0bZ-Wl8u19GHEdURVzJ1ZAUPgf_z0U',
    };

    it(
      'should get an error when not pass params',
      async () => {
        const event = {} as any;
        const context = {} as any;
        const callback = (): any => { /* nothing */ };

        const result = await Ping(event, context, callback);

        expect(result.statusCode).toBe(400);
        expect(result.body).toBe('invalid params');
      },
    );
  }
);
