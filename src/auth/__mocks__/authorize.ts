import { APIGatewayRequestAuthorizerEvent } from 'aws-lambda';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function getAuthContext(event: any): { userId: string | null } {
  let userId: string | null = null;

  if (!event || !event.headers) return { userId };

  const [, token] = event.headers.Authorization.split(' ') || [];
  const payload = jwt.decode(token) as JwtPayload;

  if (payload !== null) {
    userId = payload.userId;
  }

  return { userId };
}
