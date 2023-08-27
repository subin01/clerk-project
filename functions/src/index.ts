// import jwtDecode from 'jwt-decode';
import jwt from "jsonwebtoken";
import { setGlobalOptions } from "firebase-functions/v2";
import {logger} from "firebase-functions";
import {onRequest } from  "firebase-functions/v2/https"
// import { onCall } from  "firebase-functions/v2/https"
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
  // logger.log('::: addMessage2 :::: body', req.body)
  // logger.log('::: addMessage2 :::: query', req.query)
  logger.log('::: addMessage2 :::: headers', req.headers)

  // const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
  const PEMpublicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8FZew/zCEh+XNkYo+mJZGNJzimCQOXXeM6HyPekbV2HUEC4PC8vIu3bP5L0ZYPPLjg70DHlKW22tME3+63I1tUANAD+MmXo69f5yhsdzFUUhtmPztq8yYQQfViI8NbY7bjdvnZ2dHLlKkMwuaFCT0ta9fv0CwuY1LFQ4mSv2nLONvHzxVkq3wnEtN4zXS+/DmejSn9rMLYRXB0WhlOi2b0QFbDgoetDCtFFN6EcO/KBFTWMxalLVRHl5Jw2OCPD0ATEwQNmTd/VX2LrI8YUBht5yjmxHADidaSyW/LFWQPWcBqgjbIzEuhbXhpO53exKMwb67kTwZKZVampeIkQ7gwIDAQAB\n-----END PUBLIC KEY-----";

  const token = req.headers.authorization;
  logger.log('::: addMessage2 :::: token', token);

  if (token === undefined) {
    res.status(401).json({ error: "not signed in" });
    return;
  }
  try {
    let decoded = "";
    if (token) {
      //  @ts-ignore
      decoded = jwt.verify(token, PEMpublicKey, { algorithms: ['RS256']});
      logger.log('::: addMessage2 :::: decoded', req.decoded)

      res.status(200).json({ sessToken: decoded });
      return;
    }
    //  else {
    //   decoded = jwt.verify(sessToken, publicKey);
    //   res.status(200).json({ sessToken: decoded });
    //   return;
    // }
  } catch (error) {
    res.status(400).json({
      error: "Invalid Token",
      details: error
    });
    return;
  }



  // jwtDecode()
  res.status(200).json({"message": "all good mate! 2"});
}



// exports.teamSelectionTimerCallback = onRequest(teamSelectionTimerCallback)
// exports.addmessage = onCall(addMessage);
exports.addmessage2 = onRequest({ cors:  [/vercel\.app$/, 'http://localhost:3000'] }, addMessage2);
