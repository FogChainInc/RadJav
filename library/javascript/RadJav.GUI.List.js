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
RadJav.GUI.List = (function (_super)
{
	__extends(List, _super);

	function List (obj, text, parent)
	{
		if (obj == null)
			obj = {};

		if (typeof (obj) == "string")
		{
			var name = obj;
			obj = { name: name };
		}

		if (obj.size == null)
		{
			obj.size = new RadJav.Vector2 ();
			obj.size.x = 350;
			obj.size.y = 300;
		}

		var _this = _super.call(this, obj, text, parent) || this;

		_this.type = "RadJav.GUI.List";

		if (obj.canSort != null)
			obj._canSort = obj.canSort;

		if (obj.columns != null)
			obj._columns = obj.columns;

		/** @property {Boolean} [_canSort=true]
		* @protected
		* If set to true, each column will be able to be sorted by the user.
		*/
		_this._canSort = RadJav.setDefaultValue (obj._canSort, true);
		/** @property {Boolean} [_hasCheckBoxes=false]
		* @protected
		* If set to true, each row will have a checkbox.
		*/
		_this._hasCheckBoxes = RadJav.setDefaultValue (obj._hasCheckBoxes, false);
		/** @property {RadJav.GUI.List.Column[]} [_columns=[]]
		* @protected
		* The columns in the list box.
		*/
		_this._columns = RadJav.setDefaultValue (obj._columns, []);

		return (_this);
	}

	return (List);
}(RadJav.GUI.GObject));

/** @class RadJav.GUI.List.Row
* A List row.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.List.Row = (function ()
{
	function Row (obj)
	{
		if (obj == null)
			obj = {};

		/** @property {RadJav.GUI.List.Item[]} [items=[]]
		* The items to display.
		*/
		this.items = RadJav.setDefaultValue (obj.items, []);
	}

	/** @method addItem
	* Add an item to this row.
	* @param {RadJav.GUI.List.Item} item The item to add.
	*/
	Row.prototype.addItem = function (item)
	{
		if (typeof (item) != "object")
			item = new RadJav.GUI.List.Item ({ text: item });

		this.items.push (item);
	}

	return (Row);
} ());

/** @class RadJav.GUI.List.Item
* A List item.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.List.Item = (function ()
{
	function Item (obj)
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

	return (Item);
} ());

/** @class RadJav.GUI.List.Column
* A List column.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.List.Column = (function ()
{
	function Column (obj)
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

	return (Column);
} ());

/** @class RadJav.GUI.List.Selection
* A List selection.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.List.Selection = (function ()
{
	function Selection (obj)
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

	return (Selection);
} ());

