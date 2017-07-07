RadJav.Theme.themeObjects["RadJav.GUI.MenuBar"] =
{
	create: function (obj)
	{
		var promise = new Promise (function (resolve, reject)
			{
				var parentDOM = RadJav.OS.HTML5.getParentHTML (obj);

				if (parentDOM.domNode != null)
					parentDOM = parentDOM.domNode;

				var offset = 0;
				var placeAtName = "";

				if (obj._parent != null)
				{
					if ((obj._parent.type == "Window") || (obj._parent.type == "RadJav.GUI.Window"))
					{
						offset = 35;
						RadJav.themeUtils.menuOffset = 30;
						placeAtName = obj._parent.name + "-menubar";
					}
				}

				if (obj._htmlElement != null)
					placeAtName = obj._htmlElement.name;

				var menubar = new dijit.MenuBar ();
				menubar.placeAt (placeAtName);
				menubar.startup ();

				var dom = RadJav.OS.HTML5.selectDOM ("#" + placeAtName);

				if (dom != null)
					dom.style.display = "block";

				if (obj._visible == true)
					dojo.query (menubar).style ("visibility", "visible");
				else
					dojo.query (menubar).style ("visibility", "hidden");

				resolve (menubar);
			});

		return (promise);
	}, 

	setText: function (obj, text)
	{
		obj._html.value = text;
	}, 

	getText: function (obj)
	{
		return (obj._html.value);
	}
};

