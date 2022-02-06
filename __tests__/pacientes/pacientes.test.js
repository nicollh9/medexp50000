const app = require('../../app');
const supertest = require("supertest");
describe ('Test suite de api v1 pacientes endpoint', ()=> { 
  it("GET /api/v1/pacientes/", async ()=> {
    await supertest(app).get('/api/v1/pacientes')
      .set({ apitoken:'53bb1e40-6169-43de-8167-496182f8c836'})
      .expect(200);
  });
}); 