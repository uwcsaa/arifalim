#!/bin/bash

echo "Bundling gems..."
bin/bundle check || bin/bundle install --jobs 4

echo "Clearing logs..."
rm -f log/*

echo "Removing old pids..."
rm -f tmp/pids/server.pid

echo "Removing old cache..."
rm -rf tmp/cache

echo "Starting the app server..."
bin/rails s -b 0.0.0.0 -p 3000
