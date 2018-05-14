/*
	MIT-LICENSE
	Copyright (c) 2017-2018 Higher Edge Software, LLC

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
	and associated documentation files (the "Software"), to deal in the Software without restriction, 
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial 
	portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/** The base GUI object.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
declare namespace RadJav.GUI
{
	class GObject
	{
		/** @property {String} [name=""]
		* The name of this object.
		*/
		name: String;
		/** @property {String} [type=""]
		* The type of object.
		*/
		type: String;
		/** @property {RadJav.Rectangle} [_transform=new Rectangle ()]
		* @protected
		* The transform of this object.
		*/
		_transform: Rectangle;
		/** @property {Boolean} [_visible=true]
		* @protected
		* The visibility of the object.
		*/
		_visible: boolean;
		/** @property {Number} [_zIndex=0]
		* @protected
		* The initial z-index of this object. The higher the value the more "on top" the 
		* object will be compared to other objects.
		*/
		_zIndex: Number;
		/** @property {String} [_text=""]
		* @protected
		* The text associated with this object.
		*/
		_text: String;
		/** @property {RadJav.Font} [_font=new RadJav.Font ()]
		* @protected
		* The font associated with this object.
		*/
		_font: Font;
		/** @property {String} [_cursor="default"]
		* @protected
		* The cursor to use.
		*/
		_cursor: String;
		/** @property {Mixed} [_parent=null]
		* @protected
		* The parent of this object.
		*/
		_parent: GObject;
		/** @property {RadJav.GUI.GObject[]} [_children=[]]
		* @protected
		* This object's children.
		*/
		_children: GObject[];
		/** @property {Mixed} [_html=null]
		* @protected
		* The native web object associated with this object.
		*/
		_html: any;
		/** @property {Mixed} [_appObj=null]
		* @protected
		* The native os gui object associated with this object.
		*/
		_appObj: any;
		/** @property {Object} [createOnPlatforms=null]
		* @protected
		* Create this object only on certain platforms. All platforms will be enabled 
		* by default, only the ones listed in each key will either be created or 
		* denied by their boolean value. Ex: { "WIN32": true, "HTML5": false }.
		* Possible keys are: 
		* WIN32
		* WIN64
		* LINUX32
		* LINUX64
		* MACOSX32
		* MACOSX64
		* HTML5
		*/
		createOnPlatforms: Object;
		/** @event [onBeforeChildCreated=null]
		* The function to execute before a child is created.
		*/
		onBeforeChildCreated: ((obj: Object) => void);
		/** @event [onCreated=null]
		* The function to execute once the object has been created.
		*/
		onCreated: ((obj: Object) => void);
		/** @event [_events={}]
		* Events to call.
		*/
		_events: ((...args: any[]) => any);

		constructor (obj?: Object, text?: String, parent?: GObject, beforeCreatedChild?: boolean);

		/** @method create
		* Using the existing parameters in this object, create it.
		* Theme Event: create
		* Is Theme Event Asynchronous: Yes
		* @return {Promise} The promise to execute when the creation is completed.
		*/
		create (): Promise<GObject>;

		/** @method setFont
		* Set this object's font.
		* Theme Event: setFont
		* Is Theme Event Asynchronous: No
		* @param {RadJav.Font} font The font to set.
		*/
		setFont (font: Font): void;

		/** @method getFont
		* Get this object's font.
		* Theme Event: getFont
		* Is Theme Event Asynchronous: No
		* @return {RadJav.Font} The font.
		*/
		getFont (): Font;

		/** @method setPosition
		* Set the position of this object.
		* Theme Event: None
		* Is Theme Event Asynchronous: No
		* @param {Number/RadJav.Vector2} x The new position, or the new x coordinate of the new position.
		* @param {Number} [y=null] The new y coordinate.
		*/
		setPosition (x: Number, y: Number): void;

		/** @method getPosition
		* Get the position of this object.
		* Theme Event: None
		* Is Theme Event Asynchronous: No
		* @return {RadJav.Vector2} The position of this object.
		*/
		getPosition (): Vector2;

		/** @method getX
		* Get the X position of this object.
		* Theme Event: None
		* Is Theme Event Asynchronous: No
		* @return {RadJav.Vector2} The position of this object.
		*/
		getX (): Number;

		/** @method getY
		* Get the Y position of this object.
		* Theme Event: None
		* Is Theme Event Asynchronous: No
		* @return {RadJav.Vector2} The position of this object.
		*/
		getY (): Number;

		/** @method setSize
		* Set the size of this object.
		* Theme Event: None
		* Is Theme Event Asynchronous: No
		* @param {Number/RadJav.Vector2} width The object's new size, or new width.
		* @param {Number} [height=null] The object's new height.
		*/
		setSize (width: Number, height: Number): void;

		/** @method getSize
		* Get the size of this object.
		* Theme Event: None
		* Is Theme Event Asynchronous: No
		* @return {RadJav.Vector2} The size of this object.
		*/
		getSize (): Vector2;

		/** @method getWidth
		* Get the width of this object.
		* Theme Event: None
		* Is Theme Event Asynchronous: No
		* @return {Number} The width of this object.
		*/
		getWidth (): Number;

		/** @method getHeight
		* Get the height of this object.
		* Theme Event: None
		* Is Theme Event Asynchronous: No
		* @return {Number} The height of this object.
		*/
		getHeight (): Number;

		/** @method setText
		* Set the object's text.
		* Theme Event: setText
		* Is Theme Event Asynchronous: Yes
		* @param {String} text The text to set.
		* @return {String} The text associated with this object.
		*/
		setText (text: String): void;

		/** @method getText
		* Get the object's text. 
		* Theme Event: getText
		* Is Theme Event Asynchronous: No
		* @return {String} The text associated with this object.
		*/
		getText (): String;

		/** @method getParent
		* Get the parent.
		* Theme Event: None
		* Is Theme Event Asynchronous: No
		* @return {RadJav.GUI.GObject} The parent of this object.
		*/
		getParent (): GObject;

		/** @method getHTML
		* Get the HTML from this object.
		* Theme Event: None
		* Is Theme Event Asynchronous: No
		* @return {Mixed} The HTML object associated with this object.
		*/
		getHTML (): any;

		/** @method setVisibility
		* Set the visibility of this object.
		* Theme Event: setVisibility
		* Is Theme Event Asynchronous: Yes
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
		* @param {Boolean} visible The visibility of the object
		*/
		setVisibility (visible: boolean): void

		/** @method getVisibility
		* Get the visibility of this object.
		* Theme Event: setVisibility
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject
		* @return {Boolean} The visibility of this object
		*/
		getVisibility (): boolean;

		/** @method show
		* Show this object.
		* Theme Event: setVisibility
		* Is Theme Event Asynchronous: Yes
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
		*/
		show (): void;

		/** @method hide
		* Show this object.
		* Theme Event: setVisibility
		* Is Theme Event Asynchronous: Yes
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
		*/
		hide (): void;

		/** @method setEnabled
		* Enable or disable this object.
		* Theme Event: setEnabled
		* Is Theme Event Asynchronous: Yes
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, Boolean
		*/
		setEnabled (enabled: boolean): void;

		/** @method getEnabled
		* Get whether or not this object is enabled.
		* Theme Event: getEnabled
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject
		* @return {Boolean} The enabled status of this object
		*/
		getEnabled (): boolean;

		/** @method on
		* Calls a function when an event is triggered.
		* Theme Event: on
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject, String, Function
		* @param {String} eventName The name of the event to trigger.
		* @param {Function} func The function to execute.
		* @return {Mixed} The result.
		*/
		on (eventName: String, func: ((...args: any[]) => any)): any;

		/** @method getHTMLDOM
		* Get the HTML dom object.
		* Theme Event: getHTMLDOM
		* Is Theme Event Asynchronous: No
		* Parameters Passed to Theme Event: RadJav.GUI.GObject
		* Available on platforms: HTML5
		* @return {Mixed} The html dom object.
		*/
		getHTMLDOM (): any;
	}
}

