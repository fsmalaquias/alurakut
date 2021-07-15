import {SiteClient} from 'datocms-client';
import { Recado } from '../../src/services/models';

const API_TOKEN = 'e2b9e616363b2403342f04e8c84bf5';
const client = new SiteClient(API_TOKEN);
const DATO_MODEL_ID = '971835';

export default async function receiveRequest(req, res){
  if(req.method === 'POST'){
    const recadoDto = new Recado();
    
    recadoDto.itemType = DATO_MODEL_ID;
    recadoDto.from = req.body.recado.from;
    recadoDto.message = req.body.recado.message;

    const response = await client.items.create(recadoDto);

    res.json(response)
  }
  else{
    res.status(404).json({
      message: 'Method not implemented'
    })
  }

  
  
}