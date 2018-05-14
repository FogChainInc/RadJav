RadJav.Theme.themeObjects["RadJav.GUI.GObject"] =
{
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

	setText: function (obj, text)
	{
		if (obj._html.value == null)
			debugger;

		obj._html.value = text;
	}, 

	getText: function (obj)
	{
		if (obj._html.value == null)
			debugger;
		
		return (obj._html.value);
	}, 

	setEnabled: function (obj, enabled)
	{
		obj._html.disabled = !enabled;
	}, 

	getEnabled: function (obj)
	{
		return (!obj._html.disabled);
	}, 

	on: function (obj, eventName, func)
	{
		if (obj._html.addEventListener == null)
			debugger;

		obj._html.addEventListener (eventName, func);
	}
};

