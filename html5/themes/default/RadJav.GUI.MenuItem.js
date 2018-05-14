RadJav.Theme.themeObjects["RadJav.GUI.MenuItem"] =
{
	create: function (obj)
	{
		var promise = new Promise (function (resolve, reject)
			{
				var parentDOM = RadJav.OS.HTML5.getParentHTML (obj);

				if (parentDOM.domNode != null)
					parentDOM = parentDOM.domNode;

				var menuitem = null;

				if (obj._parent._html != null)
				{
					if (obj._parent._html.subMenu != null)
					{
						if (obj._text == "-")
							menuitem = new dijit.MenuSeparator ();
						else
						{
							menuitem = new dijit.MenuItem ({
									label: obj._text
								});
						}

						if (obj._children.length > 0)
						{
							menuitem.subMenu = new dijit.Menu ({ parentMenu: obj._parent._html.subMenu });
							var popup = new dijit.PopupMenuItem ({
										label: obj._text, 
										popup: menuitem.subMenu
									});
							obj._parent._html.subMenu.addChild (popup);
							menuitem.popup = popup;
						}
						else
							obj._parent._html.subMenu.addChild (menuitem);
					}
					else
					{
						var dropdownMenu = new dijit.DropDownMenu ();
						var popup = new dijit.PopupMenuBarItem ({
									label: obj._text, 
									popup: dropdownMenu
								});
						popup.subMenu = dropdownMenu;
						obj._parent._html.addChild (popup);
						menuitem = popup;
					}
				}

				if (obj._visible == true)
					dojo.query (menuitem).style ("visibility", "visible");
				else
					dojo.query (menuitem).style ("visibility", "hidden");

				resolve (menuitem);
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
	}, 

	on: function (obj, eventName, func)
	{
		if (eventName == "click")
			obj._html.onClick = func;
	}
};

