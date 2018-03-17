@echo off

set CLOSURE_JAR=.\closure-compiler-v20180204.jar
set JSFILES=.\build\RadJav.js

tsc --removeComments -p ./tsconfig.json &

if not exist .\build\languages mkdir .\build\languages
if not exist .\build\themes mkdir .\build\themes
xcopy .\RadJav\languages .\build\languages\ /Y /S /E
xcopy .\RadJav\themes .\build\themes\ /Y /S /E

java -jar %CLOSURE_JAR% --js_output_file=.\build\RadJav.min.js %JSFILES%