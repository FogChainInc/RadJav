RadJav.Theme.themeObjects["RadJav.GUI.Label"] =
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

				var html = "<label id = \"" + obj.name + "\" name = \"" + obj.name + "\" type = \"text\" ";
				html += "style = \"" + RadJav.themeUtils.getGObjectSizeString (obj, offset);
				html += " " + RadJav.themeUtils.getGObjectFontString (obj);
				html += " " + RadJav.themeUtils.getGObjectCursorString (obj);
				html += "\">";
				html += obj._text;
				html += "</label>";
				var label = RadJav.OS.HTML5.appendHTML (parentDOM, html);

				if (obj._visible == true)
					dojo.query (label).style ("visibility", "visible");
				else
					dojo.query (label).style ("visibility", "hidden");

				resolve (label);
			});

		return (promise);
	}, 

	setText: function (obj, text)
	{
		text = text.replaceAll (" ", "&nbsp;");
		obj._html.innerHTML = text;
	}, 

	getText: function (obj)
	{
		return (obj._html.innerHTML);
	}
};

