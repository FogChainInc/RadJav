RadJav.Theme.themeObjects["RadJav.GUI.Radio"] =
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

				var groupName = obj.name;
				var checked = "";

				if (obj._radioGroup != "")
					groupName = obj._radioGroup;

				if (obj._checked == true)
					checked = "checked";

				var html = "<div style = \"" + RadJav.themeUtils.getGObjectSizeString (obj, offset) + " " + 
					RadJav.themeUtils.getGObjectFontString (obj);
				html += " " + RadJav.themeUtils.getGObjectCursorString (obj);
				html += "\">";
				html += "<label><input id = \"" + obj.name + "\" name = \"" + groupName + 
							"\" type = \"radio\" " + checked + " />";
				html += obj._text + "</label></div>";
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

	setVisibility: function (obj, visible)
	{
		if (visible == true)
			dojo.query (obj._html).style ("visibility", "visible");
		else
			dojo.query (obj._html).style ("visibility", "hidden");
	}, 

	getVisibility: function (obj)
	{
		var value = dojo.query (obj._html).style ("visibility");
		value = value.toLowerCase ();
		var isVisible = true;

		if (value == "hidden")
			isVisible = false;

		return (isVisible);
	}, 

	setEnabled: function (obj, enabled)
	{
		var elm = RadJav.OS.HTML5.selectDOM (obj._html, "input");
		elm.disabled = !enabled;
	}, 

	getEnabled: function (obj)
	{
		var elm = RadJav.OS.HTML5.selectDOM (obj._html, "input");
		return (!elm.disabled);
	}, 

	on: function (obj, eventName, func)
	{
		obj._html.addEventListener (eventName, func);
	}, 

	setChecked: function (obj, checked)
	{
		var input = RadJav.OS.HTML5.selectDOM (obj._html, "input");
		input.checked = checked;
	}, 

	isChecked: function (obj)
	{
		var input = RadJav.OS.HTML5.selectDOM (obj._html, "input");
		return (input.checked);
	}
};

