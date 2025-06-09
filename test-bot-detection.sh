#!/bin/bash

echo "Starting LLM Docs Builder test..."
echo "================================="

# Start server in background
node src/server.js &
SERVER_PID=$!

# Wait for server to start
sleep 2

echo -e "\n1. Testing bot/LLM response (curl):"
echo "-----------------------------------"
curl -s http://localhost:3000 | head -10

echo -e "\n\n2. Testing browser response (with User-Agent):"
echo "----------------------------------------------"
curl -s -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" http://localhost:3000 | grep -o "<title>.*</title>" | head -1

echo -e "\n\n3. Testing specific page (markdown for bots):"
echo "---------------------------------------------"
curl -s http://localhost:3000/usage | head -15

echo -e "\n\n4. Testing wget (should get markdown):"
echo "--------------------------------------"
wget -q -O - http://localhost:3000 | head -10

# Kill server
kill $SERVER_PID

echo -e "\n\nTest complete!"