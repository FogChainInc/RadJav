RadJav.Theme.themeObjects["RadJav.GUI.Textbox"] =
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

				var html = "<input id = \"" + obj.name + "\" name = \"" + obj.name + "\" type = \"text\" ";
				html += "style = \"" + RadJav.themeUtils.getGObjectSizeString (obj, offset/*, [-4, -6]*/) + " " + 
					RadJav.themeUtils.getGObjectFontString (obj);
				html += " " + RadJav.themeUtils.getGObjectCursorString (obj);
				html += "\" ";
				html += "value = \"" + obj._text + "\" />";
				var textBox = RadJav.OS.HTML5.appendHTML (parentDOM, html);

				/*var textBox = new dijit.form.TextBox ({
							name: obj.name, 
							value: obj._text, 
							style: "width: " + obj.getWidth () + 
								"px; height: " + obj.getHeight () + "px; visibility: hidden;", 
						}, dojo.byId (obj.name));
				textBox.startup ();*/

				if (obj._visible == true)
					dojo.query (textBox).style ("visibility", "visible");
				else
					dojo.query (textBox).style ("visibility", "hidden");

				resolve (textBox);
			});

		return (promise);
	}
};

