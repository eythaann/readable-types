echo "Running type checking on min supported version... \n"
npx -p typescript@4.2 tsc -p ./scripts/minVersionTsConfig.json

echo "Running type checking on @5.0... \n"
npx -p typescript@5.0 tsc -p ./lib/@5.0/tsconfig.json

echo "Running type checking on latest version... \n"
npx -p typescript@latest tsc
