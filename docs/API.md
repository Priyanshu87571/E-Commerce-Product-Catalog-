# API Reference

## Authentication

### POST /api/auth/register
Body:
```json
{"name":"Priyanshu","email":"priyanshu@example.com","password":"StrongPass123"}
```

### POST /api/auth/login
Body:
```json
{"email":"admin@example.com","password":"Admin@12345"}
```

Returns a JWT token used as:
`Authorization: Bearer <token>`

## Product filters

| Parameter | Example | Purpose |
|---|---|---|
| search | `keyboard` | text search |
| category | ObjectId | category filter |
| minPrice | `20` | lower price bound |
| maxPrice | `100` | upper price bound |
| inStock | `true` | stock > 0 |
| sort | `price_asc` | sorting |
| page | `2` | page number |
| limit | `12` | page size, max 50 |

## Admin product body
```json
{
  "name":"Example Product",
  "description":"Product description",
  "brand":"Example",
  "price":99.99,
  "compareAtPrice":129.99,
  "stock":50,
  "sku":"EX-1000",
  "category":"CATEGORY_ID",
  "image":"https://example.com/product.jpg",
  "tags":["demo","example"]
}
```
