import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { getAuthContext } from '../auth';

export const handler: APIGatewayProxyHandlerV2<any> = async (event) => {
  const result: APIGatewayProxyResultV2 = {
    body: 'invalid params',
    statusCode: 400,
  };

  const context = getAuthContext(event);

  if (event.body === 'ping') {
    result.headers = { 'content-type': 'plain/text' };
    result.statusCode = 200;
    result.body = 'pong';
  }

  return result;
}
