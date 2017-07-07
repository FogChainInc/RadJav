#!/bin/bash

SERVER=highersoftware.com
USERNAME=iamsomeone13
PASSWORD=Jimncr252
DEST_DIR=/office-pear/en_us/docs/js/api/

./build.sh

hash ncftpput 2>/dev/null || { echo >&2 "ncftp is required to upload HTML to FTP server."; exit 0; }

ncftpput -R -u $USERNAME -p $PASSWORD $SERVER $DEST_DIR ./html/*

echo >&2 "Finished uploading to FTP server.";

