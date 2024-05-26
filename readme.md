# query-safe

Secure parsing and validation for various user input queries.

## install

```
npm install query-safe
```

## API
- `escapeSQL(query)` -
Sanitizes an SQL query to prevent SQL injection.

- `isValidSQL(query)` -
Validates an SQL query using a simple SQL syntax check.

- `validateURLParameters(parameters, schema)` -
Validates URL parameters against a JSON schema.

- `sanitizeURLParameters(parameters)` -
Sanitizes URL parameters to prevent XSS attacks.

- `validateJSONSchema(json, schema)` -
Validates a JSON object against a JSON schema.

- `sanitizeJSONData(json)` -
Sanitizes a JSON object to remove or escape potentially dangerous content.

## Related
- `sqlstring` - NodeJS lib to safely escape SQL queries.

- `ajv` - JSON Schema Validator library.

- `escape-html` - Lib to escape HTML entities.
