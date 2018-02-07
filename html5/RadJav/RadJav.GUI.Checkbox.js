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

/** @class RadJav.GUI.Checkbox
* @extends RadJav.GUI.GObject
* A checkbox.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.Checkbox = (function (_super)
{
	__extends(Checkbox, _super);

	function Checkbox (obj, text, parent)
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
			obj.size.x = 80;
			obj.size.y = 40;
		}

		if (obj.checked != null)
			obj._checked = obj.checked;

		var _this = _super.call(this, obj, text, parent) || this;

		_this.type = "RadJav.GUI.Checkbox";

		/** @property {Boolean} [_checked=false]
		* If set to true, the box is checked.
		*/
		_this._checked = RadJav.setDefaultValue (obj._checked, false);

		return (_this);
	}

	/** @method setChecked
	* Set whether or not this checkbox is checked.
	* Theme Event: setChecked
	* Is Theme Event Asynchronous: No
	* @param {Boolean} checked Whether or not this is checked.
	* @return {Promise} Executes the promise when the image has loaded.
	*/
	Checkbox.prototype.setChecked = function (checked)
	{
		RadJav.theme.eventSync (this.type, "setChecked", this, checked);
	}

	/** @method isChecked
	* Checks if this checkbox is checked.
	* Theme Event: isChecked
	* Is Theme Event Asynchronous: No
	* @return {Boolean} Whether or not this is checked.
	*/
	Checkbox.prototype.isChecked = function ()
	{
		return (RadJav.theme.eventSync (this.type, "isChecked", this));
	}

	return (Checkbox);
}(RadJav.GUI.GObject));

