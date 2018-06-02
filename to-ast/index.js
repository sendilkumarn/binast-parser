const {isArray, isObject} = require('../util');

function removeEagerOrSkippable(object) {
    if (object.type.startsWith('Eager')) {
        object.type = object.type.replace('Eager', '');
    } else if (object.type.startsWith('Skippable')) {
        object.type = object.type.replace('Skippable', '');
    }
    return object;
}

function convertObject(object) {
    switch(object.type) {
        case 'Block':
            // Todo yet to implement
            // Rewrite
            //
            // Block { // Used as Statement
            //    ...foo
            // }
            //
            // into
            //
            // BlockStatement {
            //    block: Block {
            //       ...foo
            //    }
            // }
            break;
        case 'ForInOfBinding':
            // Rewrite
            //
            // ForInOfBinding {
            //    kind,
            //    binding
            // }
            //
            // into
            //
            // VariableDeclaration {
            //    kind,
            //    declarators: [{
            //      VariableDeclarator {
            //        init: null,
            //        binding
            //      }
            //    }]
            // }
            object.type = 'VariableDeclaration';
            let binding = object.binding;
            delete object.binding;
            object.declarators = {
                'type': 'VariableDeclarator',
                'init': null,
                'binding': binding
            };
            break;
        case 'EagerFunctionExpression':
        case 'SkippableFunctionExpression':
        case 'EagerFunctionDeclaration':
        case 'SkippableFunctionDeclaration':        
        case 'EagerFunction':
        case 'SkippableFunction':
        case 'EagerMethod':
        case 'SkippableMethod':
        case 'EagerArrowExpression':
        case 'SkippableArrowExpression':
        case 'EagerGetter':
        case 'SkippableGetter':
        case 'EagerSetter':
        case 'SkippableSetter':
            return removeEagerOrSkippable(object);
        case 'LabelledStatement':
            object.type = 'LabeledStatement';
            break;
        case 'LiteralRegExpExpression':
            let flags = object.flags;
            object.global = flags.indexOf('g')!== -1;
            object.ignoreCase = flags.indexOf('i')!== -1;
            object.multiline = flags.indexOf('m')!== -1;
            object.sticky = flags.indexOf('y')!== -1;
            object.unicode = flags.indexOf('u')!== -1;
            break;
        case 'LiteralPropertyName':
            object.type =  'StaticPropertyName';
            break;
        case 'VariableDeclaration':
            // Todo yet to implement
            // Rewrite
            //
            // VariableDeclaration { // Used as Statement
            //    ...foo
            // }
            //
            // into
            //
            // VariableDeclarationStatement {
            //    declaration: VariableDeclaration {
            //       ...foo
            //    }
            // }
            break;
    }
    return object;
}

module.exports =  convertTo = nodes => {
    if(isArray(nodes)) {
        nodes.forEach(node => convert(node));
    } else if(isObject(nodes)) {
        Object.keys(nodes).forEach(nodeKey => convert(nodes[nodeKey]));
        convertObject(nodes);
    }
}
