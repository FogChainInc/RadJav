#!/bin/bash

JSDUCK_BIN=jsduck
PROCESSES=8
JS_DIR=../html5/RadJav

echo >&2 "Generating Javascript documentation...";

mkdir $JS_DIR/temp
cp $JS_DIR/*.js $JS_DIR/temp

$JSDUCK_BIN --config config.json --processes $PROCESSES --output html

echo >&2 "Finished Javascript documentation generation.";

