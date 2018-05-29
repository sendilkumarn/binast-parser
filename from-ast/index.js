const {isArray, isObject} = require('../util');

convertObject = object => {
    switch(object.type) {
        case "Block":
            object["scope"] = null;
            break;
        case "BlockStatement":
            // TODO make it faster and better
            // Rewrite
            //
            // BlockStatement {
            //    block: Block {
            //       ...foo
            //    }
            // }
            //
            // into
            //
            // Block {
            //    ...foo
            // }
            delete object.type;
            object.__proto__ = { 'Block': { } };
            Object.defineProperty(object, 'Block', Object.getOwnPropertyDescriptor(object, 'BlockStatement'));
            delete object['BlockStatement'];
            break;
        case "ForInStatement":
        case "ForOfStatement" :
            object["left"]["type"] = "ForInOfBinding";
            let binding = object["left"]["declarators"][0]["binding"];
            object["left"]["binding"] = binding;
            delete object["left"]["declarators"];
            break;
        case "Function":
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "Method":
        case "ArrowExpression":
            if(!object["isAsync"]) {
                object["isAsync"] = false;
            }
            object["scope"] = null;
            return makeEager(object);
        case "Getter":
        case "Setter":
            return makeEager(object);
        case "LabeledStatement":
            object.type = "LabelledStatement";
            break;
        case "LiteralRegExpExpression":
            let flags = [];
            if (object["global"]) flags.push('g');
            if (object["ignoreCase"]) flags.push('i');
            if (object["multiline"]) flags.push('m');
            if (object["sticky"]) flags.push('y');
            if (object["unicode"]) flags.push('u');
            object["flags"] = flags.join("");
            break;
        case "StaticPropertyName":
            object.type =  "LiteralPropertyName";
            break;
        case "VariableDeclarationStatement":
            // TODO make it faster and better
            // Rewrite
            //
            // VariableDeclarationStatement {
            //    declaration: VariableDeclaration {
            //       ...foo
            //    }
            // }
            //
            // into
            //
            // VariableDeclaration {
            //    ...foo
            // }
            delete object.type;
            object.__proto__ = { 'VariableDeclaration': { } };
            Object.defineProperty(object, 'VariableDeclaration', 
                    Object.getOwnPropertyDescriptor(object, 'declaration'));
            delete object['declaration'];
            break;
    }
}

function makeEager(object) {
    object.type = `Eager${object.type}`;
}

module.exports =  convert = nodes => {
    if(isArray(nodes)) {
        nodes.forEach(node => convert(node));
    } else if(isObject(nodes)) {
        Object.keys(nodes).forEach(nodeKey => convert(nodes[nodeKey]));
        convertObject(nodes);
    }
}
