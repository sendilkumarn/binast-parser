const convertTo = require('../index');

import test from 'ava';

test('should change the Block', t => {
	const inp = {
		type: 'Block',
		scope: null
	};
	const expected = {
		type: 'BlockStatement',
		block: {
			type: 'Block',
			scope: null
		}
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the ForOfStatement', t => {
	const inp = {
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

	const expected = {
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
		"body": {}
	};	
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the ForInStatement', t => {
	const inp = {
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

	const expected = {
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

	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the EagerFunctionExpression', t => {
	const inp = {
		type: 'EagerFunctionExpression',
		isAsync: true
	};
	const expected = {
		type: 'FunctionExpression',
		isAsync: true
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the SkippableFunctionExpression', t => {
	const inp = {
		type: 'SkippableFunctionExpression',
		isAsync: true
	};
	const expected = {
		type: 'FunctionExpression',
		isAsync: true
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the EagerFunctionDeclaration', t => {
	const inp = {
		type: 'EagerFunctionDeclaration',
		isAsync: true
	};
	const expected = {
		type: 'FunctionDeclaration',
		isAsync: true
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the SkippableFunctionDeclaration', t => {
	const inp = {
		type: 'SkippableFunctionDeclaration',
		isAsync: true
	};
	const expected = {
		type: 'FunctionDeclaration',
		isAsync: true
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the EagerFunction', t => {
	const inp = {
		type: 'EagerFunction',
		isAsync: true
	};
	const expected = {
		type: 'Function',
		isAsync: true
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the SkippableFunction', t => {
	const inp = {
		type: 'SkippableFunction',
		isAsync: true
	};
	const expected = {
		type: 'Function',
		isAsync: true
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the EagerMethod', t => {
	const inp = {
		type: 'EagerMethod',
		isAsync: true
	};
	const expected = {
		type: 'Method',
		isAsync: true
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the SkippableMethod', t => {
	const inp = {
		type: 'SkippableMethod',
		isAsync: true
	};
	const expected = {
		type: 'Method',
		isAsync: true
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the EagerArrowExpression', t => {
	const inp = {
		type: 'EagerArrowExpression',
		isAsync: true
	};
	const expected = {
		type: 'ArrowExpression',
		isAsync: true
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the SkippableArrowExpression', t => {
	const inp = {
		type: 'SkippableArrowExpression',
		isAsync: true
	};
	const expected = {
		type: 'ArrowExpression',
		isAsync: true
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the EagerGetter', t => {
	const inp = {
		type: 'EagerGetter'
	};
	const expected = {
		type: 'Getter'
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the SkippableGetter', t => {
	const inp = {
		type: 'SkippableGetter'
	};
	const expected = {
		type: 'Getter'
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the EagerSetter', t => {
	const inp = {
		type: 'EagerSetter'
	};
	const expected = {
		type: 'Setter'
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should change the SkippableSetter', t => {
	const inp = {
		type: 'SkippableSetter'
	};
	const expected = {
		type: 'Setter'
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should replace LabelledStatement to LabeledStatement', t => {
	const inp = {
		type: 'LabelledStatement'
	};
	const expected = {
		type: 'LabeledStatement'
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should replace LiteralPropertyName to StaticPropertyName', t => {
	const inp = {
		type: 'LiteralPropertyName'
	};
	const expected = {
		type: 'StaticPropertyName'
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

// test('should replace VariableDeclarationStatement to VariableDeclaration', t => {
// 	const inp = {
// 		type: 'VariableDeclarationStatement',
// 		declaration: {
// 			type: 'VariableDeclaration',
// 			kind: 'let'
// 		}
// 	};
// 	const expected = {
// 		type: 'VariableDeclaration',
// 		kind: 'let'
// 	};
// 	convert(inp);
// 	t.deepEqual(inp, expected);
// });

test('should convert LiteralRegExpExpression', t => {	
	const conditions = {
		global: true,
		ignoreCase: true,
		multiline: true,
		sticky: true,
		unicode: true
	};
	const inp = {
		type: 'LiteralRegExpExpression',		
		flags: 'gimyu'
	};
	const expected = {
		type: 'LiteralRegExpExpression',		
		...conditions,
		flags: 'gimyu'
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});

test('should convert LiteralRegExpExpression with false', t => {	
	const conditions = {
		global: false,
		ignoreCase: false,
		multiline: true,
		sticky: true,
		unicode: true
	};
	const inp = {
		type: 'LiteralRegExpExpression',		
		flags: 'myu'
	};
	const expected = {
		type: 'LiteralRegExpExpression',
		flags: 'myu',		
		...conditions
	};
	convertTo(inp);
	t.deepEqual(inp, expected);
});
