@echo off

set JSDUCK_BIN=.\jsduck-6.0.0-beta.exe
set PROCESSES=8
set JS_DIR=..\html5\RadJav

echo Generating Javascript documentation...

mkdir .\temp
xcopy %JS_DIR%\*.js .\temp /Y /S /E

%JSDUCK_BIN% --config config.json --output html

echo Finished Javascript documentation generation.