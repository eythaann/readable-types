"use strict";
const proxyObj = (obj) => {
    const proxy = Object.create(null);
    for (const key of Object.keys(obj)) {
        const x = obj[key];
        proxy[key] = ((...args) => x.apply(obj, args));
    }
    return proxy;
};
function init(modules) {
    const ts = modules.typescript;
    function create(info) {
        var _a;
        const { languageService: tsLanguageService } = info;
        const print = (s) => {
            info.project.projectService.logger.info('Readable-Types:: ' + String(s));
        };
        print('readable-types-plugin loaded :D');
        const languageService = proxyObj(tsLanguageService);
        const typeChecker = (_a = tsLanguageService.getProgram()) === null || _a === void 0 ? void 0 : _a.getTypeChecker();
        languageService.getSyntacticDiagnostics = (fileName) => {
            var _a;
            print('Getting Diagnostics for: ' + fileName);
            const diagnostics = tsLanguageService.getSyntacticDiagnostics(fileName);
            const sourceFile = (_a = tsLanguageService.getProgram()) === null || _a === void 0 ? void 0 : _a.getSourceFile(fileName);
            if (!sourceFile) {
                print('SourceFile not found');
                return diagnostics;
            }
            ts.forEachChild(sourceFile, function visit(node) {
                if (ts.isCallExpression(node)) {
                    const signature = typeChecker === null || typeChecker === void 0 ? void 0 : typeChecker.getResolvedSignature(node);
                    if (signature) {
                        const returnType = typeChecker === null || typeChecker === void 0 ? void 0 : typeChecker.typeToString(typeChecker.getReturnTypeOfSignature(signature));
                        print('returntype: ' + returnType);
                        if (returnType && returnType.includes('RTT_FAIL')) {
                            diagnostics.push({
                                file: sourceFile,
                                start: node.getStart(),
                                length: node.getWidth(),
                                messageText: 'Test is failing: ' + returnType.slice(returnType.indexOf('<') + 1, -1),
                                category: ts.DiagnosticCategory.Error,
                                //@ts-ignore
                                code: 'readable-test-types',
                            });
                        }
                    }
                }
                ts.forEachChild(node, visit);
            });
            return diagnostics;
        };
        return languageService;
    }
    return { create };
}
module.exports = init;
//# sourceMappingURL=index.js.map