
Debian
====================
This directory contains files used to package xrjv1d/xrjv1-qt
for Debian-based Linux systems. If you compile xrjv1d/xrjv1-qt yourself, there are some useful files here.

## xrjv1: URI support ##


xrjv1-qt.desktop  (Gnome / Open Desktop)
To install:

	sudo desktop-file-install xrjv1-qt.desktop
	sudo update-desktop-database

If you build yourself, you will either need to modify the paths in
the .desktop file or copy or symlink your xrjv1-qt binary to `/usr/bin`
and the `../../share/pixmaps/xrjv1128.png` to `/usr/share/pixmaps`

xrjv1-qt.protocol (KDE)

