/*
	MIT-LICENSE
	Copyright (c) 2017-2018 Higher Edge Software, LLC

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

declare namespace RadJav.GUI
{
	/** @class RadJav.GUI.Combobox
	* @extends RadJav.GUI.GObject
	* A combobox.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	class Combobox extends GObject
	{
		constructor (obj?: Object, text?: String, parent?: GObject);

		/** @property {String} [_items=[]]
		* The items associated with this object.
		*/
		_items: String[];
		onCreated: (() => void);

		/** @method addItem
		* Add an item to the combo box.
		* Theme Event: addItem
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.Combobox.Item
		* @param {RadJav.GUI.Combobox.Item/String} item The item to add.
		*/
		addItem (item: Combobox.Item): void;

		/** @method setItems
		* Set an array of items to the combo box.
		* Theme Event: setItems
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.Combobox.Item[]
		* @param {RadJav.GUI.Combobox.Item[]} items The items to set to this combo box.
		*/
		setItems (items: Combobox.Item[]): void;

		/** @method deleteItem
		* Remove an item from this combobox.
		* Theme Event: deleteItem
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, Number
		* @param {Number} The item index to delete.
		*/
		deleteItem (index: Number): void;

		/** @method getItem
		* Get an item from this combobox.
		* Theme Event: getItem
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, Number
		* @return {RadJav.GUI.Combobox.Item} The item.
		*/
		getItem (index: Number): Combobox.Item;

		/** @method getItems
		* Get all items from this combobox.
		* Theme Event: getItems
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject
		* @return {RadJav.GUI.Combobox.Item[]} The items.
		*/
		getItems (): Combobox.Item[];

		/** @method getNumItems
		* Get the number of items.
		* Theme Event: getNumItems
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject
		* @return {Number} The number of items.
		*/
		getNumItems (): Number;

		/** @method clear
		* Clear this object of all items.
		* Theme Event: clear
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject
		*/
		clear (): void;

		/** @method setSelectedItemIndex
		* Set the selected item index.
		* Theme Event: setSelectedItemIndex
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject
		* Returned from Theme Event: Boolean
		* @param {Number} index The selected item index.
		*/
		setSelectedItemIndex (index: Number): void;

		/** @method getSelectedItemIndex
		* Get the selected item index.
		* Theme Event: getSelectedItemIndex
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject
		* Returned from Theme Event: Boolean
		* @return {Number} The selected item index.
		*/
		getSelectedItemIndex (): Number;
	}

	export namespace Combobox
	{
		/** @class RadJav.GUI.Combobox.Item
		* A combobox item.
		* Available on platforms: Windows,Linux,OSX,HTML5
		*/
		export class Item
		{
			/** @property {String} [name=""]
			* The name.
			*/
			name: String;
			/** @property {String} [text=""]
			* The item's display text.
			*/
			text: String;
		}
	}
}

