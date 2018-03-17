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
  namespace GUI {
    /** @class RadJav.GUI.Combobox
     * @extends RadJav.GUI.GObject
     * A combobox.
     * Available on platforms: Windows,Linux,OSX,HTML5
     */
    class Combobox extends GObject {
      constructor(obj?: Object, text?: String, parent?: GObject) {
        if (obj == null) {
          obj = {};
        }

        if (typeof obj == "string") {
          var name = obj;
          obj = { name: name };
        }

        if (obj.items != null) {
          obj._items = obj.items;
        }

        if (obj.size == null) {
          obj.size = new RadJav.Vector2();
          obj.size.x = 120;
          obj.size.y = 40;
        }

        super(obj, text, parent);

        this.type = "RadJav.GUI.Combobox";
      }

      /** @property {String} [_items=[]]
       * The items associated with this object.
       */
      _items: String[];
      onCreated(): void {
        for (var iIdx = 0; iIdx < this._items.length; iIdx++) {
          var item = this._items[iIdx];
          this.addItem(item);
        }
      }

      /** @method addItem
       * Add an item to the combo box.
       * Theme Event: addItem
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.Combobox.Item
       * @param {RadJav.GUI.Combobox.Item/String} item The item to add.
       */
      addItem(item: Combobox.Item): void {
        if (typeof item == "string") {
          item = { text: item };
        }

        RadJav.theme.eventSync(this.type, "addItem", this, item);
      }

      /** @method setItems
       * Set an array of items to the combo box.
       * Theme Event: setItems
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, RadJav.GUI.Combobox.Item[]
       * @param {RadJav.GUI.Combobox.Item[]} items The items to set to this combo box.
       */
      setItems(items: Combobox.Item[]): void {
        RadJav.theme.eventSync(this.type, "setItems", this, items);
      }

      /** @method deleteItem
       * Remove an item from this combobox.
       * Theme Event: deleteItem
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, Number
       * @param {Number} The item index to delete.
       */
      deleteItem(index: Number): void {
        RadJav.theme.eventSync(this.type, "deleteItem", this, index);
      }

      /** @method getItem
       * Get an item from this combobox.
       * Theme Event: getItem
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject, Number
       * @return {RadJav.GUI.Combobox.Item} The item.
       */
      getItem(index: Number): Combobox.Item {
        return RadJav.theme.eventSync(this.type, "getItem", this, index);
      }

      /** @method getItems
       * Get all items from this combobox.
       * Theme Event: getItems
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject
       * @return {RadJav.GUI.Combobox.Item[]} The items.
       */
      getItems(): Combobox.Item[] {
        return RadJav.theme.eventSync(this.type, "getItems", this);
      }

      /** @method getNumItems
       * Get the number of items.
       * Theme Event: getNumItems
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject
       * @return {Number} The number of items.
       */
      getNumItems(): Number {
        return RadJav.theme.eventSync(this.type, "getNumItems", this);
      }

      /** @method clear
       * Clear this object of all items.
       * Theme Event: clear
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject
       */
      clear(): void {
        return RadJav.theme.eventSync(this.type, "clear", this);
      }

      /** @method setSelectedItemIndex
       * Set the selected item index.
       * Theme Event: setSelectedItemIndex
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject
       * Returned from Theme Event: Boolean
       * @param {Number} index The selected item index.
       */
      setSelectedItemIndex(index: Number): void {
        RadJav.theme.eventSync(this.type, "setSelectedItemIndex", this, index);
      }

      /** @method getSelectedItemIndex
       * Get the selected item index.
       * Theme Event: getSelectedItemIndex
       * Is Theme Event Asynchronous: No
       * Parameters Passed to Theme Event: RadJav.GUI.GObject
       * Returned from Theme Event: Boolean
       * @return {Number} The selected item index.
       */
      getSelectedItemIndex(): Number {
        return RadJav.theme.eventSync(this.type, "getSelectedItemIndex", this);
      }
    }

    export namespace Combobox {
      /** @class RadJav.GUI.Combobox.Item
       * A combobox item.
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
}
