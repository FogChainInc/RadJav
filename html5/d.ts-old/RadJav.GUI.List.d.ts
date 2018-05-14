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
	/** @class RadJav.GUI.List
	* @extends RadJav.GUI.GObject
	* A List.
	* Available on platforms: Windows,Linux,OSX,HTML5
	*/
	class List extends GObject
	{
		constructor (obj?: Object, text?: String, parent?: GObject);

		/** @property {Boolean} [_canSort=true]
		* @protected
		* If set to true, each column will be able to be sorted by the user.
		*/
		_canSort: boolean;
		/** @property {Boolean} [_hasCheckBoxes=false]
		* @protected
		* If set to true, each row will have a checkbox.
		*/
		_hasCheckBoxes: boolean;
		/** @property {RadJav.GUI.List.Column[]} [_columns=[]]
		* @protected
		* The columns in the list box.
		*/
		_columns: List.Column[];

		/** @method addColumn
		* Add a column to this list.
		* Theme Event: addColumn
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.List.Column
		* @param {RadJav.GUI.List.Column/String} columns The columns to set to this list.
		* @param {Number} [width=null] The width.
		* @param {Mixed} [key=null] The key associated with this column.
		*/
		addColumn (column: List.Column | String, width?: Number, key?: any): void;

		/** @method setColumns
		* Set the columns of this list.
		* Theme Event: setColumns
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.List.Column[]
		* @param {RadJav.GUI.List.Column[]} columns The columns to set to this list.
		*/
		setColumns (columns: List.Column[]): void;

		/** @method addRow
		* Add a row to the list.
		* Theme Event: addRow
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, row, hiddenValue
		* @param {Mixed} row The row to add to the list.
		* @param {Mixed} [hiddenValue=undefined] The hidden value to add to the row. If 
		* row has a property named hiddenRow, the value of that will be placed into this
		* parameter, and it will be deleted from the row object.
		*/
		addRow (row: any, hiddenValue?: any): void;

		/** @method setRows
		* Set the list's rows.
		* Theme Event: setRows
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, rows, hiddenRows
		* @param {Array} rows The rows of data to set.
		* @param {Array} [hiddenRows=null] The hidden rows of data to set.
		*/
		setRows (rows: any[], hiddenRows: any[]): void;

		/** @method getSelectedRows
		* Get the selected rows.
		* Theme Event: getSelectedRows
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject
		* @return {RadJav.GUI.List.Selection} The selected objects.
		*/
		getSelectedRows (): List.Selection;

		/** @method deleteRows
		* Delete rows.
		* Theme Event: deleteRows
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.List.Selection
		* @param {RadJav.GUI.List.Selection} selection The selection to delete.
		*/
		deleteRows (selection: List.Selection): void;
	}

	export namespace List
	{
		/** A List row.
		* Available on platforms: Windows,Linux,OSX,HTML5
		*/
		export class Row
		{
			/** @property {RadJav.GUI.List.Item[]} [items=[]]
			* The items to display.
			*/
			items: Item[];

			/** @method addItem
			* Add an item to this row.
			* @param {RadJav.GUI.List.Item} item The item to add.
			*/
			addItem (item: Item): void;
		}

		/** A List item.
		* Available on platforms: Windows,Linux,OSX,HTML5
		*/
		export class Item
		{
			/** @property {String} [name=""]
			* The name to display.
			*/
			name: String;
			/** @property {String} [text=""]
			* The text to display.
			*/
			text: String;
		}

		/** A List column.
		* Available on platforms: Windows,Linux,OSX,HTML5
		*/
		export class Column
		{
			/** @property {String} [text=""]
			* The text to display.
			*/
			text: String;
			/** @property {Number} [width=0]
			* The column width. If set to 0, the width will be automatic.
			*/
			width: Number;
			/** @property {Object} [key=null]
			* The key associated with this column.
			*/
			key: any;
		}

		/** A List selection.
		* Available on platforms: Windows,Linux,OSX,HTML5
		*/
		export class Selection
		{
			/** @property {Mixed} [_html=null]
			* @protected
			* The HTML object associated with this selection.
			*/
			protected _html: any;
			/** @property {Mixed} [_appObj=null]
			* @protected
			* The os object associated with this selection.
			*/
			protected _appObj: any;
		}
	}
}

