import { getSignedUrl } from 'aws-signing-utils';
import AWSCognito from 'react-native-aws-cognito';

export function setUserPool(config) {
  AWSCognito.setUserPool(
    config.region,
    config.identityPoolId,
    config.clientId,
    config.secret,
    config.userPoolId
  );
}

export function connect(config) {
  return AWSCognito.getSession(config.email, config.password)
    .then( () => AWSCognito.getCredentials(config.email) )
    .catch( err => console.error('Error: ', err) );
}

export function getEndpointUrl(config, credentials) {
  return getSignedUrl({
    method: 'GET',
    protocol: 'wss',
    canonicalUri: '/mqtt',
    service: 'iotdevicegateway',
    region: config.region,
    secretKey: credentials.secretKey,
    accessKey: credentials.accessKey,
    sessionKey: credentials.sessionKey,
    host: config.endpointAddress,
  });
}