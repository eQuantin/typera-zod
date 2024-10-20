import { Parser as CommonZodParser } from "typera-common-zod";
import * as commonResponse from "typera-common/response";
import { RequestBase } from "typera-koa";

export type ErrorHandler<ErrorResponse extends commonResponse.Generic> =
  CommonZodParser.ErrorHandler<ErrorResponse>;

const getBody: CommonZodParser.GetInput<RequestBase> = (
  e: CommonZodParser.GetInput<RequestBase>,
) => {
  return e.req.ctx.request.body;
};
export const bodyP = CommonZodParser.bodyP(getBody);
export const body = CommonZodParser.body(getBody);

const getQuery: CommonZodParser.GetInput<RequestBase> = (
  e: CommonZodParser.GetInput<RequestBase>,
) => {
  return e.req.ctx.request.query;
};
export const queryP = CommonZodParser.queryP(getQuery);
export const query = CommonZodParser.query(getQuery);

const getHeaders: CommonZodParser.GetInput<RequestBase> = (
  e: CommonZodParser.GetInput<RequestBase>,
) => {
  const keys: Set<string> = new Set();
  return new Proxy(e.req.ctx, {
    get: (target, field) => {
      if (typeof field === "string") {
        const value = target.get(field);
        if (value !== undefined) keys.add(field);
        return value;
      }
      return undefined;
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true,
      };
    },
    ownKeys: () => [...keys],
  });
};
export const headersP = CommonZodParser.headersP(getHeaders);
export const headers = CommonZodParser.headers(getHeaders);

const getCookies: CommonZodParser.GetInput<RequestBase> = (
  e: CommonZodParser.GetInput<RequestBase>,
) => {
  return e.req.ctx.cookie;
};
export const cookiesP = CommonZodParser.cookiesP(getCookies);
export const cookies = CommonZodParser.cookies(getCookies);
