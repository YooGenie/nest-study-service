import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CustomException } from 'src/exception/custom.exception';
import { ErrorCode } from 'src/exception/error-code.eum';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // constructor(private readonly tokenProvider: TokenProvider) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // const authorization = request.headers['authorization'];
    // if (!authorization) {
    //   throw new CustomException(ErrorCode.INVALID_TOKEN);
    // }
    // const accessToken = /^Bearer (.*)$/.exec(authorization)?.[1];
    // if (!accessToken) {
    //   throw new CustomException(ErrorCode.INVALID_TOKEN);
    // }
    // try {
    //   const decoded = await this.tokenProvider.verifyAccessToken(accessToken);
    //   request.member = decoded;
    //   const memberId = request.member.payload.memberId;
    // try {
    //   const refreshToken = await this.redisService
    //     .getClient()
    //     .get(`refresh_${memberId}`);
    //   if (!refreshToken) {
    //     throw new CustomException(ErrorCode.INVALID_TOKEN);
    //   }
    //   await this.tokenProvider.verifyRefreshToken(refreshToken);
    // } catch (error) {
    //   const message = error instanceof Error ? error.message : undefined;
    //   throw new CustomException(ErrorCode.INVALID_TOKEN, message);
    // }
    //   return true;
    // } catch (error) {
    //   const message = error instanceof Error ? error.message : undefined;
    //   throw new CustomException(ErrorCode.INVALID_TOKEN, message);
    // }
    return true; // Placeholder for actual JWT validation logic
  }
}
