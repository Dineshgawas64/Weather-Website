const request = require("request")

const forecast = (lat,long,callback) => {
    const url = 'https://api.pirateweather.net/forecast/wi6rJQAP1Y9G4i7gQly7l2q3PZs68VPR1Sq2A3zf/' +encodeURIComponent( lat) +','+encodeURIComponent( long) 

    request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect to services',undefined)
        }else if(body.daily.length ===0){
            callback('unable to find weather please search again',undefined)
        }else{
            callback(undefined,body.daily.data[2].summary +' It is currently ' + body.currently.temperature + ' fareinheit out. There is ' + body.currently.precipIntensity + ' % chance of rain')
        }
    })
}

module.exports = forecast