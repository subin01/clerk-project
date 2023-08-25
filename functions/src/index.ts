// import jwtDecode from 'jwt-decode';
import { setGlobalOptions } from "firebase-functions/v2";
import {logger} from "firebase-functions";
import {onRequest, onCall } from  "firebase-functions/v2/https"
setGlobalOptions({ maxInstances: 2 });



export async function teamSelectionTimerCallback(req: any, res: any) {
  logger.log('::: Webhook ::::', req.body.data)

  try {
   
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500).send(e)
  }
}

export async function addMessage (req: any) {
  logger.log('::: addMessage ::::', req.data)
  logger.log('::: addMessage :::: auth', req.auth)
  return {text: "all good mate!"};
}

export async function addMessage2 (req: any, res: any) {
  logger.log('::: addMessage2 ::::', req)
  logger.log('::: addMessage2 :::: auth', req.headers)
  // jwtDecode
  res.status(200).send("all good mate! 2");
}



exports.teamSelectionTimerCallback = onRequest(teamSelectionTimerCallback)
exports.addmessage = onCall(addMessage);
exports.addmessage2 = onRequest({ cors: false }, addMessage2);
