const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');
let db = null;

class Expedientes {
    collection = null;
    constructor() {
        getDb()
            .then((database) => {
                db = database;
                this.collection = db.collection('Expedientes');
                if (process.env.MIGRATE === 'true') {
                    //
                }
            })
            .catch((err) => { console.error(err) });
    }
    
//NEW
  async new(identidad, fecha, descripcion, observacion, registros,ultimaActualizacion) {
    const newExpediente = {
      identidad,
      fecha,
      descripcion,
      observacion,
      registros,
      ultimaActualizacion
    };
    const rslt = await this.collection.insertOne(newExpediente);
    return rslt;
}

//GET ALL
  async getAll() {
    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;
  }

//GET FACETED
  async getFaceted(page, items, filter = {}) {
    const cursor = this.collection.find(filter);
    const totalItems = await cursor.count();
    cursor.skip((page -1) * items);
    cursor.limit(items);
    const resultados = await cursor.toArray();
    return {
      totalItems,
      page,
      items,
      totalPages: (Math.ceil(totalItems / items)),
      resultados
    };
  }

//GET BYID
  async getById(id) {
    const _id = new ObjectId(id);
    const filter = {_id};
    console.log(filter);
    const myDocument = this.collection.findOne(filter);
    return myDocument;
  }

//UPDATE ONE
async updateOne(id, identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) {
    const filter = {_id: new ObjectId(id)};
    const updateCmd = {
      '$set':{
        identidad,
        fecha,
        descripcion,
        observacion,
        registros,
        ultimaActualizacion
      }
    };
    return await this.collection.updateOne(filter, updateCmd);
  }

//UPDATE ADD TAG
  async updateAddTag(id, tagEntry){
    const updateCmd={
      "$push":{
        tags: tagEntry
      }
    }
    const filter = {_id: new ObjectId(id)}
    return await this.collection.updateOne(filter,updateCmd);
  }

//UPDATE ADD TAG SET
  async updateAddTagSet(id, tagEntry){
    const updateCmd={
      "$addToSet":{
        tags: tagEntry
      }
    }
    const filter = {_id: new ObjectId(id)}
    return await this.collection.updateOne(filter,updateCmd);
  }

//DELETE
async deleteOne(id) {
    const filter = {_id: new ObjectId(id)};
    return await this.collection.deleteOne(filter);
  }
}
  
module.exports = Expedientes;