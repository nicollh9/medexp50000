const express = require('express');
const router = express.Router();

const Expedientes = require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Expedienteees',
        updates: new Date(2022, 0, 19, 18, 41, 0)
    })
}); //GET 

router.post('/new', async(req, res) => {
        const { identidad, fecha, descripcion, observacion, registros, ultimaActualizacion } = req.body;
        try {
            rslt = await expedienteModel.new(identidad, fecha, descripcion, observacion, registros, ultimaActualizacion)
            res.status(200).json({
                status: 'ok',
                received: rslt
            })
        } catch (ex) {
            console.log(ex);
            res.status(502).json({
                status: 'failed',
                result: {}
            })
        }

    }) //POST / new

/***All***/
router.get('/all', async(req, res) => {
        try {
            const rows = await expedienteModel.getAll();
            res.status(200).json({ status: 'ok', expedientes: rows })
        } catch (ex) {
            console.log(ex);
            res.status(500).json({ status: 'failed' });
        }
    }) //get All

/***Update***/
router.put('/update/:id', async(req, res) => {
    try {
        const { identidad, fecha, descripcion, observacion, registros, ultimaActualizacion } = req.body;
        const { id } = req.params;
        const result = await expedienteModel.updateOne(id, identidad, fecha, descripcion, observacion, registros, ultimaActualizacion);
        res.status(200).json({
            status: 'ok',
            result
        })
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
})

/***By id***/
router.get('/byid/:id', async(req, res) => {
        try {
            const { id } = req.params;
            const rows = await expedienteModel.getById(parseInt(id));
            res.status(200).json({ status: 'ok', expedientes: rows })
        } catch (ex) {
            console.log(ex);
            res.status(500).json({ status: 'failed' });
        }
    }) //get byId

/***Delete***/
router.delete('/delete/:id', async(req, res) => {
        try {
            const { id } = req.params;
            const result = await expedienteModel.deleteOne(id);
            res.status(200).json({
                status: 'ok',
                result
            })
        } catch (ex) {
            console.log(ex);
            res.status(500).json({ status: 'failed' });
        }
    }) //DELETE

// router.post();
// router.put();
// router.delete();

module.exports = router;