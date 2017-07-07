Ext.data.JsonP.RadJav_C3D_Object3D({"tagname":"class","name":"RadJav.C3D.Object3D","autodetected":{},"files":[{"filename":"RadJav.C3D.Object3D.js","href":null}],"members":[{"name":"_canvas3D","tagname":"property","owner":"RadJav.C3D.Object3D","id":"property-_canvas3D","meta":{"protected":true}},{"name":"_obj3d","tagname":"property","owner":"RadJav.C3D.Object3D","id":"property-_obj3d","meta":{"protected":true}},{"name":"_parent","tagname":"property","owner":"RadJav.C3D.Object3D","id":"property-_parent","meta":{"protected":true}},{"name":"_transform","tagname":"property","owner":"RadJav.C3D.Object3D","id":"property-_transform","meta":{"protected":true}},{"name":"_visible","tagname":"property","owner":"RadJav.C3D.Object3D","id":"property-_visible","meta":{"protected":true}},{"name":"name","tagname":"property","owner":"RadJav.C3D.Object3D","id":"property-name","meta":{}},{"name":"type","tagname":"property","owner":"RadJav.C3D.Object3D","id":"property-type","meta":{}},{"name":"create","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-create","meta":{}},{"name":"destroy","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-destroy","meta":{}},{"name":"getParent","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-getParent","meta":{}},{"name":"getPosition","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-getPosition","meta":{}},{"name":"getTransform","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-getTransform","meta":{}},{"name":"getVisibility","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-getVisibility","meta":{}},{"name":"hide","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-hide","meta":{}},{"name":"on","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-on","meta":{}},{"name":"setPosition","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-setPosition","meta":{}},{"name":"setVisibility","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-setVisibility","meta":{}},{"name":"show","tagname":"method","owner":"RadJav.C3D.Object3D","id":"method-show","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-RadJav.C3D.Object3D","short_doc":"The base 3D object. ...","classIcon":"icon-class","superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><div class='doc-contents'><p>The base 3D object.\nAvailable on platforms: Windows,Linux,OSX,HTML5</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_canvas3D' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-property-_canvas3D' class='name expandable'>_canvas3D</a> : <a href=\"#!/api/RadJav.GUI.Canvas3D\" rel=\"RadJav.GUI.Canvas3D\" class=\"docClass\">RadJav.GUI.Canvas3D</a><span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>The canvas 3d object used to display this object. ...</div><div class='long'><p>The canvas 3d object used to display this object.</p>\n<p>Defaults to: <code>canvas3d</code></p></div></div></div><div id='property-_obj3d' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-property-_obj3d' class='name expandable'>_obj3d</a> : Mixed<span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>The 3d object associated with this object. ...</div><div class='long'><p>The 3d object associated with this object.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-_parent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-property-_parent' class='name expandable'>_parent</a> : Mixed<span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>The parent of this object. ...</div><div class='long'><p>The parent of this object.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-_transform' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-property-_transform' class='name expandable'>_transform</a> : <a href=\"#!/api/RadJav.C3D.Transform\" rel=\"RadJav.C3D.Transform\" class=\"docClass\">RadJav.C3D.Transform</a><span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>This object's transform. ...</div><div class='long'><p>This object's transform.</p>\n<p>Defaults to: <code>new RadJav.C3D.Transform (this)</code></p></div></div></div><div id='property-_visible' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-property-_visible' class='name expandable'>_visible</a> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a><span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>The visibility of the object. ...</div><div class='long'><p>The visibility of the object.</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='property-name' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-property-name' class='name expandable'>name</a> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>The name of this object. ...</div><div class='long'><p>The name of this object.</p>\n<p>Defaults to: <code>&quot;&quot;</code></p></div></div></div><div id='property-type' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-property-type' class='name expandable'>type</a> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>The type of object. ...</div><div class='long'><p>The type of object.</p>\n<p>Defaults to: <code>&quot;&quot;</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-create' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-create' class='name expandable'>create</a>( <span class='pre'></span> ) : <a href=\"#!/api/Promise\" rel=\"Promise\" class=\"docClass\">Promise</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Using the existing parameters in this object, create it. ...</div><div class='long'><p>Using the existing parameters in this object, create it.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Promise\" rel=\"Promise\" class=\"docClass\">Promise</a></span><div class='sub-desc'><p>The promise to execute when the creation is completed.</p>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Destroy this object. ...</div><div class='long'><p>Destroy this object.</p>\n</div></div></div><div id='method-getParent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-getParent' class='name expandable'>getParent</a>( <span class='pre'></span> ) : <a href=\"#!/api/RadJav.C3D.Object3D\" rel=\"RadJav.C3D.Object3D\" class=\"docClass\">RadJav.C3D.Object3D</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get the parent. ...</div><div class='long'><p>Get the parent.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/RadJav.C3D.Object3D\" rel=\"RadJav.C3D.Object3D\" class=\"docClass\">RadJav.C3D.Object3D</a></span><div class='sub-desc'><p>The parent of this object.</p>\n</div></li></ul></div></div></div><div id='method-getPosition' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-getPosition' class='name expandable'>getPosition</a>( <span class='pre'></span> ) : <a href=\"#!/api/RadJav.Vector3\" rel=\"RadJav.Vector3\" class=\"docClass\">RadJav.Vector3</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get the position of this object. ...</div><div class='long'><p>Get the position of this object.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/RadJav.Vector3\" rel=\"RadJav.Vector3\" class=\"docClass\">RadJav.Vector3</a></span><div class='sub-desc'><p>The position.</p>\n</div></li></ul></div></div></div><div id='method-getTransform' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-getTransform' class='name expandable'>getTransform</a>( <span class='pre'></span> ) : <a href=\"#!/api/RadJav.C3D.Transform\" rel=\"RadJav.C3D.Transform\" class=\"docClass\">RadJav.C3D.Transform</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get the transform. ...</div><div class='long'><p>Get the transform.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/RadJav.C3D.Transform\" rel=\"RadJav.C3D.Transform\" class=\"docClass\">RadJav.C3D.Transform</a></span><div class='sub-desc'><p>The transform.</p>\n</div></li></ul></div></div></div><div id='method-getVisibility' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-getVisibility' class='name expandable'>getVisibility</a>( <span class='pre'></span> ) : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get the visibility of this object. ...</div><div class='long'><p>Get the visibility of this object.\nTheme Event: setVisibility\nIs Theme Event Asynchronous: No\nParameters Passed to Theme Event: <a href=\"#!/api/RadJav.GUI.GObject\" rel=\"RadJav.GUI.GObject\" class=\"docClass\">RadJav.GUI.GObject</a></p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span><div class='sub-desc'><p>The visibility of this object</p>\n</div></li></ul></div></div></div><div id='method-hide' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-hide' class='name expandable'>hide</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Show this object. ...</div><div class='long'><p>Show this object.\nTheme Event: setVisibility\nIs Theme Event Asynchronous: Yes\nParameters Passed to Theme Event: <a href=\"#!/api/RadJav.GUI.GObject\" rel=\"RadJav.GUI.GObject\" class=\"docClass\">RadJav.GUI.GObject</a>, Boolean</p>\n</div></div></div><div id='method-on' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-on' class='name expandable'>on</a>( <span class='pre'>eventName, func</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Calls a function when an event is triggered. ...</div><div class='long'><p>Calls a function when an event is triggered.\nTheme Event: on\nIs Theme Event Asynchronous: Yes\nParameters Passed to Theme Event: <a href=\"#!/api/RadJav.GUI.GObject\" rel=\"RadJav.GUI.GObject\" class=\"docClass\">RadJav.GUI.GObject</a>, String, Function</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventName</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The name of the event to trigger.</p>\n</div></li><li><span class='pre'>func</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>The function to execute.</p>\n</div></li></ul></div></div></div><div id='method-setPosition' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-setPosition' class='name expandable'>setPosition</a>( <span class='pre'>x, y, z</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Set the position of this object. ...</div><div class='long'><p>Set the position of this object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>x</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a>/<a href=\"#!/api/RadJav.Vector3\" rel=\"RadJav.Vector3\" class=\"docClass\">RadJav.Vector3</a><div class='sub-desc'><p>The x position or full vector3 position.</p>\n</div></li><li><span class='pre'>y</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>The y position.</p>\n</div></li><li><span class='pre'>z</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>The z position.</p>\n</div></li></ul></div></div></div><div id='method-setVisibility' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-setVisibility' class='name expandable'>setVisibility</a>( <span class='pre'>visible</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Set the visibility of this object. ...</div><div class='long'><p>Set the visibility of this object.\nTheme Event: setVisibility\nIs Theme Event Asynchronous: Yes\nParameters Passed to Theme Event: <a href=\"#!/api/RadJav.GUI.GObject\" rel=\"RadJav.GUI.GObject\" class=\"docClass\">RadJav.GUI.GObject</a>, Boolean</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>visible</span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a><div class='sub-desc'><p>The visibility of the object</p>\n</div></li></ul></div></div></div><div id='method-show' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Object3D'>RadJav.C3D.Object3D</span><br/></div><a href='#!/api/RadJav.C3D.Object3D-method-show' class='name expandable'>show</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Show this object. ...</div><div class='long'><p>Show this object.\nTheme Event: setVisibility\nIs Theme Event Asynchronous: Yes\nParameters Passed to Theme Event: <a href=\"#!/api/RadJav.GUI.GObject\" rel=\"RadJav.GUI.GObject\" class=\"docClass\">RadJav.GUI.GObject</a>, Boolean</p>\n</div></div></div></div></div></div></div>","meta":{}});