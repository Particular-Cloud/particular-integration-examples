#!/bin/sh

rm lambda.zip

zip -r --exclude='.git*' --exclude='*node_modules*' lambda.zip *
