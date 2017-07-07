RadJav.Theme.themeObjects["RadJav.GUI.Combobox"] =
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

				var html = "<button id = \"" + obj.name + "\" name = \"" + obj.name + 
						"\" style = \"" + RadJav.themeUtils.getGObjectSizeString (obj, offset);
				html += " " + RadJav.themeUtils.getGObjectFontString (obj) + "\">";
				html += "</button>";
				RadJav.OS.HTML5.appendHTML (parentDOM, html);
				var style = RadJav.themeUtils.getGObjectSizeString (obj, offset, [-2, -2]) + 
							" " + RadJav.themeUtils.getGObjectFontString (obj) + " " + 
							RadJav.themeUtils.getGObjectCursorString (obj);

				var combobox = new dijit.form.ComboBox ({
							name: obj.name, 
							value: obj._text, 
							style: style, 
						}, dojo.byId (obj.name));
				combobox.startup ();

				if (obj._visible == true)
					dojo.query (combobox.domNode).style ("visibility", "visible");
				else
					dojo.query (combobox.domNode).style ("visibility", "hidden");

				resolve (combobox);
			});

		return (promise);
	}, 

	setText: function (obj, text)
	{
		obj._html.set ("value", text);
	}, 

	getText: function (obj)
	{
		return (obj._html.get ("value"));
	}, 

	on: function (obj, eventName, func)
	{
		obj._html.on (eventName, func);
	}, 

	addItem: function (combobox, item)
	{
		var name = combobox._html.get ("store").data.length;

		if (item.name != null)
			name = item.name;

		combobox._html.get ("store").add ({ id: name, name: item.text});
	}, 

	setItems: function (combobox, items)
	{
		var items = combobox._html.get ("store").data;

		if (items != null)
		{
			for (var iIdx = 0; iIdx < items.length; iIdx++)
			{
				var item = items[iIdx];
				combobox._html.get ("store").add ({ id: item.id, name: item.text});
			}
		}
	}, 

	getItem: function (combobox, index)
	{
		var item = combobox._html.get ("store").data[index];

		return (item);
	}, 

	getItems: function (combobox)
	{
		var items = combobox._html.get ("store").data;

		return (items);
	}, 

	getNumItems: function (combobox)
	{
		var items = combobox._html.get ("store").data;

		return (items.length);
	}, 

	deleteItem: function (combobox, index)
	{
		var items = combobox._html.get ("store").data;

		if (items != null)
			combobox._html.get ("store").remove (items[index].id);
	}, 

	clear: function (combobox)
	{
		var items = combobox._html.get ("store").data;

		if (items != null)
		{
			var length = combobox._html.get ("store").data.length;

			for (var iIdx = (length - 1); iIdx >= 0; iIdx--)
				combobox._html.get ("store").remove (items[iIdx].id);
		}
	}, 

	setSelectedItemIndex: function (combobox, index)
	{
		var item = combobox._html.get ("store").data[index];
		combobox._html.set ("item", item);
	}, 

	getSelectedItemIndex: function (combobox)
	{
		var store = combobox._html.get ("store");
		var index = store.getValue (combobox._html.item, "id");

		return (index);
	}
};

