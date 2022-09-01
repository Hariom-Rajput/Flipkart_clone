import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmParams, paytmMerchantkey } from '../server.js';

import formidable from 'formidable';        // for parsing form data
import https from 'https';


export const addPaymentGateway   = async (request, response) => {         //  getting custmerid and params
    let paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
    try {
        let params = {
            ...paytmParams,
            'CHECKSUMHASH': paytmCheckSum
        };
        response.json(params);
    } catch (error) {
        console.log(error);
    }
}



export const paymentResponse = (request, response) => {

    const form = new formidable.IncomingForm();
        let paytmCheckSum = request.body.CHECKSUMHASH;
        delete request.body.CHECKSUMHASH;

//         // it will check that is there any interference in your checksum by someone
        var isVerifySignature = paytmchecksum.verifySignature(request.body, 'bKMfNxPPf_QdZppa', paytmCheckSum);
        console.log(isVerifySignature);

//         // if everythisg is fine then return true
        if (isVerifySignature) {
            var paytmParams = {};
            paytmParams["MID"] = request.body.MID;
            paytmParams["ORDERID"] = request.body.ORDERID;

//             // generating new signature
            paytmchecksum.generateSignature(paytmParams, 'bKMfNxPPf_QdZppa').then(function (checksum) {

                paytmParams["CHECKSUMHASH"] = checksum;

                var post_data = JSON.stringify(paytmParams);

                var options = {

                    hostname: 'securegw-stage.paytm.in',
                    port: 443,
                    path: '/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var res = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        res += chunk;
                    });

                    post_res.on('end', function () {
                        let result = JSON.parse(res)
                        // if the payment fails, then we redirect the home page
                        response.redirect(``)
                    });
                });
                post_req.write(post_data);
                post_req.end();
            });
        } 
        // return false means there are some manipulation in your checksum
        else {
            console.log("Checksum Mismatched");
        }
    console.log('//////////////end')
}