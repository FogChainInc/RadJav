#!/bin/sh

TOPDIR=${TOPDIR:-$(git rev-parse --show-toplevel)}
SRCDIR=${SRCDIR:-$TOPDIR/src}
MANDIR=${MANDIR:-$TOPDIR/doc/man}

XRJV1D=${XRJV1D:-$SRCDIR/xrjv1d}
XRJV1CLI=${XRJV1CLI:-$SRCDIR/xrjv1-cli}
XRJV1TX=${XRJV1TX:-$SRCDIR/xrjv1-tx}
XRJV1QT=${XRJV1QT:-$SRCDIR/qt/xrjv1-qt}

[ ! -x $XRJV1D ] && echo "$XRJV1D not found or not executable." && exit 1

# The autodetected version git tag can screw up manpage output a little bit
XRJVER=($($XRJV1CLI --version | head -n1 | awk -F'[ -]' '{ print $6, $7 }'))

# Create a footer file with copyright content.
# This gets autodetected fine for xrjv1d if --version-string is not set,
# but has different outcomes for xrjv1-qt and xrjv1-cli.
echo "[COPYRIGHT]" > footer.h2m
$XRJV1D --version | sed -n '1!p' >> footer.h2m

for cmd in $XRJV1D $XRJV1CLI $XRJV1TX $XRJV1QT; do
  cmdname="${cmd##*/}"
  help2man -N --version-string=${XRJVER[0]} --include=footer.h2m -o ${MANDIR}/${cmdname}.1 ${cmd}
  sed -i "s/\\\-${XRJVER[1]}//g" ${MANDIR}/${cmdname}.1
done

rm -f footer.h2m
