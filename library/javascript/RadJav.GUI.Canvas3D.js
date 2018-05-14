var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RadJav;
(function (RadJav) {
    var GUI;
    (function (GUI) {
        var Canvas3D = (function (_super) {
            __extends(Canvas3D, _super);
            function Canvas3D(obj, text, parent) {
                var _this = this;
                if (obj == null) {
                    obj = {};
                }
                if (typeof obj == "string") {
                    var name = obj;
                    obj = { name: name };
                }
                if (obj.size == null) {
                    obj.size = new RadJav.Vector2();
                    obj.size.x = 500;
                    obj.size.y = 350;
                }
                _this = _super.call(this, obj, text, parent) || this;
                _this.type = "RadJav.GUI.Canvas3D";
                _this._renderer = RadJav.setDefaultValue(obj._renderer, null);
                _this._rendererType = RadJav.setDefaultValue(obj._renderer, 1);
                _this._currentCamera = RadJav.setDefaultValue(obj._currentCamera, null);
                _this._models = RadJav.setDefaultValue(obj._models, {});
                _this._materials = RadJav.setDefaultValue(obj._materials, {});
                return _this;
            }
            Canvas3D.prototype.create = function () {
                var promise = RadJav.Theme.event(this.type, "create", this).then(RadJav.keepContext(function (html) {
                    this._html = html;
                    if (this._rendererType ==
                        RadJav.GUI.Canvas3D.RendererTypes.AnyAvailable) {
                        try {
                            this._renderer = new THREE.WebGLRenderer({
                                canvas: this._html,
                                alpha: false
                            });
                        }
                        catch (ex) {
                            console.log(RadJav._lang.webglIsNotSupported);
                        }
                        if (this._renderer == null) {
                            this._renderer = new THREE.CanvasRenderer({
                                canvas: this._html,
                                alpha: false
                            });
                        }
                    }
                    else {
                        var rendererType = "WebGLRenderer";
                        if (this._rendererType == RadJav.GUI.Canvas3D.RendererTypes.WebGL) {
                            rendererType = "WebGLRenderer";
                        }
                        if (this._rendererType ==
                            RadJav.GUI.Canvas3D.RendererTypes.Context2D) {
                            rendererType = "CanvasRenderer";
                        }
                        this._renderer = new THREE[rendererType]({
                            canvas: this._html,
                            alpha: false
                        });
                    }
                    if (this._renderer == null) {
                        throw RadJav._lang.unableToCreateaRenderSystem;
                    }
                    this._renderer.setClearColor(RadJav.Color.Black.toHexInt());
                    this._setupDefaultSceneManager();
                    this.setAmbientLightColor(RadJav.Color.White);
                    this._renderer.setPixelRatio(window.devicePixelRatio);
                    this._renderer.setSize(this.getWidth(), this.getHeight());
                    if (this._html == null) {
                        this._html = document.body;
                        document.body.style.margin = "0px";
                        document.body.style.padding = "0px";
                    }
                    this._setupDefaultCamera().then(RadJav.keepContext(function () {
                        this.render();
                    }, this));
                    return this;
                }, this));
                return promise;
            };
            Canvas3D.prototype._setupDefaultCamera = function () {
                var camera = new RadJav.C3D.Camera(this, "camera");
                return camera.create().then(RadJav.keepContext(function (cam) {
                    this._currentCamera = cam;
                }, this));
            };
            Canvas3D.prototype._setupDefaultSceneManager = function () {
                this._sceneManager = new THREE.Scene();
            };
            Canvas3D.prototype.setAmbientLightColor = function (colour) {
                this._sceneManager.add(new THREE.AmbientLight(colour.toHexInt()));
            };
            Canvas3D.prototype.createEntity = function (name, parent, model) {
                var entity = new RadJav.C3D.Entity(this, name, parent, model);
                return entity.create();
            };
            Canvas3D.prototype.addModel = function (model) {
                this._models[model.getName()] = model;
            };
            Canvas3D.prototype.addMaterial = function (material) {
                this._materials[material.getName()] = material;
            };
            Canvas3D.prototype.getNumModels = function () {
                return Object.keys(this._models).length;
            };
            Canvas3D.prototype.getNumMaterials = function () {
                return Object.keys(this._materials).length;
            };
            Canvas3D.prototype.render = function () {
                requestAnimationFrame(RadJav.keepContext(this.render, this));
                this._renderer.render(this._sceneManager, this._currentCamera._obj3d);
            };
            Canvas3D.prototype.createWorld = function (colour) {
                this._sceneManager.add(new THREE.AmbientLight(colour.toHexInt()));
            };
            Canvas3D.prototype.setWorld = function (colour) {
                this._sceneManager.add(new THREE.AmbientLight(colour.toHexInt()));
            };
            return Canvas3D;
        }(RadJav.GUI.GObject));
        GUI.Canvas3D = Canvas3D;
        (function (Canvas3D) {
            var RendererTypes;
            (function (RendererTypes) {
                RendererTypes[RendererTypes["AnyAvailable"] = 1] = "AnyAvailable";
                RendererTypes[RendererTypes["WebGL"] = 2] = "WebGL";
                RendererTypes[RendererTypes["Context2D"] = 3] = "Context2D";
            })(RendererTypes = Canvas3D.RendererTypes || (Canvas3D.RendererTypes = {}));
        })(Canvas3D = GUI.Canvas3D || (GUI.Canvas3D = {}));
    })(GUI = RadJav.GUI || (RadJav.GUI = {}));
})(RadJav || (RadJav = {}));
