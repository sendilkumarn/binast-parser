const convert = require('../index');

import test from 'ava';

test('should change the Block', t => {
	const inp = {
		type: 'Block'
	};
	const expected = {
		type: 'Block',
		scope: null
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should change the block statement', t => {
	const inp = {
		"type": "BlockStatement",
		"block": {
	  		"type": "Block",
			"statements": []
		}
	};
	const expected = {
		"type": "Block",
		"statements": [],
		scope: null
  	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should change the ForOfStatement', t => {
	const inp = {
		"type": "ForOfStatement",
		"left": {
			"type": "VariableDeclaration",
			"kind": "let",
			"declarators": [
			{
				"type": "VariableDeclarator",
				"binding": {
					"type": "BindingIdentifier",
					"name": "j"
				},
				"init": null
			}
			]
		},
		"right": {
			"type": "IdentifierExpression",
			"name": "a"
		},
		"body": {			
		}
	};
	const expected = {
		"type": "ForOfStatement",
		"left": {
			"type": "ForInOfBinding",
			"kind": "let",
			"binding": {
				"type": "BindingIdentifier",
				"name": "j"
			}
		},
		"right": {
			"type": "IdentifierExpression",
			"name": "a"
		},
		"body": {			
		}
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should change the ForInStatement', t => {
	const inp = {
		"type": "ForInStatement",
		"left": {
			"type": "VariableDeclaration",
			"kind": "let",
			"declarators": [
			{
				"type": "VariableDeclarator",
				"binding": {
					"type": "BindingIdentifier",
					"name": "j"
				},
				"init": null
			}
			]
		},
		"right": {
			"type": "IdentifierExpression",
			"name": "a"
		},
		"body": {			
		}
	};
	const expected = {
		"type": "ForInStatement",
		"left": {
			"type": "ForInOfBinding",
			"kind": "let",
			"binding": {
				"type": "BindingIdentifier",
				"name": "j"
			}
		},
		"right": {
			"type": "IdentifierExpression",
			"name": "a"
		},
		"body": {			
		}
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should change the ArrowExpression', t => {
	const inp = {
		type: 'ArrowExpression',
		isAsync: true
	};
	const expected = {
		type: 'EagerArrowExpression',
		isAsync: true,
		scope: null
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should change the Method', t => {
	const inp = {
		type: 'Method',
		isAsync: true
	};
	const expected = {
		type: 'EagerMethod',
		isAsync: true,
		scope: null
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should change the FunctionExpression', t => {
	const inp = {
		type: 'FunctionExpression',
		isAsync: true
	};
	const expected = {
		type: 'EagerFunctionExpression',
		isAsync: true,
		scope: null
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should change the async function', t => {
	const inp = {
		type: 'Function',
		isAsync: true
	};
	const expected = {
		type: 'EagerFunction',
		isAsync: true,
		scope: null
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should change the function declaration', t => {
	const inp = {
		type: 'FunctionDeclaration'
	};
	const expected = {
		type: 'EagerFunctionDeclaration',
		isAsync: false,
		scope: null
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should make setter eager', t => {
	const inp = {
		type: 'Setter'
	};
	const expected = {
		type: 'EagerSetter'
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should make getter eager', t => {
	const inp = {
		type: 'Getter'
	};
	const expected = {
		type: 'EagerGetter'
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should replace LabeledStatement to LabelledStatement', t => {
	const inp = {
		type: 'LabeledStatement'
	};
	const expected = {
		type: 'LabelledStatement'
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should replace StaticPropertyName to LiteralPropertyName', t => {
	const inp = {
		type: 'StaticPropertyName'
	};
	const expected = {
		type: 'LiteralPropertyName'
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should replace VariableDeclarationStatement to VariableDeclaration', t => {
	const inp = {
		type: 'VariableDeclarationStatement',
		declaration: {
			type: 'VariableDeclaration',
			kind: 'let'
		}
	};
	const expected = {
		type: 'VariableDeclaration',
		kind: 'let'
	};
	convert(inp);
	t.deepEqual(inp, expected);
});

test('should convert LiteralRegExpExpression to charcode', t => {	
	const conditions = {
		global: true,
		ignoreCase: true,
		multiline: true,
		sticky: true,
		unicode: true
	};
	const inp = {
		type: 'LiteralRegExpExpression',		
		...conditions
	};
	const expected = {
		type: 'LiteralRegExpExpression',
		flags: 'gimyu',
		...conditions
	};
	convert(inp);
	t.deepEqual(inp, expected);
});
