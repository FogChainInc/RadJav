var path = require ("path");
var express = require ("express");
var typescript = require ("typescript");
var fs = require ("fs");
var rcopy = require ("recursive-copy");
var execSync = require ("child_process").execSync;
var app = express ();

var tsLibs = ["lib.es5.d.ts", "lib.es2015.promise.d.ts","lib.dom.d.ts","lib.scripthost.d.ts"];
var tsTypes = [];

var httpOptions = {
		location: path.normalize (path.dirname(__filename) + "/../"), 
		index: "index.htm", 
		port: 8585, 
		listeningAddr: "127.0.0.1", 
		locationChanged: false
	};
var helpHeader = "RadJav JavaScript Builder\n";
helpHeader += "Copyright(c) 2018, Higher Edge Software, LLC\n";
helpHeader += "Under the MIT License\n\n";

function getCommand (cmdList, cmdName)
{
	let foundCmd = null;

	cmdList.forEach (function (val, index)
					{
						let cmd = val.cmd[0];

						if (cmd == cmdName)
							foundCmd = val;
					});

	return (foundCmd);
}

function getTypeScriptFiles ()
{
	let tsfiles = [];

	let files = fs.readdirSync ("./src/");
	files.forEach (function (file)
		{
			if (file.indexOf (".ts") > -1)
				tsfiles.push ("./src/" + file);
		});

	return (tsfiles);
}

// Taken from https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
function compile (fileNames, options)
{
    let program = typescript.createProgram(fileNames, options);
    let emitResult = program.emit();

    let allDiagnostics = typescript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach(function (diagnostic)
		{
			if (diagnostic.file)
			{
				let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
				let message = typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
				console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
			}
			else
				console.log(`${typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
		});
}

function startHTTP ()
{
	app.use (express.static (httpOptions.location));
	app.get ("/", function (req, res)
		{
			if (httpOptions.locationChanged == false)
				res.redirect ("/examples");
			else
				res.sendFile (httpOptions.index);
		});

	if (httpOptions.locationChanged == false)
	{
		app.get ("/examples", function (req, res)
			{
				res.sendFile (path.normalize (httpOptions.location + "/examples/exampleBrowser.htm"));
			});
	}

	app.listen (httpOptions.port, httpOptions.listeningAddr, null, function ()
		{
			console.log ("Listening on port " + httpOptions.port);
			console.log ("Serving files located at: " + httpOptions.location);
			console.log ("URL: http://" + httpOptions.listeningAddr + ":" + httpOptions.port + "/");
		});
}

var commands = [
		{
			cmd: ["http", "h"], 
			desc: "Start HTTP server", 
			help: "", 
			evt: function (args)
				{
					if (args.length > 0)
					{
						httpOptions.location = args[0];
						httpOptions.location = path.normalize (httpOptions.location);
						httpOptions.locationChanged = true;
					}

					if (args.length > 1)
						httpOptions.index = args[1];

					if (args.length > 2)
						httpOptions.port = parseInt (args[2]);

					if (args.length > 3)
						httpOptions.listeningAddr = args[3];

					startHTTP ();
				}
		}, 
		{
			cmd: ["build", "b"], 
			desc: "Build JavaScript", 
			help: [
				{
					cmd: ["doNotCopyHTML5Files"],
					desc: "The build is not an HTML5 build, so do not copy theme files and other HTML5 related files."
				}, 
				{
					cmd: ["doNotCopyFilesToLibrary"],
					desc: "Do not copy the generated JS to library/javascript."
				}, 
				{
					cmd: ["doNotMinify"],
					desc: "Do not minify the generated JS."
				}], 
			evt: function (args)
				{
					let copyHTML5Files = true;
					let copyFilesToLibrary = true;
					let minify = true;
					let tsfiles = getTypeScriptFiles ();

					for (let iIdx = 0; iIdx < args.length; iIdx++)
					{
						if (args[iIdx] == "doNotCopyHTML5Files")
							copyHTML5Files = false;

						if (args[iIdx] == "doNotCopyFilesToLibrary")
							copyFilesToLibrary = false;

						if (args[iIdx] == "doNotMinify")
							minify = false;

						if (args[iIdx] == "help")
						{
							let str = helpHeader;
							let buildCmd = getCommand (commands, "build");

							buildCmd.help.forEach (function (val, index)
								{
									let line = "  ";
									let spaces = "";
									let maxSpaces = 6;

									for (let iIdx = 0; iIdx < val.cmd.length; iIdx++)
									{
										let cmd = val.cmd[iIdx];

										if (iIdx == 0)
											line += cmd;

										if (iIdx == 1)
											line += ", " + cmd;
									}

									if (index == 1)
										maxSpaces -= 4;

									if (index == 2)
										maxSpaces += 8;

									for (let iIdx = 0; iIdx < maxSpaces; iIdx++)
										spaces += " ";

									line += spaces + val.desc;
									str += line + "\n";
								});

							console.log (str);

							return;
						}
					}

					console.log ("Building JavaScript from TypeScript...");

					compile (tsfiles, {
							noImplicitUseStrict: true, removeComments: true, importHelpers: true, 
							target: typescript.ScriptTarget.ES3, module: typescript.ModuleKind.None, 
							lib: tsLibs, outDir: "./build"
						});

					console.log ("Done.");

					if (copyHTML5Files == true)
					{
						console.log ("Copying HTML5 files to build directory...");

						try
						{
							fs.mkdirSync ("./build/themes/");
							fs.mkdirSync ("./build/languages/");
						}
						catch (ex)
						{
						}

						rcopy ("./themes/", "./build/themes/", { overwrite: true });
						rcopy ("./languages/", "./build/languages/", { overwrite: true });

						console.log ("Done.");
					}

					if (copyFilesToLibrary == true)
					{
						console.log ("Copying JavaScript files to library/javascript directory...");

						rcopy ("./build/", "../library/javascript/", { filter: ["*.js"], overwrite: true });

						console.log ("Done.");
					}

					if (minify == true)
					{
						console.log ("Minifying JavaScript...");

						let localFiles = fs.readdirSync ("./");
						let compilerType = 0;
						let compiler = "";

						localFiles.forEach (function (file)
							{
								if (file.indexOf (".jar") > -1)
								{
									if (file.indexOf ("closure") > -1)
									{
										compiler = file;
										compilerType = 1;
									}
								}
							});

						localFiles = fs.readdirSync ("./build");
						let list = "";

						localFiles.forEach (function (file)
							{
								if (file.indexOf (".js") > -1)
									list += "./build/" + file + " ";
							});

						var output = "";

						try
						{
							if (compilerType == 1)
							{
								output = execSync ("java -jar " + compiler + " --compilation_level WHITESPACE_ONLY " + 
									" --js_output_file=./build/RadJav.min.js " + list + "./src/RadJavMinify.js").toString ();
							}
						}
						catch (ex)
						{
						}

						if (output != "")
							console.log (output);

						if (compilerType == 0)
							console.log ("No compiler found.");

						console.log ("Done.");
					}
				}
		}, 
		{
			cmd: ["defs", "d"], 
			desc: "Build definitions", 
			evt: function (args)
				{
					console.log ("Building TypeScript declaration files...");

					let tsfiles = getTypeScriptFiles ();

					compile (tsfiles, {
							noImplicitUseStrict: true, removeComments: true, importHelpers: true, 
							target: typescript.ScriptTarget.ES3, module: typescript.ModuleKind.None, 
							lib: tsLibs, declaration: true, emitDeclarationOnly: true, 
							declarationDir: "./d.ts"
						});

					console.log ("Done.");
				}
		}, 
		{
			cmd: ["help", "h"], 
			desc: "Help", 
			evt: function (args)
				{
					let str = helpHeader;

					commands.forEach (function (val, index)
						{
							let line = "  ";
							let spaces = "";
							let maxSpaces = 4;

							for (let iIdx = 0; iIdx < val.cmd.length; iIdx++)
							{
								let cmd = val.cmd[iIdx];

								if (iIdx == 0)
									line += "--" + cmd;

								if (iIdx == 1)
									line += ", -" + cmd;
							}

							if (index == 2)
								maxSpaces--;

							for (let iIdx = 0; iIdx < maxSpaces; iIdx++)
								spaces += " ";

							line += spaces + val.desc;
							str += line + "\n";
						});

					console.log (str);
				}
		}
	];

var execFunc = null;
let args = [];

process.argv.forEach (function (val, index)
		{
			if (index == 2)
			{
				commands.forEach (function (val2, index2)
					{
						for (let iIdx = 0; iIdx < val2.cmd.length; iIdx++)
						{
							let cmd = val2.cmd[iIdx];

							if (iIdx == 0)
								cmd = "--" + cmd;

							if (val == cmd)
								execFunc = val2.evt;
						}
					});
			}

			if (index > 2)
				args.push (val);
		});

if (execFunc != null)
	execFunc (args);
else
{
	let helpCmd = getCommand (commands, "help");
	helpCmd.evt ();
}
