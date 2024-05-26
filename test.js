import test from 'ava';
import {
	escapeSQL,
	isValidSQL,
	validateURLParameters,
	sanitizeURLParameters,
	validateJSONSchema,
	sanitizeJSONData,
} from './index.js';

test('escapeSQL', t => {
	const notsafeQuery = "SELECT * FROM users WHERE name = 'Shodipo'; DROP TABLE users;--";
	const safeQuery = escapeSQL(notsafeQuery);
	t.true(isValidSQL(safeQuery));
});

test('isValidSQL', t => {
	t.true(isValidSQL('SELECT * FROM users'));
	t.false(isValidSQL('DROP TABLE users;'));
	t.false(isValidSQL('INVALID SQL'));
});

test('validateURLParameters', t => {
	const parameters = { userId: 123, email: 'shodipovi@gmail.com' };
	const schema = {
		type: 'object',
		properties: {
			userId: { type: 'number' },
			email: { type: 'string', format: 'email' },
		},
		required: ['userId', 'email'],
	};
	t.true(validateURLParameters(parameters, schema));
});

test('sanitizeURLParameters', t => {
	const parameters = { userId: '123', email: '<script>alert("xss")</script>' };
	const sanitizedParameters = sanitizeURLParameters(parameters);
	t.is(sanitizedParameters.email, '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
});

test('validateJSONSchema', t => {
	const json = { name: 'Adeola', age: 30 };
	const schema = {
		type: 'object',
		properties: {
			name: { type: 'string' },
			age: { type: 'number' },
		},
		required: ['name', 'age'],
	};
	t.true(validateJSONSchema(json, schema));
});

test('sanitizeJSONData', t => {
	const json = { name: '<script>alert("xss")</script>', age: 30 };
	const sanitizedJSON = sanitizeJSONData(json);
	t.is(sanitizedJSON.name, '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
});
