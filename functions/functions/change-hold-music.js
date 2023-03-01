exports.handler = function(context, event, callback) {
  const client = context.getTwilioClient();
  const callSid = event.callSid;
  const musicFileName = 'hold-music-1.mp3';
  
// CORS Headers
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, User-Agent',
  );
  response.appendHeader('Vary', 'Origin');

  const holdMusicUrl = `https://functions-2408-dev.twil.io/${musicFileName}` ;

  client.calls(callSid)
      .update({
        twiml: `<Response><Play loop="0">${holdMusicUrl}</Play></Response>`
      })
      .then( (call) => {
        console.log(`Hold music changed for call ${callSid}`);
        response.setBody({
          status: "DONE",
        });
        callback(null, response);
      })
      .catch(error => callback(error));
};