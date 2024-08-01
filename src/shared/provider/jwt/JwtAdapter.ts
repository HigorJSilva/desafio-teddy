import { Secret, sign, verify } from 'jsonwebtoken';
import { IJwtProvider } from './IJwtProvider';
import dotenv from 'dotenv';

dotenv.config();

class JwtProviderAdapter implements IJwtProvider {
  public verify<T>(token: string): T {
    return verify(token, process.env.SECRET ?? 'secret') as T;
  }

  public sign(payload: object): string {
    return sign(payload, process.env.SECRET ?? 'secret');
  }
}

export default JwtProviderAdapter;
