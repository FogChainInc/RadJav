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

/// <reference path="RadJav.ts" />

namespace RadJav {
  export namespace GUI {
    /** @class RadJav.GUI.Label
     * @extends RadJav.GUI.GObject
     * A label.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    export class List extends RadJav.GUI.GObject {
      constructor(obj?: any, text?: String, parent?: RadJav.GUI.GObject) {
        if (obj == null) {
          obj = {};
        }

        if (typeof obj == "string") {
          var name = obj;
          obj = { name: name };
        }

        if (obj.size == null) {
          obj.size = new RadJav.Vector2();
          obj.size.x = 350;
          obj.size.y = 300;
        }

        super(obj, text, parent);

        this.type = "RadJav.GUI.List";

        if (obj.canSort != null) {
          obj._canSort = obj.canSort;
        }

        if (obj.columns != null) {
          obj._columns = obj.columns;
        }
        this._canSort = RadJav.setDefaultValue(obj._canSort, true);
        this._hasCheckBoxes = RadJav.setDefaultValue(obj._hasCheckBoxes, false);
        this._columns = RadJav.setDefaultValue(obj._columns, []);
      }

      protected _canSort: any;
      protected _hasCheckBoxes: any;
      protected _columns: any;;

      /** @method addColumn
       * Add a column to this list.
       * Theme Event: addColumn
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.List.Column
       * @param {RadJav.GUI.List.Column/String} columns The columns to set to this list.
       * @param {Number} [width=null] The width.
       * @param {Mixed} [key=null] The key associated with this column.
       */
      addColumn(column, width: number, key) {
        var tempColumn = null;

        if (typeof column == "object") {
          tempColumn = column;
        } else {
          tempColumn = { text: column };

          if (width != null) {
            tempColumn.width = width;
          }

          if (key != null) {
            tempColumn.key = key;
          }
        }

        this._columns.push(tempColumn);
        RadJav.Theme.eventSync(this.type, "addColumn", this, tempColumn);
      }

      /** @method setColumns
       * Set the columns of this list.
       * Theme Event: setColumns
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.List.Column[]
       * @param {RadJav.GUI.List.Column[]} columns The columns to set to this list.
       */
      setColumns(columns) {
        this._columns = columns;
        RadJav.Theme.eventSync(this.type, "setColumns", this, columns);
      }

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
      addRow(row, hiddenValue) {
        RadJav.Theme.eventSync(this.type, "addRow", this, row, hiddenValue);
      }

      /** @method setRows
       * Set the list's rows.
       * Theme Event: setRows
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, rows, hiddenRows
       * @param {Array} rows The rows of data to set.
       * @param {Array} [hiddenRows=null] The hidden rows of data to set.
       */
      setRows(rows, hiddenRows) {
        RadJav.Theme.eventSync(this.type, "setRows", this, rows, hiddenRows);
      }

      /** @method getSelectedRows
       * Get the selected rows.
       * Theme Event: getSelectedRows
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject
       * @return {RadJav.GUI.List.Selection} The selected objects.
       */
      getSelectedRows() {
        return RadJav.Theme.eventSync(this.type, "getSelectedRows", this);
      }

      /** @method deleteRows
       * Delete rows.
       * Theme Event: deleteRows
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.List.Selection
       * @param {RadJav.GUI.List.Selection} selection The selection to delete.
       */
      deleteRows(selection) {
        return RadJav.Theme.eventSync(this.type, "deleteRows", this, selection);
      }


    }

    /** @class RadJav.GUI.List.Row
     * A List row.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    export class Row {
      constructor(obj) {
        if (obj == null) {
          obj = {};
        }
        this.items = RadJav.setDefaultValue(obj.items, []);
      }
      /** @property {RadJav.GUI.List.Item[]} [items=[]]
       * The items to display.
       */
      items;

      /** @method addItem
       * Add an item to this row.
       * @param {RadJav.GUI.List.Item} item The item to add.
       */
      addItem(item) {
        if (typeof item != "object") {
          item = new RadJav.GUI.List.Item({ text: item });
        }

        this.items.push(item);
      }
    }

    export namespace List {

      /** @class RadJav.GUI.List.Item
       * A List item.
       * Available on platforms: Windows,Linux,OSX,HTML5
       */
      export class Item {
        constructor(obj) {
          if (obj == null) {
            obj = {};
          }
          this.name = RadJav.setDefaultValue(obj.name, "");
          this.text = RadJav.setDefaultValue(obj.text, "");
        }

        /** @property {String} [name=""]
         * The name to display.
         */
        name: String;
        /** @property {String} [text=""]
         * The text to display.
         */
        text: string;
      }

      /** @class RadJav.GUI.List.Column
       * A List column.
       * Available on platforms: Windows,Linux,OSX,HTML5
       */
      export class Column {
        constructor(obj) {
          if (obj == null) {
            obj = {};
          }
          this.text = RadJav.setDefaultValue(obj.text, "");
          this.width = RadJav.setDefaultValue(obj.width, 0);
          this.key = RadJav.setDefaultValue(obj.key, null);
        }
        /** @property {String} [text=""]
         * The text to display.
         */
        text: String;
        /** @property {Number} [width=0]
         * The column width. If set to 0, the width will be automatic.
         */
        width: number;
        /** @property {Object} [key=null]
         * The key associated with this column.
         */
        key: object;
      }

      /** @class RadJav.GUI.List.Selection
       * A List selection.
       * Available on platforms: Windows,Linux,OSX,HTML5
       */
      export class Selection {
        constructor(obj) {
          if (obj == null) {
            obj = {};
          }
          this._html = RadJav.setDefaultValue(obj._html, null);
          this._appObj = RadJav.setDefaultValue(obj._appObj, null);
        }

        /** @property {Mixed} [_html=null]
         * @protected
         * The HTML object associated with this selection.
         */
        _html;
        /** @property {Mixed} [_appObj=null]
         * @protected
         * The os object associated with this selection.
         */
        _appObj;
      }
    }
  }
}