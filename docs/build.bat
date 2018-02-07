@echo off

set PROCESSES=8
set JS_DIR=..\html5\RadJav

echo Generating Javascript documentation...

mkdir .\temp
xcopy %JS_DIR%\*.js .\temp /Y /S /E

rem JSDuck
set JSDUCK_BIN=.\jsduck-6.0.0-beta.exe
%JSDUCK_BIN% --config config.json --output html

rem JSDoc
rem set JSDOC_BIN=jsdoc
rem %JSDOC_BIN% -c .\config-jsdoc.json -d .\html .\temp\

echo Finished Javascript documentation generation.