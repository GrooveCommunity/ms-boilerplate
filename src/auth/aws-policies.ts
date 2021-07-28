import { Context } from './types';

import {
  CustomAuthorizerResult
} from 'aws-lambda';

export function denyAllPolicy(): CustomAuthorizerResult {
  return {
    principalId: '*',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: '*',
          Effect: 'Deny',
          Resource: '*'
        }
      ]
    }
  }
}

export function allowPolicy(methodArn: string, context: Context): CustomAuthorizerResult {
  return {
    principalId: 'apigateway.amazonaws.com',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: methodArn
        }
      ]
    },
    context
  }
}
