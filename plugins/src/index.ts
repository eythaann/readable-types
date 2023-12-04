const proxyObj = <T extends Record<string, any>>(obj: T): T => {
  const proxy: T = Object.create(null);
  for (const key of Object.keys(obj) as Array<keyof T>) {
    const x = obj[key];
    proxy[key] = ((...args: any[]) => x.apply(obj, args)) as any;
  }
  return proxy;
};

function init(modules: { typescript: typeof import('typescript/lib/tsserverlibrary') }) {
  const ts = modules.typescript;

  function create(info: ts.server.PluginCreateInfo) {
    const { languageService: tsLanguageService } = info;

    const print = (s: any) => {
      info.project.projectService.logger.info('Readable-Types:: ' + String(s));
    };

    print('readable-types-plugin loaded :D');

    const languageService = proxyObj(tsLanguageService);

    const typeChecker = tsLanguageService.getProgram()?.getTypeChecker();

    languageService.getSemanticDiagnostics = (fileName) => {
      print('Getting Diagnostics for: ' + fileName);
      const diagnostics = tsLanguageService.getSemanticDiagnostics(fileName);

      const sourceFile = tsLanguageService.getProgram()?.getSourceFile(fileName);
      if (!sourceFile) {
        print('SourceFile not found');
        return diagnostics;
      }

      ts.forEachChild(sourceFile, function visit(node) {
        if (ts.isCallExpression(node)) {
          const signature = typeChecker?.getResolvedSignature(node);
          if (signature) {
            const returnType = typeChecker?.typeToString(typeChecker.getReturnTypeOfSignature(signature));

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

export = init;