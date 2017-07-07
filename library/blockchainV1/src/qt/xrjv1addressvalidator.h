// Copyright (c) 2011-2014 The XRJV1 Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#ifndef XRJV1_QT_XRJV1ADDRESSVALIDATOR_H
#define XRJV1_QT_XRJV1ADDRESSVALIDATOR_H

#include <QValidator>

/** Base58 entry widget validator, checks for valid characters and
 * removes some whitespace.
 */
class XRJV1AddressEntryValidator : public QValidator
{
    Q_OBJECT

public:
    explicit XRJV1AddressEntryValidator(QObject *parent);

    State validate(QString &input, int &pos) const;
};

/** XRJV1 address widget validator, checks for a valid xrjv1 address.
 */
class XRJV1AddressCheckValidator : public QValidator
{
    Q_OBJECT

public:
    explicit XRJV1AddressCheckValidator(QObject *parent);

    State validate(QString &input, int &pos) const;
};

#endif // XRJV1_QT_XRJV1ADDRESSVALIDATOR_H
