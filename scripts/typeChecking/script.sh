echo "Running type checking on @4.2 ..."
echo
npx -p typescript@4.2 tsc -p ./scripts/typeChecking/tsconfig-@4.2.json

echo "Running type checking on @4.8 ..."
echo
npx -p typescript@5.0 tsc -p ./scripts/typeChecking/tsconfig-@4.8.json

echo "Running type checking on @5.0..."
echo
npx -p typescript@5.0 tsc -p ./scripts/typeChecking/tsconfig-@5.0.json

echo "Running type checking on the entire project using latest version..."
echo
npx -p typescript@latest tsc
