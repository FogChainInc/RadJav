XRJV1 version 0.5.0 is now available for download at:
http://sourceforge.net/projects/xrjv1/files/XRJV1/xrjv1-0.5.0/

The major change for this release is a completely new graphical interface that uses the Qt user interface toolkit.

This release include German, Spanish, Spanish-Castilian, Norwegian and Dutch translations. More translations are welcome; join the project at Transifex if you can help:
https://www.transifex.net/projects/p/xrjv1/

Please report bugs using the issue tracker at github:
https://github.com/xrjv1/xrjv1/issues

For Ubuntu users, there is a new ppa maintained by Matt Corallo which you can add to your system so that it will automatically keep xrjv1 up-to-date.  Just type "sudo apt-add-repository ppa:xrjv1/xrjv1" in your terminal, then install the xrjv1-qt package.

MAJOR BUG FIX  (CVE-2011-4447)

The wallet encryption feature introduced in XRJV1 version 0.4.0 did not sufficiently secure the private keys. An attacker who
managed to get a copy of your encrypted wallet.dat file might be able to recover some or all of the unencrypted keys and steal the
associated coins.

If you have a previously encrypted wallet.dat, the first time you run xrjv1-qt or xrjv1d the wallet will be rewritten, XRJV1 will
shut down, and you will be prompted to restart it to run with the new, properly encrypted file.

If you had a previously encrypted wallet.dat that might have been copied or stolen (for example, you backed it up to a public
location) you should send all of your xrjv1s to yourself using a new xrjv1 address and stop using any previously generated addresses.

Wallets encrypted with this version of XRJV1 are written properly.

Technical note: the encrypted wallet's 'keypool' will be regenerated the first time you request a new xrjv1 address; to be certain that the
new private keys are properly backed up you should:

1. Run XRJV1 and let it rewrite the wallet.dat file

2. Run it again, then ask it for a new xrjv1 address.
XRJV1-Qt: Address Book, then New Address...
xrjv1d: run the 'walletpassphrase' RPC command to unlock the wallet,  then run the 'getnewaddress' RPC command.

3. If your encrypted wallet.dat may have been copied or stolen, send  all of your xrjv1s to the new xrjv1 address.

4. Shut down XRJV1, then backup the wallet.dat file.
IMPORTANT: be sure to request a new xrjv1 address before backing up, so that the 'keypool' is regenerated and backed up.

"Security in depth" is always a good idea, so choosing a secure location for the backup and/or encrypting the backup before uploading it is recommended. And as in previous releases, if your machine is infected by malware there are several ways an attacker might steal your xrjv1s.

Thanks to Alan Reiner (etotheipi) for finding and reporting this bug.

MAJOR GUI CHANGES

"Splash" graphics at startup that show address/wallet/blockchain loading progress.

"Synchronizing with network" progress bar to show block-chain download progress.

Icons at the bottom of the window that show how well connected you are to the network, with tooltips to display details.

Drag and drop support for xrjv1: URIs on web pages.

Export transactions as a .csv file.

Many other GUI improvements, large and small.

RPC CHANGES

getmemorypool : new RPC command, provides everything needed to construct a block with a custom generation transaction and submit a solution

listsinceblock : new RPC command, list transactions since given block

signmessage/verifymessage : new RPC commands to sign a message with one of your private keys or verify that a message signed by the private key associated with a xrjv1 address.

GENERAL CHANGES

Faster initial block download.
