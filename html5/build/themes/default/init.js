RadJav.Theme.exports =
{
	init: function ()
	{
		var promise = new Promise (function (resolve, reject)
			{
				require (["dojo/parser", "dojo/dnd/move", "dojox/layout/FloatingPane", 
						"dijit/form/Button", "dijit/form/TextBox", "dijit/form/CheckBox", 
						"dojox/grid/DataGrid", "dojo/data/ItemFileWriteStore", 
						"dojo/store/Memory", "dojo/store/Observable", "dijit/form/ComboBox", 
						"dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/Menu", "dijit/MenuItem",
						"dijit/DropDownMenu", "dojo/query"], function ()
					{
						resolve ();
					});

				RadJav.themeUtils.menuOffset = 0;
				RadJav.themeUtils.getGObjectSizeString = function (obj, offset, addSize)
					{
						var str = "";
						var width = 0;
						var height = 0;

						if (addSize != null)
						{
							width = addSize[0];
							height = addSize[1];
						}

						if (RadJav.OS.HTML5.absolutePositioning == true)
						{
							str = "position: absolute;";
							str += "left: " + obj.getX () + "px; top: " + 
									(obj.getY () + offset + RadJav.themeUtils.menuOffset) + "px;";
							str += "width: " + (obj.getWidth () + width) + "px; height: " + 
														(obj.getHeight () + height) + "px;";
						}
						else
						{
							str += "width: " + (obj.getWidth () + width) + "px; height: " + 
															(obj.getHeight () + height) + "px;";
						}

						str += "z-index: " + obj._zIndex + ";";

						return (str);
					};
				RadJav.themeUtils.getGObjectFontString = function (obj)
					{
						var str = "font-family: '" + obj._font.fontFamily + "';";

						//str += "word-wrap: normal;";
						str += "font-size: " + obj._font.size + "px;";
						str += "color: " + obj._font.color.toHTMLColor () + ";";

						if (obj._font.underline == true)
							str += "text-decoration: underline;";

						if (obj._font.bold == true)
							str += "font-weight: bold;";

						if (obj._font.italic == true)
							str += "font-style: italic;";

						return (str);
					};
				RadJav.themeUtils.getGObjectCursorString = function (obj)
					{
						var str = "";

						if (obj._cursor == "hand")
							str = "cursor: pointer;";
						
						if (obj._cursor == "none")
							str = "cursor: none;";

						return (str);
					};
			});

		return (promise);
	}
};

