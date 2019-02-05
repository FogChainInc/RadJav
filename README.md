# What is RadJav

RadJav is an open source, easy-to-code JavaScript Virtual Machine and Decentralized Blockchain Datacenter.

It allows for the rapid creation of desktop, mobile, and HTML5 applications all using the same source code. 

Currently developers can use the same JavaScript code to create:

* Windows apps
* Linux apps
* macOS apps
* iOS apps
* Android apps
* HTML5 apps

All using the same codebase!

So how do you do it? By using either libRadJav or RadJavVM of course!

# libRadJav and RadJavVM
libRadJav is the library that developers can embed into their C++ applications. It actually executes the JavaScript code that makes the RadJav app run. This is for desktop and mobile.

RadJavVM is the virtual machine that developers can install on to their end user machines that has libRadJav embedded. When a RadJav app is called by the OS, it will open RadJavVM, which in turn calls libRadJav to execute the RadJav app. This is for desktop and mobile.

# RadJav HTML5
RadJav HTML5 is the HTML5 version of RadJavVM. It has libRadJav embedded and will execute the RadJav app when called. This is for desktop, mobile, and HTML5.

# Where to Start
You can view our wiki at https://github.com/FogChainInc/RadJav/wiki

# Online HTML5 Examples
You can view the HTML5 online examples at https://www.radjav.com/en_us/examples/exampleBrowser.htm

# Where to download
You can download and install RadJavVM from: https://github.com/FogChainInc/RadJav/releases

# Repo Structure
The repo has libRadJav, RadJavVM, and RadJav HTML5 in it. They all heavily refer to each other and we feel its best to have them all in the same repo.

* html5
	* Builds the HTML5 version.
	* Contains the TypeScript which transpiles into JavaScript, which gets embedded into libRadJav.
* library
	* Embeddable libRadJav for desktop and mobile.
	* Contains the C++ code which executes RadJav apps.
* vm
	* Installable RadJavVM for the end-user on desktop and mobile.
	* Builds and embeds libRadJav, which executes RadJav apps.

# How to build
On our wiki, we have guides on how to build libRadJav, RadJavVM, and the HTML5 version of RadJav.

* [Building libRadJav](https://github.com/FogChainInc/RadJav/wiki#building-libradjav)
* [Building RadJavVM from source](https://github.com/FogChainInc/RadJav/wiki#building-radjav-vm-from-source)