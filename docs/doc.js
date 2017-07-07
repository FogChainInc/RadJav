/** @file doc.php
* Additional documentation for Office Pear Javascript.
*/

/**
* @mainpage Office Pear Javascript API documentation
* Welcome to the Office Pear Javascript API Documentation.
* 
* @par
* This documentation describes how to utilize the Javascript functions and classes in 
* Office Pear. You cannot create a plugin simply with this documentation alone.
* To start learning how to create a PHP plugin click <a href = "http://www.highersoftware.com/office-pear/docs/php/pluginapi/en_us/" target = "_new">here</a>
* 
* Please note, this documentation does not cover any of the Rich Text Editors used in Office Pear, nor does
* it cover JQuery, JQuery UI, or the Table Sorter JQuery plugin.
* For documentation on the additional Javascript APIs used in Office Pear, please visit:
* - JQuery - <a href = "http://api.jquery.com/" target = "_new">http://api.jquery.com/</a>
* - JQuery UI - <a href = "http://api.jqueryui.com/" target = "_new">http://api.jqueryui.com/</a>
* - Table Sorter JQuery Plugin - <a href = "http://tablesorter.com/docs/" target = "_new">http://tablesorter.com/docs/</a>
* - CKEditor - <a href = "http://docs.ckeditor.com/" target = "_new">http://docs.ckeditor.com/</a>
*/

/**
* @page LinkingToExternalPages Linking to external pages
* @brief How to link to external pages.
* 
* @par
* To open an external link, you must include one of the following symbols at the beginning of your url.
* - ! - Display the external URL on top.
* - @ - Display the external URL in a new window.
* - * - Display the external URL in the current div frame.
* - ~ - Display the external URL in the current iFrame.
* - ^Title,size x, size y^ - Display the URL in a new Office Pear window.
* 
* @par Example
* @code
<a href = "@http://www.highersoftware.com/">Higher Edge Software</a>
* @endcode
*/