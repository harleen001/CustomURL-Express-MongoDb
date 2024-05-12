import { nanoid } from 'nanoid';
import { create } from '../models/url';
async function HandlegenerateNewShortURL(req,res){
    const body = req.body;
S
    if(!body.url) return res.status(400).json({error: 'url is required'}
    )
const shortID= nanoid(8);
await create({



    shortId:shortID,
    redirectUrl: body.url,
    visitHistory: [],
});
return res.json({id:shortID});
}
export default{
    HandlegenerateNewShortURL,
}