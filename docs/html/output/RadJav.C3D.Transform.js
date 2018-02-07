Ext.data.JsonP.RadJav_C3D_Transform({"tagname":"class","name":"RadJav.C3D.Transform","autodetected":{},"files":[{"filename":"RadJav.C3D.Transform.js","href":null}],"members":[{"name":"_movable","tagname":"property","owner":"RadJav.C3D.Transform","id":"property-_movable","meta":{"protected":true}},{"name":"_object3d","tagname":"property","owner":"RadJav.C3D.Transform","id":"property-_object3d","meta":{"protected":true}},{"name":"_parent","tagname":"property","owner":"RadJav.C3D.Transform","id":"property-_parent","meta":{"protected":true}},{"name":"_sceneNode","tagname":"property","owner":"RadJav.C3D.Transform","id":"property-_sceneNode","meta":{"protected":true}},{"name":"position","tagname":"property","owner":"RadJav.C3D.Transform","id":"property-position","meta":{"protected":true}},{"name":"addChild","tagname":"method","owner":"RadJav.C3D.Transform","id":"method-addChild","meta":{}},{"name":"getPosition","tagname":"method","owner":"RadJav.C3D.Transform","id":"method-getPosition","meta":{}},{"name":"setPosition","tagname":"method","owner":"RadJav.C3D.Transform","id":"method-setPosition","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-RadJav.C3D.Transform","short_doc":"A 3d tranform. ...","classIcon":"icon-class","superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><div class='doc-contents'><p>A 3d tranform.\nAvailable on platforms: Windows,Linux,OSX,HTML5</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_movable' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Transform'>RadJav.C3D.Transform</span><br/></div><a href='#!/api/RadJav.C3D.Transform-property-_movable' class='name expandable'>_movable</a> : Mixed<span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>The object that is being moved. ...</div><div class='long'><p>The object that is being moved.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-_object3d' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Transform'>RadJav.C3D.Transform</span><br/></div><a href='#!/api/RadJav.C3D.Transform-property-_object3d' class='name expandable'>_object3d</a> : <a href=\"#!/api/RadJav.C3D.Object3D\" rel=\"RadJav.C3D.Object3D\" class=\"docClass\">RadJav.C3D.Object3D</a><span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>The 3d object that is associated with this transform. ...</div><div class='long'><p>The 3d object that is associated with this transform.</p>\n<p>Defaults to: <code>object3d</code></p></div></div></div><div id='property-_parent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Transform'>RadJav.C3D.Transform</span><br/></div><a href='#!/api/RadJav.C3D.Transform-property-_parent' class='name expandable'>_parent</a> : <a href=\"#!/api/RadJav.C3D.Transform\" rel=\"RadJav.C3D.Transform\" class=\"docClass\">RadJav.C3D.Transform</a><span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>This object's parent transform. ...</div><div class='long'><p>This object's parent transform.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-_sceneNode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Transform'>RadJav.C3D.Transform</span><br/></div><a href='#!/api/RadJav.C3D.Transform-property-_sceneNode' class='name expandable'>_sceneNode</a> : Mixed<span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>This object's scene node. ...</div><div class='long'><p>This object's scene node.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-position' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Transform'>RadJav.C3D.Transform</span><br/></div><a href='#!/api/RadJav.C3D.Transform-property-position' class='name expandable'>position</a> : <a href=\"#!/api/RadJav.Vector3\" rel=\"RadJav.Vector3\" class=\"docClass\">RadJav.Vector3</a><span class=\"signature\"><span class='protected' >protected</span></span></div><div class='description'><div class='short'>The position of the object. ...</div><div class='long'><p>The position of the object.</p>\n<p>Defaults to: <code>new RadJav.Vector3 ()</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-addChild' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Transform'>RadJav.C3D.Transform</span><br/></div><a href='#!/api/RadJav.C3D.Transform-method-addChild' class='name expandable'>addChild</a>( <span class='pre'>child</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Add a child RadJav.C3D.Object3D to this transform. ...</div><div class='long'><p>Add a child <a href=\"#!/api/RadJav.C3D.Object3D\" rel=\"RadJav.C3D.Object3D\" class=\"docClass\">RadJav.C3D.Object3D</a> to this transform.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>child</span> : <a href=\"#!/api/RadJav.C3D.Object3D\" rel=\"RadJav.C3D.Object3D\" class=\"docClass\">RadJav.C3D.Object3D</a><div class='sub-desc'><p>The child to add.</p>\n</div></li></ul></div></div></div><div id='method-getPosition' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Transform'>RadJav.C3D.Transform</span><br/></div><a href='#!/api/RadJav.C3D.Transform-method-getPosition' class='name expandable'>getPosition</a>( <span class='pre'></span> ) : <a href=\"#!/api/RadJav.Vector3\" rel=\"RadJav.Vector3\" class=\"docClass\">RadJav.Vector3</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get the position of this object. ...</div><div class='long'><p>Get the position of this object.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/RadJav.Vector3\" rel=\"RadJav.Vector3\" class=\"docClass\">RadJav.Vector3</a></span><div class='sub-desc'><p>The position.</p>\n</div></li></ul></div></div></div><div id='method-setPosition' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='RadJav.C3D.Transform'>RadJav.C3D.Transform</span><br/></div><a href='#!/api/RadJav.C3D.Transform-method-setPosition' class='name expandable'>setPosition</a>( <span class='pre'>x, y, z</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Set the position of this object. ...</div><div class='long'><p>Set the position of this object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>x</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a>/<a href=\"#!/api/RadJav.Vector3\" rel=\"RadJav.Vector3\" class=\"docClass\">RadJav.Vector3</a><div class='sub-desc'><p>The x position or full vector3 position.</p>\n</div></li><li><span class='pre'>y</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>The y position.</p>\n</div></li><li><span class='pre'>z</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>The z position.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});