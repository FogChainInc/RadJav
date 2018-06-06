var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var List = (function (_super) {
            __extends(List, _super);
            function List(obj, text, parent) {
                var _this = this;
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
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.List";
                if (obj.canSort != null) {
                    obj._canSort = obj.canSort;
                }
                if (obj.columns != null) {
                    obj._columns = obj.columns;
                }
                _this._canSort = RadJav.setDefaultValue(obj._canSort, true);
                _this._hasCheckBoxes = RadJav.setDefaultValue(obj._hasCheckBoxes, false);
                _this._columns = RadJav.setDefaultValue(obj._columns, []);
                return _this;
            }
            ;
            List.prototype.addColumn = function (column, width, key) {
                var tempColumn = null;
                if (typeof column == "object") {
                    tempColumn = column;
                }
                else {
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
            };
            List.prototype.setColumns = function (columns) {
                this._columns = columns;
                RadJav.Theme.eventSync(this.type, "setColumns", this, columns);
            };
            List.prototype.addRow = function (row, hiddenValue) {
                RadJav.Theme.eventSync(this.type, "addRow", this, row, hiddenValue);
            };
            List.prototype.setRows = function (rows, hiddenRows) {
                RadJav.Theme.eventSync(this.type, "setRows", this, rows, hiddenRows);
            };
            List.prototype.getSelectedRows = function () {
                return RadJav.Theme.eventSync(this.type, "getSelectedRows", this);
            };
            List.prototype.deleteRows = function (selection) {
                return RadJav.Theme.eventSync(this.type, "deleteRows", this, selection);
            };
            return List;
        }(RadJav.GUI.GObject));
        GUI.List = List;
        var Row = (function () {
            function Row(obj) {
                if (obj == null) {
                    obj = {};
                }
                this.items = RadJav.setDefaultValue(obj.items, []);
            }
            Row.prototype.addItem = function (item) {
                if (typeof item != "object") {
                    item = new RadJav.GUI.List.Item({ text: item });
                }
                this.items.push(item);
            };
            return Row;
        }());
        GUI.Row = Row;
        (function (List) {
            var Item = (function () {
                function Item(obj) {
                    if (obj == null) {
                        obj = {};
                    }
                    this.name = RadJav.setDefaultValue(obj.name, "");
                    this.text = RadJav.setDefaultValue(obj.text, "");
                }
                return Item;
            }());
            List.Item = Item;
            var Column = (function () {
                function Column(obj) {
                    if (obj == null) {
                        obj = {};
                    }
                    this.text = RadJav.setDefaultValue(obj.text, "");
                    this.width = RadJav.setDefaultValue(obj.width, 0);
                    this.key = RadJav.setDefaultValue(obj.key, null);
                }
                return Column;
            }());
            List.Column = Column;
            var Selection = (function () {
                function Selection(obj) {
                    if (obj == null) {
                        obj = {};
                    }
                    this._html = RadJav.setDefaultValue(obj._html, null);
                    this._appObj = RadJav.setDefaultValue(obj._appObj, null);
                }
                return Selection;
            }());
            List.Selection = Selection;
        })(List = GUI.List || (GUI.List = {}));
    })(GUI = RadJav.GUI || (RadJav.GUI = {}));
})(RadJav || (RadJav = {}));
