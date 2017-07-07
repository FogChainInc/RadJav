/*
	MIT-LICENSE
	Copyright (c) 2017 Higher Edge Software, LLC

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
	and associated documentation files (the "Software"), to deal in the Software without restriction, 
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial 
	portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/** @class RadJav.GUI.List
* @extends RadJav.GUI.GObject
* A List.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.List = RadJav.GUI.GObject.extend (
{
	init: function (obj, text, parent)
	{
		if (obj == null)
			obj = {};

		if (typeof (obj) == "string")
		{
			var name = obj;
			obj = { name: name };
		}

		RadJav.copyProperties (obj, {
					type: "RadJav.GUI.List", 
					size: "350, 300"
				}, false);
		this._super (obj, text, parent);

		if (obj.columns != null)
			obj._columns = obj.columns;

		/** @property {Boolean} [_hasCheckBoxes=false]
		* @protected
		* If set to true, each row will have a checkbox.
		*/
		this._hasCheckBoxes = RadJav.setDefaultValue (obj._hasCheckBoxes, false);
		/** @property {RadJav.GUI.List.Column[]} [_columns=[]]
		* @protected
		* The columns in the list box.
		*/
		this._columns = RadJav.setDefaultValue (obj._columns, []);
		this._createAppObj();
	}
});

/** @class RadJav.GUI.List.Row
* A List row.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.List.Row = RadJav.Class.extend (
{
	init: function (obj)
	{
		if (obj == null)
			obj = {};

		/** @property {RadJav.GUI.List.Item[]} [items=[]]
		* The items to display.
		*/
		this.items = RadJav.setDefaultValue (obj.items, []);
	}, 

	/** @method addItem
	* Add an item to this row.
	* @param {RadJav.GUI.List.Item} item The item to add.
	*/
	addItem: function (item)
	{
		if (typeof (item) != "object")
			item = new RadJav.GUI.List.Item ({ text: item });

		this.items.push (item);
	}
});

/** @class RadJav.GUI.List.Item
* A List item.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.List.Item = RadJav.Class.extend (
{
	init: function (obj)
	{
		if (obj == null)
			obj = {};

		/** @property {String} [name=""]
		* The name to display.
		*/
		this.name = RadJav.setDefaultValue (obj.name, "");
		/** @property {String} [text=""]
		* The text to display.
		*/
		this.text = RadJav.setDefaultValue (obj.text, "");
	}
});

/** @class RadJav.GUI.List.Column
* A List column.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.List.Column = RadJav.Class.extend (
{
	init: function (obj)
	{
		if (obj == null)
			obj = {};

		/** @property {String} [text=""]
		* The text to display.
		*/
		this.text = RadJav.setDefaultValue (obj.text, "");
		/** @property {Number} [width=0]
		* The column width. If set to 0, the width will be automatic.
		*/
		this.width = RadJav.setDefaultValue (obj.width, 0);
		/** @property {Object} [key=null]
		* The key associated with this column.
		*/
		this.key = RadJav.setDefaultValue (obj.key, null);
	}
});

/** @class RadJav.GUI.List.Selection
* A List selection.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.List.Selection = RadJav.Class.extend (
{
	init: function (obj)
	{
		if (obj == null)
			obj = {};

		/** @property {Mixed} [_html=null]
		* @protected
		* The HTML object associated with this selection.
		*/
		this._html = RadJav.setDefaultValue (obj._html, null);
		/** @property {Mixed} [_appObj=null]
		* @protected
		* The os object associated with this selection.
		*/
		this._appObj = RadJav.setDefaultValue (obj._appObj, null);
	}
});

