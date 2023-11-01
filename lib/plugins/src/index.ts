function init(modules: { typescript: typeof import('typescript/lib/tsserverlibrary') }) {
  const ts = modules.typescript;

  function create(info: ts.server.PluginCreateInfo) {
    const print = (s: any) => {
      info.project.projectService.logger.info('Readable-Types:: ' + String(s));
    };

    print('readable-types-plugin loaded :D');

    // Set up decorator object
    const proxy: ts.LanguageService = Object.create(null);
    for (let k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
      const x = info.languageService[k]!;
      // @ts-expect-error - JS runtime trickery which is tricky to type tersely
      proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
    }

    proxy.getSemanticDiagnostics = (fileName) => {
      const sourceFile = info.languageService.getProgram()?.getSourceFile(fileName);
      const diagnostics = info.languageService.getSemanticDiagnostics(fileName);

      if (sourceFile) {
        ts.forEachChild(sourceFile, function visit(node) {
          if (ts.isCallExpression(node)) {
            const typeChecker = info.languageService.getProgram()?.getTypeChecker();
            const signature = typeChecker?.getResolvedSignature(node);
            if (signature) {
              const returnType = typeChecker?.typeToString(typeChecker.getReturnTypeOfSignature(signature));

              print(returnType);

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
      }
      return diagnostics;
    };

    return proxy;
  }

  return { create };
}

export = init;
