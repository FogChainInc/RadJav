RadJav.Theme.themeObjects["RadJav.GUI.List"] =
{
	create: function (obj)
	{
		var promise = new Promise (function (resolve, reject)
			{
				var parentDOM = RadJav.OS.HTML5.getParentHTML (obj);

				if (parentDOM.domNode != null)
					parentDOM = parentDOM.domNode;

				var offset = 0;

				if (obj._parent != null)
				{
					if ((obj._parent.type == "Window") || (obj._parent.type == "RadJav.GUI.Window"))
						offset = 35;
				}

				var html = "<div id = \"" + obj.name + "\" name = \"" + obj.name + 
					"\" style = \"" + RadJav.themeUtils.getGObjectSizeString (obj, offset) + " " + 
					RadJav.themeUtils.getGObjectFontString (obj);
				html += " " + RadJav.themeUtils.getGObjectCursorString (obj);
				html += "\">";
				html += "</div>";
				RadJav.OS.HTML5.appendHTML (parentDOM, html);

				var listobj = {
							name: obj.name, 
							style: RadJav.themeUtils.getGObjectSizeString (obj, offset) + " " + 
								RadJav.themeUtils.getGObjectFontString (obj), 
						};

				if (obj._canSort == false)
				{
					listobj.canSort = function(col)
						{
							return (false);
						};
				}

				var listDOM = dojo.byId (obj.name);
				var list = new dojox.grid.DataGrid (listobj, listDOM);
				list.startup ();

				if (obj._visible == true)
					dojo.query (list.domNode).style ("visibility", "visible");
				else
					dojo.query (list.domNode).style ("visibility", "hidden");

				var layout = [[]];

				if (obj._hasCheckBoxes == true)
				{
					if (obj._columns.length > 0)
					{
						layout[0].push ({
								type: dojox.grid.cells.Bool, 
								editable: true
							});
					}
				}

				for (var iJdx = 0; iJdx < obj._columns.length; iJdx++)
				{
					var keyCol = obj._columns[iJdx];
					var field = "field" + iJdx;
					var width = "auto";

					if (keyCol.field != null)
						field = keyCol.field;

					if (keyCol.width != null)
						width = keyCol.width;

					layout[0].push ({
								name: keyCol.text, 
								field: field, 
								width: width
							});
				}

				list.setStructure (layout);

				setTimeout (RadJav.keepContext (function (obj)
					{
						dojo.query ("#" + obj[0] + " .dojoxGridContent").style ("height", (obj[1] - 20) + "px");
					}, this, [obj.name, obj.getHeight ()]), 50);

				resolve (list);
			});

		return (promise);
	}, 

	setText: function (obj, text)
	{
		obj._html.set ("text", text);
	}, 

	getText: function (obj)
	{
		return (obj._html.get ("text"));
	}, 

	setVisibility: function (obj, visible)
	{
		if (visible == true)
			dojo.query ("#" + obj.name).style ("visibility", "visible");
		else
			dojo.query ("#" + obj.name).style ("visibility", "hidden");
	}, 

	getVisibility: function (obj)
	{
		var value = dojo.query ("#" + obj.name).style ("visibility");
		value = value.toLowerCase ();
		var isVisible = true;

		if (value == "hidden")
			isVisible = false;

		return (isVisible);
	}, 

	getDojoColumn: function (column)
	{
		var columnObj = { name: column.text };

		if (column.key != null)
			columnObj.field = column.key;

		if (column.width != null)
		{
			var width = "auto";

			if (column.width > 0)
				width = column.width + "px";

			columnObj.width = width;
		}
		else
			columnObj.width = "auto";

		return (columnObj);
	}, 

	addColumn: function (list, column, width, key)
	{
		var col = null;

		if (typeof (column) == "object")
			col = column;
		else
		{
			var obj = { text: column };

			if (width != null)
				obj.width = width;

			if (key != null)
				obj.key = key;

			col = new RadJav.GUI.List.Column (obj);
		}

		if (list._html._layout != null)
		{
			list._html._layout[0].push (this.getDojoColumn (col));
			this.setColumns (list, null, list._html._layout);
		}
		else
			this.setColumns (list, [col]);
	}, 

	setColumns: function (list, columns, passLayout)
	{
		var layout = [[]];

		if (passLayout == null)
		{
			if (list._hasCheckBoxes == true)
			{
				if (columns.length > 0)
				{
					layout[0].push ({
							type: dojox.grid.cells.Bool, 
							editable: true
						});
				}
			}

			for (var iJdx = 0; iJdx < columns.length; iJdx++)
			{
				var column = columns[iJdx];
				var columnObj = this.getDojoColumn (column);

				layout[0].push (columnObj);
			}
		}
		else
			layout = passLayout;

		list._html.setStructure (layout);
		list._html._layout = layout;
	}, 

	addRow: function (list, row, hiddenValue)
	{
		var obj = row;

		if (obj.hiddenData != null)
			hiddenValue = obj.hiddenData;

		if (hiddenValue != null)
			obj.hiddenData = hiddenValue;

		var store = list._html.get ("store");
		var newRow = {};

		for (var iIdx = 0; iIdx < row.items.length; iIdx++)
			newRow["field" + iIdx] = row.items[iIdx].text;

		if (store == null)
		{
			store = new dojo.data.ItemFileWriteStore ({
						data: {
								items: [newRow]
							}
					});
			list._html.setStore (store);
		}
		else
			list._html.get ("store").newItem (newRow);
	}, 

	setRows: function (list, rows, hiddenRows)
	{
		for (var iIdx = 0; iIdx < rows.length; iIdx++)
		{
			var row = rows[iIdx];

			if (row.hiddenData != null)
			{
				var temp = row.hiddenData;

				if (typeof (temp) == "object")
					temp = RadJav.clone (row.hiddenData);

				//delete row.hiddenData;
			}
		}

		var store = new dojo.data.ItemFileWriteStore ({
					data: {
							items: RadJav.cloneArray (rows)
						}
				});

		list._html.setStore (store);
	}, 

	getSelectedRows: function (list)
	{
		var selectedRows = new Array ();
		var items = list._html.selection.getSelected ();
		var selection = new RadJav.GUI.List.Selection ();
		selection._html = items;

		return (selection);
	}, 

	deleteRows: function (list, selection)
	{
		for (var iIdx = 0; iIdx < selection._html.length; iIdx++)
			list._html.get ("store").deleteItem (selection._html[iIdx]);
	}, 

	on: function (list, eventName, func)
	{
		var func2 = func;

		if ((eventName == "rowClick") || (eventName == "rowDblClick"))
		{
			func2 = RadJav.keepContext (function (row)
				{
					var items = [];
					var rowItem = row.grid.getItem (row.rowIndex);

					for (var key in rowItem)
					{
						if (key.indexOf ("field")> -1)
						{
							var item = new RadJav.GUI.List.Row ();
							item.addItem (rowItem[key][0]);
							items.push (item);
						}
					}

					return (func (items));
				}, this);
		}

		list._html.on (eventName, func2);
	}
};

