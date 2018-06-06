RadJav.Theme.themeObjects["RadJav.GUI.Canvas3D"] =
{
	create: function (obj)
	{
		var promise = new Promise (function (resolve, reject)
			{
				var parentDOM = RadJav.OS.HTML5.getParentHTML (obj);

				/*if (parentDOM.id != "")
				{
					var parentDOM2 = RadJav.OS.HTML5.selectDOM (parentDOM.domNode, 
							"#" + parentDOM.id + " [data-window-type='content']");

					if (parentDOM2 != null)
						parentDOM = parentDOM2;
				}*/

				if (parentDOM.domNode != null)
					parentDOM = parentDOM.domNode;

				var offset = 0;

				if (obj._parent != null)
				{
					if ((obj._parent.type == "Window") || (obj._parent.type == "RadJav.GUI.Window"))
						offset = 35;
				}

				var html = "<canvas id = \"" + obj.name + "\" style = \"";
				html += RadJav.themeUtils.getGObjectSizeString (obj, offset);
				html += " " + RadJav.themeUtils.getGObjectFontString (obj);
				html += " " + RadJav.themeUtils.getGObjectCursorString (obj);
				html += "\">";
				html += "</canvas>";
				var dom = RadJav.OS.HTML5.appendHTML (parentDOM, html);
				dom.domNode = dom;

				resolve (dom);
			});

		return (promise);
	}
};

