#!/bin/bash

# This is a fallback build script for Render.com
echo "Starting fallback build process..."

# Check if we already have the dist directory with content
if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
    echo "Using existing dist directory contents"
    exit 0
fi

# Create a fallback dist directory with redirect
mkdir -p dist
cat > dist/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0;url=https://moinkhanjsx.github.io/Moin-khan-assignment/">
    <title>Redirecting to Spreadsheet Prototype...</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 40px;
            text-align: center;
            line-height: 1.6;
        }
        h1 {
            color: #333;
        }
        p {
            margin: 20px 0;
        }
        a {
            color: #0066cc;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>Spreadsheet Prototype</h1>
    <p>Redirecting to the live demo...</p>
    <p>If you are not redirected automatically, <a href="https://moinkhanjsx.github.io/Moin-khan-assignment/">click here</a></p>
</body>
</html>
EOL

echo "Fallback build complete"
