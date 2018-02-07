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

/** @class RadJav.GUI.Radio
* @extends RadJav.GUI.GObject
* A Radio button.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.GUI.Radio = (function (_super)
{
	__extends(Radio, _super);

	function Radio (obj, text, parent)
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

		var _this = _super.call(this, obj, text, parent) || this;

		_this.type = "RadJav.GUI.Radio";

		if (obj.radioGroup != null)
			obj._radioGroup = obj.radioGroup;

		if (obj.checked != null)
			obj._checked = obj.checked;

		/** @property {String} [_radioGroup=""]
		* @protected
		* The group this box is associated grouped with.
		*/
		_this._radioGroup = RadJav.setDefaultValue (obj._radioGroup, "");
		/** @property {Boolean} [_checked=false]
		* @protected
		* Whether or not this object is checked when created.
		*/
		_this._checked = RadJav.setDefaultValue (obj._checked, false);

		return (_this);
	}

	/** @method setChecked
	* Set whether or not this object is checked.
	* Theme Event: setChecked
	* Is Theme Event Asynchronous: No
	* Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
	* @param {Boolean} checked Set to true if this item is checked.
	*/
	Radio.prototype.setChecked = function (checked)
	{
		RadJav.theme.eventSync (this.type, "setChecked", this, checked);
	}

	/** @method isChecked
	* Checks whether or not this object is checked.
	* Theme Event: isChecked
	* Is Theme Event Asynchronous: No
	* Parameters Passed to Theme Event: RadJav.GUI.GObject
	* Returned from Theme Event: Boolean
	* @return {Boolean} If set to true, this item is checked.
	*/
	Radio.prototype.isChecked = function ()
	{
		return (RadJav.theme.eventSync (this.type, "isChecked", this));
	}

	return (Radio);
}(RadJav.GUI.GObject));

