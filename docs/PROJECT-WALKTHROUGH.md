# Project Walkthrough

## Request flow

1. User searches or filters in React.
2. React serializes filters into query parameters.
3. Express receives the request at `/api/products`.
4. Controller delegates to `productService.listProducts`.
5. Service builds a MongoDB filter and bounded pagination query.
6. MongoDB uses the relevant index where applicable.
7. Service returns products plus pagination metadata.
8. Controller sends a consistent JSON response.
9. React renders the current page.

## Why controllers + services?

Controllers handle HTTP concerns. Services contain business/data-access orchestration. This reduces coupling and makes logic easier to test and reuse.

## Why soft delete?

Products are archived using `isActive=false` instead of immediately removing the document. This preserves historical data and is safer for future order/reporting features.

## Negative cases

The backend rejects invalid registration payloads, missing product fields, negative prices/stock, unauthorized admin operations, duplicate emails/SKUs, missing categories, invalid/expired JWTs, and unknown routes.
