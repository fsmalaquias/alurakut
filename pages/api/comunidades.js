import {SiteClient} from 'datocms-client';
import { Comunidade } from '../../src/services/models';

const API_TOKEN = 'e2b9e616363b2403342f04e8c84bf5';
const client = new SiteClient(API_TOKEN);
const DATO_MODEL_ID = '966844';

export default async function receiveRequest(req, res){
  if(req.method === 'POST'){
    const comunidadeDto = new Comunidade();
    
    comunidadeDto.itemType = DATO_MODEL_ID;
    comunidadeDto.name = req.body.comunidade.name;
    comunidadeDto.image = req.body.comunidade.image;
    comunidadeDto.link = req.body.comunidade.link;

    const response = await client.items.create(comunidadeDto);

    res.json(response)
    
  }else{
    res.status(404).json({
      message: 'Method not implemented'
    })
  }
  
}