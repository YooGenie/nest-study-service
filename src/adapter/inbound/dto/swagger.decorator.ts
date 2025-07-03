/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { Pagination } from 'src/adapter/inbound/dto/pagination';
import { BUILT_IN_TYPES } from 'src/constants';

function isBuiltInType(type: Type<unknown>): boolean {
  return BUILT_IN_TYPES.some((item) => item === type);
}

export const ApiSuccessResponse = (
  status: number,
  type: Type<unknown>,
  options?: {
    isArray?: boolean;
    paginated?: boolean;
    description?: string;
    example?: any;
  },
) => {
  if (isBuiltInType(type)) {
    return ApiResponse({
      status,
      description: options?.description,
      schema: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: options?.isArray ? 'array' : type.name.toLowerCase(),
            items: options?.isArray
              ? { type: type.name.toLowerCase() }
              : undefined,
          },
        },
      },
      example: options?.example,
    });
  }

  return applyDecorators(
    ApiExtraModels(type),
    ApiResponse({
      status,
      description: options?.description,
      schema: options?.paginated
        ? {
            allOf: [
              {
                required: ['data', 'pagination'],
                properties: {
                  data: {
                    type: 'array',
                    items: { $ref: getSchemaPath(type) },
                  },
                  pagination: {
                    $ref: getSchemaPath(Pagination),
                  },
                },
              },
            ],
          }
        : {
            required: ['data'],
            properties: {
              data: options?.isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(type) },
                  }
                : {
                    $ref: getSchemaPath(type),
                  },
            },
          },
      example: options?.example,
    }),
  );
};

export const ApiFailResponse = (
  status: number,
  errors: {
    example: string;
    response: {
      errorCode: string;
      message: string;
    };
  }[],
) => {
  return applyDecorators(
    ApiResponse({
      status,
      content: {
        'application/json': {
          examples: errors.reduce(
            (acc: Record<string, any>, { example, response }) => {
              acc[example] = {
                value: {
                  timestamp: new Date().toISOString(),
                  path: '/path',
                  httpStatus: status,
                  ...response,
                },
              };
              return acc;
            },
            {},
          ),
        },
      },
    }),
  );
};
