
import generator from '@babel/generator';
import * as babelParser from '@babel/parser';
import traverse, { NodePath, Scope } from '@babel/traverse';
import * as t from '@babel/types';
import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
/**
 * @file module base class
 * @author Yuyi Liang <liang.pearce@gmail.com>
 */

function findWebpackNode() {

}

let sourceCode: string;
let ast: t.File;
describe('demo', () => {
    beforeEach(() => {
        sourceCode = fs.readFileSync(path.resolve(__dirname, './javascript-case.js')).toString();
        ast = babelParser.parse(sourceCode, {
            sourceType: 'module',
            plugins: ['estree'],
        });
    });
    it('simple transform', async () => {
        traverse(ast, {
            Program: (): void => {
                return;
            },
            VariableDeclarator: ({ node }: NodePath): void => {
                // 遍历变量定义语句
            },
            ImportDeclaration: ({ node }: NodePath): void => {
                // 遍历 import 语句声明
            },
        });

        // 格式化配置
        const prettierConfig: prettier.Options = {
            singleQuote: true,
            trailingComma: 'es5',
            semi: true,
            tabWidth: 4,
            parser: 'babylon',
        };

        fs.writeFileSync(
            path.resolve(__dirname, './javascript-case.transformed.js'),
            prettier.format(generator(ast).code, prettierConfig)
        );
        expect(0).toEqual(0);
    });
});
