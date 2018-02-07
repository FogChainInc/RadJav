/*
	MIT-LICENSE
	Copyright (c) 2017 Higher Edge Software, LLC

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

/** @class RadJav.C3D.World
* @extends RadJav.C3D.Object3D
* A C3D World.
* Available on platforms: Windows,Linux,OSX,HTML5
*/
RadJav.C3D.World = function (obj)
{
	/** @property {Mixed} [_sceneManager=null]
	* @protected
	* The native os scene manager associated with this world.
	*/
	this._sceneManager = null;
	/** @property {Mixed} [_renderWindow=null]
	* @protected
	* The native os render window currently being used.
	*/
	this._renderWindow = null;

	/** @method createEntity
	* Create an entity in this world.
	* @param {String} name The name of the entity.
	* @param {Number} [type=1] The type of entity to create.
	* @return {RadJav.C3D.Entity} The created entity.
	*/
	/*this.createEntity = function (name, type)
	{
	}*/
}

