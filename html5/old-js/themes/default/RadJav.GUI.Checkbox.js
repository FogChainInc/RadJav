RadJav.Theme.themeObjects["RadJav.GUI.Checkbox"] =
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

				var html = "<div style = \"" + RadJav.themeUtils.getGObjectSizeString (obj, offset) + "\">";
				html += "<input id = \"" + obj.name + "\" name = \"" + obj.name + "\" type = \"checkbox\" ";

				if (obj._checked == true)
					html += "checked ";

				html += "/>";
				html += "<label for = \"" + obj.name + "\" style = \"" + 
					RadJav.themeUtils.getGObjectFontString (obj) + " " + 
					RadJav.themeUtils.getGObjectCursorString (obj) + "\">" + obj._text + "</label></div>";
				var checkbox = RadJav.OS.HTML5.appendHTML (parentDOM, html);

				resolve (checkbox);
			});

		return (promise);
	}, 

	setText: function (obj, text)
	{
		text = text.replaceAll (" ", "&nbsp;");
		obj._html.set ("text", text);
	}, 

	getText: function (obj)
	{
		return (obj._html.get ("text"));
	}, 

	setChecked: function (obj, checked)
	{
		var dom = RadJav.OS.HTML5.selectDOM (obj._html, "input");
		dom.checked = checked;
	}, 

	isChecked: function (obj)
	{
		var dom = RadJav.OS.HTML5.selectDOM (obj._html, "input");
		return (dom.checked);
	}
};

