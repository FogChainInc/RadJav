RadJav.Theme.themeObjects["RadJav.GUI.Textarea"] =
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

				var html = "<textarea id = \"" + obj.name + "\" name = \"" + obj.name + "\" ";
				html += "style = \"" + RadJav.themeUtils.getGObjectSizeString (obj, offset) + " " + 
					RadJav.themeUtils.getGObjectFontString (obj);
				html += " " + RadJav.themeUtils.getGObjectCursorString (obj);
				html += "\">";
				html += obj._text;
				html += "</textarea>";
				var textBox = RadJav.OS.HTML5.appendHTML (parentDOM, html);

				if (obj._visible == true)
					dojo.query (textBox).style ("visibility", "visible");
				else
					dojo.query (textBox).style ("visibility", "hidden");

				resolve (textBox);
			});

		return (promise);
	}
};

