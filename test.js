import { getDestination } from "@sap-cloud-sdk/connectivity";
import { executeHttpRequest } from "@sap-cloud-sdk/http-client";
import xsenv from '@sap/xsenv';

xsenv.loadEnv();
// const destination = await getDestination({destinationName:'DEV-100-BasicAuthentication'})
// console.log(destination)


async function callBackend() {
  
    const response = await executeHttpRequest(
        {
            destinationName: 'DEV-100-BasicAuthentication' 
        },
        {
            method: 'GET',
            url: "/sap/opu/odata/sap/ZINSPECTION_APP_SRV/VH_CarrierlineSet",

        }
    );
    console.log(JSON.stringify(response.data,null,2))
};
callBackend();
