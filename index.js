import Ajv from 'ajv';
import SqlString from 'sqlstring';
import escapeHtml from 'escape-html';

const ajv = new Ajv();
ajv.addFormat('email', {
	type: 'string',
	validate: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
});

export function escapeSQL(query) {
	return SqlString.escape(query);
}

export function isValidSQL(query) {
	try {
		const safeQuery = SqlString.format(query);
		return /SELECT|INSERT|UPDATE|DELETE/.test(safeQuery.toUpperCase());
	} catch {
		return false;
	}
}

export function validateURLParameters(parameters, schema) {
	const validate = ajv.compile(schema);
	return validate(parameters);
}

export function sanitizeURLParameters(parameters) {
	const sanitized = {};
	for (const key in parameters) {
		if (Object.hasOwn(parameters, key)) {
			sanitized[key] = escapeHtml(parameters[key]);
		}
	}
	return sanitized;
}

export function validateJSONSchema(json, schema) {
	const validate = ajv.compile(schema);
	return validate(json);
}

export function sanitizeJSONData(json) {
	const sanitized = {};
	for (const key in json) {
		if (Object.hasOwn(json, key)) {
			sanitized[key] = typeof json[key] === 'string' ? escapeHtml(json[key]) : json[key];
		}
	}
	return sanitized;
}
