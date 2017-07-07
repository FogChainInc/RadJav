XRJV1 Core 0.14.2
=====================

Setup
---------------------
XRJV1 Core is the original XRJV1 client and it builds the backbone of the network. However, it downloads and stores the entire history of XRJV1 transactions (which is currently several GBs); depending on the speed of your computer and network connection, the synchronization process can take anywhere from a few hours to a day or more.

To download XRJV1 Core, visit [xrjv1core.org](https://xrjv1core.org/en/releases/).

Running
---------------------
The following are some helpful notes on how to run XRJV1 on your native platform.

### Unix

Unpack the files into a directory and run:

- `bin/xrjv1-qt` (GUI) or
- `bin/xrjv1d` (headless)

### Windows

Unpack the files into a directory, and then run xrjv1-qt.exe.

### OS X

Drag XRJV1-Core to your applications folder, and then run XRJV1-Core.

### Need Help?

* See the documentation at the [XRJV1 Wiki](https://en.xrjv1.it/wiki/Main_Page)
for help and more information.
* Ask for help on [#xrjv1](http://webchat.freenode.net?channels=xrjv1) on Freenode. If you don't have an IRC client use [webchat here](http://webchat.freenode.net?channels=xrjv1).
* Ask for help on the [XRJV1Talk](https://xrjv1talk.org/) forums, in the [Technical Support board](https://xrjv1talk.org/index.php?board=4.0).

Building
---------------------
The following are developer notes on how to build XRJV1 on your native platform. They are not complete guides, but include notes on the necessary libraries, compile flags, etc.

- [OS X Build Notes](build-osx.md)
- [Unix Build Notes](build-unix.md)
- [Windows Build Notes](build-windows.md)
- [OpenBSD Build Notes](build-openbsd.md)
- [Gitian Building Guide](gitian-building.md)

Development
---------------------
The XRJV1 repo's [root README](/README.md) contains relevant information on the development process and automated testing.

- [Developer Notes](developer-notes.md)
- [Release Notes](release-notes.md)
- [Release Process](release-process.md)
- [Source Code Documentation (External Link)](https://dev.visucore.com/xrjv1/doxygen/)
- [Translation Process](translation_process.md)
- [Translation Strings Policy](translation_strings_policy.md)
- [Travis CI](travis-ci.md)
- [Unauthenticated REST Interface](REST-interface.md)
- [Shared Libraries](shared-libraries.md)
- [BIPS](bips.md)
- [Dnsseed Policy](dnsseed-policy.md)
- [Benchmarking](benchmarking.md)

### Resources
* Discuss on the [XRJV1Talk](https://xrjv1talk.org/) forums, in the [Development & Technical Discussion board](https://xrjv1talk.org/index.php?board=6.0).
* Discuss project-specific development on #xrjv1-core-dev on Freenode. If you don't have an IRC client use [webchat here](http://webchat.freenode.net/?channels=xrjv1-core-dev).
* Discuss general XRJV1 development on #xrjv1-dev on Freenode. If you don't have an IRC client use [webchat here](http://webchat.freenode.net/?channels=xrjv1-dev).

### Miscellaneous
- [Assets Attribution](assets-attribution.md)
- [Files](files.md)
- [Fuzz-testing](fuzzing.md)
- [Reduce Traffic](reduce-traffic.md)
- [Tor Support](tor.md)
- [Init Scripts (systemd/upstart/openrc)](init.md)
- [ZMQ](zmq.md)

License
---------------------
Distributed under the [MIT software license](/COPYING).
This product includes software developed by the OpenSSL Project for use in the [OpenSSL Toolkit](https://www.openssl.org/). This product includes
cryptographic software written by Eric Young ([eay@cryptsoft.com](mailto:eay@cryptsoft.com)), and UPnP software written by Thomas Bernard.
