const Pacientes = require  ('../../dao/pacientes/pacientes.model');

describe('Testing Pacientes Model', ()=>{
    let pacientesModel = undefined;
    let lastId=0;

    beforeAll( (done)=>{
        pacientesModel = new Pacientes();
        setTimeout(()=>{
            done();
        },3000);
    });

    it('pacientesModel esta definido', ()=>{
       return expect(pacientesModel).toBeDefined();
    });

    it('getAll Devuelve un array', async ()=>{
        const arrPacientes =  await pacientesModel.getAll();
        return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
    });

    it('new guarde un dato',async()=>{
        const resultado = await pacientesModel.new(
            'Test Prueba',
            'Jules',
            '000001',
            'telefono',
            'correo@correo.com'
        );
        lastId = resultado;
        return expect(resultado).toBeDefined();
    });

    it(' Obtener un dato',async()=>{
        const resultado = await pacientesModel.getById(
            lastId
        );
        console.log(resultado);
        return expect(resultado.nombre).toBe('Test Prueba');
    });

    it(' Eliminar un dato',async()=>{
        const resultado = await pacientesModel.deleteOne(
            lastId
        );
        console.log(resultado);
        return expect(resultado).toBeDefined();
    });

});
