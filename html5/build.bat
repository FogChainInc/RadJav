@echo off

set CLOSURE_JAR=.\closure-compiler-v20180204.jar

set JSFILES=.\RadJav\Math.js .\RadJav\String.js .\RadJav\RadJav.js .\RadJav\RadJav.Circle.js .\RadJav\RadJav.Color.js .\RadJav\RadJav.Font.js .\RadJav\RadJav.IO.js .\RadJav\RadJav.Net.WebSocketClient.js .\RadJav\RadJav.Quaternion.js .\RadJav\RadJav.Rectangle.js .\RadJav\RadJav.Vector2.js .\RadJav\RadJav.Vector3.js .\RadJav\RadJav.Vector4.js .\RadJav\RadJav.C3D.Object3D.js .\RadJav\RadJav.C3D.Camera.js .\RadJav\RadJav.C3D.Entity.js .\RadJav\RadJav.C3D.Material.js .\RadJav\RadJav.C3D.Model.js .\RadJav\RadJav.C3D.Transform.js .\RadJav\RadJav.GUI.GObject.js .\RadJav\RadJav.GUI.Button.js .\RadJav\RadJav.GUI.Canvas3D.js .\RadJav\RadJav.GUI.Checkbox.js .\RadJav\RadJav.GUI.Combobox.js .\RadJav\RadJav.GUI.Container.js .\RadJav\RadJav.GUI.HTMLElement.js .\RadJav\RadJav.GUI.Image.js .\RadJav\RadJav.GUI.Label.js .\RadJav\RadJav.GUI.List.js .\RadJav\RadJav.GUI.MenuBar.js .\RadJav\RadJav.GUI.MenuItem.js .\RadJav\RadJav.GUI.Radio.js .\RadJav\RadJav.GUI.Textarea.js .\RadJav\RadJav.GUI.Textbox.js .\RadJav\RadJav.GUI.Window.js .\RadJav\RadJavMinify.js

if not exist .\build mkdir .\build
if not exist .\build\languages mkdir .\build\languages
if not exist .\build\themes mkdir .\build\themes
xcopy .\RadJav\languages .\build\languages\ /Y /S /E
xcopy .\RadJav\themes .\build\themes\ /Y /S /E
java -jar %CLOSURE_JAR% --js_output_file=.\build\RadJav.min.js %JSFILES%