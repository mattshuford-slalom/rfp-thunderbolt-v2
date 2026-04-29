#!/bin/bash
# Start a simple static server for protogen on port 8000
cd "$(dirname "$0")"
echo "Serving on http://localhost:8000"
python3 -m http.server 8000
