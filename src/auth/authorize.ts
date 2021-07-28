import { APIGatewayProxyEventV2, APIGatewayRequestAuthorizerHandler } from 'aws-lambda';
import { Enforcer } from 'casbin';
import jwt from 'jsonwebtoken';

import { denyAllPolicy, allowPolicy } from './aws-policies';
import createEnforcer from './enforcer';
import { Context } from './types';

const jwtSecret = process.env['JWT_SECRET'] || '';

export const handler: APIGatewayRequestAuthorizerHandler = async function(event) {
  const enforcer = await createEnforcer();
  let token: any;

  const encodedToken = getEncodedToken(event.headers?.Authorization);

  try {
    token = jwt.verify(encodedToken, jwtSecret);
  } catch (error) {
    console.info(`Invalid token: ${error.message}`);
    return denyAllPolicy();
  }

  if (!Array.isArray(token.permissions)) {
    return denyAllPolicy();
  }

  if (!token.userId) {
    console.info(`userId missing in token: ${encodedToken}`);
    return denyAllPolicy();
  }

  if (await isAuthorized(token.permissions, event.path, event.httpMethod, enforcer)) {
    return allowPolicy(event.methodArn, contextFromToken(token));
  }

  return denyAllPolicy();
}

function getEncodedToken(header = '') {
  const [, token] = header.split(' ');
  return token;
}

function contextFromToken(token: any): Context {
  return { userId: `${token.userId}` };
}

async function isAuthorized(permissions: string[], path: string, method: string, enforcer: Enforcer) {
  for (let i = 0; i < permissions.length; i++) {
    if (await enforcer.enforce(permissions[i], path, method)) {
      return true;
    }
  }

  return false;
}

export function decodeAuthContext(event: APIGatewayProxyEventV2): Context {
  if (!event.headers.Authorization) {
    throw new Error('Missing authorization token');
  }

  const encodedToken = getEncodedToken(event.headers.Authorization);
  const token = jwt.decode(encodedToken);
  return contextFromToken(token);
}

export function getAuthContext(event: APIGatewayProxyEventV2): Context {
  if (process.env['AWS_SAM_LOCAL'] === 'true') {
    return decodeAuthContext(event);
  }

  return {
    userId: event.requestContext.authorizer ? event.requestContext.authorizer['userId'] : ''
  };
}
