RadJav.Theme.themeObjects["RadJav.GUI.Button"] =
{
	init: function ()
	{
		//RadJav.Theme.
	}, 

	create: function (obj)
	{
		var promise = new Promise (function (resolve, reject)
			{
				var parentDOM = RadJav.OS.HTML5.getParentHTML (obj);
				/*var parentDOM2 = RadJav.OS.HTML5.selectDOM (parentDOM.domNode, 
						"#" + parentDOM.id + " [data-window-type='content']");

				if (parentDOM2 != null)
					parentDOM = parentDOM2;*/

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
				html += " " + RadJav.themeUtils.getGObjectFontString (obj);
				html += " " + RadJav.themeUtils.getGObjectCursorString (obj);
				html += "\">";
				html += obj._text;
				html += "</button>";
				var button = RadJav.OS.HTML5.appendHTML (parentDOM, html);

				if (obj._visible == true)
					dojo.query (button).style ("visibility", "visible");
				else
					dojo.query (button).style ("visibility", "hidden");

				/*var button = new dijit.form.Button ({
							name: obj.name, 
							label: obj._text, 
							style: "width: " + obj.getWidth () + 
								"px; height: " + obj.getHeight () + "px; visibility: hidden;", 
						}, dojo.byId (obj.name));
				button.startup ();

				if (obj._visible == true)
					dojo.query (button.domNode).style ("visibility", "visible");*/

				resolve (button);
			});

		return (promise);
	}
};

