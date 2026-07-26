(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();/*!
 * ONNX Runtime Web v1.19.2
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Ai=Object.defineProperty,Uf=Object.getOwnPropertyDescriptor,Wf=Object.getOwnPropertyNames,Vf=Object.prototype.hasOwnProperty,Hf=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),P=(e,t)=>()=>(e&&(t=e(e=0)),t),pr=(e,t)=>{for(var r in t)Ai(e,r,{get:t[r],enumerable:!0})},qf=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Wf(t))!Vf.call(e,i)&&i!==r&&Ai(e,i,{get:()=>t[i],enumerable:!(a=Uf(t,i))||a.enumerable});return e},Vr=e=>qf(Ai({},"__esModule",{value:!0}),e),Gt,pt,Wt,Ts,Oi,Ri=P(()=>{Gt=new Map,pt=[],Wt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let a=Gt.get(e);if(a===void 0)Gt.set(e,{backend:t,priority:r});else{if(a.priority>r)return;if(a.priority===r&&a.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let i=pt.indexOf(e);i!==-1&&pt.splice(i,1);for(let n=0;n<pt.length;n++)if(Gt.get(pt[n]).priority<=r){pt.splice(n,0,e);return}pt.push(e)}return}throw new TypeError("not a valid backend")},Ts=async e=>{let t=Gt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(a){return r||(t.error=`${a}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Oi=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),a=r.length===0?pt:r,i,n=[],s=new Set;for(let d of a){let p=await Ts(d);typeof p=="string"?n.push({name:d,err:p}):(i||(i=p),i===p&&s.add(d))}if(!i)throw new Error(`no available backend found. ERR: ${n.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:p}of n)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${p}`);let l=t.filter(d=>s.has(typeof d=="string"?d:d.name));return[i,new Proxy(e,{get:(d,p)=>p==="executionProviders"?l:Reflect.get(d,p)})]}}),Lf=P(()=>{Ri()}),jl,Ff=P(()=>{jl="1.19.2"}),ka,Ue,Gl=P(()=>{Ff(),ka="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:jl},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ka=e}},get logLevel(){return ka}},Object.defineProperty(Ue,"logLevel",{enumerable:!0})}),he,jf=P(()=>{Gl(),he=Ue}),Kl,Yl,Gf=P(()=>{Kl=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let a=r.getContext("2d");if(a!=null){let i,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],n=e.dims[3]):(i=e.dims[3],n=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",l=t?.norm,d,p;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],0],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?p=[0,0,0,0]:typeof l.bias=="number"?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(p[3]=l.bias[3]));let h=n*i,u=0,f=h,w=h*2,g=-1;s==="RGBA"?(u=0,f=h,w=h*2,g=h*3):s==="RGB"?(u=0,f=h,w=h*2):s==="RBG"&&(u=0,w=h,f=h*2);for(let y=0;y<n;y++)for(let x=0;x<i;x++){let _=(e.data[u++]-p[0])*d[0],b=(e.data[f++]-p[1])*d[1],S=(e.data[w++]-p[2])*d[2],k=g===-1?255:(e.data[g++]-p[3])*d[3];a.fillStyle="rgba("+_+","+b+","+S+","+k+")",a.fillRect(x,y,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Yl=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(r!=null){let i,n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],n=e.dims[1],s=e.dims[3]):(i=e.dims[3],n=e.dims[2],s=e.dims[1]);let l=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,p,h;d===void 0||d.mean===void 0?p=[255,255,255,255]:typeof d.mean=="number"?p=[d.mean,d.mean,d.mean,d.mean]:(p=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(p[3]=d.mean[3])),d===void 0||d.bias===void 0?h=[0,0,0,0]:typeof d.bias=="number"?h=[d.bias,d.bias,d.bias,d.bias]:(h=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(h[3]=d.bias[3]));let u=n*i;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,w=0,g=1,y=2,x=3,_=0,b=u,S=u*2,k=-1;l==="RGBA"?(_=0,b=u,S=u*2,k=u*3):l==="RGB"?(_=0,b=u,S=u*2):l==="RBG"&&(_=0,S=u,b=u*2),a=r.createImageData(i,n);for(let I=0;I<n*i;w+=f,g+=f,y+=f,x+=f,I++)a.data[w]=(e.data[_++]-h[0])*p[0],a.data[g]=(e.data[b++]-h[1])*p[1],a.data[y]=(e.data[S++]-h[2])*p[2],a.data[x]=k===-1?255:(e.data[k++]-h[3])*p[3]}else throw new Error("Can not access image data");return a}}),Sr,Xl,Zl,Ql,Jl,Kf=P(()=>{Di(),Sr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:a}=t,i=t.norm??{mean:255,bias:0},n,s;typeof i.mean=="number"?n=[i.mean,i.mean,i.mean,i.mean]:n=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?s=[i.bias,i.bias,i.bias,i.bias]:s=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let l=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*a,h=d==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),u=4,f=0,w=1,g=2,y=3,x=0,_=p,b=p*2,S=-1;l==="RGB"&&(u=3,f=0,w=1,g=2,y=-1),d==="RGBA"?S=p*3:d==="RBG"?(x=0,b=p,_=p*2):d==="BGR"&&(b=0,_=p,x=p*2);for(let k=0;k<p;k++,f+=u,g+=u,w+=u,y+=u)h[x++]=(e[f]+s[0])/n[0],h[_++]=(e[w]+s[1])/n[1],h[b++]=(e[g]+s[2])/n[2],S!==-1&&y!==-1&&(h[S++]=(e[y]+s[3])/n[3]);return d==="RGBA"?new Ge("float32",h,[1,4,r,a]):new Ge("float32",h,[1,3,r,a])},Xl=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,a=typeof ImageData<"u"&&e instanceof ImageData,i=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,n=typeof e=="string",s,l=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=h=>h instanceof HTMLCanvasElement||h instanceof OffscreenCanvas?h.getContext("2d"):null;if(r){let h=d();h.width=e.width,h.height=e.height;let u=p(h);if(u!=null){let f=e.height,w=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(f=t.resizedHeight,w=t.resizedWidth),t!==void 0){if(l=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=f,l.width=w}else l.tensorFormat="RGBA",l.height=f,l.width=w;u.drawImage(e,0,0),s=u.getImageData(0,0,w,f).data}else throw new Error("Can not access image data")}else if(a){let h,u;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(h=t.resizedHeight,u=t.resizedWidth):(h=e.height,u=e.width),t!==void 0&&(l=t),l.format="RGBA",l.height=h,l.width=u,t!==void 0){let f=d();f.width=u,f.height=h;let w=p(f);if(w!=null)w.putImageData(e,0,0),s=w.getImageData(0,0,u,h).data;else throw new Error("Can not access image data")}else s=e.data}else if(i){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let h=d();h.width=e.width,h.height=e.height;let u=p(h);if(u!=null){let f=e.height,w=e.width;return u.drawImage(e,0,0,w,f),s=u.getImageData(0,0,w,f).data,l.height=f,l.width=w,Sr(s,l)}else throw new Error("Can not access image data")}else{if(n)return new Promise((h,u)=>{let f=d(),w=p(f);if(!e||!w)return u();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{f.width=g.width,f.height=g.height,w.drawImage(g,0,0,f.width,f.height);let y=w.getImageData(0,0,f.width,f.height);l.height=f.height,l.width=f.width,h(Sr(y.data,l))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Sr(s,l);throw new Error("Input data provided is not supported - aborted tensor creation")},Zl=(e,t)=>{let{width:r,height:a,download:i,dispose:n}=t,s=[1,a,r,4];return new Ge({location:"texture",type:"float32",texture:e,dims:s,download:i,dispose:n})},Ql=(e,t)=>{let{dataType:r,dims:a,download:i,dispose:n}=t;return new Ge({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:a,download:i,dispose:n})},Jl=(e,t,r)=>new Ge({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Tt,tr,Ia,ed,Yf=P(()=>{Tt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array]]),tr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ia=!1,ed=()=>{if(!Ia){Ia=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(Tt.set("int64",BigInt64Array),tr.set(BigInt64Array,"int64")),t&&(Tt.set("uint64",BigUint64Array),tr.set(BigUint64Array,"uint64")),r?(Tt.set("float16",Float16Array),tr.set(Float16Array,"float16")):Tt.set("float16",Uint16Array)}}}),td,rd,Xf=P(()=>{Di(),td=e=>{let t=1;for(let r=0;r<e.length;r++){let a=e[r];if(typeof a!="number"||!Number.isSafeInteger(a))throw new TypeError(`dims[${r}] must be an integer, got: ${a}`);if(a<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${a}`);t*=a}return t},rd=(e,t)=>{switch(e.location){case"cpu":return new Ge(e.type,e.data,t);case"cpu-pinned":return new Ge({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ge({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ge({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ge,Di=P(()=>{Gf(),Kf(),Yf(),Xf(),Ge=class{constructor(e,t,r){ed();let a,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,a=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=Tt.get(a);if(!s)throw new TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(a!=="float32")throw new TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint8"&&a!=="bool")throw new TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,l;if(typeof e=="string")if(a=e,l=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let d=Tt.get(e);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&d===Uint16Array)throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");e==="uint64"||e==="int64"?s=d.from(t,BigInt):s=d.from(t)}else if(t instanceof d)s=t;else throw new TypeError(`A ${a} tensor's data must be type of ${d}`)}else if(l=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof e[0];if(d==="string")a="string",s=e;else if(d==="boolean")a="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else{let d=tr.get(e.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);a=d,s=e}if(l===void 0)l=[s.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");i=l,this.cpuData=s,this.dataLocation="cpu"}let n=td(i);if(this.cpuData&&n!==this.cpuData.length)throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=i,this.size=n}static async fromImage(e,t){return Xl(e,t)}static fromTexture(e,t){return Zl(e,t)}static fromGpuBuffer(e,t){return Ql(e,t)}static fromPinnedBuffer(e,t,r){return Jl(e,t,r)}toDataURL(e){return Kl(this,e)}toImageData(e){return Yl(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return rd(this,e)}}}),ve,Bi=P(()=>{Di(),ve=Ge}),Hr,Ea,tt,Ke,ad=P(()=>{Gl(),Hr=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ea=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],a=!1;for(let i=0;i<r.length;i++){if(a&&!r[i].includes("TRACE_FUNC")){let n=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(n+=`::${t}`),Hr("CPU",n);return}r[i].includes("TRACE_FUNC")&&(a=!0)}},tt=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Ea("BEGIN",e)},Ke=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Ea("END",e)}}),id,Zf=P(()=>{Ri(),Bi(),ad(),id=class nd{constructor(t){this.handler=t}async run(t,r,a){tt();let i={},n={};if(typeof t!="object"||t===null||t instanceof ve||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof ve)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);i[p]=null}if(typeof a=="object"&&a!==null)n=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,h=Object.getOwnPropertyNames(r);for(let u of this.outputNames)if(h.indexOf(u)!==-1){let f=r[u];(f===null||f instanceof ve)&&(p=!0,s=!1,i[u]=f)}if(p){if(typeof a=="object"&&a!==null)n=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else n=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(s)for(let p of this.outputNames)i[p]=null;let l=await this.handler.run(t,i,n),d={};for(let p in l)if(Object.hasOwnProperty.call(l,p)){let h=l[p];h instanceof ve?d[p]=h:d[p]=new ve(h.type,h.data,h.dims)}return Ke(),d}async release(){return this.handler.dispose()}static async create(t,r,a,i){tt();let n,s={};if(typeof t=="string"){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let h=t,u=0,f=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(u=r,!Number.isSafeInteger(u))throw new RangeError("'byteOffset' must be an integer.");if(u<0||u>=h.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${h.byteLength}).`);if(f=t.byteLength-u,typeof a=="number"){if(f=a,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||u+f>h.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${h.byteLength-u}].`);if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof a<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(h,u,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,d]=await Oi(s),p=await l.createInferenceSessionHandler(n,d);return Ke(),new nd(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}}),Mi,Qf=P(()=>{Zf(),Mi=id}),Jf=P(()=>{}),em=P(()=>{}),tm=P(()=>{}),rm=P(()=>{}),zs,sd,am=P(()=>{Ri(),Bi(),zs="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",sd=class od{constructor(t,r,a){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=a}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let a=t.evalModel||"",i=t.optimizerModel||"",n=r||{},[s,l]=await Oi(n);if(s.createTrainingSessionHandler){let d=await s.createTrainingSessionHandler(t.checkpointState,t.trainModel,a,i,l);return new od(d,!!t.optimizerModel,!!t.evalModel)}else throw new Error(zs)}typeNarrowingForRunStep(t,r,a,i,n){let s={},l={};if(typeof a!="object"||a===null||a instanceof ve||Array.isArray(a))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let d=!0;if(typeof i=="object"){if(i===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(i instanceof ve)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(i)){if(i.length===0)throw new TypeError("'fetches' cannot be an empty array.");d=!1;for(let p of i){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);s[p]=null}if(typeof n=="object"&&n!==null)l=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,h=Object.getOwnPropertyNames(i);for(let u of r)if(h.indexOf(u)!==-1){let f=i[u];(f===null||f instanceof ve)&&(p=!0,d=!1,s[u]=f)}if(p){if(typeof n=="object"&&n!==null)l=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else l=i}}else if(typeof i<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of t)if(typeof a[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(d)for(let p of r)s[p]=null;return[s,l]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let a in t)if(Object.hasOwnProperty.call(t,a)){let i=t[a];i instanceof ve?r[a]=i:r[a]=new ve(i.type,i.data,i.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,a){let[i,n]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,a),s=await this.handler.runTrainStep(t,i,n);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,a){if(this.hasEvalModel){let[i,n]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,a),s=await this.handler.runEvalStep(t,i,n);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let a=await this.getParametersSize(r);if(t.length!==4*a)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}}),ud,im=P(()=>{am(),ud=sd}),nm={};pr(nm,{InferenceSession:()=>Mi,TRACE:()=>Hr,TRACE_FUNC_BEGIN:()=>tt,TRACE_FUNC_END:()=>Ke,Tensor:()=>ve,TrainingSession:()=>ud,env:()=>he,registerBackend:()=>Wt});var Ye=P(()=>{Lf(),jf(),Qf(),Bi(),Jf(),em(),ad(),tm(),rm(),im()}),Pi=P(()=>{}),ld={};pr(ld,{default:()=>dd});var Ca,Ta,dd,sm=P(()=>{Jc(),Lt(),Jr(),Ca="ort-wasm-proxy-worker",Ta=globalThis.self?.name===Ca,Ta&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Ni(r.wasm).then(()=>{en(r).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})})},a=>{postMessage({type:t,err:a})});break;case"init-ep":{let{epName:a,env:i}=r;tn(i,a).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})});break}case"copy-from":{let{buffer:a}=r,i=Yr(a);postMessage({type:t,out:i});break}case"create":{let{model:a,options:i}=r;rn(a,i).then(n=>{postMessage({type:t,out:n})},n=>{postMessage({type:t,err:n})});break}case"release":an(r),postMessage({type:t});break;case"run":{let{sessionId:a,inputIndices:i,inputs:n,outputIndices:s,options:l}=r;nn(a,i,n,s,new Array(s.length).fill(null),l).then(d=>{d.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},on([...n,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":sn(r),postMessage({type:t});break;default:}}catch(a){postMessage({type:t,err:a})}}),dd=Ta?null:e=>new Worker(e??Ut,{type:"module",name:Ca})}),pd={};pr(pd,{default:()=>cd});var za,Aa,cd,om=P(()=>{Aa=(za=import.meta.url,async function(e={}){function t(){return te.buffer!=ne.buffer&&Re(),ne}function r(){return te.buffer!=ne.buffer&&Re(),j}function a(){return te.buffer!=ne.buffer&&Re(),re}function i(){return te.buffer!=ne.buffer&&Re(),O}function n(){return te.buffer!=ne.buffer&&Re(),H}function s(){return te.buffer!=ne.buffer&&Re(),ae}function l(){return te.buffer!=ne.buffer&&Re(),we}function d(){return te.buffer!=ne.buffer&&Re(),Ve}var p,h,u=Object.assign({},e),f=new Promise((o,c)=>{p=o,h=c}),w=typeof window=="object",g=typeof importScripts=="function",y=g&&self.name=="em-pthread";u.mountExternalData=(o,c)=>{(u.Fb||(u.Fb=new Map)).set(o,c)},u.unmountExternalData=()=>{delete u.Fb};var x=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let _=()=>{let o=(m,$,v)=>(...E)=>{let z=Qe,D=$?.();E=m(...E);let N=$?.();return D!==N&&(m=N,v(D),$=v=null),Qe!=z?new Promise((W,X)=>{wa={resolve:W,reject:X}}):E},c=m=>async(...$)=>{try{if(u.Eb)throw Error("Session already started");let v=u.Eb={bc:$[0],errors:[]},E=await m(...$);if(u.Eb!==v)throw Error("Session mismatch");u.Mb?.flush();let z=v.errors;if(0<z.length){let D=await Promise.all(z);if(D=D.filter(N=>N),0<D.length)throw Error(D.join(`
`))}return E}finally{u.Eb=null}};u._OrtCreateSession=o(u._OrtCreateSession,()=>u._OrtCreateSession,m=>u._OrtCreateSession=m),u._OrtRun=c(o(u._OrtRun,()=>u._OrtRun,m=>u._OrtRun=m)),u._OrtRunWithBinding=c(o(u._OrtRunWithBinding,()=>u._OrtRunWithBinding,m=>u._OrtRunWithBinding=m)),u._OrtBindInput=o(u._OrtBindInput,()=>u._OrtBindInput,m=>u._OrtBindInput=m),_=void 0};u.jsepInit=(o,c)=>{if(_?.(),o==="webgpu"){[u.Mb,u.Tb,u.Xb,u.Nb,u.Wb,u.jb,u.Yb,u.$b,u.Ub,u.Vb,u.Zb]=c;let m=u.Mb;u.jsepRegisterBuffer=($,v,E,z)=>m.registerBuffer($,v,E,z),u.jsepGetBuffer=$=>m.getBuffer($),u.jsepCreateDownloader=($,v,E)=>m.createDownloader($,v,E),u.jsepOnReleaseSession=$=>{m.onReleaseSession($)},u.jsepOnRunStart=$=>m.onRunStart($)}};var b,S,k=Object.assign({},u),I="./this.program",A=(o,c)=>{throw c},C="";(w||g)&&(g?C=self.location.href:typeof document<"u"&&document.currentScript&&(C=document.currentScript.src),za&&(C=za),C=C.startsWith("blob:")?"":C.substr(0,C.replace(/[?#].*/,"").lastIndexOf("/")+1),g&&(S=o=>{var c=new XMLHttpRequest;return c.open("GET",o,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),b=(o,c,m)=>{var $=new XMLHttpRequest;$.open("GET",o,!0),$.responseType="arraybuffer",$.onload=()=>{$.status==200||$.status==0&&$.response?c($.response):m()},$.onerror=m,$.send(null)});var R,V=console.log.bind(console),U=console.error.bind(console),J=V,F=U;if(Object.assign(u,k),k=null,y){let o=function(c){try{var m=c.data,$=m.cmd;if($==="load"){let v=[];self.onmessage=E=>v.push(E),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let E of v)o(E);self.onmessage=o};for(let E of m.handlers)u[E]&&!u[E].proxy||(u[E]=(...z)=>{postMessage({Lb:"callHandler",kc:E,args:z})},E=="print"&&(J=u[E]),E=="printErr"&&(F=u[E]));te=m.wasmMemory,Re(),ie(m.wasmModule)}else if($==="run"){va(m.pthread_ptr,0,0,1,0,0),fa(m.pthread_ptr),xh(),bn(),ee||(ws(),ee=!0);try{Sh(m.start_routine,m.arg)}catch(v){if(v!="unwind")throw v}}else $==="cancel"?Pt()&&_r(-1):m.target!=="setimmediate"&&($==="checkMailbox"?ee&&hr():$&&(F(`worker: received unknown command ${$}`),F(m)))}catch(v){throw ys(),v}};var ie,ee=!1;F=function(...c){c=c.join(" "),console.error(c)},self.alert=function(...c){postMessage({Lb:"alert",text:c.join(" "),mc:Pt()})},u.instantiateWasm=(c,m)=>new Promise($=>{ie=v=>{v=new WebAssembly.Instance(v,mn()),m(v),$()}}),self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=o}u.wasmBinary&&(R=u.wasmBinary);var te,L,de,ne,j,re,O,H,ae,we,me,Be,Ve,ye=!1;function Re(){var o=te.buffer;u.HEAP8=ne=new Int8Array(o),u.HEAP16=re=new Int16Array(o),u.HEAPU8=j=new Uint8Array(o),u.HEAPU16=O=new Uint16Array(o),u.HEAP32=H=new Int32Array(o),u.HEAPU32=ae=new Uint32Array(o),u.HEAPF32=we=new Float32Array(o),u.HEAPF64=Ve=new Float64Array(o),u.HEAP64=me=new BigInt64Array(o),u.HEAPU64=Be=new BigUint64Array(o)}if(!y){if(!((te=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof x))throw F("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");Re()}var Te=[],Ee=[],nt=[],st=0,_t=null;function dn(){if(--st==0&&_t){var o=_t;_t=null,o()}}function Dt(o){throw F(o="Aborted("+o+")"),ye=!0,de=1,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),h(o),o}var ra,pn=o=>o.startsWith("data:application/octet-stream;base64,"),cn=o=>o.startsWith("file://");function hn(o){if(o==ra&&R)return new Uint8Array(R);if(S)return S(o);throw"both async and sync fetching of the wasm failed"}function fn(o,c,m){return function($){if(!R&&(w||g)){if(typeof fetch=="function"&&!cn($))return fetch($,{credentials:"same-origin"}).then(v=>{if(!v.ok)throw`failed to load wasm binary file at '${$}'`;return v.arrayBuffer()}).catch(()=>hn($));if(b)return new Promise((v,E)=>{b($,z=>v(new Uint8Array(z)),E)})}return Promise.resolve().then(()=>hn($))}(o).then($=>WebAssembly.instantiate($,c)).then(m,$=>{F(`failed to asynchronously prepare wasm: ${$}`),Dt($)})}function mn(){return{a:{M:_h,za:vh,b:Ih,$:Sn,z:En,pa:Cn,X:zn,Z:An,qa:On,na:Rn,ga:Dn,ma:Bn,J:Mn,Y:Pn,V:Nn,oa:Un,W:Wn,va:Eh,D:Ch,P:Th,O:Ah,C:Rh,s:Dh,p:Bh,E:Mh,y:qh,Q:Lh,ta:Fh,ja:jh,T:Gh,aa:Kh,F:Yh,ia:fa,sa:Xh,u:Zh,B:ef,o:tf,m:af,c:ca,n:nf,k:uf,Aa:lf,r:df,f:pf,v:cf,l:hf,g:ff,i:mf,j:gf,h:wf,e:yf,da:$f,ea:bf,fa:vf,ba:es,ca:ts,S:_f,d:xf,N:Sf,G:kf,K:If,w:Ef,ra:Cf,U:Tf,t:as,x:zf,L:Af,R:Of,ya:Rf,xa:Df,ka:ss,la:os,_:oa,A:us,I:ls,ha:ds,H:ps,a:te,wa:sa,ua:fs,q:Pf}}}var aa={849620:(o,c,m,$)=>{if(u===void 0||!u.Fb)return 1;if((o=ke(o>>>0)).startsWith("./")&&(o=o.substring(2)),!(o=u.Fb.get(o)))return 2;if($>>>=0,(c>>>=0)+(m>>>=0)>o.byteLength)return 3;try{return r().set(o.subarray(c,c+m),$>>>0),0}catch{return 4}},850121:()=>{u.Ub()},850152:()=>{u.Vb()},850181:()=>{u.Zb()},850206:o=>u.Tb(o),850239:o=>u.Xb(o),850271:(o,c,m)=>{u.Nb(o,c,m,!0)},850310:(o,c,m)=>{u.Nb(o,c,m)},850343:()=>typeof wasmOffsetConverter<"u",850400:o=>{u.jb("Abs",o,void 0)},850451:o=>{u.jb("Neg",o,void 0)},850502:o=>{u.jb("Floor",o,void 0)},850555:o=>{u.jb("Ceil",o,void 0)},850607:o=>{u.jb("Reciprocal",o,void 0)},850665:o=>{u.jb("Sqrt",o,void 0)},850717:o=>{u.jb("Exp",o,void 0)},850768:o=>{u.jb("Erf",o,void 0)},850819:o=>{u.jb("Sigmoid",o,void 0)},850874:(o,c,m)=>{u.jb("HardSigmoid",o,{alpha:c,beta:m})},850953:o=>{u.jb("Log",o,void 0)},851004:o=>{u.jb("Sin",o,void 0)},851055:o=>{u.jb("Cos",o,void 0)},851106:o=>{u.jb("Tan",o,void 0)},851157:o=>{u.jb("Asin",o,void 0)},851209:o=>{u.jb("Acos",o,void 0)},851261:o=>{u.jb("Atan",o,void 0)},851313:o=>{u.jb("Sinh",o,void 0)},851365:o=>{u.jb("Cosh",o,void 0)},851417:o=>{u.jb("Asinh",o,void 0)},851470:o=>{u.jb("Acosh",o,void 0)},851523:o=>{u.jb("Atanh",o,void 0)},851576:o=>{u.jb("Tanh",o,void 0)},851628:o=>{u.jb("Not",o,void 0)},851679:(o,c,m)=>{u.jb("Clip",o,{min:c,max:m})},851748:o=>{u.jb("Clip",o,void 0)},851800:(o,c)=>{u.jb("Elu",o,{alpha:c})},851858:o=>{u.jb("Relu",o,void 0)},851910:(o,c)=>{u.jb("LeakyRelu",o,{alpha:c})},851974:(o,c)=>{u.jb("ThresholdedRelu",o,{alpha:c})},852044:(o,c)=>{u.jb("Cast",o,{to:c})},852102:o=>{u.jb("Add",o,void 0)},852153:o=>{u.jb("Sub",o,void 0)},852204:o=>{u.jb("Mul",o,void 0)},852255:o=>{u.jb("Div",o,void 0)},852306:o=>{u.jb("Pow",o,void 0)},852357:o=>{u.jb("Equal",o,void 0)},852410:o=>{u.jb("Greater",o,void 0)},852465:o=>{u.jb("GreaterOrEqual",o,void 0)},852527:o=>{u.jb("Less",o,void 0)},852579:o=>{u.jb("LessOrEqual",o,void 0)},852638:(o,c,m,$,v)=>{u.jb("ReduceMean",o,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},852797:(o,c,m,$,v)=>{u.jb("ReduceMax",o,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},852955:(o,c,m,$,v)=>{u.jb("ReduceMin",o,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},853113:(o,c,m,$,v)=>{u.jb("ReduceProd",o,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},853272:(o,c,m,$,v)=>{u.jb("ReduceSum",o,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},853430:(o,c,m,$,v)=>{u.jb("ReduceL1",o,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},853587:(o,c,m,$,v)=>{u.jb("ReduceL2",o,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},853744:(o,c,m,$,v)=>{u.jb("ReduceLogSum",o,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},853905:(o,c,m,$,v)=>{u.jb("ReduceSumSquare",o,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},854069:(o,c,m,$,v)=>{u.jb("ReduceLogSumExp",o,{keepDims:!!c,noopWithEmptyAxes:!!m,axes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},854233:o=>{u.jb("Where",o,void 0)},854286:(o,c,m)=>{u.jb("Transpose",o,{perm:c?Array.from(n().subarray(c>>>0,m>>>0)):[]})},854394:(o,c,m,$)=>{u.jb("DepthToSpace",o,{blocksize:c,mode:ke(m),format:$?"NHWC":"NCHW"})},854527:(o,c,m,$)=>{u.jb("DepthToSpace",o,{blocksize:c,mode:ke(m),format:$?"NHWC":"NCHW"})},854660:(o,c,m,$,v,E,z,D,N,W,X,le,pe,T,Q)=>{u.jb("ConvTranspose",o,{format:N?"NHWC":"NCHW",autoPad:c,dilations:[m],group:$,kernelShape:[v],pads:[E,z],strides:[D],wIsConst:()=>!!t()[W>>>0],outputPadding:X?Array.from(n().subarray(X>>>0,le>>>0)):[],outputShape:pe?Array.from(n().subarray(pe>>>0,T>>>0)):[],activation:ke(Q)})},855061:(o,c,m,$,v,E,z,D,N,W,X,le,pe,T)=>{u.jb("ConvTranspose",o,{format:D?"NHWC":"NCHW",autoPad:c,dilations:Array.from(n().subarray(m>>>0,2+(m>>>0)>>>0)),group:$,kernelShape:Array.from(n().subarray(v>>>0,2+(v>>>0)>>>0)),pads:Array.from(n().subarray(E>>>0,4+(E>>>0)>>>0)),strides:Array.from(n().subarray(z>>>0,2+(z>>>0)>>>0)),wIsConst:()=>!!t()[N>>>0],outputPadding:W?Array.from(n().subarray(W>>>0,X>>>0)):[],outputShape:le?Array.from(n().subarray(le>>>0,pe>>>0)):[],activation:ke(T)})},855626:(o,c,m,$,v,E,z,D,N,W,X,le,pe,T,Q)=>{u.jb("ConvTranspose",o,{format:N?"NHWC":"NCHW",autoPad:c,dilations:[m],group:$,kernelShape:[v],pads:[E,z],strides:[D],wIsConst:()=>!!t()[W>>>0],outputPadding:X?Array.from(n().subarray(X>>>0,le>>>0)):[],outputShape:pe?Array.from(n().subarray(pe>>>0,T>>>0)):[],activation:ke(Q)})},856027:(o,c,m,$,v,E,z,D,N,W,X,le,pe,T)=>{u.jb("ConvTranspose",o,{format:D?"NHWC":"NCHW",autoPad:c,dilations:Array.from(n().subarray(m>>>0,2+(m>>>0)>>>0)),group:$,kernelShape:Array.from(n().subarray(v>>>0,2+(v>>>0)>>>0)),pads:Array.from(n().subarray(E>>>0,4+(E>>>0)>>>0)),strides:Array.from(n().subarray(z>>>0,2+(z>>>0)>>>0)),wIsConst:()=>!!t()[N>>>0],outputPadding:W?Array.from(n().subarray(W>>>0,X>>>0)):[],outputShape:le?Array.from(n().subarray(le>>>0,pe>>>0)):[],activation:ke(T)})},856592:(o,c)=>{u.jb("GlobalAveragePool",o,{format:c?"NHWC":"NCHW"})},856683:(o,c,m,$,v,E,z,D,N,W,X,le,pe,T,Q,ce)=>{u.jb("AveragePool",o,{format:ce?"NHWC":"NCHW",auto_pad:c,ceil_mode:m,count_include_pad:$,storage_order:v,dilations:[E,z],kernel_shape:[D,N],pads:[W,X,le,pe],strides:[T,Q]})},856967:(o,c)=>{u.jb("GlobalAveragePool",o,{format:c?"NHWC":"NCHW"})},857058:(o,c,m,$,v,E,z,D,N,W,X,le,pe,T,Q,ce)=>{u.jb("AveragePool",o,{format:ce?"NHWC":"NCHW",auto_pad:c,ceil_mode:m,count_include_pad:$,storage_order:v,dilations:[E,z],kernel_shape:[D,N],pads:[W,X,le,pe],strides:[T,Q]})},857342:(o,c)=>{u.jb("GlobalMaxPool",o,{format:c?"NHWC":"NCHW"})},857429:(o,c,m,$,v,E,z,D,N,W,X,le,pe,T,Q,ce)=>{u.jb("MaxPool",o,{format:ce?"NHWC":"NCHW",auto_pad:c,ceil_mode:m,count_include_pad:$,storage_order:v,dilations:[E,z],kernel_shape:[D,N],pads:[W,X,le,pe],strides:[T,Q]})},857709:(o,c)=>{u.jb("GlobalMaxPool",o,{format:c?"NHWC":"NCHW"})},857796:(o,c,m,$,v,E,z,D,N,W,X,le,pe,T,Q,ce)=>{u.jb("MaxPool",o,{format:ce?"NHWC":"NCHW",auto_pad:c,ceil_mode:m,count_include_pad:$,storage_order:v,dilations:[E,z],kernel_shape:[D,N],pads:[W,X,le,pe],strides:[T,Q]})},858076:(o,c,m,$,v)=>{u.jb("Gemm",o,{alpha:c,beta:m,transA:$,transB:v})},858180:o=>{u.jb("MatMul",o,void 0)},858234:(o,c,m,$)=>{u.jb("ArgMax",o,{keepDims:!!c,selectLastIndex:!!m,axis:$})},858342:(o,c,m,$)=>{u.jb("ArgMin",o,{keepDims:!!c,selectLastIndex:!!m,axis:$})},858450:(o,c)=>{u.jb("Softmax",o,{axis:c})},858513:(o,c)=>{u.jb("Concat",o,{axis:c})},858573:(o,c,m,$,v)=>{u.jb("Split",o,{axis:c,numOutputs:m,splitSizes:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},858713:o=>{u.jb("Expand",o,void 0)},858767:(o,c)=>{u.jb("Gather",o,{axis:Number(c)})},858838:(o,c)=>{u.jb("GatherElements",o,{axis:Number(c)})},858917:(o,c,m,$,v,E,z,D,N,W,X)=>{u.jb("Resize",o,{antialias:c,axes:m?Array.from(n().subarray(m>>>0,$>>>0)):[],coordinateTransformMode:ke(v),cubicCoeffA:E,excludeOutside:z,extrapolationValue:D,keepAspectRatioPolicy:ke(N),mode:ke(W),nearestMode:ke(X)})},859263:(o,c,m,$,v,E,z)=>{u.jb("Slice",o,{starts:c?Array.from(n().subarray(c>>>0,m>>>0)):[],ends:$?Array.from(n().subarray($>>>0,v>>>0)):[],axes:E?Array.from(n().subarray(E>>>0,z>>>0)):[]})},859479:o=>{u.jb("Tile",o,void 0)},859531:(o,c,m)=>{u.jb("InstanceNormalization",o,{epsilon:c,format:m?"NHWC":"NCHW"})},859645:(o,c,m)=>{u.jb("InstanceNormalization",o,{epsilon:c,format:m?"NHWC":"NCHW"})},859759:o=>{u.jb("Range",o,void 0)},859812:(o,c)=>{u.jb("Einsum",o,{equation:ke(c)})},859893:(o,c,m,$,v)=>{u.jb("Pad",o,{mode:c,value:m,pads:$?Array.from(n().subarray($>>>0,v>>>0)):[]})},860020:(o,c,m,$,v,E)=>{u.jb("BatchNormalization",o,{epsilon:c,momentum:m,spatial:!!v,trainingMode:!!$,format:E?"NHWC":"NCHW"})},860189:(o,c,m,$,v,E)=>{u.jb("BatchNormalization",o,{epsilon:c,momentum:m,spatial:!!v,trainingMode:!!$,format:E?"NHWC":"NCHW"})},860358:(o,c,m)=>{u.jb("CumSum",o,{exclusive:Number(c),reverse:Number(m)})},860455:(o,c,m,$,v,E,z,D,N)=>{u.jb("Attention",o,{numHeads:c,isUnidirectional:m,maskFilterValue:$,scale:v,doRotary:E,qkvHiddenSizes:z?Array.from(n().subarray(Number(D)>>>0,Number(D)+z>>>0)):[],pastPresentShareBuffer:!!N})},860727:o=>{u.jb("BiasAdd",o,void 0)},860782:o=>{u.jb("BiasSplitGelu",o,void 0)},860843:o=>{u.jb("FastGelu",o,void 0)},860899:(o,c,m,$,v,E,z,D,N,W,X,le,pe,T,Q,ce)=>{u.jb("Conv",o,{format:le?"NHWC":"NCHW",auto_pad:c,dilations:m?Array.from(n().subarray(m>>>0,$>>>0)):[],group:v,kernel_shape:E?Array.from(n().subarray(E>>>0,z>>>0)):[],pads:D?Array.from(n().subarray(D>>>0,N>>>0)):[],strides:W?Array.from(n().subarray(W>>>0,X>>>0)):[],w_is_const:()=>!!t()[pe>>>0],activation:ke(T),activation_params:Q?Array.from(l().subarray(Q>>>0,ce>>>0)):[]})},861395:o=>{u.jb("Gelu",o,void 0)},861447:(o,c,m,$)=>{u.jb("GroupQueryAttention",o,{numHeads:c,kvNumHeads:m,scale:$})},861560:(o,c,m,$)=>{u.jb("LayerNormalization",o,{axis:c,epsilon:m,simplified:!!$})},861671:(o,c,m,$)=>{u.jb("LayerNormalization",o,{axis:c,epsilon:m,simplified:!!$})},861782:(o,c,m,$,v,E)=>{u.jb("MatMulNBits",o,{k:c,n:m,accuracyLevel:$,bits:v,blockSize:E})},861909:(o,c,m,$,v,E)=>{u.jb("MultiHeadAttention",o,{numHeads:c,isUnidirectional:m,maskFilterValue:$,scale:v,doRotary:E})},862068:(o,c)=>{u.jb("QuickGelu",o,{alpha:c})},862132:(o,c,m,$,v)=>{u.jb("RotaryEmbedding",o,{interleaved:!!c,numHeads:m,rotaryEmbeddingDim:$,scale:v})},862271:(o,c,m)=>{u.jb("SkipLayerNormalization",o,{epsilon:c,simplified:!!m})},862373:o=>{u.Yb(o)},862407:(o,c)=>u.$b(o,c,u.Eb.bc,u.Eb.errors),862519:(o,c,m)=>{u.jb("SkipLayerNormalization",o,{epsilon:c,simplified:!!m})}};function vh(o,c,m){return Yn(async()=>{await u.Wb(o,c,m)})}function _h(){return typeof wasmOffsetConverter<"u"}function ia(o){this.name="ExitStatus",this.message=`Program terminated with exit(${o})`,this.status=o}var na=o=>{o.terminate(),o.onmessage=()=>{}},gn=o=>{ot.length==0&&(_n(),vn(ot[0]));var c=ot.pop();if(!c)return 6;St.push(c),Xe[o.Ab]=c,c.Ab=o.Ab;var m={cmd:"run",start_routine:o.cc,arg:o.Pb,pthread_ptr:o.Ab};return c.postMessage(m,o.ic),0},xt=0,ge=(o,c,...m)=>{for(var $=2*m.length,v=Sa(),E=xa(8*$),z=E>>>3,D=0;D<m.length;D++){var N=m[D];typeof N=="bigint"?(me[z+2*D]=1n,me[z+2*D+1]=N):(me[z+2*D]=0n,d()[z+2*D+1>>>0]=N)}return o=$s(o,0,$,E,c),xr(v),o};function sa(o){if(y)return ge(0,1,o);if(de=o,!(0<xt)){for(var c of St)na(c);for(c of ot)na(c);ot=[],St=[],Xe=[],ye=!0}A(o,new ia(o))}function wn(o){if(y)return ge(1,0,o);oa(o)}var oa=o=>{if(de=o,y)throw wn(o),"unwind";sa(o)},ot=[],St=[],yn=[],Xe={},$n=o=>{var c=o.Ab;delete Xe[c],ot.push(o),St.splice(St.indexOf(o),1),o.Ab=0,_a(c)};function bn(){yn.forEach(o=>o())}var vn=o=>new Promise(c=>{o.onmessage=v=>{var E=(v=v.data).cmd;if(v.targetThread&&v.targetThread!=Pt()){var z=Xe[v.targetThread];z?z.postMessage(v,v.transferList):F(`Internal error! Worker sent a message "${E}" to target pthread ${v.targetThread}, but that thread no longer exists!`)}else E==="checkMailbox"?hr():E==="spawnThread"?gn(v):E==="cleanupThread"?$n(Xe[v.thread]):E==="killThread"?(v=v.thread,E=Xe[v],delete Xe[v],na(E),_a(v),St.splice(St.indexOf(E),1),E.Ab=0):E==="cancelThread"?Xe[v.thread].postMessage({cmd:"cancel"}):E==="loaded"?(o.loaded=!0,c(o)):E==="alert"?alert(`Thread ${v.threadId}: ${v.text}`):v.target==="setimmediate"?o.postMessage(v):E==="callHandler"?u[v.handler](...v.args):E&&F(`worker sent an unknown command ${E}`)},o.onerror=v=>{throw F(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var m,$=[];for(m of[])u.hasOwnProperty(m)&&$.push(m);o.postMessage({cmd:"load",handlers:$,wasmMemory:te,wasmModule:L})});function _n(){var o=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ot.push(o)}var cr=o=>{for(;0<o.length;)o.shift()(u)},xh=()=>{var o=Pt(),c=s()[o+52>>>2>>>0];o=s()[o+56>>>2>>>0],vs(c,c-o),xr(c)},Sh=(o,c)=>{xt=0,o=_s(o,c),0<xt?de=o:_r(o)};class kh{constructor(c){this.Ib=c-24}}function Ih(o,c,m){var $=new kh(o>>>=0);throw c>>>=0,m>>>=0,s()[$.Ib+16>>>2>>>0]=0,s()[$.Ib+4>>>2>>>0]=c,s()[$.Ib+8>>>2>>>0]=m,o}function xn(o,c,m,$){return y?ge(2,1,o,c,m,$):Sn(o,c,m,$)}function Sn(o,c,m,$){if(o>>>=0,c>>>=0,m>>>=0,$>>>=0,x===void 0)return F("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var v=[];return y&&v.length===0?xn(o,c,m,$):(o={cc:m,Ab:o,Pb:$,ic:v},y?(o.Lb="spawnThread",postMessage(o,v),0):gn(o))}var kn=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,In=(o,c,m)=>{var $=(c>>>=0)+m;for(m=c;o[m]&&!(m>=$);)++m;if(16<m-c&&o.buffer&&kn)return kn.decode(o.buffer instanceof x?o.slice(c,m):o.subarray(c,m));for($="";c<m;){var v=o[c++];if(128&v){var E=63&o[c++];if((224&v)==192)$+=String.fromCharCode((31&v)<<6|E);else{var z=63&o[c++];65536>(v=(240&v)==224?(15&v)<<12|E<<6|z:(7&v)<<18|E<<12|z<<6|63&o[c++])?$+=String.fromCharCode(v):(v-=65536,$+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else $+=String.fromCharCode(v)}return $},ke=(o,c)=>(o>>>=0)?In(r(),o,c):"";function En(o,c,m){return y?ge(3,1,o,c,m):0}function Cn(o,c){if(y)return ge(4,1,o,c)}var ua=o=>{for(var c=0,m=0;m<o.length;++m){var $=o.charCodeAt(m);127>=$?c++:2047>=$?c+=2:55296<=$&&57343>=$?(c+=4,++m):c+=3}return c},Tn=(o,c,m,$)=>{if(!(0<$))return 0;var v=m>>>=0;$=m+$-1;for(var E=0;E<o.length;++E){var z=o.charCodeAt(E);if(55296<=z&&57343>=z&&(z=65536+((1023&z)<<10)|1023&o.charCodeAt(++E)),127>=z){if(m>=$)break;c[m++>>>0]=z}else{if(2047>=z){if(m+1>=$)break;c[m++>>>0]=192|z>>6}else{if(65535>=z){if(m+2>=$)break;c[m++>>>0]=224|z>>12}else{if(m+3>=$)break;c[m++>>>0]=240|z>>18,c[m++>>>0]=128|z>>12&63}c[m++>>>0]=128|z>>6&63}c[m++>>>0]=128|63&z}}return c[m>>>0]=0,m-v},Bt=(o,c,m)=>Tn(o,r(),c,m);function zn(o,c){if(y)return ge(5,1,o,c)}function An(o,c,m){if(y)return ge(6,1,o,c,m)}function On(o,c,m){return y?ge(7,1,o,c,m):0}function Rn(o,c){if(y)return ge(8,1,o,c)}function Dn(o,c,m){if(y)return ge(9,1,o,c,m)}function Bn(o,c,m,$){if(y)return ge(10,1,o,c,m,$)}function Mn(o,c,m,$){if(y)return ge(11,1,o,c,m,$)}function Pn(o,c,m,$){if(y)return ge(12,1,o,c,m,$)}function Nn(o){if(y)return ge(13,1,o)}function Un(o,c){if(y)return ge(14,1,o,c)}function Wn(o,c,m){if(y)return ge(15,1,o,c,m)}var Vn,ut,Eh=()=>{Dt("")},Ze=o=>{for(var c="";r()[o>>>0];)c+=Vn[r()[o++>>>0]];return c},la={},da={};function rt(o,c,m={}){if(!("argPackAdvance"in c))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function($,v,E={}){var z=v.name;if(!$)throw new ut(`type "${z}" must have a positive integer typeid pointer`);if(da.hasOwnProperty($)){if(E.Rb)return;throw new ut(`Cannot register type '${z}' twice`)}da[$]=v,la.hasOwnProperty($)&&(v=la[$],delete la[$],v.forEach(D=>D()))}(o,c,m)}var Hn=(o,c,m)=>{switch(c){case 1:return m?$=>t()[$>>>0]:$=>r()[$>>>0];case 2:return m?$=>a()[$>>>1>>>0]:$=>i()[$>>>1>>>0];case 4:return m?$=>n()[$>>>2>>>0]:$=>s()[$>>>2>>>0];case 8:return m?$=>me[$>>>3]:$=>Be[$>>>3];default:throw new TypeError(`invalid integer width (${c}): ${o}`)}};function Ch(o,c,m){m>>>=0,rt(o>>>=0,{name:c=Ze(c>>>0),fromWireType:$=>$,toWireType:function($,v){if(typeof v!="bigint"&&typeof v!="number")throw v=v===null?"null":($=typeof v)=="object"||$==="array"||$==="function"?v.toString():""+v,new TypeError(`Cannot convert "${v}" to ${this.name}`);return typeof v=="number"&&(v=BigInt(v)),v},argPackAdvance:lt,readValueFromPointer:Hn(c,m,c.indexOf("u")==-1),Db:null})}var lt=8;function Th(o,c,m,$){rt(o>>>=0,{name:c=Ze(c>>>0),fromWireType:function(v){return!!v},toWireType:function(v,E){return E?m:$},argPackAdvance:lt,readValueFromPointer:function(v){return this.fromWireType(r()[v>>>0])},Db:null})}var pa=[],at=[];function ca(o){9<(o>>>=0)&&--at[o+1]==0&&(at[o]=void 0,pa.push(o))}var Me=o=>{if(!o)throw new ut("Cannot use deleted val. handle = "+o);return at[o]},Pe=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=pa.pop()||at.length;return at[c]=o,at[c+1]=1,c}};function ha(o){return this.fromWireType(s()[o>>>2>>>0])}var zh={name:"emscripten::val",fromWireType:o=>{var c=Me(o);return ca(o),c},toWireType:(o,c)=>Pe(c),argPackAdvance:lt,readValueFromPointer:ha,Db:null};function Ah(o){return rt(o>>>0,zh)}var Oh=(o,c)=>{switch(c){case 4:return function(m){return this.fromWireType(l()[m>>>2>>>0])};case 8:return function(m){return this.fromWireType(d()[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${o}`)}};function Rh(o,c,m){m>>>=0,rt(o>>>=0,{name:c=Ze(c>>>0),fromWireType:$=>$,toWireType:($,v)=>v,argPackAdvance:lt,readValueFromPointer:Oh(c,m),Db:null})}function Dh(o,c,m,$,v){if(o>>>=0,m>>>=0,c=Ze(c>>>0),v===-1&&(v=4294967295),v=D=>D,$===0){var E=32-8*m;v=D=>D<<E>>>E}var z=c.includes("unsigned")?function(D,N){return N>>>0}:function(D,N){return N};rt(o,{name:c,fromWireType:v,toWireType:z,argPackAdvance:lt,readValueFromPointer:Hn(c,m,$!==0),Db:null})}function Bh(o,c,m){function $(E){var z=s()[E>>>2>>>0];return E=s()[E+4>>>2>>>0],new v(t().buffer,E,z)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];rt(o>>>=0,{name:m=Ze(m>>>0),fromWireType:$,argPackAdvance:lt,readValueFromPointer:$},{Rb:!0})}function Mh(o,c){o>>>=0;var m=(c=Ze(c>>>0))==="std::string";rt(o,{name:c,fromWireType:function($){var v=s()[$>>>2>>>0],E=$+4;if(m)for(var z=E,D=0;D<=v;++D){var N=E+D;if(D==v||r()[N>>>0]==0){if(z=ke(z,N-z),W===void 0)var W=z;else W+="\0",W+=z;z=N+1}}else{for(W=Array(v),D=0;D<v;++D)W[D]=String.fromCharCode(r()[E+D>>>0]);W=W.join("")}return Je($),W},toWireType:function($,v){v instanceof ArrayBuffer&&(v=new Uint8Array(v));var E=typeof v=="string";if(!(E||v instanceof Uint8Array||v instanceof Uint8ClampedArray||v instanceof Int8Array))throw new ut("Cannot pass non-string to std::string");var z=m&&E?ua(v):v.length,D=vr(4+z+1),N=D+4;if(s()[D>>>2>>>0]=z,m&&E)Bt(v,N,z+1);else if(E)for(E=0;E<z;++E){var W=v.charCodeAt(E);if(255<W)throw Je(N),new ut("String has UTF-16 code units that do not fit in 8 bits");r()[N+E>>>0]=W}else for(E=0;E<z;++E)r()[N+E>>>0]=v[E];return $!==null&&$.push(Je,D),D},argPackAdvance:lt,readValueFromPointer:ha,Db($){Je($)}})}var qn=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Ph=(o,c)=>{for(var m=o>>1,$=m+c/2;!(m>=$)&&i()[m>>>0];)++m;if(32<(m<<=1)-o&&qn)return qn.decode(r().slice(o,m));for(m="",$=0;!($>=c/2);++$){var v=a()[o+2*$>>>1>>>0];if(v==0)break;m+=String.fromCharCode(v)}return m},Nh=(o,c,m)=>{if(m??=2147483647,2>m)return 0;var $=c;m=(m-=2)<2*o.length?m/2:o.length;for(var v=0;v<m;++v){var E=o.charCodeAt(v);a()[c>>>1>>>0]=E,c+=2}return a()[c>>>1>>>0]=0,c-$},Uh=o=>2*o.length,Wh=(o,c)=>{for(var m=0,$="";!(m>=c/4);){var v=n()[o+4*m>>>2>>>0];if(v==0)break;++m,65536<=v?(v-=65536,$+=String.fromCharCode(55296|v>>10,56320|1023&v)):$+=String.fromCharCode(v)}return $},Vh=(o,c,m)=>{if(c>>>=0,m??=2147483647,4>m)return 0;var $=c;m=$+m-4;for(var v=0;v<o.length;++v){var E=o.charCodeAt(v);if(55296<=E&&57343>=E&&(E=65536+((1023&E)<<10)|1023&o.charCodeAt(++v)),n()[c>>>2>>>0]=E,(c+=4)+4>m)break}return n()[c>>>2>>>0]=0,c-$},Hh=o=>{for(var c=0,m=0;m<o.length;++m){var $=o.charCodeAt(m);55296<=$&&57343>=$&&++m,c+=4}return c};function qh(o,c,m){if(o>>>=0,c>>>=0,m=Ze(m>>>=0),c===2)var $=Ph,v=Nh,E=Uh,z=D=>i()[D>>>1>>>0];else c===4&&($=Wh,v=Vh,E=Hh,z=D=>s()[D>>>2>>>0]);rt(o,{name:m,fromWireType:D=>{for(var N,W=s()[D>>>2>>>0],X=D+4,le=0;le<=W;++le){var pe=D+4+le*c;le!=W&&z(pe)!=0||(X=$(X,pe-X),N===void 0?N=X:(N+="\0",N+=X),X=pe+c)}return Je(D),N},toWireType:(D,N)=>{if(typeof N!="string")throw new ut(`Cannot pass non-string to C++ string type ${m}`);var W=E(N),X=vr(4+W+c);return s()[X>>>2>>>0]=W/c,v(N,X+4,W+c),D!==null&&D.push(Je,X),X},argPackAdvance:lt,readValueFromPointer:ha,Db(D){Je(D)}})}function Lh(o,c){rt(o>>>=0,{Sb:!0,name:c=Ze(c>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var Fh=()=>1;function jh(o){va(o>>>0,!g,1,!w,131072,!1),bn()}var Ln=o=>{if(!ye)try{if(o(),!(0<xt))try{y?_r(de):oa(de)}catch(c){c instanceof ia||c=="unwind"||A(1,c)}}catch(c){c instanceof ia||c=="unwind"||A(1,c)}};function fa(o){o>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(n(),o>>>2,o).value.then(hr),o+=128,Atomics.store(n(),o>>>2,1))}var hr=()=>{var o=Pt();o&&(fa(o),Ln(bs))};function Gh(o,c){(o>>>=0)==c>>>0?setTimeout(hr):y?postMessage({targetThread:o,cmd:"checkMailbox"}):(o=Xe[o])&&o.postMessage({cmd:"checkMailbox"})}var ma=[];function Kh(o,c,m,$,v){for(c>>>=0,$/=2,ma.length=$,m=v>>>0>>>3,v=0;v<$;v++)ma[v]=me[m+2*v]?me[m+2*v+1]:d()[m+2*v+1>>>0];return(c?aa[c]:Nf[o])(...ma)}function Yh(o){o>>>=0,y?postMessage({cmd:"cleanupThread",thread:o}):$n(Xe[o])}function Xh(o){}var ga=(o,c)=>{var m=da[o];if(m===void 0)throw o=gs(o),m=Ze(o),Je(o),new ut(`${c} has unknown type ${m}`);return m},Fn=(o,c,m)=>{var $=[];return o=o.toWireType($,m),$.length&&(s()[c>>>2>>>0]=Pe($)),o};function Zh(o,c,m){return c>>>=0,m>>>=0,o=Me(o>>>0),c=ga(c,"emval::as"),Fn(c,m,o)}var fr=o=>{try{o()}catch(c){Dt(c)}},dt=0,Qe=null,jn=0,mr=[],Gn={},Kn={},Qh=0,wa=null,Jh=[];function Yn(o){return function(c){if(!ye){if(dt===0){var m=!1,$=!1;c((v=0)=>{if(!ye&&(jn=v,m=!0,$)){dt=2,fr(()=>ks(Qe)),typeof Browser<"u"&&Browser.Jb.Qb&&Browser.Jb.resume(),v=!1;try{var E=function(){var N=n()[Qe+8>>>2>>>0];return N=K[Kn[N]],--xt,N()}()}catch(N){E=N,v=!0}var z=!1;if(!Qe){var D=wa;D&&(wa=null,(v?D.reject:D.resolve)(E),z=!0)}if(v&&!z)throw E}}),$=!0,m||(dt=1,Qe=function(){var v=vr(65548),E=v+12;s()[v>>>2>>>0]=E,s()[v+4>>>2>>>0]=E+65536,E=mr[0];var z=Gn[E];return z===void 0&&(z=Qh++,Gn[E]=z,Kn[z]=E),E=z,n()[v+8>>>2>>>0]=E,v}(),typeof Browser<"u"&&Browser.Jb.Qb&&Browser.Jb.pause(),fr(()=>xs(Qe)))}else dt===2?(dt=0,fr(Is),Je(Qe),Qe=null,Jh.forEach(Ln)):Dt(`invalid state: ${dt}`);return jn}}(c=>{o().then(c)})}function ef(o){return o>>>=0,Yn(()=>(o=Me(o)).then(Pe))}var gr=[];function tf(o,c,m,$){return m>>>=0,$>>>=0,(o=gr[o>>>0])(null,c=Me(c>>>0),m,$)}var rf={},wr=o=>{var c=rf[o];return c===void 0?Ze(o):c};function af(o,c,m,$,v){return m>>>=0,$>>>=0,v>>>=0,(o=gr[o>>>0])(c=Me(c>>>0),c[m=wr(m)],$,v)}var Xn=()=>typeof globalThis=="object"?globalThis:Function("return this")();function nf(o){return(o>>>=0)==0?Pe(Xn()):(o=wr(o),Pe(Xn()[o]))}var sf=o=>{var c=gr.length;return gr.push(o),c},of=(o,c)=>{for(var m=Array(o),$=0;$<o;++$)m[$]=ga(s()[c+4*$>>>2>>>0],"parameter "+$);return m},Zn=(o,c)=>Object.defineProperty(c,"name",{value:o});function uf(o,c,m){var $=(c=of(o,c>>>0)).shift();o--;var v=`return function (obj, func, destructorsRef, args) {
`,E=0,z=[];m===0&&z.push("obj");for(var D=["retType"],N=[$],W=0;W<o;++W)z.push("arg"+W),D.push("argType"+W),N.push(c[W]),v+=`  var arg${W} = argType${W}.readValueFromPointer(args${E?"+"+E:""});
`,E+=c[W].argPackAdvance;return v+=`  var rv = ${m===1?"new func":"func.call"}(${z.join(", ")});
`,$.Sb||(D.push("emval_returnValue"),N.push(Fn),v+=`  return emval_returnValue(retType, destructorsRef, rv);
`),D.push(v+`};
`),o=function(X){var le=Function;if(!(le instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof le} which is not a function`);var pe=Zn(le.name||"unknownFunctionName",function(){});return pe.prototype=le.prototype,pe=new pe,(X=le.apply(pe,X))instanceof Object?X:pe}(D)(...N),m=`methodCaller<(${c.map(X=>X.name).join(", ")}) => ${$.name}>`,sf(Zn(m,o))}function lf(o){return o=wr(o>>>0),Pe(u[o])}function df(o,c){return c>>>=0,o=Me(o>>>0),c=Me(c),Pe(o[c])}function pf(o){9<(o>>>=0)&&(at[o+1]+=1)}function cf(){return Pe([])}function hf(o){o=Me(o>>>0);for(var c=Array(o.length),m=0;m<o.length;m++)c[m]=o[m];return Pe(c)}function ff(o){return Pe(wr(o>>>0))}function mf(){return Pe({})}function gf(o){for(var c=Me(o>>>=0);c.length;){var m=c.pop();c.pop()(m)}ca(o)}function wf(o,c,m){c>>>=0,m>>>=0,o=Me(o>>>0),c=Me(c),m=Me(m),o[c]=m}function yf(o,c){return c>>>=0,o=(o=ga(o>>>0,"_emval_take_value")).readValueFromPointer(c),Pe(o)}function $f(o,c){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),c>>>=0,o=new Date(1e3*o),n()[c>>>2>>>0]=o.getUTCSeconds(),n()[c+4>>>2>>>0]=o.getUTCMinutes(),n()[c+8>>>2>>>0]=o.getUTCHours(),n()[c+12>>>2>>>0]=o.getUTCDate(),n()[c+16>>>2>>>0]=o.getUTCMonth(),n()[c+20>>>2>>>0]=o.getUTCFullYear()-1900,n()[c+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,n()[c+28>>>2>>>0]=o}var Mt=o=>o%4==0&&(o%100!=0||o%400==0),Qn=[0,31,60,91,121,152,182,213,244,274,305,335],Jn=[0,31,59,90,120,151,181,212,243,273,304,334];function bf(o,c){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),c>>>=0,o=new Date(1e3*o),n()[c>>>2>>>0]=o.getSeconds(),n()[c+4>>>2>>>0]=o.getMinutes(),n()[c+8>>>2>>>0]=o.getHours(),n()[c+12>>>2>>>0]=o.getDate(),n()[c+16>>>2>>>0]=o.getMonth(),n()[c+20>>>2>>>0]=o.getFullYear()-1900,n()[c+24>>>2>>>0]=o.getDay();var m=(Mt(o.getFullYear())?Qn:Jn)[o.getMonth()]+o.getDate()-1|0;n()[c+28>>>2>>>0]=m,n()[c+36>>>2>>>0]=-60*o.getTimezoneOffset(),m=new Date(o.getFullYear(),6,1).getTimezoneOffset();var $=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(m!=$&&o.getTimezoneOffset()==Math.min($,m)),n()[c+32>>>2>>>0]=o}function vf(o){o>>>=0;var c=new Date(n()[o+20>>>2>>>0]+1900,n()[o+16>>>2>>>0],n()[o+12>>>2>>>0],n()[o+8>>>2>>>0],n()[o+4>>>2>>>0],n()[o>>>2>>>0],0),m=n()[o+32>>>2>>>0],$=c.getTimezoneOffset(),v=new Date(c.getFullYear(),6,1).getTimezoneOffset(),E=new Date(c.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(E,v);return 0>m?n()[o+32>>>2>>>0]=+(v!=E&&z==$):0<m!=(z==$)&&(v=Math.max(E,v),c.setTime(c.getTime()+6e4*((0<m?z:v)-$))),n()[o+24>>>2>>>0]=c.getDay(),m=(Mt(c.getFullYear())?Qn:Jn)[c.getMonth()]+c.getDate()-1|0,n()[o+28>>>2>>>0]=m,n()[o>>>2>>>0]=c.getSeconds(),n()[o+4>>>2>>>0]=c.getMinutes(),n()[o+8>>>2>>>0]=c.getHours(),n()[o+12>>>2>>>0]=c.getDate(),n()[o+16>>>2>>>0]=c.getMonth(),n()[o+20>>>2>>>0]=c.getYear(),o=c.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function es(o,c,m,$,v,E,z){return y?ge(16,1,o,c,m,$,v,E,z):-52}function ts(o,c,m,$,v,E){if(y)return ge(17,1,o,c,m,$,v,E)}function _f(o,c,m,$){o>>>=0,c>>>=0,m>>>=0,$>>>=0;var v=new Date().getFullYear(),E=new Date(v,0,1),z=new Date(v,6,1);v=E.getTimezoneOffset();var D=z.getTimezoneOffset(),N=Math.max(v,D);s()[o>>>2>>>0]=60*N,n()[c>>>2>>>0]=+(v!=D),E=(o=W=>W.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(E),z=o(z),D<v?(Bt(E,m,17),Bt(z,$,17)):(Bt(E,$,17),Bt(z,m,17))}var ya=[],rs=(o,c)=>{ya.length=0;for(var m;m=r()[o++>>>0];){var $=m!=105;c+=($&=m!=112)&&c%8?4:0,ya.push(m==112?s()[c>>>2>>>0]:m==106?me[c>>>3]:m==105?n()[c>>>2>>>0]:d()[c>>>3>>>0]),c+=$?8:4}return ya};function xf(o,c,m){return o>>>=0,c=rs(c>>>0,m>>>0),aa[o](...c)}function Sf(o,c,m){return o>>>=0,c=rs(c>>>0,m>>>0),aa[o](...c)}var kf=()=>{},If=()=>Date.now();function Ef(o,c){return F(ke(o>>>0,c>>>0))}var as,Cf=()=>{throw xt+=1,"unwind"};function Tf(){return 4294901760}as=()=>performance.timeOrigin+performance.now();var zf=()=>navigator.hardwareConcurrency;function Af(){return Dt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Of(o){o>>>=0;var c=r().length;if(o<=c||4294901760<o)return!1;for(var m=1;4>=m;m*=2){var $=c*(1+.2/m);$=Math.min($,o+100663296);var v=Math;$=Math.max(o,$);e:{v=(v.min.call(v,4294901760,$+(65536-$%65536)%65536)-te.buffer.byteLength+65535)/65536;try{te.grow(v),Re();var E=1;break e}catch{}E=void 0}if(E)return!0}return!1}var yr=()=>(Dt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),jt={},is=o=>{o.forEach(c=>{yr()})};function Rf(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),is(o),jt.Ob=yr(),jt.ac=o,jt.Ob}function Df(o,c,m){if(o>>>=0,c>>>=0,jt.Ob==o)var $=jt.ac;else($=Error().stack.toString().split(`
`))[0]=="Error"&&$.shift(),is($);for(var v=3;$[v]&&yr()!=o;)++v;for(o=0;o<m&&$[o+v];++o)n()[c+4*o>>>2>>>0]=yr();return o}var $a,ba={},ns=()=>{if(!$a){var o,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:I};for(o in ba)ba[o]===void 0?delete c[o]:c[o]=ba[o];var m=[];for(o in c)m.push(`${o}=${c[o]}`);$a=m}return $a};function ss(o,c){if(y)return ge(18,1,o,c);o>>>=0,c>>>=0;var m=0;return ns().forEach(($,v)=>{var E=c+m;for(v=s()[o+4*v>>>2>>>0]=E,E=0;E<$.length;++E)t()[v++>>>0]=$.charCodeAt(E);t()[v>>>0]=0,m+=$.length+1}),0}function os(o,c){if(y)return ge(19,1,o,c);o>>>=0,c>>>=0;var m=ns();s()[o>>>2>>>0]=m.length;var $=0;return m.forEach(v=>$+=v.length+1),s()[c>>>2>>>0]=$,0}function us(o){return y?ge(20,1,o):52}function ls(o,c,m,$){return y?ge(21,1,o,c,m,$):52}function ds(o,c,m,$){return y?ge(22,1,o,c,m,$):70}var Bf=[null,[],[]];function ps(o,c,m,$){if(y)return ge(23,1,o,c,m,$);c>>>=0,m>>>=0,$>>>=0;for(var v=0,E=0;E<m;E++){var z=s()[c>>>2>>>0],D=s()[c+4>>>2>>>0];c+=8;for(var N=0;N<D;N++){var W=r()[z+N>>>0],X=Bf[o];W===0||W===10?((o===1?J:F)(In(X,0)),X.length=0):X.push(W)}v+=D}return s()[$>>>2>>>0]=v,0}var cs=[31,29,31,30,31,30,31,31,30,31,30,31],hs=[31,28,31,30,31,30,31,31,30,31,30,31],Mf=(o,c)=>{t().set(o,c>>>0)};function fs(o,c,m,$){function v(T,Q,ce){for(T=typeof T=="number"?T.toString():T||"";T.length<Q;)T=ce[0]+T;return T}function E(T,Q){return v(T,Q,"0")}function z(T,Q){function ce(Cs){return 0>Cs?-1:0<Cs?1:0}var kt;return(kt=ce(T.getFullYear()-Q.getFullYear()))===0&&(kt=ce(T.getMonth()-Q.getMonth()))===0&&(kt=ce(T.getDate()-Q.getDate())),kt}function D(T){switch(T.getDay()){case 0:return new Date(T.getFullYear()-1,11,29);case 1:return T;case 2:return new Date(T.getFullYear(),0,3);case 3:return new Date(T.getFullYear(),0,2);case 4:return new Date(T.getFullYear(),0,1);case 5:return new Date(T.getFullYear()-1,11,31);case 6:return new Date(T.getFullYear()-1,11,30)}}function N(T){var Q=T.Bb;for(T=new Date(new Date(T.Cb+1900,0,1).getTime());0<Q;){var ce=T.getMonth(),kt=(Mt(T.getFullYear())?cs:hs)[ce];if(!(Q>kt-T.getDate())){T.setDate(T.getDate()+Q);break}Q-=kt-T.getDate()+1,T.setDate(1),11>ce?T.setMonth(ce+1):(T.setMonth(0),T.setFullYear(T.getFullYear()+1))}return ce=new Date(T.getFullYear()+1,0,4),Q=D(new Date(T.getFullYear(),0,4)),ce=D(ce),0>=z(Q,T)?0>=z(ce,T)?T.getFullYear()+1:T.getFullYear():T.getFullYear()-1}o>>>=0,c>>>=0,m>>>=0,$>>>=0;var W=s()[$+40>>>2>>>0];for(var X in $={fc:n()[$>>>2>>>0],ec:n()[$+4>>>2>>>0],Gb:n()[$+8>>>2>>>0],Kb:n()[$+12>>>2>>>0],Hb:n()[$+16>>>2>>>0],Cb:n()[$+20>>>2>>>0],ub:n()[$+24>>>2>>>0],Bb:n()[$+28>>>2>>>0],nc:n()[$+32>>>2>>>0],dc:n()[$+36>>>2>>>0],hc:W?ke(W):""},m=ke(m),W={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})m=m.replace(new RegExp(X,"g"),W[X]);var le="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),pe="January February March April May June July August September October November December".split(" ");for(X in W={"%a":T=>le[T.ub].substring(0,3),"%A":T=>le[T.ub],"%b":T=>pe[T.Hb].substring(0,3),"%B":T=>pe[T.Hb],"%C":T=>E((T.Cb+1900)/100|0,2),"%d":T=>E(T.Kb,2),"%e":T=>v(T.Kb,2," "),"%g":T=>N(T).toString().substring(2),"%G":N,"%H":T=>E(T.Gb,2),"%I":T=>((T=T.Gb)==0?T=12:12<T&&(T-=12),E(T,2)),"%j":T=>{for(var Q=0,ce=0;ce<=T.Hb-1;Q+=(Mt(T.Cb+1900)?cs:hs)[ce++]);return E(T.Kb+Q,3)},"%m":T=>E(T.Hb+1,2),"%M":T=>E(T.ec,2),"%n":()=>`
`,"%p":T=>0<=T.Gb&&12>T.Gb?"AM":"PM","%S":T=>E(T.fc,2),"%t":()=>"	","%u":T=>T.ub||7,"%U":T=>E(Math.floor((T.Bb+7-T.ub)/7),2),"%V":T=>{var Q=Math.floor((T.Bb+7-(T.ub+6)%7)/7);if(2>=(T.ub+371-T.Bb-2)%7&&Q++,Q)Q==53&&((ce=(T.ub+371-T.Bb)%7)==4||ce==3&&Mt(T.Cb)||(Q=1));else{Q=52;var ce=(T.ub+7-T.Bb-1)%7;(ce==4||ce==5&&Mt(T.Cb%400-1))&&Q++}return E(Q,2)},"%w":T=>T.ub,"%W":T=>E(Math.floor((T.Bb+7-(T.ub+6)%7)/7),2),"%y":T=>(T.Cb+1900).toString().substring(2),"%Y":T=>T.Cb+1900,"%z":T=>{var Q=0<=(T=T.dc);return T=Math.abs(T)/60,(Q?"+":"-")+("0000"+(T/60*100+T%60)).slice(-4)},"%Z":T=>T.hc,"%%":()=>"%"},m=m.replace(/%%/g,"\0\0"),W)m.includes(X)&&(m=m.replace(new RegExp(X,"g"),W[X]($)));return X=function(T){var Q=Array(ua(T)+1);return Tn(T,Q,0,Q.length),Q}(m=m.replace(/\0\0/g,"%")),X.length>c?0:(Mf(X,o),X.length-1)}function Pf(o,c,m,$){return fs(o>>>0,c>>>0,m>>>0,$>>>0)}y||function(){for(var o=u.numThreads-1;o--;)_n();Te.unshift(()=>{st++,function(c){y?c():Promise.all(ot.map(vn)).then(c)}(()=>dn())})}();for(var ms=Array(256),$r=0;256>$r;++$r)ms[$r]=String.fromCharCode($r);Vn=ms,ut=u.BindingError=class extends Error{constructor(o){super(o),this.name="BindingError"}},u.InternalError=class extends Error{constructor(o){super(o),this.name="InternalError"}},at.push(0,1,void 0,1,null,1,!0,1,!1,1),u.count_emval_handles=()=>at.length/2-5-pa.length;var Nf=[sa,wn,xn,En,Cn,zn,An,On,Rn,Dn,Bn,Mn,Pn,Nn,Un,Wn,es,ts,ss,os,us,ls,ds,ps],K=function(){function o(m,$){return K=m.exports,K=function(){var v=K,E={};for(let[z,D]of Object.entries(v))E[z]=typeof D=="function"?(...N)=>{mr.push(z);try{return D(...N)}finally{ye||(mr.pop(),Qe&&dt===1&&mr.length===0&&(dt=0,xt+=1,fr(Ss),typeof Fibers<"u"&&Fibers.oc()))}}:D;return E}(),K=function(){var v=K,E=D=>N=>D(N)>>>0,z=D=>()=>D()>>>0;return(v=Object.assign({},v)).Ca=E(v.Ca),v.fb=z(v.fb),v.gb=E(v.gb),v.emscripten_main_runtime_thread_id=z(v.emscripten_main_runtime_thread_id),v.sb=E(v.sb),v.tb=z(v.tb),v}(),yn.push(K.ib),Ee.unshift(K.Ba),L=$,dn(),K}var c=mn();if(st++,u.instantiateWasm)try{return u.instantiateWasm(c,o)}catch(m){F(`Module.instantiateWasm callback failed with error: ${m}`),h(m)}return ra||=u.locateFile?pn("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":u.locateFile?u.locateFile("ort-wasm-simd-threaded.jsep.wasm",C):C+"ort-wasm-simd-threaded.jsep.wasm":new URL("/liveportrait-web/assets/ort-wasm-simd-threaded.jsep-aobBkcnK.wasm",import.meta.url).href,function(m,$){var v=ra;return R||typeof WebAssembly.instantiateStreaming!="function"||pn(v)||cn(v)||typeof fetch!="function"?fn(v,m,$):fetch(v,{credentials:"same-origin"}).then(E=>WebAssembly.instantiateStreaming(E,m).then($,function(z){return F(`wasm streaming compile failed: ${z}`),F("falling back to ArrayBuffer instantiation"),fn(v,m,$)}))}(c,function(m){o(m.instance,m.module)}).catch(h),{}}(),gs=o=>(gs=K.Ca)(o),ws=()=>(ws=K.Da)();u._OrtInit=(o,c)=>(u._OrtInit=K.Ea)(o,c),u._OrtGetLastError=(o,c)=>(u._OrtGetLastError=K.Fa)(o,c),u._OrtCreateSessionOptions=(o,c,m,$,v,E,z,D,N,W)=>(u._OrtCreateSessionOptions=K.Ga)(o,c,m,$,v,E,z,D,N,W),u._OrtAppendExecutionProvider=(o,c)=>(u._OrtAppendExecutionProvider=K.Ha)(o,c),u._OrtAddFreeDimensionOverride=(o,c,m)=>(u._OrtAddFreeDimensionOverride=K.Ia)(o,c,m),u._OrtAddSessionConfigEntry=(o,c,m)=>(u._OrtAddSessionConfigEntry=K.Ja)(o,c,m),u._OrtReleaseSessionOptions=o=>(u._OrtReleaseSessionOptions=K.Ka)(o),u._OrtCreateSession=(o,c,m)=>(u._OrtCreateSession=K.La)(o,c,m),u._OrtReleaseSession=o=>(u._OrtReleaseSession=K.Ma)(o),u._OrtGetInputOutputCount=(o,c,m)=>(u._OrtGetInputOutputCount=K.Na)(o,c,m),u._OrtGetInputName=(o,c)=>(u._OrtGetInputName=K.Oa)(o,c),u._OrtGetOutputName=(o,c)=>(u._OrtGetOutputName=K.Pa)(o,c),u._OrtFree=o=>(u._OrtFree=K.Qa)(o),u._OrtCreateTensor=(o,c,m,$,v,E)=>(u._OrtCreateTensor=K.Ra)(o,c,m,$,v,E),u._OrtGetTensorData=(o,c,m,$,v)=>(u._OrtGetTensorData=K.Sa)(o,c,m,$,v),u._OrtReleaseTensor=o=>(u._OrtReleaseTensor=K.Ta)(o),u._OrtCreateRunOptions=(o,c,m,$)=>(u._OrtCreateRunOptions=K.Ua)(o,c,m,$),u._OrtAddRunConfigEntry=(o,c,m)=>(u._OrtAddRunConfigEntry=K.Va)(o,c,m),u._OrtReleaseRunOptions=o=>(u._OrtReleaseRunOptions=K.Wa)(o),u._OrtCreateBinding=o=>(u._OrtCreateBinding=K.Xa)(o),u._OrtBindInput=(o,c,m)=>(u._OrtBindInput=K.Ya)(o,c,m),u._OrtBindOutput=(o,c,m,$)=>(u._OrtBindOutput=K.Za)(o,c,m,$),u._OrtClearBoundOutputs=o=>(u._OrtClearBoundOutputs=K._a)(o),u._OrtReleaseBinding=o=>(u._OrtReleaseBinding=K.$a)(o),u._OrtRunWithBinding=(o,c,m,$,v)=>(u._OrtRunWithBinding=K.ab)(o,c,m,$,v),u._OrtRun=(o,c,m,$,v,E,z,D)=>(u._OrtRun=K.bb)(o,c,m,$,v,E,z,D),u._OrtEndProfiling=o=>(u._OrtEndProfiling=K.cb)(o),u._JsepOutput=(o,c,m)=>(u._JsepOutput=K.db)(o,c,m),u._JsepGetNodeName=o=>(u._JsepGetNodeName=K.eb)(o);var br,Pt=()=>(Pt=K.fb)(),vr=u._malloc=o=>(vr=u._malloc=K.gb)(o),Je=u._free=o=>(Je=u._free=K.hb)(o),va=(o,c,m,$,v,E)=>(va=K.kb)(o,c,m,$,v,E),ys=()=>(ys=K.lb)(),$s=(o,c,m,$,v)=>($s=K.mb)(o,c,m,$,v),_a=o=>(_a=K.nb)(o),_r=o=>(_r=K.ob)(o),bs=()=>(bs=K.pb)(),vs=(o,c)=>(vs=K.qb)(o,c),xr=o=>(xr=K.rb)(o),xa=o=>(xa=K.sb)(o),Sa=()=>(Sa=K.tb)(),_s=u.dynCall_ii=(o,c)=>(_s=u.dynCall_ii=K.vb)(o,c),xs=o=>(xs=K.wb)(o),Ss=()=>(Ss=K.xb)(),ks=o=>(ks=K.yb)(o),Is=()=>(Is=K.zb)();function Es(){0<st||(y?(p(u),y||cr(Ee),startWorker(u)):(cr(Te),0<st||br||(br=!0,u.calledRun=!0,ye||(y||cr(Ee),p(u),y||cr(nt)))))}return u.___start_em_js=862621,u.___stop_em_js=862843,u.stackSave=()=>Sa(),u.stackRestore=o=>xr(o),u.stackAlloc=o=>xa(o),u.UTF8ToString=ke,u.stringToUTF8=Bt,u.lengthBytesUTF8=ua,_t=function o(){br||Es(),br||(_t=o)},Es(),f}),cd=Aa,globalThis.self?.name==="em-pthread"&&Aa()}),Ut,As,Os,Rs,Oa,hd,Ds,fd,Jr=P(()=>{Pi(),Ut=import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),As=typeof location>"u"?void 0:location.origin,Os=(e,t)=>{try{let r=t??Ut;return(r?new URL(e,r):new URL(e)).origin===As}catch{return!1}},Rs=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Oa=(sm(),Vr(ld)).default,hd=async()=>{if(!Ut)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Os(Ut))return[void 0,Oa()];let e=await Rs(Ut);return[e,Oa(e)]},Ds=(om(),Vr(pd)).default,fd=async(e,t,r)=>[void 0,Ds]}),Ra,kr,Kt,Da,Bs,Ms,Ni,Ie,Lt=P(()=>{Jr(),kr=!1,Kt=!1,Da=!1,Bs=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ms=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Ni=async e=>{if(kr)return Promise.resolve();if(Kt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Da)throw new Error("previous call to 'initializeWebAssembly()' failed.");Kt=!0;let t=e.initTimeout,r=e.numThreads;if(!Ms())throw new Error("WebAssembly SIMD is not supported in the current environment.");let a=Bs();r>1&&!a&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let i=e.wasmPaths,n=typeof i=="string"?i:void 0,s=i?.mjs,l=s?.href??s,d=i?.wasm,p=d?.href??d,h=e.wasmBinary,[u,f]=await fd(l,n,r>1),w=!1,g=[];if(t>0&&g.push(new Promise(y=>{setTimeout(()=>{w=!0,y()},t)})),g.push(new Promise((y,x)=>{let _={numThreads:r};h?_.wasmBinary=h:(p||n)&&(_.locateFile=(b,S)=>p??(n??S)+b),f(_).then(b=>{Kt=!1,kr=!0,Ra=b,y(),u&&URL.revokeObjectURL(u)},b=>{Kt=!1,Da=!0,x(b)})})),await Promise.race(g),w)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ie=()=>{if(kr&&Ra)return Ra;throw new Error("WebAssembly is not initialized yet.")}}),Ce,qr,$e,Ui=P(()=>{Lt(),Ce=(e,t)=>{let r=Ie(),a=r.lengthBytesUTF8(e)+1,i=r._malloc(a);return r.stringToUTF8(e,i,a),t.push(i),i},qr=(e,t,r,a)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([i,n])=>{let s=t?t+i:i;if(typeof n=="object")qr(n,s+".",r,a);else if(typeof n=="string"||typeof n=="number")a(s,n.toString());else if(typeof n=="boolean")a(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},$e=e=>{let t=Ie(),r=t.stackSave();try{let a=t.stackAlloc(8);t._OrtGetLastError(a,a+4);let i=t.HEAP32[a/4],n=t.HEAPU32[a/4+1],s=n?t.UTF8ToString(n):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(r)}}}),md,um=P(()=>{Lt(),Ui(),md=e=>{let t=Ie(),r=0,a=[],i=e||{};try{if(e?.logSeverityLevel===void 0)i.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)i.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(i.terminate=!1);let n=0;return e?.tag!==void 0&&(n=Ce(e.tag,a)),r=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,n),r===0&&$e("Can't create run options."),e?.extra!==void 0&&qr(e.extra,"",new WeakSet,(s,l)=>{let d=Ce(s,a),p=Ce(l,a);t._OrtAddRunConfigEntry(r,d,p)!==0&&$e(`Can't set a run config entry: ${s} - ${l}.`)}),[r,a]}catch(n){throw r!==0&&t._OrtReleaseRunOptions(r),a.forEach(s=>t._free(s)),n}}}),Ps,Ns,Us,Ws,gd,lm=P(()=>{Lt(),Ui(),Ps=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Ns=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Us=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Ws=(e,t,r)=>{for(let a of t){let i=typeof a=="string"?a:a.name;switch(i){case"webnn":if(i="WEBNN",typeof a!="string"){let s=a?.deviceType;if(s){let l=Ce("deviceType",r),d=Ce(s,r);Ie()._OrtAddSessionConfigEntry(e,l,d)!==0&&$e(`Can't set a session config entry: 'deviceType' - ${s}.`)}}break;case"webgpu":if(i="JS",typeof a!="string"){let s=a;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let l=Ce("preferredLayout",r),d=Ce(s.preferredLayout,r);Ie()._OrtAddSessionConfigEntry(e,l,d)!==0&&$e(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${i}`)}let n=Ce(i,r);Ie()._OrtAppendExecutionProvider(e,n)!==0&&$e(`Can't append execution provider: ${i}.`)}},gd=e=>{let t=Ie(),r=0,a=[],i=e||{};Us(i);try{let n=Ps(i.graphOptimizationLevel??"all"),s=Ns(i.executionMode??"sequential"),l=typeof i.logId=="string"?Ce(i.logId,a):0,d=i.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let p=i.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let h=typeof i.optimizedModelFilePath=="string"?Ce(i.optimizedModelFilePath,a):0;if(r=t._OrtCreateSessionOptions(n,!!i.enableCpuMemArena,!!i.enableMemPattern,s,!!i.enableProfiling,0,l,d,p,h),r===0&&$e("Can't create session options."),i.executionProviders&&Ws(r,i.executionProviders,a),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);let u=Ce("enableGraphCapture",a),f=Ce(i.enableGraphCapture.toString(),a);t._OrtAddSessionConfigEntry(r,u,f)!==0&&$e(`Can't set a session config entry: 'enableGraphCapture' - ${i.enableGraphCapture}.`)}if(i.freeDimensionOverrides)for(let[u,f]of Object.entries(i.freeDimensionOverrides)){if(typeof u!="string")throw new Error(`free dimension override name must be a string: ${u}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let w=Ce(u,a);t._OrtAddFreeDimensionOverride(r,w,f)!==0&&$e(`Can't set a free dimension override: ${u} - ${f}.`)}return i.extra!==void 0&&qr(i.extra,"",new WeakSet,(u,f)=>{let w=Ce(u,a),g=Ce(f,a);t._OrtAddSessionConfigEntry(r,w,g)!==0&&$e(`Can't set a session config entry: ${u} - ${f}.`)}),[r,a]}catch(n){throw r!==0&&t._OrtReleaseSessionOptions(r),a.forEach(s=>t._free(s)),n}}}),hi,zt,nr,Wi,Lr,Vi,fi,Z=P(()=>{hi=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;default:throw new Error(`unsupported data type: ${e}`)}},zt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";default:throw new Error(`unsupported data type: ${e}`)}},nr=e=>[void 0,4,1,1,2,2,4,8,void 0,1,2,8,4,8,void 0,void 0,void 0][e],Wi=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Lr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Vi=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool",fi=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${e}`)}}}),Hi,wd=P(()=>{Pi(),Hi=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),a=r?parseInt(r,10):0;if(a<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),n;try{n=new ArrayBuffer(a)}catch(l){if(l instanceof RangeError){let d=Math.ceil(a/65536);n=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw l}let s=0;for(;;){let{done:l,value:d}=await i.read();if(l)break;let p=d.byteLength;new Uint8Array(n,s,p).set(d),s+=p}return new Uint8Array(n,0,a)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Vs,Hs,qs,Ls,yd,Fs,be,$t=P(()=>{Z(),Vs=["V","I","W","E","F"],Hs=(e,t)=>{console.log(`[${Vs[e]},${new Date().toISOString()}]${t}`)},yd=(e,t)=>{qs=e,Ls=t},Fs=(e,t)=>{let r=Lr(e),a=Lr(qs);r>=a&&Hs(r,typeof t=="function"?t():t)},be=(...e)=>{Ls&&Fs(...e)}}),$d,dm=P(()=>{Z(),$d=(e,t)=>new(Wi(t))(e)}),qi=P(()=>{}),Ba,Ir,Er,js,Gs,Ma,mi,Ks,bd,pm=P(()=>{$t(),qi(),Ba=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Ir=[],Er=e=>Math.ceil(e/16)*16,js=e=>{for(let t=0;t<Ir.length;t++){let r=Ir[t];if(e<=r)return r}return Math.ceil(e/16)*16},Gs=1,Ma=()=>Gs++,mi=async(e,t,r,a)=>{let i=Er(r),n=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,i),e.flush(),await n.mapAsync(GPUMapMode.READ);let l=n.getMappedRange();if(a){let d=a();return d.set(new Uint8Array(l,0,r)),d}else return new Uint8Array(l.slice(0,r))}finally{n.destroy()}},Ks=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.externalBuffers=new Map,this.capturedPendingBuffers=new Map;for(let[t]of Ba)Ir.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[])}upload(e,t){let r=t.buffer,a=t.byteOffset,i=t.byteLength,n=Er(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(s.originalSize!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=l.getMappedRange();new Uint8Array(d).set(new Uint8Array(r,a,i)),l.unmap();let p=this.backend.getCommandEncoder();this.backend.endComputePass(),p.copyBufferToBuffer(l,0,s.gpuData.buffer,0,n),be("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`),this.buffersForUploadingPending.push(l)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let a=this.storageCache.get(t);if(!a)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==a.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Er(r.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(r.gpuData.buffer,0,a.gpuData.buffer,0,i)}registerExternalBuffer(e,t,r){let a;if(r){if(a=this.externalBuffers.get(r),a===void 0)throw new Error("previous buffer is not registered");if(e===r)return be("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, buffer is the same, skip.`),a;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);this.externalBuffers.delete(r)}else a=Ma();return this.storageCache.set(a,{gpuData:{id:a,type:0,buffer:e},originalSize:t}),this.externalBuffers.set(e,a),be("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, registered.`),a}unregisterExternalBuffer(e){let t=this.externalBuffers.get(e);t!==void 0&&(this.storageCache.delete(t),this.externalBuffers.delete(e),be("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=js(e),a,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||n){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(r);l?l.length>0?a=l.pop():a=this.backend.device.createBuffer({size:r,usage:t}):a=this.backend.device.createBuffer({size:r,usage:t})}else a=this.backend.device.createBuffer({size:r,usage:t});let s={id:Ma(),type:0,buffer:a};return this.storageCache.set(s.id,{gpuData:s,originalSize:e}),be("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=this.storageCache.get(e);if(!t)throw new Error("releasing data does not exist");return be("verbose",()=>`[WebGPU] GpuDataManager.release(id=${e}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(e),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("data does not exist");await mi(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){for(let e of this.buffersForUploadingPending)e.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Ba.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e))}},bd=(...e)=>new Ks(...e)}),Ys,fe,Se=P(()=>{Ys=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},fe=e=>new Ys(e)}),Xs,Ht,M,Fr,vd,Li,Fi,oe=P(()=>{Xs=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Ht=class{static calcShape(e,t,r=!1){let a=e.length,i=t.length;if(a===0)return t;if(i===0)return e;let n=Math.max(e.length,t.length),s=new Array(n);if(r){if(a<2||i<2)return;let l=Xs.calcMatMulShape([e[a-2],e[a-1]],[t[i-2],t[i-1]]);if(l===void 0)return;[s[n-2],s[n-1]]=l}for(let l=r?3:1;l<=n;l++){let d=a-l<0?1:e[a-l],p=i-l<0?1:t[i-l];if(d!==p&&d>1&&p>1)return;let h=Math.max(d,p);if(d&&p)s[n-l]=Math.max(d,p);else{if(h>1)return;s[n-l]=0}}return s}static isValidBroadcast(e,t){let r=e.length,a=t.length;if(r>a)return!1;for(let i=1;i<=r;i++)if(e[r-i]!==1&&e[r-i]!==t[a-i])return!1;return!0}},M=class Pr{static size(t){return Pr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let a=t.length;if(a===0)return[];let i=new Array(a),n=a-1;for(;n>=0;){if(t[n]%r===0){i[n]=t[n]/r;break}if(r%t[n]!==0)throw new Error("cannot convert shape");i[n]=1,r/=t[n],n--}for(n--;n>=0;n--)i[n]=t[n];return i}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Pr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Pr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,a){let i=1;for(let n=r;n<a;n++){if(t[n]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=t[n]}return i}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let a=new Array(r);a[r-1]=1,a[r-2]=t[r-1];for(let i=r-3;i>=0;--i)a[i]=a[i+1]*t[i+1];return a}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(a=>this.normalizeAxis(a,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(a=>t[a]):t.slice().reverse()}static padShape(t,r){let a=t.length;return t.map((i,n)=>i+r[n]+r[n+a])}static areEqual(t,r){return t.length!==r.length?!1:t.every((a,i)=>a===r[i])}},Fr=class rr{static adjustPoolAttributes(t,r,a,i,n,s){if(!t&&a.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let l=0;l<r.length-2;l++)l>=a.length?a.push(r[l+2]):a[l]=r[l+2];for(let l=0;l<a.length;l++)if(l<i.length){if(i[l]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let l=0;l<a.length;l++)if(l<n.length){if(n[l]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let l=0;l<a.length*2;l++)if(l<s.length){if(s[l]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let l=0;l<a.length;l++){if(a[l]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[l]>=a[l]||s[l+a.length]>=a[l])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,a,i,n,s,l){if(l){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)rr.adjustPadAndReturnShape(t[d+(s?1:2)],r[d],a[d],i[d],n,d,d+t.length-2,l)}}static computePoolOutputShape(t,r,a,i,n,s,l){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return rr.computeShapeHelper(t,r,d,a,i,n,s,l),d}static computeConvOutputShape(t,r,a,i,n,s,l){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return rr.computeShapeHelper(!1,t,d,a,i,n,s,l),d}static computeShapeHelper(t,r,a,i,n,s,l,d){if(t)for(let p=0;p<r.length-2;p++)a.push(1);else for(let p=0;p<r.length-2;p++)a.push(rr.adjustPadAndReturnShape(r[p+2],i[p],n[p],s[p],l,p,p+r.length-2,d))}static adjustPadAndReturnShape(t,r,a,i,n,s,l,d){let p=a*(i-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return n[s]=0,n[l]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(a!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+r-1)/r-1)*r+i-t;return n[s]=Math.floor(d==="SAME_LOWER"?(h+1)/2:h/2),n[l]=h-n[s],Math.floor((t+h-i)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+n[s]+n[l]-p)/r+1)}},vd=class{static getShapeOfGemmResult(e,t,r,a,i){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let n,s,l;t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let d=-1;if(a?(l=r[0],d=1):(l=r[1],d=0),r[d]!==s)throw new Error("dimension mismatch");if(n<=0||l<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Ht.isValidBroadcast(i,[n,l]))throw new Error("gemm: invalid bias shape for broadcast");return[n,l,s]}},Li=-34028234663852886e22,Fi=34028234663852886e22}),qt,Cr,xe,Oe,G,_e,Ot,Vt,mt,q,Tr,B,Y,ji,Zs,_d,sr,se=P(()=>{Z(),oe(),qt=64,Cr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(e){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];default:throw new Error(`Unknown data type: ${e}`)}},xe=(e,t=1)=>{let r=Cr(e,t);return typeof r=="string"?r:r[0]},Oe=(e,t=1)=>{let r=Cr(e,t);return typeof r=="string"?r:r[1]},G=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:M.computeStrides(r)})}),t},_e=e=>e%4===0?4:e%2===0?2:1,Ot=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Vt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,mt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,q=(e,t,r,a)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?a==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:a==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Tr=(e,t,r,a,i)=>{let n=typeof r=="number",s=n?r:r.length,l=[...new Array(s).keys()],d=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=Cr(t,i),h=typeof p=="string"?p:p[1],u=typeof p=="string"?p:p[0],f={indices:d,value:h,storage:u,tensor:t},w=O=>typeof O=="string"?O:`${O}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=n?"uniforms.":"",x=`${y}${e}_shape`,_=`${y}${e}_strides`,b="";for(let O=0;O<s-1;O++)b+=`
    let dim${O} = current / ${q(_,O,s)};
    let rest${O} = current % ${q(_,O,s)};
    indices[${O}] = dim${O};
    current = rest${O};
    `;b+=`indices[${s-1}] = current;`;let S=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${b}
    return indices;
  }`,k=O=>(g.offsetToIndices=!0,s<2?O:`o2i_${e}(${O})`),I=[];if(s>=2)for(let O=s-1;O>=0;O--)I.push(`${q(_,O,s)} * (indices[${O}])`);let A=s<2?"":`
  fn i2o_${e}(indices: ${f.indices}) -> u32 {
    return ${I.join("+")};
  }`,C=O=>(g.indicesToOffset=!0,s<2?O:`i2o_${e}(${O})`),R=(...O)=>s===0?"0u":`${f.indices}(${O.map(w).join(",")})`,V=(O,H)=>s<2?`${O}`:`${q(O,H,s)}`,U=(O,H,ae)=>s<2?`${O}=${ae};`:`${q(O,H,s)}=${ae};`,J={},F=(O,H)=>{g.broadcastedIndicesToOffset=!0;let ae=`${H.name}broadcastedIndicesTo${e}Offset`;if(ae in J)return`${ae}(${O})`;let we=[];for(let me=s-1;me>=0;me--){let Be=H.indicesGet("outputIndices",me+H.rank-s);we.push(`${V(_,me)} * (${Be} % ${V(x,me)})`)}return J[ae]=`fn ${ae}(outputIndices: ${H.type.indices}) -> u32 {
             return ${we.length>0?we.join("+"):"0u"};
           }`,`${ae}(${O})`},ie=(O,H)=>(()=>{if(f.storage===f.value)return`${e}[${O}]=${H};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${e}[${O}]=vec2<u32>(u32(${H}), select(0u, 0xFFFFFFFFu, ${H} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${e}[${O}]=vec2<u32>(u32(${H}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${e}[${O}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${H}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),ee=O=>(()=>{if(f.storage===f.value)return`${e}[${O}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${e}[${O}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${e}[${O}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${O}] & 0xFFu), bool(${e}[${O}] & 0xFF00u), bool(${e}[${O}] & 0xFF0000u), bool(${e}[${O}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),te=s<2?"":`
  fn get_${e}ByIndices(indices: ${f.indices}) -> ${h} {
    return ${ee(`i2o_${e}(indices)`)};
  }`,L=s<2?"":(()=>{let O=l.map(ae=>`d${ae}: u32`).join(", "),H=l.map(ae=>`d${ae}`).join(", ");return`
  fn get_${e}(${O}) -> ${h} {
    return get_${e}ByIndices(${R(H)});
  }`})(),de=(...O)=>{if(O.length!==s)throw new Error(`indices length must be ${s}`);let H=O.map(w).join(",");return s===0?ee("0u"):s===1?ee(H[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}(${H})`)},ne=O=>s<2?ee(O):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}ByIndices(${O})`),j=s<2?"":`
  fn set_${e}ByIndices(indices: ${f.indices}, value: ${h}) {
    ${ie(`i2o_${e}(indices)`,"value")}
  }`,re=s<2?"":(()=>{let O=l.map(ae=>`d${ae}: u32`).join(", "),H=l.map(ae=>`d${ae}`).join(", ");return`
  fn set_${e}(${O}, value: ${h}) {
    set_${e}ByIndices(${R(H)}, value);
  }`})();return{impl:()=>{let O=[],H=!1;return g.offsetToIndices&&(O.push(S),H=!0),g.indicesToOffset&&(O.push(A),H=!0),g.broadcastedIndicesToOffset&&(Object.values(J).forEach(ae=>O.push(ae)),H=!0),g.set&&(O.push(re),H=!0),g.setByIndices&&(O.push(j),H=!0),g.get&&(O.push(L),H=!0),g.getByIndices&&(O.push(te),H=!0),!n&&H&&O.unshift(`const ${x} = ${f.indices}(${r.join(",")});`,`const ${_} = ${f.indices}(${M.computeStrides(r).join(",")});`),O.join(`
`)},type:f,offsetToIndices:k,indicesToOffset:C,broadcastedIndicesToOffset:F,indices:R,indicesGet:V,indicesSet:U,set:(...O)=>{if(O.length!==s+1)throw new Error(`indices length must be ${s}`);let H=O[s];if(typeof H!="string")throw new Error("value must be string");let ae=O.slice(0,s).map(w).join(",");return s===0?ie("0u",H):s===1?ie(ae[0],H):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}(${ae}, ${H})`)},setByOffset:ie,setByIndices:(O,H)=>s<2?ie(O,H):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}ByIndices(${O}, ${H});`),get:de,getByOffset:ee,getByIndices:ne,usage:a,name:e,strides:_,shape:x,rank:s}},B=(e,t,r,a=1)=>Tr(e,t,r,"input",a),Y=(e,t,r,a=1)=>Tr(e,t,r,"output",a),ji=(e,t,r,a=1)=>Tr(e,t,r,"internal",a),Zs=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=qt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],a=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||a>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${a}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*a>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${a}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,n=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?"let global_idx = global_id.x; let local_idx = local_id.x;":`let global_idx = (workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
          workgroup_id.y * num_workgroups[0] + workgroup_id.x) * ${t*r*a}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${a})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",a=e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${a}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:a}of this.uniforms)if(a&&a>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(a/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(a/4)}>`);else{let i=a==null||a===1?r:`vec${a}<${r}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},_d=(e,t)=>new Zs(e,t),sr=(e,t)=>{let r=e.length,a=[];for(let i=0;i<r;i++){let n=r-1-i,s=e[n]||1;(t[t.length-1-i]||1)>1&&s===1&&a.unshift(n)}return a}}),Qs,Pa,Js,eo,et,xd,Sd,Ft=P(()=>{Z(),oe(),Se(),se(),Qs=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},Pa=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,Js=(e,t)=>M.sortBasedOnPerm(e,Pa(e.length,t)),eo=(e,t,r,a)=>{let i=[];i.push(`fn perm(i: ${a.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)i.push(r.indicesSet("a",e[n],`i[${n}]`));return i.push("return a;}"),i.join(`
`)},et=(e,t)=>{let r=e.dataType,a=e.dims.length,i=Pa(a,t),n=Js(e.dims,i),s=Y("output",r,n.length),l=B("a",r,a),d;if(i.length===2&&i[0]===1&&i[1]===0){let p=s.type.value,h=[16,16,1];d=u=>`
  ${u.registerUniform("output_size","u32").declareVariables(l,s)}
  var<workgroup> tile : array<array<${p}, ${h[0]+1}>, ${h[0]}>;
  ${u.mainStart(h)}
    var x = workgroup_id.x * ${h[0]}u + local_id.x;
    var y = workgroup_id.y * ${h[0]}u + local_id.y;
    let width = uniforms.output_shape[0];
    let height = uniforms.output_shape[1];
    if (x < width && y < height) {
      tile[local_id.y][local_id.x] = ${l.getByOffset("y * width + x")};
    }
    workgroupBarrier();
    x = workgroup_id.y * ${h[0]}u + local_id.x;
    y = workgroup_id.x * ${h[0]}u + local_id.y;
    if (x < height && y < width) {
      ${s.setByOffset("y * height + x","tile[local_id.x][local_id.y]")}
    }
  }`}else d=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(l,s)}

  ${eo(i,a,l,s)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${s.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${s.setByOffset("global_idx",l.getByIndices("aIndices"))}
  }`;return{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:p=>{let h=M.size(n);return{outputs:[{dims:n,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...G(p[0].dims,n)]}},getShaderSource:d}},xd=(e,t)=>{Qs(e.inputs),e.compute(et(e.inputs[0],t.perm))},Sd=e=>fe({perm:e.perm})}),to,ro,ao,io,no,so,oo,uo,lo,po,He,kd,Id,Ed,Cd,Td,zd,Ad,Od,Rd,Dd,cm=P(()=>{Z(),oe(),se(),Gi(),Ft(),to={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},ro={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},ao={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},io={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},no=(e,t)=>{let r=[];for(let a=t-e;a<t;++a)r.push(a);return r},so=(e,t)=>{let r=[],a=e.length;for(let n=0;n<a;n++)t.indexOf(n)===-1&&r.push(e[n]);let i=t.map(n=>e[n]);return[r,i]},oo=(e,t)=>{let r=e.length+t.length,a=[],i=0;for(let n=0;n<r;n++)t.indexOf(n)===-1?a.push(e[i++]):a.push(1);return a},uo=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},lo=(e,t)=>{let r=[];if(!uo(e,t)){for(let a=0;a<t;++a)e.indexOf(a)===-1&&r.push(a);e.forEach(a=>r.push(a))}return r},po=(e,t,r,a,i,n,s)=>{let l=r[0].dims,d=M.size(n),p=M.size(s),h=B("_A",r[0].dataType,l),u=Y("output",i,n),f=32,w=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `;return{name:e,shaderCache:t,getShaderSource:g=>`
        ${g.registerUniform("reduceSize","u32").declareVariables(h,u)}
        ${w}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${g.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${ao[a]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${h.getByOffset("offset + k")});
           bestValue = ${to[a]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${ro[a]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${u.setByOffset("outputIndex",`${a==="mean"?`${u.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${u.type.storage}(${io[a]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:n,dataType:i}],dispatchGroup:{x:d},programUniforms:[{type:12,data:p}]})}},He=(e,t,r,a)=>{let i=e.inputs.length===1?r:gi(e.inputs,r),n=i.axes;n.length===0&&!i.noopWithEmptyAxes&&(n=e.inputs[0].dims.map((w,g)=>g));let s=M.normalizeAxes(n,e.inputs[0].dims.length),l=s,d=e.inputs[0],p=lo(l,e.inputs[0].dims.length);p.length>0&&(d=e.compute(et(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],l=no(l.length,d.dims.length));let[h,u]=so(d.dims,l),f=h;i.keepDims&&(f=oo(h,s)),e.compute(po(t,{hint:i.cacheKey,inputDependencies:["type"]},[d],a,e.inputs[0].dataType,f,u),{inputs:[d]})},kd=(e,t)=>{He(e,"ReduceMeanShared",t,"mean")},Id=(e,t)=>{He(e,"ReduceL1Shared",t,"l1")},Ed=(e,t)=>{He(e,"ReduceL2Shared",t,"l2")},Cd=(e,t)=>{He(e,"ReduceLogSumExpShared",t,"logSumExp")},Td=(e,t)=>{He(e,"ReduceMaxShared",t,"max")},zd=(e,t)=>{He(e,"ReduceMinShared",t,"min")},Ad=(e,t)=>{He(e,"ReduceProdShared",t,"prod")},Od=(e,t)=>{He(e,"ReduceSumShared",t,"sum")},Rd=(e,t)=>{He(e,"ReduceSumSquareShared",t,"sumSquare")},Dd=(e,t)=>{He(e,"ReduceLogSumShared",t,"logSum")}}),qe,co,jr,gi,Le,ho,fo,mo,go,wo,yo,$o,bo,vo,_o,Fe,Bd,Md,Pd,Nd,Ud,Wd,Vd,Hd,qd,Ld,Gi=P(()=>{Z(),oe(),Se(),se(),cm(),qe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},co=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],jr=(e,t,r,a,i,n,s=!1,l=!1)=>{let d=[],p=r[0].dims,h=p.length,u=M.normalizeAxes(i,h),f=!l&&u.length===0;p.forEach((y,x)=>{f||u.indexOf(x)>=0?s&&d.push(1):d.push(y)});let w=d.length,g=M.size(d);return{name:e,shaderCache:t,getShaderSource:y=>{let x=[],_=B("_A",r[0].dataType,h),b=Y("output",n,w),S=a(_,b,u),k=S[2];for(let I=0,A=0;I<h;I++)f||u.indexOf(I)>=0?(s&&A++,k=`for(var j${I}: u32 = 0; j${I} < ${p[I]}; j${I}++) {
                  ${S[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${_.indicesSet("input_indices",I,`j${I}`)}
                  ${k}
                }`):(x.push(`${_.indicesSet("input_indices",I,b.indicesGet("output_indices",A))};`),A++);return`

        ${y.registerUniform("output_size","u32").declareVariables(_,b)}

        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${_.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${S[0]}       // init ops for reduce max/min
          ${S[1]}
          ${k}
          ${S[3]}
          ${S.length===4?b.setByOffset("global_idx","value"):S.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:n}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...G(p,d)]})}},gi=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),fe({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Le=(e,t,r,a)=>{let i=e.inputs,n=i.length===1?r:gi(i,r);e.compute(jr(t,{hint:n.cacheKey,inputDependencies:["rank"]},[i[0]],n.noopWithEmptyAxes&&n.axes.length===0?co:a,n.axes,i[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},ho=(e,t)=>{qe(e.inputs),Le(e,"ReduceLogSum",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},fo=(e,t)=>{qe(e.inputs),Le(e,"ReduceL1",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},mo=(e,t)=>{qe(e.inputs),Le(e,"ReduceL2",t,(r,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},go=(e,t)=>{qe(e.inputs),Le(e,"ReduceLogSumExp",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},wo=(e,t)=>{qe(e.inputs),Le(e,"ReduceMax",t,(r,a,i)=>{let n=[];for(let s=0;s<r.rank;s++)(i.indexOf(s)>=0||i.length===0)&&n.push(r.indicesSet("input_indices",s,0));return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},yo=(e,t)=>{qe(e.inputs),Le(e,"ReduceMean",t,(r,a,i)=>{let n=1;for(let s=0;s<r.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(n*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${a.type.value}(sum / ${n});`]})},$o=(e,t)=>{qe(e.inputs),Le(e,"ReduceMin",t,(r,a,i)=>{let n=[];for(let s=0;s<r.rank;s++)(i.indexOf(s)>=0||i.length===0)&&n.push(`input_indices[${s}] = 0;`);return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},bo=(e,t)=>{qe(e.inputs),Le(e,"ReduceProd",t,(r,a)=>[`var value = ${a.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},vo=(e,t)=>{qe(e.inputs),Le(e,"ReduceSum",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},_o=(e,t)=>{qe(e.inputs),Le(e,"ReduceSumSquare",t,(r,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Fe=(e,t,r)=>{if(t.length===0)return r;let a=1,i=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?a*=e[n]:i*=e[n];return i<32&&a>1024},Bd=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yo(e,t):kd(e,t)},Md=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fo(e,t):Id(e,t)},Pd=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mo(e,t):Ed(e,t)},Nd=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?go(e,t):Cd(e,t)},Ud=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wo(e,t):Td(e,t)},Wd=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$o(e,t):zd(e,t)},Vd=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bo(e,t):Ad(e,t)},Hd=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vo(e,t):Od(e,t)},qd=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_o(e,t):Rd(e,t)},Ld=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ho(e,t):Dd(e,t)}}),Na,Fd,jd,wi,hm=P(()=>{Z(),Se(),Gi(),Na=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Fd=(e,t)=>{Na(e.inputs);let r=(a,i,n)=>{let s=[];for(let l=0;l<a.rank;l++)(n.indexOf(l)>=0||n.length===0)&&s.push(`input_indices[${l}] = 0;`);return[`${s.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(jr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},jd=(e,t)=>{Na(e.inputs);let r=(a,i,n)=>{let s=[];for(let l=0;l<a.rank;l++)(n.indexOf(l)>=0||n.length===0)&&s.push(`input_indices[${l}] = 0;`);return[`${s.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(jr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},wi=e=>fe(e)}),xo,So,ko,Io,or,Eo,Gd,Ki=P(()=>{Z(),qi(),se(),xo=(e,t)=>{let r=e[0],a=e[1],i=e[2],n=e[3],s=e[4],l=e[5];if(s&&l)throw new Error("Attention cannot have both past and relative_position_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],p=r.dims[1],h=r.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(a.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(a.dims[0]!==h)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==a.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let u=i.dims[0]/3,f=u,w=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");u=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],w=t.qkvHiddenSizes[2]}let g=p;if(u!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==u+f+w)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let y=0;if(s){if(f!==w)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==f/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(y=s.dims[3])}let x=g+y,_=-1,b=0;if(n)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");return{batchSize:d,sequenceLength:p,pastSequenceLength:y,kvSequenceLength:g,totalSequenceLength:x,maxSequenceLength:_,inputHiddenSize:h,hiddenSize:u,vHiddenSize:w,headSize:Math.floor(u/t.numHeads),vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},So=(e,t,r,a)=>{let i=_e(a),n=64,s=a/i;s<n?n=1:s/8<64&&(n=Math.ceil(s/8));let l=Math.ceil(a/i/n),d=[{type:t.dataType,data:1/a},{type:12,data:s},{type:12,data:l}],p=xe(t.dataType,i),h=Oe(1,i),u=f=>{let w=Y("x",t.dataType,t.dims,i),g=[{name:"d_inv",type:Oe(t.dataType)},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${n}>;
  var<workgroup> thread_sum: array<f32, ${n}>;
  ${f.registerUniforms(g).declareVariables(w)}
  ${f.mainStart([n,1,1])}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = workgroup_id.x * uniforms.d_comp + local_offset;

    var thread_max_vector = ${h}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      thread_max_vector = max(${h}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(i){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${i}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${n}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${h}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      sum_vector += exp(${h}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(i){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${i}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${n}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        x[offset + i] = ${w.type.value}(uniforms.d_inv);
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        var f32input = ${h}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${n};${p};${i}`},getShaderSource:u,getRunData:()=>({outputs:[],dispatchGroup:{x:r},programUniforms:d})}},ko=(e,t,r,a,i,n,s,l)=>{let d=l+n.kvSequenceLength,p=[n.batchSize,n.numHeads,n.sequenceLength,d],h=n.kvNumHeads===void 0&&e.outputCount>1,u=h?[n.batchSize,n.numHeads,d,n.headSize]:void 0,f=s.scale===0?1/Math.sqrt(n.headSize):s.scale,w=_e(n.headSize),g=n.headSize/w,y=12,x={x:Math.ceil(d/y),y:Math.ceil(n.sequenceLength/y),z:n.batchSize*n.numHeads},_=[{type:12,data:n.sequenceLength},{type:12,data:g},{type:12,data:d},{type:12,data:n.numHeads},{type:1,data:f},{type:12,data:l},{type:12,data:n.kvSequenceLength}],b=["type","type"];a&&b.push("type"),i&&b.push("type");let S=[{dims:p,dataType:t.dataType,gpuDataType:0}];h&&S.push({dims:u,dataType:t.dataType,gpuDataType:0});let k=I=>{let A=B("q",t.dataType,t.dims,w),C=B("key",r.dataType,r.dims,w),R=[A,C];if(a){let ie=B("past_key",a.dataType,a.dims,w);R.push(ie)}i&&R.push(B("relative_position_bias",i.dataType,i.dims));let V=Y("output",t.dataType,p),U=[V];h&&U.push(Y("present_key",t.dataType,u,w));let J=Oe(1,w),F=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${y}u;

  var<workgroup> tileQ: array<${A.type.storage}, ${y*y}>;
  var<workgroup> tileK: array<${A.type.storage}, ${y*y}>;
  ${I.registerUniforms(F).declareVariables(...R,...U)}
  ${I.mainStart([y,y,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    ${a&&h?`
    let kOffset = uniforms.kv_sequence_length * uniforms.K * headIdx;
    let pastKeyOffset = uniforms.past_sequence_length * uniforms.K * headIdx;`:`
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;`}
    ${h?"let presentKeyOffset = headIdx * uniforms.N * uniforms.K;":""}
    var value = ${J}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${a&&h?`
              if (n + local_id.y < uniforms.past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else {
                tileK[idx] =
                         key[kOffset + (n + local_id.y - uniforms.past_sequence_length) * uniforms.K + w + local_id.x];
              }`:"tileK[idx] = key[kOffset + local_id.y * uniforms.K + w + local_id.x];"}
      ${h?"present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];":""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
        value += ${J}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(w){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${w}`)}})()};
        output[outputIdx] = ${V.type.value} (sum * uniforms.alpha) + ${i?"relative_position_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${w};${i!==void 0};${a!==void 0};${e.outputCount}`,inputDependencies:b},getRunData:()=>({outputs:S,dispatchGroup:x,programUniforms:_}),getShaderSource:k}},Io=(e,t,r,a,i,n)=>{let s=n+i.kvSequenceLength,l=i.nReps?i.nReps:1,d=i.vHiddenSize*l,p=i.kvNumHeads==null&&e.outputCount>1,h=p?[i.batchSize,i.numHeads,s,i.headSize]:void 0,u=[i.batchSize,i.sequenceLength,d],f=12,w={x:Math.ceil(i.vHeadSize/f),y:Math.ceil(i.sequenceLength/f),z:i.batchSize*i.numHeads},g=[{type:12,data:i.sequenceLength},{type:12,data:s},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:d},{type:12,data:n},{type:12,data:i.kvSequenceLength}],y=a?["type","type","type"]:["type","type"],x=[{dims:u,dataType:t.dataType,gpuDataType:0}];p&&x.push({dims:h,dataType:t.dataType,gpuDataType:0});let _=b=>{let S=B("probs",t.dataType,t.dims),k=B("v",r.dataType,r.dims),I=[S,k];a&&I.push(B("past_value",a.dataType,a.dims));let A=[Y("output",t.dataType,u)];p&&A.push(Y("present_value",t.dataType,h));let C=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${f}u;
  var<workgroup> tileQ: array<${S.type.value}, ${f*f}>;
  var<workgroup> tileK: array<${S.type.value}, ${f*f}>;
  ${b.registerUniforms(C).declareVariables(...I,...A)}
  ${b.mainStart([f,f,1])}
   let headIdx = workgroup_id.z;
   let m = global_id.y;
   let n = global_id.x;

   let offsetA = headIdx * (uniforms.M * uniforms.K) + m * uniforms.K;
   ${a&&p?`
    let pastValueOffset = headIdx * uniforms.N * uniforms.past_sequence_length + n;
    let vOffset = headIdx * uniforms.N * uniforms.kv_sequence_length + n;
      `:`
   let offsetB = headIdx * uniforms.N * uniforms.K + n;
            `}
    ${p?"let presentValueOffset = headIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${S.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${a&&p?`
        if (w + local_id.y < uniforms.past_sequence_length) {
          tileK[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else {
          tileK[idx] = v[vOffset + (w + local_id.y - uniforms.past_sequence_length) * uniforms.N];
        }
      `:`
        tileK[idx] = v[offsetB + (w + local_id.y) * uniforms.N];
      `}
        ${p?"present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileK[idx];":""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let currentBatchHeadNumber = workgroup_id.z % uniforms.num_heads;
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + currentBatchHeadNumber * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${a!==void 0};${e.outputCount}`,inputDependencies:y},getRunData:()=>({outputs:x,dispatchGroup:w,programUniforms:g}),getShaderSource:_}},or=(e,t,r,a,i,n,s,l,d,p,h)=>{let u=e.outputCount,f=p.kvNumHeads!==void 0||u>1?p.pastSequenceLength:0,w=f+p.kvSequenceLength,g=p.kvNumHeads===void 0&&u>1&&s?[t,r,s]:[t,r];d&&g.push(d);let y=e.compute(ko(e,t,r,u>1?s:void 0,d,p,h,f),{inputs:g,outputs:p.kvNumHeads===void 0&&u>1?[-1,1]:[-1]})[0];e.compute(So(e,y,p.batchSize*p.numHeads*p.sequenceLength,w),{inputs:[y],outputs:[]});let x=p.kvNumHeads===void 0&&u>1&&l?[y,a,l]:[y,a];e.compute(Io(e,y,a,u>1&&l?l:void 0,p,f),{inputs:x,outputs:p.kvNumHeads===void 0&&u>1?[0,2]:[0]})},Eo=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],a=t.sequenceLength,i=t.inputHiddenSize,n=t.headSize,s=12,l={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:a},{type:12,data:i},{type:12,data:n},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],h=u=>{let f=Y("output_q",d[0].dataType,r),w=Y("output_k",d[0].dataType,r),g=Y("output_v",d[0].dataType,r),y=B("input",d[0].dataType,d[0].dims),x=B("weight",d[1].dataType,d[1].dims),_=B("bias",d[2].dataType,d[2].dims),b=y.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${b}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${b}, ${s*s}>;
  var<workgroup> tileWeightK: array<${b}, ${s*s}>;
  var<workgroup> tileWeightV: array<${b}, ${s*s}>;
  ${u.registerUniforms(S).declareVariables(y,x,_,f,w,g)}
  ${u.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${b}(0);
    var valueK = ${b}(0);
    var valueV = ${b}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:p}),getShaderSource:h},{inputs:d,outputs:[-1,-1,-1]})},Gd=(e,t)=>{let r=xo(e.inputs,t),[a,i,n]=Eo(e,r);return or(e,a,i,n,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r,t)}}),Co,To,zo,Kd,fm=P(()=>{Ye(),Z(),oe(),Se(),se(),Co=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(a,i,n)=>{let s=i.length;if(s!==a.length)throw new Error(`${n}: num dimensions != ${s}`);i.forEach((l,d)=>{if(l!==a[d])throw new Error(`${n}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let a=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,a,"Invalid input scale"),r(e[2].dims,a,"Invalid input B"),r(e[3].dims,a,"Invalid input mean"),r(e[4].dims,a,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},To=(e,t)=>{let{epsilon:r,spatial:a,format:i}=t,n=e[0].dims,s=a?_e(n[n.length-1]):1,l=i==="NHWC"&&n.length>1?s:1,d=M.size(n)/s,p=a,h=p?n.length:n,u=B("x",e[0].dataType,e[0].dims,s),f=B("scale",e[1].dataType,e[1].dims,l),w=B("bias",e[2].dataType,e[2].dims,l),g=B("inputMean",e[3].dataType,e[3].dims,l),y=B("inputVar",e[4].dataType,e[4].dims,l),x=Y("y",e[0].dataType,h,s),_=()=>{let S="";if(a)S=`let cOffset = ${n.length===1?"0u":i==="NHWC"?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if(i==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let k=1;k<f.rank;k++)S+=`cIndices[${k}] = outputIndices[${k}];`;S+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return S},b=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(u,f,w,g,y,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${s}`)};
    ${_()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${w.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${y.getByOffset("cOffset")};
    let x = ${u.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${a}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p?[{type:12,data:d},...G(n)]:[{type:12,data:d}]})}},zo=e=>fe(e),Kd=(e,t)=>{let{inputs:r,outputCount:a}=e,i=zo({...t,outputCount:a});if(he.webgpu.validateInputContent&&Co(r,i),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(To(r,i))}}),Ao,Oo,Yd,mm=P(()=>{oe(),se(),Ao=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Oo=e=>{let t=e[0].dims,r=e[0].dims[2],a=M.size(t)/4,i=e[0].dataType,n=B("input",i,t,4),s=B("bias",i,[r],4),l=B("residual",i,t,4),d=Y("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(n,s,l,d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Yd=e=>{Ao(e.inputs),e.compute(Oo(e.inputs))}}),Ro,ue,Xd,Zd,Qd,Jd,ep,tp,rp,ap,ip,Do,np,sp,op,up,ar,lp,Nr,dp,pp,cp,hp,fp,mp,gp,wp,yp,$p,bp,vp,_p,xp,Sp,kp,Ua,Ip,yi,$i,Ep,Cp,Tp,Bo,Mo,zp,Yi=P(()=>{Z(),oe(),Se(),se(),Ro=(e,t,r,a,i,n)=>{let s=Math.ceil(t/4),l="";typeof i=="string"?l=`${i}(a)`:l=i("a");let d=B("inputData",r,[s],4),p=Y("outputData",a,[s],4);return`
      ${e.registerUniform("vec_size","u32").declareVariables(d,p)}

  ${n??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",l)}
  }`},ue=(e,t,r,a,i,n=e.dataType)=>({name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:s=>Ro(s,M.size(e.dims),e.dataType,n,r,a),getRunData:s=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(M.size(s[0].dims)/64/4)},programUniforms:[{type:12,data:Math.ceil(M.size(e.dims)/4)}]})}),Xd=e=>{e.compute(ue(e.inputs[0],"Abs","abs"))},Zd=e=>{e.compute(ue(e.inputs[0],"Acos","acos"))},Qd=e=>{e.compute(ue(e.inputs[0],"Acosh","acosh"))},Jd=e=>{e.compute(ue(e.inputs[0],"Asin","asin"))},ep=e=>{e.compute(ue(e.inputs[0],"Asinh","asinh"))},tp=e=>{e.compute(ue(e.inputs[0],"Atan","atan"))},rp=e=>{e.compute(ue(e.inputs[0],"Atanh","atanh"))},ap=e=>fe(e),ip=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ue(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Do=e=>{let t=e.length>=2&&e[1].data!==0?e[1].getFloat32Array()[0]:Li,r=e.length>=3&&e[2].data!==0?e[2].getFloat32Array()[0]:Fi;return fe({min:t,max:r})},np=(e,t)=>{let r=e.inputs.length===1?t:Do(e.inputs),a=Oe(e.inputs[0].dataType);e.compute(ue(e.inputs[0],"Clip",i=>`clamp(${i}, clip_min_, clip_max_)`,`
    const clip_min_: vec4<${a}> = vec4(${a}(${r.min}));
    const clip_max_: vec4<${a}> = vec4(${a}(${r.max}));
`,r.cacheKey),{inputs:[0]})},sp=e=>{e.compute(ue(e.inputs[0],"Ceil","ceil"))},op=e=>{e.compute(ue(e.inputs[0],"Cos","cos"))},up=e=>{e.compute(ue(e.inputs[0],"Cosh","cosh"))},ar=e=>fe(e),lp=(e,t)=>{let r=Oe(e.inputs[0].dataType);e.compute(ue(e.inputs[0],"Elu",a=>`elu_vf32(${a})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Nr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,dp=e=>{let t=Oe(e.inputs[0].dataType);e.compute(ue(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Nr(t)))},pp=e=>{e.compute(ue(e.inputs[0],"Exp","exp"))},cp=e=>{e.compute(ue(e.inputs[0],"Floor","floor"))},hp=e=>{let t=Oe(e.inputs[0].dataType);e.compute(ue(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Nr(t)))},fp=(e,t)=>{let r=Oe(e.inputs[0].dataType);e.compute(ue(e.inputs[0],"LeakyRelu",a=>`select(leaky_relu_alpha_ * ${a}, ${a}, ${a} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},mp=e=>{e.compute(ue(e.inputs[0],"Not",t=>`!${t}`))},gp=e=>{e.compute(ue(e.inputs[0],"Neg",t=>`-${t}`))},wp=e=>{e.compute(ue(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},yp=e=>{let t=Oe(e.inputs[0].dataType);e.compute(ue(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},$p=e=>{e.compute(ue(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},bp=e=>fe(e),vp=(e,t)=>{let r=Oe(e.inputs[0].dataType);e.compute(ue(e.inputs[0],"HardSigmoid",a=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${a} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},_p=e=>{e.compute(ue(e.inputs[0],"Sin","sin"))},xp=e=>{e.compute(ue(e.inputs[0],"Sinh","sinh"))},Sp=e=>{e.compute(ue(e.inputs[0],"Sqrt","sqrt"))},kp=e=>{e.compute(ue(e.inputs[0],"Tan","tan"))},Ua=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Ip=e=>{e.compute(ue(e.inputs[0],"Tanh",Ua))},yi=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ua("v")};
}
`,$i=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Ep=e=>{let t=Oe(e.inputs[0].dataType);e.compute(ue(e.inputs[0],"FastGelu",$i,yi(t),void 0,e.inputs[0].dataType))},Cp=(e,t)=>{let r=Oe(e.inputs[0].dataType);return e.compute(ue(e.inputs[0],"ThresholdedRelu",a=>`select(vec4<${r}>(0.0), ${a}, ${a} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Tp=e=>{e.compute(ue(e.inputs[0],"Log","log"))},Bo=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Mo=e=>`quick_gelu_impl(${e})`,zp=(e,t)=>{let r=Oe(e.inputs[0].dataType);e.compute(ue(e.inputs[0],"QuickGelu",Mo,Bo(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Po,No,Ap,gm=P(()=>{oe(),se(),Yi(),Po=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},No=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=B("input",e[0].dataType,e[0].dims,4),a=B("bias",e[0].dataType,[e[0].dims[2]],4),i=Y("output",e[0].dataType,t,4),n=M.size(t)/4,s=xe(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(r,a,i)}

  ${Nr(s)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ap=e=>{Po(e.inputs),e.compute(No(e.inputs))}}),Uo,Wo,je,Op,Rp,Dp,Bp,Mp,Pp,Np,Up,Wp,Vp,wm=P(()=>{Z(),oe(),se(),Uo=(e,t,r,a,i,n,s,l,d,p,h,u)=>{let f,w;typeof l=="string"?f=w=(b,S)=>`${l}((${b}),(${S}))`:typeof l=="function"?f=w=l:(f=l.scalar,w=l.vector);let g=Y("outputData",h,a.length,4),y=B("aData",d,t.length,4),x=B("bData",p,r.length,4),_;if(i)if(n){let b=M.size(t)===1,S=M.size(r)===1,k=t.length>0&&t[t.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;b||S?_=g.setByOffset("global_idx",w(b?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):_=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${y.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",w(s||k?y.getByOffset("offsetA / 4u"):`${y.type.value}(${y.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else _=g.setByOffset("global_idx",w(y.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!n)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let b=(S,k,I="")=>{let A=`aData[indexA${k}][componentA${k}]`,C=`bData[indexB${k}][componentB${k}]`;return`
            let outputIndices${k} = ${g.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${y.broadcastedIndicesToOffset(`outputIndices${k}`,g)};
            let offsetB${k} = ${x.broadcastedIndicesToOffset(`outputIndices${k}`,g)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${S}[${k}] = ${I}(${f(A,C)});
          `};h===9?_=`
            var data = vec4<u32>(0);
            ${b("data",0,"u32")}
            ${b("data",1,"u32")}
            ${b("data",2,"u32")}
            ${b("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:_=`
            ${b("outputData[global_idx]",0)}
            ${b("outputData[global_idx]",1)}
            ${b("outputData[global_idx]",2)}
            ${b("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(y,x,g)}

        ${u??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${_}
      }`},Wo=(e,t,r,a,i,n,s=r.dataType)=>{let l=!M.areEqual(r.dims,a.dims),d=r.dims,p=M.size(r.dims),h=!1,u=!1,f=[l];if(l){let w=Ht.calcShape(r.dims,a.dims,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");d=w,p=M.size(d);let g=M.size(r.dims)===1,y=M.size(a.dims)===1,x=r.dims.length>0&&r.dims[r.dims.length-1]%4===0,_=a.dims.length>0&&a.dims[a.dims.length-1]%4===0;f.push(g),f.push(y),f.push(x),f.push(_);let b=1;for(let S=1;S<d.length;S++){let k=r.dims[r.dims.length-S]??1,I=a.dims[a.dims.length-S]??1;if(k===I)b*=k;else break}b%4===0?(u=!0,h=!0):(g||y||x||_)&&(h=!0)}else h=!0;return f.push(h),{name:e,shaderCache:{hint:t+f.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>Uo(w,r.dims,a.dims,d,h,l,u,i,r.dataType,a.dataType,s,n),getRunData:()=>({outputs:[{dims:d,dataType:s}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(M.size(d)/4)},...G(r.dims,a.dims,d)]})}},je=(e,t,r,a,i,n)=>{e.compute(Wo(t,i??"",e.inputs[0],e.inputs[1],r,a,n))},Op=e=>{je(e,"Add",(t,r)=>`${t}+${r}`)},Rp=e=>{je(e,"Div",(t,r)=>`${t}/${r}`)},Dp=e=>{je(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Bp=e=>{je(e,"Mul",(t,r)=>`${t}*${r}`)},Mp=e=>{let t=B("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;je(e,"Pow",{scalar:(r,a)=>`pow_custom(${r},${a})`,vector:(r,a)=>`pow_vector_custom(${r},${a})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Pp=e=>{je(e,"Sub",(t,r)=>`${t}-${r}`)},Np=e=>{je(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Up=e=>{je(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Wp=e=>{je(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Vp=e=>{je(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Vo,Ho,qo,Lo,Hp,qp,ym=P(()=>{Z(),oe(),Se(),se(),Vo=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,a=e[r],i=a.dataType,n=a.dims.length;e.forEach((s,l)=>{if(l!==r){if(s.dataType!==i)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape");s.dims.forEach((d,p)=>{if(p!==t&&d!==a.dims[p])throw new Error("non concat dimensions must match")})}})},Ho=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,qo=(e,t)=>{let r=e.length,a=[];for(let i=0;i<r;++i){let n=t.setByOffset("global_idx",e[i].getByIndices("indices"));r===1?a.push(n):i===0?a.push(`if (inputIndex == ${i}u) { ${n} }`):i===r-1?a.push(`else { ${n} }`):a.push(`else if (inputIndex == ${i}) { ${n} }`)}return a.join(`
`)},Lo=(e,t,r,a)=>{let i=M.size(r),n=new Array(e.length),s=new Array(e.length),l=0,d=[],p=[],h=[{type:12,data:i}];for(let y=0;y<e.length;++y)l+=e[y].dims[t],n[y]=l,p.push(e[y].dims.length),s[y]=B(`input${y}`,a,p[y]),d.push("rank"),h.push({type:12,data:n[y]});for(let y=0;y<e.length;++y)h.push(...G(e[y].dims));h.push(...G(r));let u=Y("output",a,r.length),f=u.indicesGet("indices",t),w=Array.from(Array(n.length).keys()).map(y=>`uniforms.sizeInConcatAxis${y}`).join(","),g=y=>`

  ${(()=>{y.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)y.registerUniform(`sizeInConcatAxis${x}`,"u32");return y.declareVariables(...s,u)})()}

  ${Ho(n.length,w)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${u.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${w});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${qo(s,u)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:a}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h}),getShaderSource:g}},Hp=(e,t)=>{let r=e.inputs,a=r[0].dims,i=M.normalizeAxis(t.axis,a.length);Vo(r,i);let n=a.slice();n[i]=r.reduce((l,d)=>l+(d.dims.length>i?d.dims[i]:0),0);let s=r.filter(l=>M.size(l.dims)>0);e.compute(Lo(s,i,n,r[0].dataType),{inputs:s})},qp=e=>fe({axis:e.axis})}),gt,wt,yt,Xi,bt=P(()=>{Z(),oe(),gt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},wt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},yt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Xi=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,a]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:a}}else if(t==="Clip"){let[r,a]=e?.activation_params||[Li,Fi];return{activation:t,clipMax:a,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),ze,Zi,ea=P(()=>{ze=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Zi=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Qi,Lp=P(()=>{Qi=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Fo,jo,Gr,Wa,Go,Kr,Ko,Ji,ta=P(()=>{Z(),oe(),se(),bt(),ea(),Fo=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,jo=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Gr=(e,t,r="f32",a,i=!1,n=32,s=!1,l=32)=>{let d=t[1]*e[1],p=t[0]*e[0],h=i?d:n,u=i?n:d,f=h/t[0],w=n/t[1];if(!((i&&f===4&&e[1]===4||!i&&(f===3||f===4))&&h%t[0]===0&&n%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${r}>, ${h/f}>, ${u}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${f};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${s?`${Math.ceil(l/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${l}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${w};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Fo(i,a)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${a?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${f===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${jo(i,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Wa=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Go=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Kr=(e,t,r="f32",a,i=!1,n=32,s=!1,l=32,d=!1)=>{let p=e[1]*t[1],h=e[0]*t[0],u=i?p:n,f=i?n:p;if(!(f%t[1]===0&&u%t[0]===0&&n%t[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let w=f/t[1],g=u/t[0],y=n/t[1],x=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${h};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          ${Wa(i,a)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${a?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${i?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${w};
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${y};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Wa(i,a)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${a?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Go(i)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${u}>, ${f}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${h}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(l/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${l}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},Ko=(e,t,r,a,i,n=!1)=>{let[s,l,d]=i,[p,h,u,f]=a,w=sr(s,d),g=sr(l,d),y=xe(a[0].type.tensor),x=()=>{let b=h.rank,S=p.rank,k=`var aIndices: ${h.type.indices};`;for(let I=b-2-1,A=S-1;I>=0;I--,A--)k+=`
aIndices[${I}] = ${S>1?`batchIndices[${A}]`:"batchIndices"};`;return w.forEach(I=>{k+=`
aIndices[${I}] = 0;`}),k+=`
aIndices[${b-2}] = u32(row);
                   aIndices[${b-1}] = u32(colIn);`,k},_=()=>{let b=u.rank,S=p.rank,k=`var bIndices: ${u.type.indices};`;for(let I=b-2-1,A=S-1;I>=0;I--,A--)k+=`
bIndices[${I}] = ${S>1?`batchIndices[${A}]`:"batchIndices"};`;return g.forEach(I=>{k+=`
bIndices[${I}] = 0;`}),k+=`
bIndices[${b-2}] = u32(row);
                   bIndices[${b-1}] = u32(colIn);`,k};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${p.type.indices}) -> ${ze(e,y)} {
      var value = ${ze(e,y)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${x()}
        value = ${h.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${p.type.indices}) -> ${ze(e,y)} {
      var value = ${ze(e,y)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${_()}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ze(e,y)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${ze(e,y)}(bias[row])`};`:""}
        ${r}
        ${f.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Ji=(e,t,r,a,i=!1)=>{let n=e[0].dims,s=e[1].dims,l=n.slice(0,-2),d=s.slice(0,-2),p=a?a.slice(0,-2):r.slice(0,-2),h=M.size(p),u=n[n.length-2],f=n[n.length-1],w=s[s.length-1],g=f%4===0&&w%4===0,y=u<=8?[4,1,1]:[4,4,1],x=[8,8,1],_=[Math.ceil(w/x[0]/y[0]),Math.ceil(u/x[1]/y[1]),Math.ceil(h/x[2]/y[2])],b=g?4:1,S=[...l,u,f/b],k=S.length,I=[...d,f,w/b],A=I.length,C=[h,u,w/b],R=[{type:6,data:u},{type:6,data:w},{type:6,data:f}];wt(t,R),R.push(...G(p,S,I));let V=["rank","rank"],U=e.length>2;U&&(R.push(...G(e[2].dims)),V.push("rank")),R.push(...G(C));let J=F=>{let ie=p.length,ee=ji("batchDims",e[0].dataType,ie,1),te=xe(e[0].dataType),L=B("a",e[0].dataType,k,b),de=B("b",e[1].dataType,A,b),ne=Y("result",e[0].dataType,C.length,b),j=[L,de];if(U){let we=i?b:1;j.push(B("bias",e[2].dataType,e[2].dims.length,we))}let re=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];yt(t,re);let O=xe(ne.type.tensor),H=gt(t,ne.type.value,O),ae=Ko(b,U,H,[ee,L,de,ne],[l,d,p],i);return`
  ${F.registerUniforms(re).registerInternalVariables(ee).declareVariables(...j,ne)}
  ${ae}
  ${g?Gr(y,x,te,ee):Kr(y,x,te,ee)}
                   `};return{name:"MatMul",shaderCache:{hint:`${y};${t.activation};${g};${i}`,inputDependencies:V},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:R}),getShaderSource:J}}}),Yo,Fp,$m=P(()=>{Z(),$t(),se(),bt(),ea(),Lp(),ta(),Yo=(e,t,r,a,i=!1,n,s=4,l=4,d=4,p="f32")=>{let h=V=>{switch(V){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${V} is not supported.`)}},u=V=>{switch(V){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${V} is not supported.`)}},f=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,w=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,g=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",y=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",_=e?"col":"row",b=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${_} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${_} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${_} % inChannels;
    var resData = ${ze(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${y}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${h(s)}
    }
    return resData;`,S=e?t&&a?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${ze(s,p)}(0.0);`:a&&r?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${ze(s,p)}(0.0);`,k=`${u(l)}`,I=ze(d,p),A=ze(e?s:l,p),C=ze(e?l:s,p),R=gt(n,I,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?S:k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?k:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${w}
      ${Zi(i)}
      ${R}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Fp=(e,t,r,a,i,n,s,l)=>{let d=t.format==="NHWC",p=d?e[0].dims[3]:e[0].dims[1],h=r[0],u=d?r[2]:r[3],f=d?r[1]:r[2],w=d?r[3]:r[1],g=d&&(p%4===0||p%3===0)&&w%4===0,y=d?w:u*f,x=d?u*f:w,_=[8,8,1],b=a<=8?[4,1,1]:[4,4,1],S=[Math.ceil(y/_[0]/b[0]),Math.ceil(x/_[1]/b[1]),Math.ceil(h/_[2]/b[2])];be("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let k=g?d&&p%4!==0?3:4:1,I=_[1]*b[1],A=_[0]*b[0],C=Math.max(_[0]*k,_[1]),R=a%I===0,V=i%A===0,U=n%C===0,J=g?[k,4,4]:[1,1,1],F=[{type:6,data:a},{type:6,data:i},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];wt(t,F),F.push(...G(e[0].dims,e[1].dims));let ie=["rank","rank"];s&&(F.push(...G(e[2].dims)),ie.push("rank")),F.push(...G(r));let ee=te=>{let L=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];yt(t,L);let de=g?4:1,ne=xe(e[0].dataType),j=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${ne}>`:ne}) {
        result[flatIndex] = ${g?`vec4<${ne}>`:ne}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${ne}>`:ne}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,re=B("x",e[0].dataType,e[0].dims.length,k===3?1:k),O=B("w",e[1].dataType,e[1].dims.length,de),H=[re,O],ae=Y("result",e[0].dataType,r.length,de);if(s){let we=B("bias",e[2].dataType,e[2].dims.length,de);H.push(we),j+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${ne}>`:ne} {
          return bias[coords.${d?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${Qi("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${te.registerUniforms(L).declareVariables(...H,ae)}
        ${j}
        ${Yo(d,R,V,U,s,t,J[0],J[1],J[2],ne)}
        ${g?Gr(b,_,ne,void 0,!d,C):Kr(b,_,ne,void 0,!d,C,!1,void 0,l)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${k};${g};${R};${V};${U};${I};${A};${C}`,inputDependencies:ie},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:F}),getShaderSource:ee}}}),Xo,Va,Yt,Zo,Ha,Qo,jp,Gp,bm=P(()=>{Z(),$t(),oe(),se(),bt(),ea(),Xo=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Va=e=>typeof e=="number"?[e,e,e]:e,Yt=(e,t)=>t<=1?e:e+(e-1)*(t-1),Zo=(e,t,r,a=1)=>{let i=Yt(t,a);return Math.floor((e[0]*(r-1)-r+i)/2)},Ha=(e,t,r,a,i)=>{i==null&&(i=Zo(e,t[0],a[0]));let n=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*i>=t[s]&&(n[s]=Math.trunc((e[s]-t[s]+2*i)/a[s]+1));return n},Qo=(e,t,r,a,i,n,s,l,d,p)=>{let h,u,f,w;if(e==="VALID"&&(e=0),typeof e=="number"){h={top:e,bottom:e,left:e,right:e,front:e,back:e};let g=Ha([t,r,a,1],[l,d,p],1,[i,n,s],e);u=g[0],f=g[1],w=g[2]}else if(Array.isArray(e)){if(!e.every((y,x,_)=>y===_[0]))throw Error(`Unsupported padding parameter: ${e}`);h={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let g=Ha([t,r,a,1],[l,d,p],1,[i,n,s],e[0]);u=g[0],f=g[1],w=g[2]}else if(e==="SAME_UPPER"){u=Math.ceil(t/i),f=Math.ceil(r/n),w=Math.ceil(a/s);let g=(u-1)*i+l-t,y=(f-1)*n+d-r,x=(w-1)*s+p-a,_=Math.floor(g/2),b=g-_,S=Math.floor(y/2),k=y-S,I=Math.floor(x/2),A=x-I;h={top:S,bottom:k,left:I,right:A,front:_,back:b}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:h,outDepth:u,outHeight:f,outWidth:w}},jp=(e,t,r,a,i,n=!1,s="channelsLast")=>{let l,d,p,h,u;if(s==="channelsLast")[l,d,p,h,u]=e;else if(s==="channelsFirst")[l,u,d,p,h]=e;else throw new Error(`Unknown dataFormat ${s}`);let[f,,w,g,y]=t,[x,_,b]=Va(r),[S,k,I]=Va(a),A=Yt(w,S),C=Yt(g,k),R=Yt(y,I),{padInfo:V,outDepth:U,outHeight:J,outWidth:F}=Qo(i,d,p,h,x,_,b,A,C,R),ie=n?f*u:f,ee=[0,0,0,0,0];return s==="channelsFirst"?ee=[l,ie,U,J,F]:s==="channelsLast"&&(ee=[l,U,J,F,ie]),{batchSize:l,dataFormat:s,inDepth:d,inHeight:p,inWidth:h,inChannels:u,outDepth:U,outHeight:J,outWidth:F,outChannels:ie,padInfo:V,strideDepth:x,strideHeight:_,strideWidth:b,filterDepth:w,filterHeight:g,filterWidth:y,effectiveFilterDepth:A,effectiveFilterHeight:C,effectiveFilterWidth:R,dilationDepth:S,dilationHeight:k,dilationWidth:I,inShape:e,outShape:ee,filterShape:t}},Gp=(e,t,r,a,i,n)=>{let s=n==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let l=[64,1,1],d={x:r.map((x,_)=>_)},p=[Math.ceil(Xo(d.x.map(x=>r[x]))/l[0]),1,1];be("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let h=1,u=M.size(r),f=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];wt(t,f),f.push(...G(e[0].dims,e[1].dims));let w=["rank","rank"],g=e.length===3;g&&(f.push(...G(e[2].dims)),w.push("rank")),f.push(...G(r));let y=x=>{let _=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:a.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];yt(t,_);let b=1,S=xe(e[0].dataType),k=B("x",e[0].dataType,e[0].dims.length,h),I=B("W",e[1].dataType,e[1].dims.length,b),A=[k,I],C=Y("result",e[0].dataType,r.length,b),R="";if(g){let J=B("bias",e[2].dataType,e[2].dims.length,b);A.push(J),R+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${S} {
          return bias[${s?q("coords",4,5):q("coords",1,5)}];
        }`}let V=ze(h,S),U=gt(t,V,S);return`
            ${R}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${x.registerUniforms(_).declareVariables(...A,C)}
          ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${C.offsetToIndices("global_idx")};
              let batch = ${q("coords",0,k.rank)};
              let d2 = ${s?q("coords",k.rank-1,k.rank):q("coords",1,k.rank)};
              let xFRCCorner = vec3<u32>(${s?q("coords",1,k.rank):q("coords",2,k.rank)},
              ${s?q("coords",2,k.rank):q("coords",3,k.rank)},
              ${s?q("coords",3,k.rank):q("coords",4,k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?q("uniforms.x_shape",1,k.rank):q("uniforms.x_shape",2,k.rank)};
              let xShapeZ = ${s?q("uniforms.x_shape",2,k.rank):q("uniforms.x_shape",3,k.rank)};
              let xShapeW = ${s?q("uniforms.x_shape",3,k.rank):q("uniforms.x_shape",4,k.rank)};
              let xShapeU = ${s?q("uniforms.x_shape",4,k.rank):q("uniforms.x_shape",1,k.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${g?"value = value + getBiasByOutputCoords(coords)":""};
              ${U}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${h};${g}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:f}),getShaderSource:y}}}),bi,Kp,vm=P(()=>{Z(),oe(),se(),Zp(),bt(),bi=(e,t,r)=>{let a=e.length>2,i=a?"value += b[output_channel];":"",n=e[0].dims,s=e[1].dims,l=s[0]/t.group,d=t.format==="NHWC",p=Ur(n,s,t.dilations,t.pads,t.strides,d),h=M.size(p),u=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:l}];wt(t,u),u.push(...G(n,s));let f=["rank","rank"];a&&(u.push(...G(e[2].dims)),f.push("rank")),u.push(...G(p));let w=g=>{let y=Y("output",e[0].dataType,p.length),x=xe(y.type.tensor),_=gt(t,y.type.value,x),b=B("x",e[0].dataType,n.length),S=B("w",e[1].dataType,s.length),k=[b,S];a&&k.push(B("b",e[2].dataType,e[2].dims.length));let I=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];return yt(t,I),`
  ${g.registerUniforms(I).declareVariables(...k,y)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${y.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel / uniforms.output_channels_per_group;

    var value: ${y.type.value} = ${y.type.value}(0);
    for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
      let input_channel = group_id * uniforms.w_shape[1] + wInChannel;
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[${d?1:2}]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[${d?2:3}]) {
            continue;
          }

          let xVal = ${d?b.get("batch","xHeight","xWidth","input_channel"):b.get("batch","input_channel","xHeight","xWidth")};
          let wVal = ${S.get("output_channel","wInChannel","wHeight","wWidth")};
          value += xVal*wVal;
        }
      }
    }
    ${i}
    ${_}
    ${y.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:t.cacheKey,inputDependencies:f},getRunData:()=>({outputs:[{dims:r?r(p):p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:u}),getShaderSource:w}},Kp=(e,t,r)=>{let a=e.length>2,i=_e(r[3]),n=_e(r[2]),s=M.size(r)/i/n,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],p=[r[0],r[1],r[2],r[3]/i],h=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];wt(t,h),h.push(...G(l,d,p));let u=(n-1)*t.strides[1]+d[1],f=w=>{let g=Y("output",e[0].dataType,p.length,i),y=xe(g.type.tensor),x=gt(t,g.type.value,y),_=B("x",e[0].dataType,l.length,i),b=B("w",e[1].dataType,d.length,i),S=[_,b];a&&S.push(B("b",e[2].dataType,e[2].dims,i));let k=a?"value += b[output_channel];":"",I=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return yt(t,I),`
  ${w.registerUniforms(I).declareVariables(...S,g)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${n}u;
    let col = (index1 % width1) * ${n}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${_.type.value}, ${u}>;
    var values: array<${g.type.value}, ${n}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${u}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${_.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${_.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${b.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${n}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${n}u; i++) {
      var value = values[i];
      ${k}
      ${x}
      ${g.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${n};${u};${d[0]};${d[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:h}),getShaderSource:f}}}),vi,Jo,Yp,Xp=P(()=>{Z(),oe(),ta(),se(),bt(),vi=(e,t,r,a,i=!1)=>{let n=e[0].dims,s=e[1].dims,l=n[n.length-2],d=s[s.length-1],p=n[n.length-1],h=_e(d),u=_e(p),f=_e(l),w=M.size(r)/h/f,g=e.length>2,y=a?a.slice(0,-2):r.slice(0,-2),x=[M.size(y),l,d],_=[{type:12,data:w},{type:12,data:l},{type:12,data:d},{type:12,data:p}];wt(t,_),_.push(...G(y,n,s)),g&&_.push(...G(e[2].dims)),_.push(...G(x));let b=S=>{let k=ji("batch_dims",e[0].dataType,y.length),I=B("a",e[0].dataType,n.length,u),A=B("b",e[1].dataType,s.length,h),C=Y("output",e[0].dataType,x.length,h),R=xe(C.type.tensor),V=gt(t,C.type.value,R),U=[I,A],J="";if(g){let j=i?h:1;U.push(B("bias",e[2].dataType,e[2].dims.length,j)),J=`${i?`value += bias[col / ${j}];`:`value += ${C.type.value}(bias[row + i]);`}`}let F=n.slice(0,-2),ie=s.slice(0,-2),ee=sr(F,y),te=sr(ie,y),L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];yt(t,L);let de=(j,re)=>{let O=j.rank,H=j.name;if(O===2)return`var ${H}_indices = ${j.type.indices}(0u, 0u);`;let ae=k.rank,we=`var ${H}_indices: ${j.type.indices};`;for(let me=O-2-1,Be=ae-1;me>=0;me--,Be--)we+=`
${H}_indices[${me}] = ${ae>1?`batch_indices[${Be}]`:"batch_indices"};`;return re.forEach(me=>{we+=`
${H}_indices[${me}] = 0;`}),we+=`${H}_indices[${O-2}] = 0u;
                     ${H}_indices[${O-1}] = 0u;`,we},ne=()=>{let j=`var a_data: ${I.type.value};`;for(let re=0;re<u;re++)j+=`
              let b_data${re} = b[(b_offset + (k + ${re}) * uniforms.N + col) / ${h}];`;for(let re=0;re<f;re++){j+=`a_data = a[(a_offset + (row + ${re}) * uniforms.K + k) / ${u}];`;for(let O=0;O<u;O++)j+=`
            values[${re}] = fma(${A.type.value}(a_data${u===1?"":`[${O}]`}), b_data${O}, values[${re}]);
`}return j};return`
  ${S.registerUniforms(L).registerInternalVariables(k).declareVariables(...U,C)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${k.offsetToIndices("batch")};`}
    ${de(I,ee)}
    let a_offset = ${I.indicesToOffset("a_indices")};
    ${de(A,te)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${C.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${u}) {
      ${ne()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${J}
      ${V}
      let cur_indices = ${C.type.indices}(batch, row + i, col);
      let offset = ${C.indicesToOffset("cur_indices")};
      ${C.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${u};${f};${i}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:_}),getShaderSource:b}},Jo=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Yp=e=>{Jo(e.inputs);let t=Ht.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],a=e.inputs[0].dims[e.inputs[0].dims.length-1];r<8&&a<8?e.compute(vi(e.inputs,{activation:""},t)):e.compute(Ji(e.inputs,{activation:""},t))}}),Ur,zr,eu,Ar,_i,tu,ru,au,xi,Zp=P(()=>{oe(),$m(),bm(),ta(),vm(),bt(),Xp(),Ft(),Ur=(e,t,r,a,i,n)=>{let s=e[0],l=e.slice(n?1:2,n?3:4),d=l.length,p=t[0],h=t.slice(2).map((f,w)=>f+(f-1)*(r[w]-1)),u=l.map((f,w)=>f+a[w]+a[w+d]).map((f,w)=>Math.floor((f-h[w]+i[w])/i[w]));return u.splice(0,0,s),u.splice(n?3:1,0,p),u},zr=[2,3,1,0],eu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[1]*t.group;if(r!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Ar=(e,t)=>{let r=e.kernelShape.slice();for(let n=2;n<t[1].dims.length;++n)r[n-2]===0&&(r[n-2]=t[1].dims[n]);let a=e.pads.slice();Fr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,a,e.format==="NHWC",e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:r,pads:a}),i},_i=e=>{let t=Xi(e),r=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,n=e.group,s=e.kernel_shape,l=e.pads,d=e.strides,p=e.w_is_const();return{autoPad:a,format:r,dilations:i,group:n,kernelShape:s,pads:l,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},tu=(e,t,r)=>{let a=Ar(r,t),i=r.format==="NHWC";if(r.group!==1){if(!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1){let A=Ur(t[0].dims,t[1].dims,r.dilations,a.pads,r.strides,i),C=e.kernelCustomData.wT??e.compute(et(t[1],zr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=C);let R=[t[0],C];t.length===3&&R.push(t[2]),e.compute(Kp(R,a,A),{inputs:R})}else e.compute(bi(t,a));return}let n=t.length===3,s=t[0].dims[i?1:2],l=t[0].dims[i?2:3],d=t[0].dims[i?3:1],p=t[1].dims[2],h=t[1].dims[3],u=Ur(t[0].dims,t[1].dims,r.dilations,a.pads,r.strides,i),f=u[i?1:2],w=u[i?2:3],g=u[i?3:1],y=i&&p===s&&h===l&&r.pads[0]===0&&r.pads[1]===0;if(y||p===1&&h===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let A=u[0],C,R,V,U=[];if(i){let ie=e.kernelCustomData.wT??e.compute(et(t[1],zr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=ie),y){let ee=s*l*d;C=t[0].reshape([1,A,ee]),R=ie.reshape([1,ee,g]),V=[1,A,g]}else C=t[0].reshape([A,s*l,d]),R=ie.reshape([1,d,g]),V=[A,f*w,g];U.push(C),U.push(R)}else C=t[0].reshape([A,d,s*l]),R=t[1].reshape([1,g,d]),V=[A,g,f*w],U.push(R),U.push(C);n&&U.push(t[2]);let J=V[2],F=U[0].dims[U[0].dims.length-1];J<8&&F<8?e.compute(vi(U,a,u,V,i),{inputs:U}):e.compute(Ji(U,a,u,V,i),{inputs:U});return}let x=!0,_=e.kernelCustomData.wT??e.compute(et(t[1],zr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=_);let b=[t[0],_];n&&b.push(t[2]);let S=i?f*w:g,k=i?g:f*w,I=p*h*d;e.compute(Fp(b,a,u,S,k,I,n,x),{inputs:b})},ru=(e,t)=>{let r=t.format==="NHWC",a=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],n=[1].concat(t.strides),s=[1].concat(t.dilations),l=[1].concat(t.kernelShape),d=Ar({...t,pads:i,strides:n,dilations:s,kernelShape:l},a);e.compute(bi(a,d,p=>r?[p[0],p[2],p[3]]:[]))},au=(e,t,r)=>{let a=r.format==="NHWC"?"channelsLast":"channelsFirst",i=Ar(r,t),n=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=jp(t[0].dims,t[1].dims,r.strides,r.dilations,n,!1,a);e.compute(Gp(t,i,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],a))},xi=(e,t)=>{eu(e.inputs,t),e.inputs[0].dims.length===3?ru(e,t):e.inputs[0].dims.length===5?au(e,e.inputs,t):tu(e,e.inputs,t)}}),iu,Qp,_m=P(()=>{Z(),$t(),se(),bt(),ea(),Lp(),ta(),iu=(e,t=!1,r,a,i=4)=>{let n=x=>{switch(x){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${a}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${x} is not supported.`)}},s=e?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,l=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,d=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",p=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",h=e?"row":"col",u=e?"col":"row",f=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${h} / outWidth;
      let outCol = ${h} % outWidth;

      let WRow = ${u} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${u} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${d}) || fract(xR) > 0.0) {
        return ${a}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${p}) || fract(xC) > 0.0) {
        return ${a}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${u} % inChannels;
      ${s}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${i}];`,w=e?`
      let col = colIn * ${i};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${f}
      }
      return ${a}(0.0);`:`
      let col = colIn * ${i};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${f}
      }
      return ${a}(0.0);`,g=`
      let col = colIn * ${i};
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${e?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${n(i)}
      }
      return ${a}(0.0);
      `,y=gt(r,a);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${a} {
    ${e?w:g}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${a} {
    ${e?g:w}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${a}) {
    let col = colIn * ${i};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${l}
      ${Zi(t)}
      ${y}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${i}] = value;
    }
  }`},Qp=(e,t,r,a,i,n,s,l)=>{let d=t.format==="NHWC",p=d?e[0].dims[3]:e[0].dims[1],h=r[0],u=d?r[2]:r[3],f=d?r[1]:r[2],w=d?r[3]:r[1],g=d&&p%4===0&&p%3&&w%4===0,y=d?w:u*f,x=d?u*f:w,_=[8,8,1],b=a<=8?[4,1,1]:[4,4,1],S=[Math.ceil(y/_[0]/b[0]),Math.ceil(x/_[1]/b[1]),Math.ceil(h/_[2]/b[2])];be("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${S}`);let k=g?4:1,I=Math.max(_[0]*k,_[1]),A=g?4:1,C=[t.kernelShape[d?1:2],t.kernelShape[d?2:3]],R=[C[0]+(t.dilations[0]<=1?0:(C[0]-1)*(t.dilations[0]-1)),C[1]+(t.dilations[1]<=1?0:(C[1]-1)*(t.dilations[1]-1))],V=[R[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),R[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],U=[{type:6,data:a},{type:6,data:i},{type:6,data:n},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:C},{type:6,data:V}];wt(t,U),U.push(...G(e[0].dims,e[1].dims));let J=["rank","rank"];s&&(U.push(...G(e[2].dims)),J.push("rank")),U.push(...G(r));let F=ie=>{let ee=B("x",e[0].dataType,e[0].dims.length,A),te=B("w",e[1].dataType,e[1].dims.length,1),L=Y("result",e[0].dataType,r.length,A),de=[ee,te],ne="";if(s){let O=B("bias",e[2].dataType,e[2].dims.length,A);de.push(O),ne+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${O.type.value} {
            return bias[coords.${d?"w":"y"}${g?"/ 4":""}];
          }`}let j=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:C.length},{name:"pads",type:"i32",length:V.length}];yt(t,j);let re=xe(e[0].dataType,1);if(re!=="f16"&&re!=="f32")throw new Error(`elemType ${re} is not supported.`);return`
        ${Qi("uniforms.result_strides")}
        ${ie.registerUniforms(j).declareVariables(...de,L)};
        ${ne}
        ${iu(d,s,t,ee.type.value,k)}
        ${g?Gr(b,_,re,void 0,!d,I):Kr(b,_,re,void 0,!d,I,!1,void 0,l)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${b};${_};${g}`,inputDependencies:J},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:U}),getShaderSource:F}}}),nu,Si,xm=P(()=>{Z(),$t(),oe(),se(),nu=(e,t,r,a,i,n=!1,s,l,d=!1)=>{let p=d?1:2,h=d?2:3,u=d?3:1,f=n?2:1,w=`
  fn setOutputAtIndex(flatIndex : u32, value : ${n?`vec4<${s}>`:s}) {
    result[flatIndex] = ${n?`vec4<${s}>`:s}(value);
  }`;a&&(w+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${n?`vec4<${s}>`:s} {
      return bias[coords.${d?"w":"y"}${n?"/ 4":""}];
    }`);let g=n?4:1,y=B("W",t[1].dataType,t[1].dims.length,g),x=B("Dy",t[0].dataType,t[0].dims.length,g),_=[x,y];a&&_.push(B("bias",t[2].dataType,[r[u]].length,g));let b=Y("result",t[0].dataType,r.length,g),S=`{
        let batch: u32 = ${i?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${i?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${i?"global_id.y":"workgroup_id.y"} * ${f};
        let d1: u32 = ${i?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${s}>, ${f}>;
        for (var i = 0; i < ${f}; i++) {
          dotProd[i] = vec4<${s}>(0.0);
        }
        for (var wR: u32 = 0; wR < uniforms.filter_dims[0]; wR = wR + 1) {
          var dyR = (${s}(dyCorner.x) + ${s}(wR)) / ${s}(uniforms.strides.x);
          let wRPerm = uniforms.filter_dims[0] - 1 - wR;
          if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[1]) ||
              fract(dyR) > 0.0 || wRPerm < 0) {
            continue;
          }
          let idyR: u32 = u32(dyR);

          for (var wC: u32 = 0; wC < uniforms.filter_dims[1]; wC = wC + 1) {
            let dyC = (${s}(dyCorner.y) + ${s}(wC)) / ${s}(uniforms.strides.y);
            let dyC2 = (${s}(dyCorner.y) + 1.0 + ${s}(wC)) / ${s}(uniforms.strides.y);
            let wCPerm = uniforms.filter_dims[1] - 1 - wC;
            if (wCPerm < 0) {
              continue;
            }
            var bDyCVal = true;
            var bDyCVal2 = true;
            if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[2]) ||
                fract(dyC) > 0.0) {
              bDyCVal = false;
            }
            if (dyC2 < 0.0 || dyC2 >= ${s}(uniforms.Dy_shape[2]) ||
                fract(dyC2) > 0.0) {
              bDyCVal2 = false;
            }

            let idyC: u32 = u32(dyC);
            let idyC2: u32 = u32(dyC2);
            if (bDyCVal && bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2 :u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${x.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${x.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${s}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${u}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${x.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${x.get("batch","idyR","idyC2","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[1] = dotProd[1] + tmpval;
              }
            }
          }
        }

        for (var i: u32 = 0; i < ${f}; i = i + 1) {
          let value = dotProd[i] + ${a?"bias[c+i]":`vec4<${s}>(0.0)`};
          ${b.set("batch","r","c + i","d1","value")};
        }
      }`,k=`
          let outputIndices = ${b.offsetToIndices("global_idx")};
          let batch = ${b.indicesGet("outputIndices",0)};
          let d1 = ${b.indicesGet("outputIndices",u)};
          let r = ${b.indicesGet("outputIndices",p)};
          let c = ${b.indicesGet("outputIndices",h)};
          let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
          let dyRCorner = dyCorner.x;
          let dyCCorner = dyCorner.y;
          let groupId = d1 / uniforms.output_channels_per_group;
          let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
          // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
          // ? = to be determined. : = across all values in that axis.
          var dotProd = ${s}(0.0);
          for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
            if (wR % uniforms.dilations.x != 0) {
              continue;
            }
            let dyR = (${s}(dyRCorner) + ${s}(wR)) / ${s}(uniforms.strides[0]);
            let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
            if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[${p}]) || fract(dyR) > 0.0 ||
                wRPerm < 0) {
              continue;
            }
            let idyR: u32 = u32(dyR);

            for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
              if (wC % uniforms.dilations.y != 0) {
                continue;
              }
              let dyC = (${s}(dyCCorner) + ${s}(wC)) / ${s}(uniforms.strides.y);
              let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
              if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[${h}]) ||
                  fract(dyC) > 0.0 || wCPerm < 0) {
                continue;
              }
              let idyC: u32 = u32(dyC);
              var inputChannel = groupId * uniforms.input_channels_per_group;
              for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                let xValue = ${d?x.get("batch","idyR","idyC","inputChannel"):x.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${y.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${a?"bias[d1]":`${s}(0.0)`};
          ${b.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(l).declareVariables(..._,b)}
  ${w}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${n?S:k}}`},Si=(e,t,r)=>{let a=e.length>2,i=t.outputShape,n=M.size(i),s=[Math.ceil(n/64),1,1];be("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${s}`);let l=t.format==="NHWC",d=["rank","rank"],p=[t.strides[0],t.strides[1]],h=[t.kernelShape[l?1:2],t.kernelShape[l?2:3]],u=[t.dilations[0],t.dilations[1]],f=[h[0]+(t.dilations[0]<=1?0:(t.kernelShape[l?1:2]-1)*(t.dilations[0]-1)),h[1]+(t.dilations[1]<=1?0:(t.kernelShape[l?2:3]-1)*(t.dilations[1]-1))],w=[f[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),f[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],g=!1,y=t.group,x=e[1].dims,_=x[0]/y,b=x[1],S=[{type:12,data:n},{type:12,data:p},{type:12,data:h},{type:12,data:u},{type:12,data:f},{type:6,data:w},{type:12,data:_},{type:12,data:b},...G(e[0].dims,e[1].dims)];a&&(S.push(...G(e[2].dims)),d.push("rank")),S.push(...G(i));let k=s[1]===1&&s[2]===1,I=A=>{let C=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:p.length},{name:"filter_dims",type:"u32",length:h.length},{name:"dilations",type:"u32",length:h.length},{name:"effective_filter_dims",type:"u32",length:f.length},{name:"pads",type:"i32",length:w.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],R=xe(e[0].dataType);return`${nu(A,e,i,a,k,g,R,C,l)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:d},getRunData:()=>({dispatchGroup:{x:s[0],y:s[1],z:s[2]},outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],programUniforms:S}),getShaderSource:I}}}),su,ou,uu,qa,Jp,lu,du,pu,cu,ec,Sm=P(()=>{_m(),xm(),bt(),Ft(),su=(e,t,r,a,i,n)=>(e-1)*t+r+(a-1)*i+1-n,ou=(e,t,r,a,i)=>{let n=Math.floor(e/2);t==="SAME_UPPER"?(r[a]=n,r[i]=e-n):t==="SAME_LOWER"&&(r[a]=e-n,r[i]=n)},uu=(e,t,r,a,i,n,s,l,d,p)=>{let h=e.length-2,u=p.length===0;if(d.length===0)for(let g=0;g<h;++g)d.push(0);let f=e[0],w=t[l?3:1]*i;for(let g=0,y=e.length-h-(l?1:0);g<h;++g,++y){let x=e[y],_=u?x*s[g]:p[g],b=su(x,s[g],n[g],t[y],r[g],_);ou(b,a,n,g,g+h),u&&p.push(s[g]*(x-1)+d[g]+(t[y]-1)*r[g]+1-n[g]-n[g+h])}p.splice(0,0,f),p.splice(l?3:1,0,w)},qa=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((u,f)=>u*f,1)===0){r.length=0;for(let u=2;u<t[1].dims.length;++u)r.push(t[1].dims[u])}let a=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(a?3:1,0,t[1].dims[1]);let i=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),l=t[0].dims,d=e.dilations.slice();if(d.reduce((u,f)=>u+f,0)===0){let u=t[0].dims.length-2;d=new Array(u).fill(1)}let p=e.strides.slice();if(p.reduce((u,f)=>u+f,0)===0){let u=t[0].dims.length-2;p=new Array(u).fill(1)}uu(l,r,d,e.autoPad,e.group,i,p,a,s,n);let h=Object.assign({},e);return Object.assign(h,{kernelShape:r,pads:i,outputPadding:s,outputShape:n,dilations:d,strides:p}),h},Jp=e=>{let t=Xi(e),r=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,n=e.group,s=e.kernelShape,l=e.pads,d=e.strides,p=e.wIsConst(),h=e.outputPadding,u=e.outputShape;return{autoPad:a,format:r,dilations:i,group:n,kernelShape:s,outputPadding:h,outputShape:u,pads:l,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},lu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[0];if(r!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==i))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((s,l)=>s+l,0)>0&&t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.reduce((s,l)=>s+l,0)>0&&t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.reduce((s,l)=>s+l,0)>0&&t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((s,l)=>s+l,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},du=[2,3,1,0],pu=(e,t,r)=>{let a=qa(r,t),i=r.format==="NHWC",n=a.outputShape,s=n[i?3:1],l=t[0].dims[i?3:1];if(a.group!==1||s===1&&l===1){e.compute(Si(t,a));return}let d=n[i?1:2],p=n[i?2:3],h=t[1].dims[2],u=t[1].dims[3],f=i?d*p:s,w=i?s:d*p,g=h*u*l,y=!0,x=e.kernelCustomData.wT??e.compute(et(t[1],du),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x);let _=[t[0],x],b=t.length===3;b&&(!i&&t[2].dims.length===1?_.push(t[2].reshape([t[2].dims[0],1,1])):_.push(t[2])),e.compute(Qp(_,a,n,f,w,g,b,y),{inputs:_})},cu=(e,t)=>{let r=t.format==="NHWC",a=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let n=t.dilations;(n.length===0||n[0]===0)&&(n=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let l=t.pads;l.length===0&&(l=[0,0]),l=[0,l[0],0,l[1]],s=[1].concat(s),n=[1].concat(n),i=[1].concat(i);let d=qa({...t,pads:l,strides:s,dilations:n,kernelShape:i},a);e.compute(Si(a,d,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]]))},ec=(e,t)=>{lu(e.inputs,t),e.inputs[0].dims.length===3?cu(e,t):pu(e,e.inputs,t)}}),hu,tc,rc,km=P(()=>{Z(),oe(),Se(),se(),hu=(e,t,r,a)=>{let i=M.size(t),n=t.length,s=B("input",e,n),l=Y("output",e,n),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=M.normalizeAxis(d,n),h=u=>{let f=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,w=q("uniforms.input_shape","uniforms.axis",n),g=a.reverse?f+(a.exclusive?" + 1":""):"0",y=a.reverse?w:f+(a.exclusive?"":" + 1");return`
                ${u.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,l)}
                ${u.mainStart()}
                  ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${y};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:a.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:p},...G(t,t)]}),getShaderSource:h}},tc=(e,t)=>{let r=e.inputs[0].dims,a=e.inputs[0].dataType,i=e.inputs[1];e.compute(hu(a,r,i,t),{inputs:[0]})},rc=e=>{let t=e.exclusive===1,r=e.reverse===1;return fe({exclusive:t,reverse:r})}}),fu,mu,gu,ac,ic,Im=P(()=>{Z(),oe(),Se(),se(),fu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},mu=(e,t,r,a)=>{let i=[];i.push(`fn perm(i: ${a.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)i.push(r.indicesSet("a",e[n],`i[${n}]`));return i.push("return a;}"),i.join(`
`)},gu=(e,t)=>{let r,a,i,n,s,l,d=t.format==="NHWC",p=t.blocksize,h=t.mode==="DCR";d?([r,a,i,n]=e.dims,s=h?[r,a,i,p,p,n/p**2]:[r,a,i,n/p**2,p,p],l=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,a,i,n]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=h?[r,p,p,n/p**2,a,i]:[r,n/p**2,p,p,a,i],l=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let u=e.reshape(s),f=u.dims.length,w=e.dataType,g=B("a",w,f),y=Y("output",w,f),x=_=>`
  ${_.registerUniform("output_size","u32").declareVariables(g,y)}

  ${mu(l,f,g,y)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:_=>{let b=d?[r,a*p,i*p,n/p**2]:[r,n/p**2,a*p,i*p],S=M.size(b),k=u.dims,I=M.sortBasedOnPerm(k,l);return{outputs:[{dims:b,dataType:_[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...G(k,I)]}},getShaderSource:x}},ac=(e,t)=>{fu(e.inputs),e.compute(gu(e.inputs[0],t))},ic=e=>fe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Or,Xt,La,wu,yu,$u,bu,Fa,vu,nc,sc,Em=P(()=>{Z(),oe(),Se(),se(),Or="[a-zA-Z]|\\.\\.\\.",Xt="("+Or+")+",La="^"+Xt+"$",wu="("+Xt+",)*"+Xt,yu="^"+wu+"$",$u=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},bu=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,a]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(yu)))throw new Error("Invalid LHS term");if(r.split(",").forEach((i,n)=>{let s=e[n].dims.slice();if(!i.match(RegExp(La)))throw new Error("Invalid LHS term");let l=this.processTerm(i,!0,s,n);this.lhs.push(l)}),a==="")a+=[...this.symbolToInfo.entries()].filter(([i,n])=>n.count===1||i==="...").map(([i])=>i).join("");else if(!a.match(RegExp(Xt)))throw new Error("Invalid RHS");a.match(RegExp(Or,"g"))?.forEach(i=>{if(i==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let n=this.symbolToInfo.get(i);if(n===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(n.dimValue)}}),this.rhs=this.processTerm(a,!1,this.outputDims)}addSymbol(e,t,r){let a=this.symbolToInfo.get(e);if(a!==void 0){if(a.dimValue!==t&&a.count!==1)throw new Error("Dimension mismatch");a.count++,a.inputIndices.push(r)}else a={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,a)}processTerm(e,t,r,a=-1){let i=r.length,n=!1,s=[],l=0;if(!e.match(RegExp(La))&&!t&&e!=="")throw new Error("Invalid LHS term");let d=e.match(RegExp(Or,"g")),p=new $u(a);return d?.forEach((h,u)=>{if(h==="..."){if(n)throw new Error("Only one ellipsis is allowed per input term");n=!0;let f=i-d.length+1;if(f<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(l,l+f),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let w=0;w<s.length;w++){let g=String.fromCharCode(48+w);p.addSymbol(g,u+w),this.addSymbol(g,r[l++],a)}}else p.addSymbol(h,u+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[l++],a)}),p}},Fa=e=>e+"_max",vu=(e,t,r,a)=>{let i=e.map(p=>p.length).map((p,h)=>B(`input${h}`,t,p)),n=M.size(a),s=Y("output",t,a.length),l=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),d=p=>{let h=[],u="var prod = 1.0;",f="var sum = 0.0;",w="sum += prod;",g=[],y=[],x=[],_=[],b=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((k,I)=>{if(r.rhs.symbolToIndices.has(I)){let A=r.rhs.symbolToIndices.get(I)?.[0];A!==void 0&&r.lhs.forEach((C,R)=>{if(k.inputIndices.includes(R)){let V=C.symbolToIndices.get(I);if(V===void 0)throw new Error("Invalid symbol error");V.forEach(U=>{h.push(`${i[R].indicesSet(`input${R}Indices`,U,s.indicesGet("outputIndices",A))}`)})}})}else r.lhs.forEach((A,C)=>{if(k.inputIndices.includes(C)){let R=A.symbolToIndices.get(I);if(R===void 0)throw new Error("Invalid symbol error");R.forEach(V=>{g.push(`${i[C].indicesSet(`input${C}Indices`,V,`${I}`)}`)}),_.push(`prod *= ${i[C].getByIndices(`input${C}Indices`)};`)}}),y.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${Fa(I)}; ${I}++) {`),x.push("}")});let S=b?[...h,`let sum = ${i.map((k,I)=>k.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...h,f,...y,...g,u,..._,w,...x];return`
            ${p.registerUniforms(l.map(k=>({name:`${Fa(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((k,I)=>`var input${I}Indices: ${i[I].type.indices};`).join(`
`)}
            ${S.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=l.filter(u=>r.symbolToInfo.has(u)).map(u=>({type:12,data:r.symbolToInfo.get(u)?.dimValue||0}));p.push({type:12,data:n});let h=e.map((u,f)=>[...G(u)]).reduce((u,f)=>u.concat(f),p);return h.push(...G(a)),{outputs:[{dims:a,dataType:t}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h}},getShaderSource:d}},nc=(e,t)=>{let r=new bu(e.inputs,t.equation),a=r.outputDims,i=e.inputs.map((n,s)=>n.dims);e.compute(vu(i,e.inputs[0].dataType,r,a))},sc=e=>{let t=e.equation.replace(/\s+/g,"");return fe({equation:t})}}),_u,ja,xu,Su,oc,Cm=P(()=>{Z(),oe(),se(),_u=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),a=r.length<t.length?0:r.length-t.length,i=t.length<r.length?0:t.length-r.length;for(;a<r.length&&i<t.length;++a,++i)if(r[a]!==t[i]&&r[a]!==1&&t[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ja=(e,t)=>{let r=e.length-t.length,a=[];for(let i=0;i<r;++i)a.push(e[i]);for(let i=0;i<t.length;++i)a.push(t[i]===1?e[i+r]:t[i]);return a},xu=(e,t)=>e.length>t.length?ja(e,t):ja(t,e),Su=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),a=xu(t,r),i=e[0].dataType,n=i===9?4:1,s=Math.ceil(M.size(a)/n),l=p=>{let h=B("input",i,t.length,n),u=Y("output",i,a.length,n),f;if(i===9){let w=(g,y,x="")=>`
          let outputIndices${y} = ${u.offsetToIndices(`outputOffset + ${y}u`)};
          let offset${y} = ${h.broadcastedIndicesToOffset(`outputIndices${y}`,u)};
          let index${y} = offset${y} / 4u;
          let component${y} = offset${y} % 4u;
          ${g}[${y}] = ${x}(${h.getByOffset(`index${y}`)}[component${y}]);
        `;f=`
        let outputOffset = global_idx * ${n};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${u.setByOffset("global_idx","data")}
      }`}else f=`
        let outputIndices = ${u.offsetToIndices("global_idx")};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",u)};
        ${u.setByOffset("global_idx",h.getByOffset("inputOffset"))}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(h,u)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${f}`},d=[{type:12,data:s},...G(t,a)];return{name:"Expand",shaderCache:{hint:`${a.length}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d})}},oc=e=>{_u(e.inputs),e.compute(Su(e.inputs),{inputs:[0]})}}),ku,uc,Tm=P(()=>{Z(),oe(),se(),Yi(),ku=e=>{let t=e[0].dataType,r=M.size(e[0].dims),a=M.size(e[1].dims),i=a%4===0,n=s=>{let l=B("x",t,[1],4),d=B("bias",t,[1],4),p=Y("y",t,[1],4),h=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],u=w=>`
      let bias${w}_offset: u32 = (global_idx * 4 + ${w}) % uniforms.bias_size;
      let bias${w} = ${d.getByOffset(`bias${w}_offset / 4`)}[bias${w}_offset % 4];`,f=i?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${u(0)}${u(1)}${u(2)}${u(3)}
      let bias = ${l.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(h).declareVariables(l,d,p)}

    ${yi(Oe(t))}

    ${s.mainStart(qt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${l.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",$i("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:n,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:a}],dispatchGroup:{x:Math.ceil(r/qt/4)}})}},uc=e=>{e.inputs.length<2||M.size(e.inputs[1].dims)===0?Ep(e):e.compute(ku(e.inputs))}}),Iu,Eu,lc,dc,zm=P(()=>{Z(),oe(),Se(),se(),Iu=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Eu=(e,t)=>{let r=e[0].dims,a=e[1].dims,i=r.length,n=M.normalizeAxis(t.axis,i),s=r.slice(0);s.splice(n,1,...a);let l=r[n],d=e[0].dataType===9?4:1,p=Math.ceil(M.size(s)/d),h=[{type:12,data:p},{type:6,data:l},{type:12,data:n},...G(e[0].dims,e[1].dims,s)],u=f=>{let w=B("data",e[0].dataType,e[0].dims.length,d),g=B("inputIndices",e[1].dataType,e[1].dims.length),y=Y("output",e[0].dataType,s.length,d),x=b=>{let S=a.length,k=`var indicesIndices${b}  = ${g.type.indices}(0);`;for(let I=0;I<S;I++)k+=`${S>1?`indicesIndices${b}[${I}]`:`indicesIndices${b}`} = ${s.length>1?`outputIndices${b}[uniforms.axis + ${I}]`:`outputIndices${b}`};`;k+=`
          var idx${b} = ${g.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${w.type.indices};
        `;for(let I=0,A=0;I<i;I++)I===n?(k+=`${i>1?`dataIndices${b}[${I}]`:`dataIndices${b}`} = u32(idx${b});`,A+=S):(k+=`${i>1?`dataIndices${b}[${I}]`:`dataIndices${b}`} = ${s.length>1?`outputIndices${b}[${A}]`:`outputIndices${b}`};`,A++);return k},_;if(e[0].dataType===9){let b=(S,k,I="")=>`
          let outputIndices${k} = ${y.offsetToIndices(`outputOffset + ${k}u`)};
          ${x(k)};
          let offset${k} = ${w.indicesToOffset(`dataIndices${k}`)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${S}[${k}] = ${I}(${w.getByOffset(`index${k}`)}[component${k}]);
        `;_=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${b("value",0,"u32")}
        ${b("value",1,"u32")}
        ${b("value",2,"u32")}
        ${b("value",3,"u32")}
        ${y.setByOffset("global_idx","value")}
      `}else _=`
      let outputIndices = ${y.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${w.getByIndices("dataIndices")};
      ${y.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(w,g,y)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${_}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:u}},lc=e=>fe({axis:e.axis}),dc=(e,t)=>{let r=e.inputs;Iu(r),e.compute(Eu(e.inputs,t))}}),Cu,Tu,pc,cc,Am=P(()=>{Z(),oe(),Se(),se(),Cu=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Tu=(e,t)=>{let r=e[0].dims,a=e[0].dataType,i=r.length,n=e[1].dims,s=e[1].dataType,l=M.normalizeAxis(t.axis,i),d=r[l],p=n.slice(0),h=M.size(p),u=B("input",a,i),f=B("indicesInput",s,n.length),w=Y("output",a,p.length),g=[{type:12,data:h},{type:6,data:d},{type:12,data:l}];return g.push(...G(r,n,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(u,f,w)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${w.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${u.type.indices}(outputIndices);
      ${u.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${u.getByIndices("inputIndices")};

      ${w.setByOffset("global_idx","value")};
  }`}},pc=e=>fe({axis:e.axis}),cc=(e,t)=>{let r=e.inputs;Cu(r),e.compute(Tu(e.inputs,t))}}),zu,Au,hc,fc,Om=P(()=>{Z(),oe(),se(),zu=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Au=(e,t)=>{let r=e[0].dims.slice(),a=e[1].dims.slice(),[i,n,s]=vd.getShapeOfGemmResult(r,t.transA,a,t.transB,e.length===3?e[2].dims:void 0),l=[i,n];if(!l)throw new Error("Can't use gemm on the given tensors");let d=M.size(l),p=[{type:12,data:d},{type:12,data:i},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],h=["type","type"];e.length===3&&(p.push(...G(e[2].dims)),h.push("rank")),p.push(...G(l));let u=f=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let g=t.alpha===1?"":"value *= uniforms.alpha;",y=B("a",e[0].dataType,e[0].dims),x=B("b",e[1].dataType,e[1].dims),_=y.type.value,b=null,S=[y,x];e.length===3&&(b=B("c",e[2].dataType,e[2].dims.length),S.push(b));let k=Y("output",e[0].dataType,l.length);S.push(k);let I=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${f.registerUniforms(I).declareVariables(...S)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${_}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${g}
    ${b!=null?`let cOffset = ${b.broadcastedIndicesToOffset("vec2(m, n)",k)}; value += ${_}(uniforms.beta) * ${b.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:u}},hc=e=>{let t=e.transA,r=e.transB,a=e.alpha,i=e.beta;return{transA:t,transB:r,alpha:a,beta:i,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},fc=(e,t)=>{zu(e.inputs),e.compute(Au(e.inputs,t))}}),Ae,Ou,mc,Ga,Ru,ir,gc,wc=P(()=>{Z(),oe(),Se(),qi(),Ki(),se(),Ft(),Ae=(e,t)=>e.length>t&&e[t].dims.length>0&&M.size(e[t].dims)>0?e[t]:void 0,Ou=(e,t)=>{let r=e[0],a=Ae(e,1),i=Ae(e,2),n=Ae(e,3),s=Ae(e,4),l=Ae(e,5),d=Ae(e,6),p=Ae(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=!1,u=r.dims[0],f=r.dims[1],w=r.dims.length===3?h?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],g=f,y=0,x=0,_=Math.floor(w/t.numHeads);if(d&&p){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==u||d.dims[1]!==t.numHeads||d.dims[3]!==_)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==u||p.dims[1]!==t.numHeads||p.dims[3]!==_)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=d.dims[2],x=d.dims[2]}else if(d||p)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b;if(a){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(a.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');b=2,g=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');b=5,g=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');b=0,g=a.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}if(n){if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let S=0;if(s){S=8;let R=s.dims;throw R.length===1?R[0]===u?S=1:R[0]===3*u+2&&(S=3):R.length===2&&R[0]===u&&R[1]===g&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, kv_sequence_length)'):new Error("Mask not supported")}let k=!1,I=w;if(i){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(g!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=i.dims[2]}else{if(g!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');I=i.dims[1]*i.dims[3],k=!0}}let A=y+g,C=!1;if(s)throw new Error("Key padding mask is not supported");if(l){if(l.dims.length!==4)throw new Error('Input "relative_position_bias" is expected to have 4 dimensions');if(l.dims[0]!==u&&l.dims[0]!==1||l.dims[1]!==t.numHeads||l.dims[2]!==f||l.dims[3]!==A)throw new Error('Input "relative_position_bias" shape (batch_size, 1, sequence_length, kv_sequence_length)')}return{batchSize:u,sequenceLength:f,pastSequenceLength:y,kvSequenceLength:g,totalSequenceLength:A,maxSequenceLength:x,inputHiddenSize:0,hiddenSize:w,vHiddenSize:I,headSize:_,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:C,passPastInKv:k,qkvFormat:b}},mc=e=>fe({...e}),Ga=fe({perm:[0,2,1,3]}),Ru=(e,t,r,a,i,n,s)=>{let l=[a,i,n],d=M.size(l),p=[{type:12,data:d},{type:12,data:s},{type:12,data:n}],h=u=>{let f=Y("qkv_with_bias",t.dataType,l),w=B("qkv",t.dataType,l),g=B("bias",r.dataType,l),y=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${u.registerUniforms(y).declareVariables(w,g,f)}
  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:h},{inputs:[t,r],outputs:[-1]})[0]},ir=(e,t,r,a,i,n,s,l)=>{let d=n;if(s){if(a===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=Ru(e,n,s,t,a,r*i,l),d=d.reshape([t,a,r,i]),e.compute(et(d,Ga.perm),{inputs:[d],outputs:[-1]})[0]}else return n.dims.length===3&&(d=n.reshape([t,a,r,i])),e.compute(et(d,Ga.perm),{inputs:[d],outputs:[-1]})[0]},gc=(e,t)=>{let r=Ou(e.inputs,t),a=e.inputs[0],i=Ae(e.inputs,1),n=Ae(e.inputs,2),s=Ae(e.inputs,3),l=Ae(e.inputs,4),d=Ae(e.inputs,5),p=Ae(e.inputs,6),h=Ae(e.inputs,7);if(a.dims.length===5)throw new Error("Packed QKV is not implemented");if(i?.dims.length===5)throw new Error("Packed KV is not implemented");let u=i&&n&&i.dims.length===4&&n.dims.length===4,f=ir(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,a,s,0);if(u)return or(e,f,i,n,l,void 0,p,h,d,r,t);if(!i||!n)throw new Error("key and value must be provided");let w=ir(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,i,s,r.hiddenSize),g=ir(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,n,s,2*r.hiddenSize);or(e,f,w,g,l,void 0,p,h,d,r,t)}}),Ka,Du,Bu,ki,yc,$c=P(()=>{Z(),oe(),se(),Ka=e=>Array.from(e.getBigInt64Array(),Number),Du=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ka(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Bu=(e,t)=>{let r=[];for(let a=0;a<e.length;++a)r.push(e[a]*t[a]);return r},ki=(e,t)=>{let r=e[0].dims,a=t??Ka(e[1]),i=Bu(r,a),n=M.size(i),s=e[0].dataType,l=B("input",s,r.length),d=Y("output",s,i.length),p=h=>`
      const inputShape = ${l.indices(...r)};
      ${h.registerUniform("output_size","u32").declareVariables(l,d)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${a}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...G(e[0].dims,i)]}),getShaderSource:p}},yc=e=>{Du(e.inputs),e.compute(ki(e.inputs),{inputs:[0]})}}),Mu,Ya,bc,Pu,Xa,vc,Rm=P(()=>{Z(),oe(),Se(),Ki(),se(),wc(),$c(),Ft(),Mu=(e,t)=>{let r=e[0],a=e[1],i=e[2],n=e[3],s=e[4];if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=!1,d=r.dims[0],p=r.dims[1],h=r.dims.length===3?l?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],u=p,f=0,w=0,g=Math.floor(h/t.numHeads),y=n&&n.dims.length!==0,x=s&&s.dims.length!==0,_=!0;if(y&&x){if(n.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=n.dims[1],w=n.dims[1]}else if(y||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b;if(a){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(r.dims[2]%a.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');b=2,u=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');b=5,u=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');b=0,u=a.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}let S=0,k=!1,I=h;if(i){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(u!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=i.dims[2]}else{if(u!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');I=i.dims[1]*i.dims[3],k=!0}}let A=f+u;return{batchSize:d,sequenceLength:p,pastSequenceLength:f,kvSequenceLength:u,totalSequenceLength:A,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:h,vHiddenSize:I,headSize:g,vHeadSize:Math.floor(I/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:S,scale:t.scale,broadcastResPosBias:!1,passPastInKv:k,qkvFormat:b,isPastkvBSNH:_}},Ya=(e,t,r,a)=>{let i=[a.batchSize,a.totalSequenceLength,a.kvNumHeads,a.headSize],n=4,s=M.size(i)/n,l=a.totalSequenceLength,d=Y("present_kv",r,i.length,n),p=B("new_kv",e.dataType,e.dims.length,n),h=t?B("past_kv",t.dataType,t.dims.length,n):void 0,u=Math.ceil(a.headSize/n),f={x:l,y:e.dims[0],z:1},w=t?["rank","rank"]:["rank"],g=[{type:12,data:s},{type:12,data:a.pastSequenceLength},{type:12,data:a.kvSequenceLength},{type:12,data:a.totalSequenceLength}],y=[p];h?(g.push(...G(e.dims),...G(t.dims),...G(i)),y.push(h)):g.push(...G(e.dims),...G(i));let x=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],_=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,b=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,S=t?`if (s < past_seqlen) {
        ${_}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${b}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${b}
        }`,k=I=>`

  ${I.registerUniforms(x).declareVariables(...y,d)}
  ${I.mainStart([u,a.kvNumHeads,1])}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    var indices = ${d.offsetToIndices("global_idx")};
    let h = local_id.x;
    let n = local_id.y;
    let s = workgroup_id.x;
    let b = workgroup_id.y;
    let num_heads = ${a.kvNumHeads}u;
    let H = ${u}u;

    let present_seqlen = uniforms.present_seqlen;
    let present_batch_stride = present_seqlen * num_heads * H;
    var row_stride = H;
    let is_bsnh = ${a.isPastkvBSNH};

    if (is_bsnh) {
      row_stride = num_heads * H;
    }
    var present_head_stride = present_seqlen * H;
    if (is_bsnh) {
      present_head_stride = H;
    }

    let past_seqlen = uniforms.past_seqlen;

    let out_offset = b * present_batch_stride + s * row_stride + n * present_head_stride + h;
    ${S}
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${a.kvNumHeads}${u}${!!t}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:f,programUniforms:g}),getShaderSource:k}},bc=e=>fe({...e}),Pu=fe({perm:[0,2,1,3]}),Xa=(e,t,r,a,i)=>{let n=t,s=a.kvNumHeads,l=a.nReps;return t.dims.length===3&&a.kvSequenceLength!==0&&(n=t.reshape([a.batchSize,a.kvSequenceLength,s,a.headSize])),r?n=e.compute(Ya(n,r,n.dataType,a),{inputs:[n,r],outputs:[a.isPastkvBSNH?i:-1]})[0]:n=e.compute(Ya(n,void 0,n.dataType,a),{inputs:[n],outputs:[a.isPastkvBSNH?i:-1]})[0],l!==1&&(n=e.compute(ki([n],[1,1,1,l]),{inputs:[n],outputs:[-1]})[0],n=n.reshape([a.batchSize,a.totalSequenceLength,s*l,a.headSize])),e.compute(et(n,Pu.perm),{inputs:[n],outputs:[-1]})[0]},vc=(e,t)=>{let r=Mu(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let a=ir(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.inputs[0],void 0,0),i=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,n=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,s=Xa(e,e.inputs[1],i,r,1),l=Xa(e,e.inputs[2],n,r,2);or(e,a,s,l,void 0,void 0,void 0,void 0,void 0,r,t)}}),Nu,Uu,Wu,_c,Dm=P(()=>{Z(),oe(),se(),Nu=(e,t)=>{let r=e[0].dims,a=r,i=2,n=M.sizeToDimension(r,i),s=M.sizeFromDimension(r,i),l=_e(s),d=s/l,p=[r[0],r[1],d],h=["rank","type","type"],u=[{type:12,data:s},{type:12,data:d}];u.push(...G(p,p));let f=w=>{let g=B("x",e[0].dataType,p.length,l),y=B("scale",e[1].dataType,e[1].dims),x=B("bias",e[2].dataType,e[2].dims),_=Y("output",e[0].dataType,p.length,l),b=[g,y,x,_],S=g.type.value,k=l===1?"f32":`vec${l}<f32>`,I=64,A=[{name:"normSize",type:"u32"},{name:"normPackedSize",type:"u32"}];return`
  var<workgroup> meanShared : f32;
  var<workgroup> squaredNormShared : f32;
  var<workgroup> workgroupShared : array<${k}, ${I}>;
  const workgroupSize = ${I}u;
  ${w.registerUniforms(A).declareVariables(...b)}
  ${w.mainStart(I)}
    let norm = global_idx / workgroupSize;
    let batch = norm / uniforms.x_shape[1];
    let channel = norm % uniforms.x_shape[1];
    let localIndex = local_id.x;

    // initialize workgroup memory
    var initial = ${k}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      initial = initial + ${k}(${g.get("batch","channel","h")});
    }
    workgroupShared[localIndex] = initial;
    workgroupBarrier();

    // Calculate the mean of current channel data.
    for (var currSize = workgroupSize >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (localIndex < currSize) {
        workgroupShared[localIndex] = workgroupShared[localIndex] + workgroupShared[localIndex + currSize];
      }
      workgroupBarrier();
    }
    if (localIndex == 0) {
      meanShared = ${mt("workgroupShared[0]",l)} / f32(uniforms.normSize);
    }
    workgroupBarrier();

    // reinitialize workgroup memory.
    initial = ${k}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let deviation =  ${k}(${g.get("batch","channel","h")}) - ${k}(meanShared);
      initial = initial + deviation * deviation;
    }
    workgroupShared[localIndex] = initial;
    workgroupBarrier();

    // Calculate the sum of square of deviation of current channel data.
    for (var currSize = workgroupSize >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (localIndex < currSize) {
        workgroupShared[localIndex] = workgroupShared[localIndex] + workgroupShared[localIndex + currSize];
      }
      workgroupBarrier();
    }
    if (localIndex == 0) {
      squaredNormShared = ${mt("workgroupShared[0]",l)};
    }
    workgroupBarrier();

    let invStdDev = inverseSqrt(squaredNormShared / f32(uniforms.normSize) + f32(${t.epsilon}));
    let channelScale = invStdDev * f32(${y.getByOffset("channel")});
    let channelShift = f32(${x.getByOffset("channel")}) - meanShared * channelScale;
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let value = ${g.get("batch","channel","h")} * ${S}(${k}(channelScale)) + ${S}(${k}(channelShift));
      ${_.set("batch","channel","h","value")};
    }
  }`};return{name:"InstanceNormalization",shaderCache:{hint:`${t.epsilon};${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:n},programUniforms:u}),getShaderSource:f}},Uu=(e,t,r,a,i,n,s,l)=>{let d=_e(s),p=64,h=d===1?"vec2f":`mat2x${d}f`,u=d===1?"f32":`vec${d}f`,f=(A,C)=>`${h}(${A}, ${C})`,w=i*s/d,g=Math.ceil(n/p),y=["type"],x=[{type:12,data:g},{type:12,data:n},{type:12,data:Math.floor(s/d)},{type:12,data:Math.floor(n*s/d)}],_=A=>{let C=B("input",t.dataType,t.dims,d);return`
  ${A.declareVariables(C)}
  @group(0) @binding(1) var<storage, read_write> output : array<${h}>;
  struct Uniforms {wg_size:u32, H:u32, C:u32, image_size:u32};
  @group(0) @binding(2) var<uniform> uniforms: Uniforms;

  ${A.mainStart(p)}
    let currentImageNumber = global_idx / ${p} / uniforms.C;
    let currentChannelNumber = (global_idx / ${p}) % uniforms.C;
    let wgOffset = local_id.x * uniforms.wg_size;
    if (wgOffset >= uniforms.H) {
        return;
    }
    let wgMax = min(wgOffset + uniforms.wg_size, uniforms.H);

    let offset = currentImageNumber * uniforms.image_size + currentChannelNumber;
    var sum = ${Ot("f32",d)};
    var squaredSum = ${Ot("f32",d)};
    for (var i: u32 = wgOffset; i < wgMax; i++) {
        let value = ${u}(input[offset + i * uniforms.C]);
        sum += value;
        squaredSum += value * value;
    }
    output[global_idx] = ${f("sum","squaredSum")};
  }`},b=e.compute({name:"InstanceNormComputeMean",shaderCache:{hint:`${d}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:[i,s,p,2],dataType:1}],dispatchGroup:{x:i*s/d},programUniforms:x}),getShaderSource:_},{inputs:[t],outputs:[-1]})[0],S=[{type:12,data:w},{type:12,data:n},{type:12,data:Math.floor(s/d)},{type:12,data:Math.floor(p*s/d)}],k=["type","type","type"],I=A=>{let C=B("scale",r.dataType,r.dims,d),R=B("bias",a.dataType,a.dims,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${h}>;
  @group(0) @binding(1) var<storage, read> scale : array<${C.type.storage}>;
  @group(0) @binding(2) var<storage, read> bias : array<${R.type.storage}>;
  @group(0) @binding(3) var<storage, read_write> output : array<${h}>;
  struct Uniforms {units_of_work : u32, H: u32, C : u32, image_size : u32};
  @group(0) @binding(4) var<uniform> uniforms: Uniforms;

  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.units_of_work")}
    let currentImageNumber = global_idx / uniforms.C;
    let currentChannelNumber = global_idx % uniforms.C;

    let offset = currentImageNumber * uniforms.image_size;
    var sum = ${Ot("f32",d)};
    var squaredSum = ${Ot("f32",d)};
    for (var i: u32 = 0; i < min(${p}, uniforms.H); i++) {
        let value = input[offset + i + currentChannelNumber * ${p}];
        sum += value[0];
        squaredSum += value[1];
    }
    sum = sum / f32(uniforms.H);
    squaredSum = squaredSum / f32(uniforms.H);
    let invStdDev = inverseSqrt(squaredSum - sum * sum + f32(${l}));
    let channelScale = invStdDev * ${u}(scale[currentChannelNumber]);
    let channelShift = ${u}(bias[currentChannelNumber]) - sum * channelScale;

    output[global_idx] = ${f("channelScale","channelShift")};
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${l}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:[i,s,2],dataType:1}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:S}),getShaderSource:I},{inputs:[b,r,a],outputs:[-1]})[0]},Wu=(e,t,r)=>{let a=t[0].dims,i=a,n=a[0],s=a[a.length-1],l=M.sizeFromDimension(a,1)/s,d=_e(s),p=M.size(i)/d,h=[{type:12,data:l},{type:12,data:Math.floor(s/d)}],u=["type","type"],f=Uu(e,t[0],t[1],t[2],n,l,s,r.epsilon),w=g=>{let y=xe(t[0].dataType),x=d===1?"vec2f":`mat2x${d}f`,_=d===1?y:`vec${d}<${y}>`,b=B("input",t[0].dataType,t[0].dims,d),S=Y("output",t[0].dataType,i,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${b.type.storage}>;
  @group(0) @binding(1) var<storage, read> scaleInput : array<${x}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${S.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${g.mainStart()}
    let currentImageNumber = global_idx / (uniforms.C * uniforms.H);
    let currentChannelNumber = global_idx % uniforms.C;

    let scaleOffset = currentImageNumber * uniforms.C + currentChannelNumber;
    let scale = scaleInput[scaleOffset];
    output[global_idx] = fma(input[global_idx], ${_}(scale[0]), ${_}(scale[1]));
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:w},{inputs:[t[0],f]})},_c=(e,t)=>{t.format==="NHWC"?Wu(e,e.inputs,t):e.compute(Nu(e.inputs,t))}}),Vu,Hu,xc,Bm=P(()=>{Z(),oe(),se(),Vu=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Hu=(e,t,r)=>{let a=t.simplified,i=e[0].dims,n=e[1],s=!a&&e[2],l=i,d=M.normalizeAxis(t.axis,i.length),p=M.sizeToDimension(i,d),h=M.sizeFromDimension(i,d),u=M.size(n.dims),f=s?M.size(s.dims):0;if(u!==h||s&&f!==h)throw new Error(`Size of X.shape()[axis:] == ${h}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${u} and bias size of ${f}`);let w=[];for(let I=0;I<i.length;++I)I<d?w.push(i[I]):w.push(1);let g=_e(h),y=["type","type"],x=[{type:12,data:p},{type:1,data:h},{type:12,data:Math.floor(h/g)},{type:1,data:t.epsilon}];s&&y.push("type");let _=r>1,b=r>2,S=I=>{let A=xe(e[0].dataType),C=[B("x",e[0].dataType,e[0].dims,g),B("scale",n.dataType,n.dims,g)];s&&C.push(B("bias",s.dataType,s.dims,g)),C.push(Y("output",e[0].dataType,l,g)),_&&C.push(Y("mean_data_output",1,w)),b&&C.push(Y("inv_std_output",1,w));let R=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(R).declareVariables(...C)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Ot("f32",g)};
    var mean_square_vector = ${Ot("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Vt(A,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${mt("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${mt("mean_square_vector",g)} / uniforms.norm_size ${a?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Vt(A,g,"x[j + offset]")};
      let f32scale = ${Vt(A,g,"scale[j]")};
      output[j + offset] = ${C[0].type.value}((f32input ${a?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Vt(A,g,"bias[j]")}`:""}
      );
    }

    ${_?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},k=[{dims:l,dataType:e[0].dataType}];return _&&k.push({dims:w,dataType:1}),b&&k.push({dims:w,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${a}`,inputDependencies:y},getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:x}),getShaderSource:S}},xc=(e,t)=>{Vu(e.inputs),e.compute(Hu(e.inputs,t,e.outputCount))}}),qu,Lu,Sc,kc,Mm=P(()=>{Z(),oe(),Se(),se(),qu=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],a=r.dims.length;if(r.dims[a-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!M.areEqual(s.dims,[t.n,i,n]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(M.size(l)!==t.n*i)throw new Error("scales input size error.");if(e.length===4){let d=e[3].dims,p=t.bits>4?t.n*i:t.n*Math.floor((i+1)/2);if(M.size(d)!==p)throw new Error("zeroPoints input size error.")}},Lu=(e,t,r,a)=>{let i=e[0].dims,n=i.length,s=Math.floor((t.k+t.blockSize-1)/t.blockSize),l=i[n-2],d=t.k,p=t.n,h=i.slice(0,n-2),u=M.size(h),f=t.blockSize/8*t.bits/4,w=e[0].dataType,g=_e(l),y=_e(t.k),x=_e(f),_=nr(w),b=l*s*_,S=Math.floor(a/b),k=s<=r[0]&&S>0,I=!k||S>=4?_e(p):S>=2&&_e(p)>=2?2:1,A=h.concat([l,p]),C=M.size(A)/I/g,R=k?[]:[{type:12,data:C},{type:12,data:t.blockSize}],V=[u,l,d/y],U=M.convertShape(e[1].dims).slice();U.splice(-1,1,f/x),R.push(...G(V)),R.push(...G(U)),R.push(...G(e[2].dims)),e.length===4&&R.push(...G(M.convertShape(e[3].dims)));let J=[u,l,p/I];R.push(...G(J));let F=ie=>{let ee=V.length,te=B("a",e[0].dataType,ee,y),L=B("b",12,U.length,x),de=B("scales",e[2].dataType,e[2].dims.length),ne=[te,L,de],j=e.length===4?B("zero_points",12,e[3].dims.length):void 0;j&&ne.push(j);let re=J.length,O=Y("output",e[0].dataType,re,I),H=[{name:"output_size",type:"u32"},{name:"block_size",type:"u32"}],ae=xe(e[0].dataType),we=(()=>{switch(y){case 1:return`array<${ae}, 8>`;case 2:return`mat4x2<${ae}>`;case 4:return`mat2x4<${ae}>`;default:throw new Error(`${y}-component is not supported.`)}})(),me=`
        for (var word: u32 = 0; word < ${f}; word += ${x}) {
          ${L.indicesSet("b_indices","2","word")};
          let b_data = ${L.getByIndices("b_indices")};
          for (var i: u32 = 0; i < ${x}; i++) {
            let b_value: u32 = ${x===1?"b_data":"b_data[word + i]"};
            let b_mask: u32 = 0x0F0F0F0Fu;
            let b_value_lower: vec4<u32> = unpack4xU8(b_value & b_mask);
            let b_value_upper: vec4<u32> = unpack4xU8((b_value >> 4) & b_mask);
            let b_quantized_values = ${we}(${Array.from({length:4},(Ve,ye)=>`${ae}(b_value_lower[${ye}]), ${ae}(b_value_upper[${ye}])`).join(", ")});
            let b_dequantized_values = ${y===1?`${we}(${Array.from({length:8},(Ve,ye)=>`(b_quantized_values[${ye}] - zero_point) * scale`).join(", ")});`:`(b_quantized_values - ${we}(${Array(8).fill("zero_point").join(",")})) * scale;`};
            // Number of B elements per 32-bit word is 32/bits = 32/4 = 8
            for (var m: u32 = 0; m < ${k?l:g}u; m++) {
              ${te.indicesSet("a_indices",ee-2,k?"m":`row * ${g} + m`)};
              ${te.indicesSet("a_indices",ee-1,"word_offset")};
              var input_offset = ${te.indicesToOffset("a_indices")};
              var a_data: ${we};
              for (var j: u32 = 0; j < ${8/y}; j++) {
                a_data[j] = ${te.getByOffset("input_offset")};
                input_offset++;
              }
              ${k?"workgroup_shared[workgroup_shared_offset + m]":"output_values[m]"}${I>1?"[c]":""} += ${Array.from({length:8/y},(Ve,ye)=>`${y===1?`a_data[${ye}] * b_dequantized_values[${ye}]`:`dot(a_data[${ye}], b_dequantized_values[${ye}])`}`).join(" + ")};
            }
            word_offset += ${8/y};
          }
        }`,Be=j?`
          zero_point_offset += 4;
          if (zero_point_offset == 32) {
            zero_point_offset = 0;
            zero_point_index++;
            zero_point_word = ${j.getByOffset("zero_point_index")};
          }`:"";return k?`
        var<workgroup> workgroup_shared: array<${O.type.value}, ${l*s}>;
        ${ie.declareVariables(...ne,O)}
        ${ie.mainStart([s,1,1])}
          var a_indices: ${te.type.indices};
          var block = local_id.x;
          var col = workgroup_id.y;
          var batch = workgroup_id.z;
          ${te.indicesSet("a_indices","0","batch")};
          // Two zero points are packed into one byte when uniforms.bits is 4.
          for (var c: u32 = 0; c < ${I}; c++) {
            let col_times_components_plus_c = col * ${I} + c;
              ${j?`
            var zero_point_bytes_per_col: u32 = (${s} + 1) / 2;
            var zero_point_byte_count: u32 = col_times_components_plus_c * zero_point_bytes_per_col + (block >> 0x1u);
            var zero_point_word_index: u32 = zero_point_byte_count >> 0x2u;
            var zero_point_byte_offset: u32 = zero_point_byte_count & 0x3u;
            var zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32 = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            var zero_point_word: u32 = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;`:""}
            var b_indices: ${L.type.indices};
            ${L.indicesSet("b_indices","0","col_times_components_plus_c")};
            // The scale and zero points are computed per block.
            var scales_index = col_times_components_plus_c * ${s} + block;
            let scale = ${de.getByOffset("scales_index")};
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ae}(${j?"(zero_point_word) & 0xFu":8});
            ${L.indicesSet("b_indices","1","block")};
            var word_offset: u32 = block * ${t.blockSize/y};
            var workgroup_shared_offset: u32 = block * ${l};
            ${me}
          }
          workgroupBarrier();
          var output_indices: ${O.type.indices};
          var elements_per_thread: u32 = ${Math.ceil(l/s)};
          ${O.indicesSet("output_indices","0","batch")};
          ${O.indicesSet("output_indices",re-1,"col")};
          ${O.indicesSet("output_indices",re-2,"local_id.x * elements_per_thread")};
          var output_offset = ${O.indicesToOffset("output_indices")};
          for (var m: u32 = 0u; m < elements_per_thread; m++) {
            var row = m + local_id.x * elements_per_thread;
            if (row < ${l}) {
              var output_value: ${O.type.value} = ${O.type.value}(0);
              var workgroup_shared_offset: u32 = row;
              for (var b: u32 = 0u; b < ${s}u; b++) {
                output_value += workgroup_shared[workgroup_shared_offset];
                workgroup_shared_offset += ${l};
              }
              ${O.setByOffset("output_offset","output_value")};
              output_offset += ${p/I};
            }
          }
        }`:`
        ${ie.registerUniforms(H).declareVariables(...ne,O)}
        ${ie.mainStart()}
          ${ie.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var output_values: array<${O.type.value}, ${g}>;
          var output_indices = ${O.offsetToIndices("global_idx")};
          var col = ${O.indicesGet("output_indices",re-1)};
          var row = ${O.indicesGet("output_indices",re-2)};
          var a_indices: ${te.type.indices} = output_indices;
          // Two zero points are packed into one byte because uniforms.bits <= 4.
          // zero_point_offset is either 0 or 4. It is bit offset within one byte.
          // TODO support zero_point_offset for bits > 4
          ${j?`
          var zero_point_abs_offset = col * ${I} * ((${s} + 1) / 2);
          var zero_point_index: u32 = zero_point_abs_offset / 4;
          var zero_point_word: u32 = ${j.getByOffset("zero_point_index")};
          var zero_point_offset: u32 = (zero_point_abs_offset % 4) * 8;`:""}
          var scale_index = col * ${s*I};
          var b_indices: ${L.type.indices};
          for (var c: u32 = 0; c < ${I}; c++) {
            ${L.indicesSet("b_indices","0",`col * ${I} + c`)};
            var block_offset: u32 = 0;
            for (var block: u32 = 0; block < ${s}; block++) {
              // The scale and zero points are computed per block.
              let scale = ${de.getByOffset("scale_index")};
              // The default zero point is 8 for unsigned 4-bit quantization.
              let zero_point = ${ae}(${j?"extractBits(zero_point_word, zero_point_offset, 4)":8});
              ${L.indicesSet("b_indices","1","block")};
              var word_offset: u32 = block_offset;
              ${me}
              scale_index++;
              ${Be}
              block_offset += uniforms.block_size / ${y};
            }
            // Drop the trailing 4 bits if the zero_poit_offset is not a byte boundary to align with the next byte.
            ${j?`if (zero_point_offset % 8 > 0) {
                ${Be}
              }`:""}
            }
            for (var k: u32 = 0u; k < ${g}u; k++) {
              ${O.indicesSet("output_indices",re-2,`${g} * row + k`)};
              ${O.setByIndices("output_indices","output_values[k]")}
            }
        }`};return{name:k?"BlockwiseMatMulNBits":"MatMulNBits",shaderCache:{hint:`${t.cacheKey};${l};${w};${e.length}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:A,dataType:w}],name:k?"BlockwiseMatMulNBits":"MatMulNBits",dispatchGroup:k?{x:1,y:Math.ceil(p/I),z:u}:{x:Math.ceil(C/64)},programUniforms:R}),getShaderSource:F}},Sc=(e,t)=>{qu(e.inputs,t);let r=e.getMaxComputeWorkgroupSizes(),a=e.getMaxComputeWorkgroupStoragesize();e.compute(Lu(e.inputs,t,r,a))},kc=e=>fe(e)}),Fu,ju,Gu,Ku,Yu,Xu,Zu,Qu,Ic,Pm=P(()=>{Z(),oe(),se(),Fu=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ju=(e,t,r)=>{let a="";for(let i=t-1;i>=0;--i)a+=`
            k = i32(${e.indicesGet("indices",i)}) - ${q("uniforms.pads",i,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${q("uniforms.x_shape",i,t)})) {
              break;
            }
            offset += k * i32(${q("uniforms.x_strides",i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${a}
            value = x[offset];
          }
      `},Gu=(e,t,r)=>{let a="";for(let i=t-1;i>=0;--i)a+=`
                k = i32(${e.indicesGet("indices",i)}) - ${q("uniforms.pads",i,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${q("uniforms.x_shape",i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${q("uniforms.x_shape",i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${q("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Ku=(e,t,r)=>{let a="";for(let i=t-1;i>=0;--i)a+=`
                k = i32(${e.indicesGet("indices",i)}) - ${q("uniforms.pads",i,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${q("uniforms.x_shape",i,t)})) {
                  k = i32(${q("uniforms.x_shape",i,t)}) - 1;
                }
                offset += k * i32(${q("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Yu=(e,t,r)=>{let a="";for(let i=t-1;i>=0;--i)a+=`
                k = i32(${e.indicesGet("indices",i)}) - ${q("uniforms.pads",i,r)};
                if (k < 0)  {
                  k += i32(${q("uniforms.x_shape",i,t)}]);
                }
                if (k >= i32(${q("uniforms.x_shape",i,t)})) {
                  k -= i32(${q("uniforms.x_shape",i,t)});
                }
                offset += k * i32(${q("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Xu=(e,t,r)=>{switch(r.mode){case 0:return ju(e,t,r.pads.length);case 1:return Gu(e,t,r.pads.length);case 2:return Ku(e,t,r.pads.length);case 3:return Yu(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Zu=(e,t)=>{let r=M.padShape(e[0].dims.slice(),t.pads),a=e[0].dims,i=M.size(r),n=[{type:12,data:i},{type:6,data:t.pads}];t.mode===0&&n.push({type:e[0].dataType,data:t.value}),n.push(...G(e[0].dims,r));let s=["rank"],l=d=>{let p=Y("output",e[0].dataType,r.length),h=B("x",e[0].dataType,a.length),u=h.type.value,f=Xu(p,a.length,t),w=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&w.push({name:"constant_value",type:u}),`
            ${d.registerUniforms(w).declareVariables(h,p)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${p.offsetToIndices("global_idx")};

            var value = ${u}(0);
            ${f}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(M.size(r)/64)},programUniforms:n}),getShaderSource:l}},Qu=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),a=e.length>=3&&e[2].data?e[2].getFloat32Array()[0]:0,i=e[0].dims.length,n=new Int32Array(2*i).fill(0);if(e.length>=4){let l=e[3].getBigInt64Array();for(let d=0;d<l.length;d++)n[Number(l[d])]=Number(r[d]),n[Number(l[d])+i]=Number(r[d+l.length])}else r.forEach((l,d)=>n[Number(d)]=Number(l));let s=[];return n.forEach(l=>s.push(l)),{mode:t.mode,value:a,pads:s}}else return t},Ic=(e,t)=>{Fu(e.inputs);let r=Qu(e.inputs,t);e.compute(Zu(e.inputs,r),{inputs:[0]})}}),Zt,Za,Qa,Ja,ei,Ju,el,ti,ri,Ec,Cc,ai,Tc,zc,ii,Ac,Oc,Rc,Dc,Nm=P(()=>{Ye(),Z(),oe(),se(),Zt=e=>{if(he.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Za=(e,t,r)=>{let a=t.format==="NHWC",i=e.dims.slice();a&&i.splice(1,0,i.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),l=t.strides.slice(),d=n?t.dilations.slice():[],p=t.pads.slice();Fr.adjustPoolAttributes(r,i,s,l,d,p);let h=Fr.computePoolOutputShape(r,i,l,d,s,p,t.autoPad),u=Object.assign({},t);n?Object.assign(u,{kernelShape:s,strides:l,pads:p,dilations:d,cacheKey:t.cacheKey}):Object.assign(u,{kernelShape:s,strides:l,pads:p,cacheKey:t.cacheKey});let f=h.slice();return f.push(f.splice(1,1)[0]),[u,a?f:h]},Qa=(e,t)=>{let r=t.format==="NHWC",a=M.size(e),i=M.size(t.kernelShape),n=[{type:12,data:a},{type:12,data:i}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let l=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],h=t.pads[t.pads.length-1],u=!!(p+h);n.push({type:12,data:l},{type:12,data:d},{type:12,data:p},{type:12,data:h}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(t.kernelShape.length===2){let w=t.kernelShape[t.kernelShape.length-2],g=t.strides[t.strides.length-2],y=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];f=!!(y+x),n.push({type:12,data:w},{type:12,data:g},{type:12,data:y},{type:12,data:x}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,s,!0,u,f]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let l=M.computeStrides(t.kernelShape);n.push({type:12,data:l},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:l.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((p,h)=>p+h);return[n,s,!!d,!1,!1]}},Ja=(e,t,r,a,i,n,s,l,d,p,h,u)=>{let f=i.format==="NHWC",w=t.type.value,g=Y("output",t.type.tensor,a);if(i.kernelShape.length<=2){let y="",x="",_="",b=r-(f?2:1);if(h?y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,i.kernelShape.length===2){let S=r-(f?3:2);u?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${S}] < 0 || xIndices[${S}] >= uniforms.x_shape[${S}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                `,_=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${w}(${l});
              var pad = 0;
              ${x}
              ${y}
              ${_}
              ${s}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let y=i.kernelShape.length,x=i.pads.length,_="";return p?_=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:_=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(d).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${y}>;

              var value = ${w}(${l});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${y-1}u; j++) {
                  offsets[j] = offset / ${q("uniforms.kernelStrides","j",y)};
                  offset -= offsets[j] * ${q("uniforms.kernelStrides","j",y)};
                }
                offsets[${y-1}] = offset;

                isPad = false;
                for (var j = ${r-y}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${q("uniforms.strides",`j - ${r-y}u`,y)}
                    + offsets[j - ${r-y}u] - ${q("uniforms.pads","j - 2u",x)};
                  ${_}
              }
              ${s}

              output[global_idx] = value;
            }`}},ei=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Ju=e=>`${ei(e)};${e.countIncludePad}`,el=e=>`${ei(e)};${e.storageOrder};${e.dilations}`,ti=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ri=(e,t,r,a)=>{let[i,n]=Za(t,a,r),s=B("x",t.dataType,t.dims.length),l=s.type.value,d="value += x_val;",p="";i.countIncludePad?p+=`value /= ${l}(uniforms.kernelSize);`:p+=`value /= ${l}(i32(uniforms.kernelSize) - pad);`;let[h,u,f,w,g]=Qa(n,i);h.push(...G(t.dims,n));let y=["rank"];return{name:e,shaderCache:{hint:`${a.cacheKey};${f};${w};${g}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(M.size(n)/64)},programUniforms:h}),getShaderSource:x=>Ja(x,s,t.dims.length,n.length,i,d,p,0,u,f,w,g)}},Ec=e=>{let t=e.count_include_pad!==0,r=ti(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let a={countIncludePad:t,...r,cacheKey:""};return{...a,cacheKey:Ju(a)}},Cc=(e,t)=>{Zt(e.inputs),e.compute(ri("AveragePool",e.inputs[0],!1,t))},ai={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Tc=e=>{let t=e.format;return{format:t,...ai,cacheKey:t}},zc=(e,t)=>{Zt(e.inputs),e.compute(ri("GlobalAveragePool",e.inputs[0],!0,t))},ii=(e,t,r,a)=>{let[i,n]=Za(t,a,r),s=`
      value = max(x_val, value);
    `,l="",d=B("x",t.dataType,t.dims.length),p=["rank"],[h,u,f,w,g]=Qa(n,i);return h.push(...G(t.dims,n)),{name:e,shaderCache:{hint:`${a.cacheKey};${f};${w};${g}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(M.size(n)/64)},programUniforms:h}),getShaderSource:y=>Ja(y,d,t.dims.length,n.length,i,s,l,t.dataType===10?-65504:-1e5,u,f,w,g)}},Ac=(e,t)=>{Zt(e.inputs),e.compute(ii("MaxPool",e.inputs[0],!1,t))},Oc=e=>{let t=e.storage_order,r=e.dilations,a=ti(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(a.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:t,dilations:r,...a,cacheKey:""};return{...i,cacheKey:el(i)}},Rc=e=>{let t=e.format;return{format:t,...ai,cacheKey:t}},Dc=(e,t)=>{Zt(e.inputs),e.compute(ii("GlobalMaxPool",e.inputs[0],!0,t))}}),tl,rl,Bc,Um=P(()=>{Ye(),Z(),se(),tl=(e,t,r)=>{let a=e===t,i=e<t&&r<0,n=e>t&&r>0;if(a||i||n)throw new Error("Range these inputs' contents are invalid.")},rl=(e,t,r,a)=>{let i=Math.abs(Math.ceil((t-e)/r)),n=[i],s=i,l=[{type:12,data:s},{type:a,data:e},{type:a,data:r},...G(n)],d=p=>{let h=Y("output",a,n.length),u=h.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:u},{name:"delta",type:u}];return`
        ${p.registerUniforms(f).declareVariables(h)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${u}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${a}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l})}},Bc=e=>{let t=0,r=0,a=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],a=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],a=e.inputs[2].getFloat32Array()[0]),he.webgpu.validateInputContent&&tl(t,r,a),e.compute(rl(t,r,a,e.inputs[0].dataType),{inputs:[]})}}),al,il,nl,sl,ol,ul,ll,dl,pl,cl,hl,ni,fl,ml,gl,wl,yl,Mc,Pc,Wm=P(()=>{Z(),oe(),Se(),se(),al=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},il=(e,t,r)=>{t.every(i=>i>=0&&i<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let a=new Array(r).fill(1);return t.forEach((i,n)=>a[i]=e[n]),a},nl=(e,t,r,a,i,n)=>{let[s,l,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(h=>n.push(h));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(l>0&&e.length>l&&e[l].dims.length>0){if(e[l].getFloat32Array().forEach(h=>a.push(h)),a.length!==0&&a.length!==p&&r>=18&&a.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");al(a,t),t.axes.length>0&&il(a,t.axes,p).forEach((h,u)=>a[u]=h)}if(d>0&&e.length>d&&(e[d].getBigInt64Array().forEach(h=>i.push(Number(h))),i.length!==p||r>=18&&i.length===t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(a.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof a<"u"&&typeof i<"u"&&a.length>0&&i.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},sl=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`return ${t}(xResized) / ${t}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating
                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
                    // offset-by-one error later in floor().
                    let whole = ${t}(xResized * (lengthOriginal - 1) / (lengthResized - 1));
                    let fract =
                        ${t}(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ${t}(lengthResized - 1);
                    return whole + fract;
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",ol=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",ul=(e,t,r)=>{let a=new Array(r).fill(0).concat(new Array(r).fill(1)),i=e.length===0?a:e.slice();return t.length>0?(t.forEach((n,s)=>{a[n]=i[s],a[s+r]=i[t.length+s]}),a):i},ll=(e,t,r,a)=>{let i=[];if(r.length>0)if(a.length>0){if(e.forEach(n=>i.push(n)),Math.max(...a)>e.length)throw new Error("axes is out of bound");a.forEach((n,s)=>i[n]=r[s])}else r.forEach(n=>i.push(n));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");i=e.map((n,s)=>Math.round(n*t[s]))}return i},dl=(e,t,r)=>{let a=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(n=>t[n]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(n=>t[n]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return r.axes.length>0?(r.axes.forEach(n=>t[n]=a),r.axes.forEach(n=>i[n]=Math.round(e[n]*t[n]))):(t.fill(a,0,t.length),i.forEach((n,s)=>i[s]=Math.round(n*t[s]))),i},pl=(e,t,r,a,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${q("uniforms.scales","i",a)};
        var roi_low = ${q("uniforms.roi","i",i)};
        var roi_hi = ${q("uniforms.roi",`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${q("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${q("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,cl=(e,t,r,a,i,n,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${a.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${q("uniforms.scales","i",i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${q("uniforms.roi","i",n)};
          var roi_hi = ${q("uniforms.roi",`i + ${r.length}`,n)};
          var input_shape_i = ${q("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${q("uniforms.output_shape","i",a.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,hl=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${q("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ni=(e,t,r,a)=>e.rank>a?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",fl=(e,t,r,a,i)=>{let[n,s,l,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${r[l]} - 1))`)};
      ${ni(e,d,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${l}];
      ${a?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[l]} - 1)) {
        return ${i};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[l]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},ml=(e,t,r,a,i,n,s,l,d,p)=>{let h=r.length===2,[u,f]=h?[0,1]:[2,3],w=e.type.value,g=y=>{let x=y===u?"row":"col";return`
      fn ${x}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${w} {
        var output_index = ${t.indicesGet("output_indices",y)};
        var originalIdx: ${w} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[y]},
        ${a[y]}, ${r[y]}, ${n[y]}, ${n[y]} + ${r.length});
        var fractOriginalIdx: ${w} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${l} && (originalIdx < 0 || originalIdx > (${r[y]} - 1))) {
          return ${d};
        }
        var data: array<${w}, 4> = array<${w}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${x}: ${w} = originalIdx + ${w}(i);
          if (${x} < 0 || ${x} >= ${r[y]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:l?`return ${d};`:`${x} = max(0, min(${x}, ${r[y]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",y,`u32(${x})`)};
          data[i + 1] = ${y===u?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${g(u)};
    ${g(f)};
  fn getCubicInterpolationCoefs(s: ${w}) -> array<${w}, 4> {
    var absS = abs(s);
    var coeffs: array<${w}, 4> = array<${w}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${w} = 1.0 - absS;
    var twoMinusAbsS: ${w} = 2.0 - absS;
    var onePlusAbsS: ${w} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${w}, 4>, coefs: array<${w}, 4>) -> ${w} {
    var coefsSum: ${w} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${w} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},gl=(e,t,r,a,i)=>{let[n,s,l,d,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${ni(e,p,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${s}];
      var height:${h} = originalIndices[${l}];
      var width:${h} = originalIndices[${d}];
      ${a?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[l]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${i};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[l]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${h} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${h} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${h} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${h} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${h} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${h} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${h} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${h} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${h} = abs(depth - ${h}(depth1));
      var dx2: ${h} = abs(${h}(depth2) - depth);
      var dy1: ${h} = abs(height - ${h}(height1));
      var dy2: ${h} = abs(${h}(height2) - height);
      var dz1: ${h} = abs(width - ${h}(width1));
      var dz2: ${h} = abs(${h}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},wl=(e,t,r,a,i,n)=>{let s=e.dims,l=ul(n,t.axes,s.length),d=ll(s,a,i,t.axes),p=a.slice();a.length===0&&(p=s.map((b,S)=>b===0?1:d[S]/b),t.keepAspectRatioPolicy!=="stretch"&&(d=dl(s,p,t)));let h=Y("output",e.dataType,d.length),u=B("input",e.dataType,s.length),f=M.size(d),w=s.length===d.length&&s.every((b,S)=>b===d[S]),g=t.coordinateTransformMode==="tf_crop_and_resize",y=t.extrapolationValue,x=u.type.value,_=b=>`
      ${w?"":`
      ${sl(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${hl(u,s)};
              ${ol(t.nearestMode,r,x)};
              ${cl(u,h,s,d,p.length,l.length,g)};
              `;case"linear":return`
              ${pl(h,s,d,p.length,l.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${fl(u,h,s,g,y)}`;if(s.length===3||s.length===5)return`${gl(u,h,s,g,y)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${ml(u,h,s,d,p,l,t.cubicCoeffA,g,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${b.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",l.length).declareVariables(u,h)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${w?"output[global_idx] = input[global_idx];":`
        let output_indices = ${h.offsetToIndices("global_idx")};
        var input_indices: ${u.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${u.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?p:""}|${i.length>0?i:""}|${l.length>0?l:""}|${w}|${s}`,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:p},{type:1,data:l},...G(s,d)]})}},yl=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Mc=(e,t)=>{let r=[],a=[],i=[],n=yl(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");nl(e.inputs,t,n,r,a,i),e.compute(wl(e.inputs[0],t,n,r,a,i),{inputs:[0]})},Pc=e=>{let t=e.antialias,r=e.axes,a=e.coordinateTransformMode,i=e.cubicCoeffA,n=e.excludeOutside!==0,s=e.extrapolationValue,l=e.keepAspectRatioPolicy,d=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return fe({antialias:t,axes:r,coordinateTransformMode:a,cubicCoeffA:i,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:l,mode:d,nearestMode:p})}}),$l,bl,Nc,Vm=P(()=>{Z(),oe(),Se(),se(),$l=(e,t)=>{let[r,a,i,n]=e,{numHeads:s,rotaryEmbeddingDim:l}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!M.areEqual(a.dims,[])&&!M.areEqual(a.dims,[1])&&a.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${a.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!M.areEqual(i.dims,n.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(l>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],p=r.dims[r.dims.length-2],h=i.dims[0],u=M.sizeFromDimension(r.dims,1)/p,f=l===0?i.dims[1]*2:u/s;if(l>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(a.dims.length===2){if(d!==a.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${a.dims[0]}`);if(p!==a.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${a.dims[1]}`)}if(f/2!==i.dims[1]&&l/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`);if(p>h)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},bl=(e,t)=>{let{interleaved:r,numHeads:a,rotaryEmbeddingDim:i,scale:n}=t,s=e[0].dims[0],l=M.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],p=l/d,h=e[2].dims[1],u=i===0?h*2:p/a,f=new Array(s,d,p/u,u-h),w=M.computeStrides(f),g=[{type:1,data:n},{type:12,data:f},{type:12,data:w},...e[0].dims.length===3?new Array({type:12,data:[l,p,u,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[l,u,d*u,1]}):[],...G(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],y=x=>{let _=B("input",e[0].dataType,e[0].dims.length),b=B("position_ids",e[1].dataType,e[1].dims.length),S=B("cos_cache",e[2].dataType,e[2].dims.length),k=B("sin_cache",e[3].dataType,e[3].dims.length),I=Y("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:w.length},{name:"input_output_strides",type:"u32",length:w.length}]),`
        ${x.declareVariables(_,b,S,k,I)}

        ${x.mainStart(qt)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${b.broadcastedIndicesToOffset("bsnh.xy",Y("",b.type.tensor,2))};
            let position_id =
                u32(${b.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${_.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${_.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${_.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} +
                ${_.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",_.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:fe({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(M.size(f)/qt)},programUniforms:g})}},Nc=(e,t)=>{$l(e.inputs,t),e.compute(bl(e.inputs,t))}}),vl,_l,Uc,Hm=P(()=>{Z(),oe(),se(),vl=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],a=e[2];if(t.dataType!==r.dataType||t.dataType!==a.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==n)throw new Error("Skip must have the same sequence length as input");if(a.dims.length!==1)throw new Error("Gamma must be 1D");if(a.dims[a.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},_l=(e,t,r,a)=>{let i=t.simplified,n=e[0].dims,s=M.size(n),l=n,d=s,p=n.slice(-1)[0],h=a?n.slice(0,-1).concat(1):[],u=!i&&e.length>3,f=e.length>4,w=a&&r>1,g=a&&r>2,y=r>3,x=64,_=_e(p),b=[{type:12,data:d},{type:12,data:_},{type:12,data:p},{type:1,data:t.epsilon}],S=I=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],C=[B("x",e[0].dataType,e[0].dims,_),B("skip",e[1].dataType,e[1].dims,_),B("gamma",e[2].dataType,e[2].dims,_)];u&&C.push(B("beta",e[3].dataType,e[3].dims,_)),f&&C.push(B("bias",e[4].dataType,e[4].dims,_)),C.push(Y("output",e[0].dataType,l,_)),w&&C.push(Y("mean_output",1,h)),g&&C.push(Y("inv_std_output",1,h)),y&&C.push(Y("input_skip_bias_sum",e[0].dataType,l,_));let R=xe(e[0].dataType),V=xe(1,_);return`

      ${I.registerUniforms(A).declareVariables(...C)}
      var<workgroup> sum_shared : array<${V}, ${x}>;
      var<workgroup> sum_squared_shared : array<${V}, ${x}>;

      ${I.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${f?"bias[offset1d + i]":R+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${y?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Vt(R,_,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${mt("sum",_)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${mt("square_sum",_)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${w?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${R}(mean)`}) *
            ${R}(inv_std_dev) * gamma[offset1d + i]
            ${u?"+ beta[offset1d + i]":""};
        }
      }`},k=[{dims:l,dataType:e[0].dataType}];return r>1&&k.push({dims:h,dataType:1}),r>2&&k.push({dims:h,dataType:1}),r>3&&k.push({dims:n,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${_};${w};${g};${y}`,inputDependencies:e.map((I,A)=>"type")},getShaderSource:S,getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(d/p)},programUniforms:b})}},Uc=(e,t)=>{vl(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(_l(e.inputs,t,e.outputCount,!1),{outputs:r})}}),xl,Qt,Sl,si,kl,Il,Wc,Vc,qm=P(()=>{Z(),oe(),Se(),se(),xl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,a)=>{if(e[a+1].dataType!==6&&e[a+1].dataType!==7)throw new Error(`Input ${a} must be an array of int32 or int64`)})},Qt=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(a=>r.push(Number(a)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(a=>r.push(Number(a)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Sl=(e,t)=>{if(e.length>1){let r=Qt(e,1),a=Qt(e,2),i=Qt(e,3);return i.length===0&&(i=[...Array(e[0].dims.length).keys()]),fe({starts:r,ends:a,axes:i})}else return t},si=(e,t,r,a,i)=>{let n=e;return e<0&&(n+=r[a[t]]),i[t]<0?Math.max(0,Math.min(n,r[a[t]]-1)):Math.max(0,Math.min(n,r[a[t]]))},kl=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${q("uniforms.input_shape","i",r.length)};
            let steps_i = ${q("uniforms.steps","i",r.length)};
            let signs_i = ${q("uniforms.signs","i",r.length)};
            let starts_i = ${q("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Il=(e,t)=>{let r=e[0].dims,a=M.size(r),i=t.axes.length>0?M.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],n=Qt(e,4);n.forEach(_=>_!==0||(()=>{throw new Error("step cannot be 0")})),n.length===0&&(n=Array(i.length).fill(1));let s=t.starts.map((_,b)=>si(_,b,r,i,n)),l=t.ends.map((_,b)=>si(_,b,r,i,n));if(i.length!==s.length||i.length!==l.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==r.length)for(let _=0;_<r.length;++_)i.includes(_)||(s.splice(_,0,0),l.splice(_,0,r[_]),n.splice(_,0,1));let d=n.map(_=>Math.sign(_));n.forEach((_,b,S)=>{if(_<0){let k=(l[b]-s[b])/_,I=s[b],A=I+k*n[b];s[b]=A,l[b]=I,S[b]=-_}});let p=r.slice(0);i.forEach((_,b)=>{p[_]=Math.ceil((l[_]-s[_])/n[_])});let h={dims:p,dataType:e[0].dataType},u=Y("output",e[0].dataType,p.length),f=B("input",e[0].dataType,e[0].dims.length),w=M.size(p),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:n.length}],y=[{type:12,data:w},{type:12,data:s},{type:6,data:d},{type:12,data:n},...G(e[0].dims,p)],x=_=>`
      ${_.registerUniforms(g).declareVariables(f,u)}
        ${kl(f,u,r)}
        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${u.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${u.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[h],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:y})}},Wc=(e,t)=>{xl(e.inputs,t);let r=Sl(e.inputs,t);e.compute(Il(e.inputs,r),{inputs:[0]})},Vc=e=>{let t=e.starts,r=e.ends,a=e.axes;return fe({starts:t,ends:r,axes:a})}}),El,Cl,Hc,qc,Lm=P(()=>{Z(),oe(),Se(),se(),El=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Cl=(e,t)=>{let r=e.dims,a=M.size(r),i=64,n=t.axis;if(n<0&&(n=r.length+n),n<r.length-1)throw new Error("softmax only supports last axis for now.");let s=r[n],l=a/s,d=_e(s),p=s/d,h=(x,_)=>_===4?`max(max(${x}.x, ${x}.y), max(${x}.z, ${x}.w))`:_===2?`max(${x}.x, ${x}.y)`:_===3?`max(max(${x}.x, ${x}.y), ${x}.z)`:x,u=B("x",e.dataType,e.dims,d),f=Y("result",e.dataType,e.dims,d),w=u.type.value,g=xe(e.dataType)==="f32"?`var threadMax = ${w}(-3.402823e+38f);`:`var threadMax = ${w}(-65504.0h);`,y=x=>`
      var<workgroup> rowMaxShared : ${w};
      var<workgroup> rowSumShared : ${w};
      var<workgroup> threadShared : array<${w}, ${i}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${w} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${w}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${x.registerUniform("packedCols","i32").declareVariables(u,f)}
      ${x.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${i};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${g}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${w}(${h("threadShared[0]",d)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${w}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${w}(${mt("threadShared[0]",d)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`;return{name:"Softmax",shaderCache:{hint:`${d}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.dataType}],dispatchGroup:{x:l},programUniforms:[{type:6,data:p}]}),getShaderSource:y}},Hc=(e,t)=>{El(e.inputs),e.compute(Cl(e.inputs[0],t))},qc=e=>fe({axis:e.axis})}),Tl,zl,Al,Ol,Rl,Lc,Fc,Fm=P(()=>{Z(),oe(),Se(),se(),Tl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},zl=(e,t)=>{let r=[],a=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),a=r.length),fe({numOutputs:a,axis:t.axis,splitSizes:r})},Al=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${q("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Ol=e=>{let t=e.length,r=[];for(let a=0;a<t;++a){let i=e[a].setByIndices("indices","input[global_idx]");t===1?r.push(i):a===0?r.push(`if (output_number == ${a}u) { ${i} }`):a===t-1?r.push(`else { ${i} }`):r.push(`else if (output_number == ${a}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Rl=(e,t)=>{let r=e[0].dims,a=M.size(r),i=e[0].dataType,n=M.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),l=B("input",i,r.length),d=new Array(t.numOutputs),p=[],h=[],u=0,f=[{type:12,data:a}];for(let g=0;g<t.numOutputs;g++){u+=t.splitSizes[g],d[g]=u;let y=r.slice();y[t.axis]=t.splitSizes[g],h.push(y),s[g]=Y(`output${g}`,i,y.length),p.push({dims:h[g],dataType:e[0].dataType})}f.push({type:12,data:d},...G(r,...h));let w=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(l,...s)}
  ${Al(d.length)}
  ${Ol(s)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${l.offsetToIndices("global_idx")};
    var index = ${l.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${q("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${l.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f})}},Lc=(e,t)=>{Tl(e.inputs);let r=e.inputs.length===1?t:zl(e.inputs,t);e.compute(Rl(e.inputs,r),{inputs:[0]})},Fc=e=>{let t=e.axis,r=e.splitSizes,a=e.numOutputs<0?r.length:e.numOutputs;if(a!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return fe({axis:t,numOutputs:a,splitSizes:r})}}),Dl,Bl,jc,jm=P(()=>{Z(),oe(),se(),Dl=(e,t,r,a,i)=>{let n=Y("output_data",i,r.length,4),s=B("a_data",t[1].dataType,t[1].dims.length,4),l=B("b_data",t[2].dataType,t[2].dims.length,4),d=B("c_data",t[0].dataType,t[0].dims.length,4),p,h=(u,f,w)=>`select(${f}, ${u}, ${w})`;if(!a)p=n.setByOffset("global_idx",h(s.getByOffset("global_idx"),l.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let u=(f,w,g="")=>{let y=`a_data[index_a${w}][component_a${w}]`,x=`b_data[index_b${w}][component_b${w}]`,_=`bool(c_data[index_c${w}] & (0xffu << (component_c${w} * 8)))`;return`
            let output_indices${w} = ${n.offsetToIndices(`global_idx * 4u + ${w}u`)};
            let offset_a${w} = ${s.broadcastedIndicesToOffset(`output_indices${w}`,n)};
            let offset_b${w} = ${l.broadcastedIndicesToOffset(`output_indices${w}`,n)};
            let offset_c${w} = ${d.broadcastedIndicesToOffset(`output_indices${w}`,n)};
            let index_a${w} = offset_a${w} / 4u;
            let index_b${w} = offset_b${w} / 4u;
            let index_c${w} = offset_c${w} / 4u;
            let component_a${w} = offset_a${w} % 4u;
            let component_b${w} = offset_b${w} % 4u;
            let component_c${w} = offset_c${w} % 4u;
            ${f}[${w}] = ${g}(${h(y,x,_)});
          `};i===9?p=`
            var data = vec4<u32>(0);
            ${u("data",0,"u32")}
            ${u("data",1,"u32")}
            ${u("data",2,"u32")}
            ${u("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${u("output_data[global_idx]",0)}
            ${u("output_data[global_idx]",1)}
            ${u("output_data[global_idx]",2)}
            ${u("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,s,l,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Bl=e=>{let t=e[1].dims,r=e[2].dims,a=e[0].dims,i=e[1].dataType,n=!(M.areEqual(t,r)&&M.areEqual(r,a)),s=t,l=M.size(t);if(n){let p=Ht.calcShape(Ht.calcShape(t,r,!1),a,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,l=M.size(s)}let d=Math.ceil(l/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Dl(p,e,s,n,i),getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:d},...G(a,t,r,s)]})}},jc=e=>{e.compute(Bl(e.inputs))}}),Gc,Gm=P(()=>{hm(),Ki(),fm(),mm(),gm(),wm(),ym(),Zp(),Sm(),km(),Im(),Em(),Cm(),Tm(),zm(),Am(),Om(),Rm(),Dm(),Bm(),Xp(),Mm(),wc(),Pm(),Nm(),Um(),Gi(),Wm(),Vm(),Hm(),qm(),Lm(),Fm(),$c(),Ft(),Yi(),jm(),Gc=new Map([["Abs",[Xd]],["Acos",[Zd]],["Acosh",[Qd]],["Add",[Op]],["ArgMax",[jd,wi]],["ArgMin",[Fd,wi]],["Asin",[Jd]],["Asinh",[ep]],["Atan",[tp]],["Atanh",[rp]],["Attention",[Gd]],["AveragePool",[Cc,Ec]],["BatchNormalization",[Kd]],["BiasAdd",[Yd]],["BiasSplitGelu",[Ap]],["Cast",[ip,ap]],["Ceil",[sp]],["Clip",[np]],["Concat",[Hp,qp]],["Conv",[xi,_i]],["ConvTranspose",[ec,Jp]],["Cos",[op]],["Cosh",[up]],["CumSum",[tc,rc]],["DepthToSpace",[ac,ic]],["Div",[Rp]],["Einsum",[nc,sc]],["Elu",[lp,ar]],["Equal",[Dp]],["Erf",[dp]],["Exp",[pp]],["Expand",[oc]],["FastGelu",[uc]],["Floor",[cp]],["FusedConv",[xi,_i]],["Gather",[dc,lc]],["GatherElements",[cc,pc]],["Gelu",[hp]],["Gemm",[fc,hc]],["GlobalAveragePool",[zc,Tc]],["GlobalMaxPool",[Dc,Rc]],["Greater",[Np]],["GreaterOrEqual",[Wp]],["GroupQueryAttention",[vc,bc]],["HardSigmoid",[vp,bp]],["InstanceNormalization",[_c]],["LayerNormalization",[xc]],["LeakyRelu",[fp,ar]],["Less",[Up]],["LessOrEqual",[Vp]],["Log",[Tp]],["MatMul",[Yp]],["MatMulNBits",[Sc,kc]],["MaxPool",[Ac,Oc]],["Mul",[Bp]],["MultiHeadAttention",[gc,mc]],["Neg",[gp]],["Not",[mp]],["Pad",[Ic]],["Pow",[Mp]],["QuickGelu",[zp,ar]],["Range",[Bc]],["Reciprocal",[wp]],["ReduceMin",[Wd]],["ReduceMean",[Bd]],["ReduceMax",[Ud]],["ReduceSum",[Hd]],["ReduceProd",[Vd]],["ReduceL1",[Md]],["ReduceL2",[Pd]],["ReduceLogSum",[Ld]],["ReduceLogSumExp",[Nd]],["ReduceSumSquare",[qd]],["Relu",[yp]],["Resize",[Mc,Pc]],["RotaryEmbedding",[Nc]],["Sigmoid",[$p]],["Sin",[_p]],["Sinh",[xp]],["Slice",[Wc,Vc]],["SkipLayerNormalization",[Uc]],["Split",[Lc,Fc]],["Sqrt",[Sp]],["Softmax",[Hc,qc]],["Sub",[Pp]],["Tan",[kp]],["Tanh",[Ip]],["ThresholdedRelu",[Cp,ar]],["Tile",[yc]],["Transpose",[xd,Sd]],["Where",[jc]]])}),Kc,Km=P(()=>{Ye(),$t(),se(),Kc=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,a,i){tt(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let p of t)l.push({binding:l.length,resource:{buffer:p.buffer}});for(let p of r)l.push({binding:l.length,resource:{buffer:p.buffer}});i&&l.push({binding:l.length,resource:i});let d=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:l,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:d,dispatchGroup:a};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}s.setPipeline(e.computePipeline),s.setBindGroup(0,d),s.dispatchWorkgroups(...a),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ke(e.programInfo.name)}dispose(){}build(e,t){tt(e.name);let r=this.backend.device,a=[];r.features.has("shader-f16")&&a.push("enable f16;");let i=_d(t,this.backend.device.limits),n=e.getShaderSource(i),s=`${a.join(`
`)}
${i.additionalImplementations}
${n}`,l=r.createShaderModule({code:s,label:e.name});be("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let d=r.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return Ke(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,a=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&r<=i&&a<=i)return[t,r,a];let n=t*r*a,s=Math.ceil(Math.sqrt(n));if(s>i){if(s=Math.ceil(Math.cbrt(n)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Ml,Pl,Nl,Yc,Ym=P(()=>{Ye(),Z(),$t(),dm(),pm(),Gm(),Km(),Ml=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let a=0;a<e.length;++a){let i=e[a].dataType;switch(t[a]){case"none":{r.push("");break}case"type":{r.push(`${i}`);break}case"rank":{let n=e[a].dims.length;r.push(`${i};${n}`);break}case"dims":{let n=e[a].dims.join(",");r.push(`${i};${n}`);break}default:throw new Error(`unsupported input dependency: ${t[a]}`)}}return r.join("|")},Pl=(e,t,r)=>{let a=e.name;return e.shaderCache?.hint&&(a+="["+e.shaderCache.hint+"]"),a+=":"+r+`:${Ml(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,a},Nl=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Yc=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],a={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r};t.features.has("chromium-experimental-timestamp-query-inside-passes")?r.push("chromium-experimental-timestamp-query-inside-passes"):t.features.has("timestamp-query")&&r.push("timestamp-query"),t.features.has("shader-f16")&&r.push("shader-f16"),this.device=await t.requestDevice(a),this.adapterInfo=new Nl(t.info||await t.requestAdapterInfo()),this.gpuDataManager=bd(this),this.programManager=new Kc(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,yd(e.logLevel,!!e.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;tt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let a=0;a<t.length/2;a++){let i=r[a],n=i.kernelId,s=this.kernels.get(n),l=s.kernelType,d=s.kernelName,p=i.programName,h=i.inputTensorViews,u=i.outputTensorViews,f=t[a*2],w=t[a*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=f);let g=Number(f-this.queryTimeBase),y=Number(w-this.queryTimeBase);if(!Number.isSafeInteger(g)||!Number.isSafeInteger(y))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map(x=>({dims:x.dims,dataType:zt(x.dataType)})),outputsMetadata:u.map(x=>({dims:x.dims,dataType:zt(x.dataType)})),kernelId:n,kernelType:l,kernelName:d,programName:p,startTime:g,endTime:y});else{let x="";h.forEach((b,S)=>{x+=`input[${S}]: [${b.dims}] | ${zt(b.dataType)}, `});let _="";u.forEach((b,S)=>{_+=`output[${S}]: [${b.dims}] | ${zt(b.dataType)}, `}),console.log(`[profiling] kernel "${n}|${l}|${d}|${p}" ${x}${_}execution time: ${y-g} ns`)}Hr("GPU",`${p}::${f}::${w}`)}e.unmap(),this.pendingQueries.delete(e)}),Ke()}run(e,t,r,a,i,n){tt(e.name);let s=[];for(let b=0;b<t.length;++b){let S=t[b].data;if(S===0)continue;let k=this.gpuDataManager.get(S);if(!k)throw new Error(`no GPU data for input: ${S}`);s.push(k)}let{outputs:l,dispatchGroup:d,programUniforms:p}=e.getRunData(t),h=r.length===0?l.map((b,S)=>S):r;if(h.length!==l.length)throw new Error(`Output size ${h.length} must be equal to ${l.length}.`);let u=[],f=[];for(let b=0;b<l.length;++b){if(!Number.isInteger(h[b])||h[b]<-3||h[b]>=n)throw new Error(`Invalid output index: ${h[b]}`);if(h[b]===-3)continue;let S=h[b]===-1,k=h[b]===-2,I=S||k?i(l[b].dataType,l[b].dims):a(h[b],l[b].dataType,l[b].dims);if(u.push(I),I.data===0)continue;let A=this.gpuDataManager.get(I.data);if(!A)throw new Error(`no GPU data for output: ${I.data}`);if(S&&this.temporaryData.push(A),k){let C=this.kernelPersistentData.get(this.currentKernelId);C||(C=[],this.kernelPersistentData.set(this.currentKernelId,C)),C.push(A)}f.push(A)}if(s.length!==t.length||f.length!==u.length){if(f.length===0)return Ke(e.name),u;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let w;if(p){let b=0,S=[];p.forEach(C=>{let R=typeof C.data=="number"?[C.data]:C.data;if(R.length===0)return;let V=C.type===10?2:4,U,J;C.type===10?(J=R.length>4?16:R.length>2?8:R.length*V,U=R.length>4?16:V*R.length):(J=R.length<=2?R.length*V:16,U=16),b=Math.ceil(b/J)*J,S.push(b);let F=C.type===10?8:4;b+=R.length>4?Math.ceil(R.length/F)*U:R.length*V});let k=16;b=Math.ceil(b/k)*k;let I=new ArrayBuffer(b);p.forEach((C,R)=>{let V=S[R],U=typeof C.data=="number"?[C.data]:C.data;if(C.type===6)new Int32Array(I,V,U.length).set(U);else if(C.type===12)new Uint32Array(I,V,U.length).set(U);else if(C.type===10)new Uint16Array(I,V,U.length).set(U);else if(C.type===1)new Float32Array(I,V,U.length).set(U);else throw new Error(`Unsupported uniform type: ${zt(C.type)}`)});let A=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(A.buffer,0,I,0,b),this.gpuDataManager.release(A.id),w={offset:0,size:b,buffer:A.buffer}}let g=this.programManager.normalizeDispatchGroupSize(d),y=g[1]===1&&g[2]===1,x=Pl(e,t,y),_=this.programManager.getArtifact(x);if(_||(_=this.programManager.build(e,g),this.programManager.setArtifact(x,_),be("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),p&&_.uniformVariablesInfo){if(p.length!==_.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${_.uniformVariablesInfo.length}, got ${p.length} in program "${_.programInfo.name}".`);for(let b=0;b<p.length;b++){let S=p[b],k=S.type,I=typeof S.data=="number"?1:S.data.length,[A,C]=_.uniformVariablesInfo[b];if(k!==A||I!==C)throw new Error(`Uniform variable ${b} mismatch: expect type ${A} with size ${C}, got type ${k} with size ${I} in program "${_.programInfo.name}".`)}}if(be("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${g[0]}x${g[1]}x${g[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:_.programInfo.name,inputTensorViews:t,outputTensorViews:u};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run(_,s,f,g,w),Ke(e.name),u}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,a){let i=Gc.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:a,kernelEntry:i[0],attributes:[i[1],r]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let a=this.kernels.get(e);if(!a)throw new Error(`kernel not created: ${e}`);let i=a.kernelType,n=a.kernelName,s=a.kernelEntry,l=a.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),be("info",()=>`[WebGPU] Start to run kernel "[${i}] ${n}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),s(t,l[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${n}" failed. ${p}`)),1}finally{d&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${i}] ${n}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,a){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let n=i.get(t),s=this.gpuDataManager.registerExternalBuffer(r,a,n?.[1]);return i.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[1])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let a=await mi(this,e,t);return $d(a.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){be("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){be("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){be("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let a=0;a<r;a++){let i=this.getComputePassEncoder(),n=e[a];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(n.computePipeline),i.setBindGroup(0,n.bindGroup),i.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[a]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Xc={};pr(Xc,{init:()=>Zc});var Rr,Ul,Zc,Xm=P(()=>{Z(),Ym(),$t(),oe(),Rr=class Qc{constructor(t,r,a,i){this.module=t,this.dataType=r,this.data=a,this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=M.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=M.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=M.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(M.size(t)!==M.size(this.dims))throw new Error("Invalid new shape");return new Qc(this.module,this.dataType,this.data,t)}},Ul=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let a=e.HEAPU32,i=r>>>2;this.opKernelContext=a[i++];let n=a[i++];this.outputCount=a[i++],this.customDataOffset=a[i++],this.customDataSize=a[i++];let s=[];for(let l=0;l<n;l++){let d=a[i++],p=a[i++],h=a[i++],u=[];for(let f=0;f<h;f++)u.push(a[i++]);s.push(new Rr(e,d,p,u))}this.inputs=s}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,a=t?.outputs??[],i=(s,l,d)=>new Rr(this.module,l,this.output(s,d),d),n=(s,l)=>{let d=nr(s);if(!d)throw new Error(`Unsupported data type: ${s}`);let p=d*M.size(l),h=p>0?this.backend.gpuDataManager.create(p).id:0;return new Rr(this.module,s,h,l)};return this.backend.run(e,r,a,i,n,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let a=this.module.stackAlloc((1+t.length)*4),i=a>>2;this.module.HEAPU32[i++]=t.length;for(let n=0;n<t.length;n++)this.module.HEAPU32[i++]=t[n];return this.module._JsepOutput(this.opKernelContext,e,a)}catch(a){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${a}`)}finally{this.module.stackRestore(r)}}},Zc=async(e,t,r,a)=>{let i=t.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let n=new Yc;await n.initialize(r,a),i("webgpu",[n,s=>n.alloc(s),s=>n.free(s),(s,l,d,p=!1)=>{if(p)be("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${s}, dst=${l}, size=${d}`),n.memcpy(s,l);else{be("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${s}, gpuDataId=${l}, size=${d}`);let h=t.HEAPU8.subarray(s>>>0,(s>>>0)+d);n.upload(l,h)}},async(s,l,d)=>{be("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${l}, size=${d}`),await n.download(s,()=>t.HEAPU8.subarray(l>>>0,(l>>>0)+d))},(s,l,d)=>n.createKernel(s,l,d,t.UTF8ToString(t._JsepGetNodeName(l))),s=>n.releaseKernel(s),(s,l,d,p)=>{be("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${s}, contextDataOffset=${l}`);let h=new Ul(t,n,l);return n.computeKernel(s,h,p)},()=>n.captureBegin(),()=>n.captureEnd(),()=>n.replay()])}else i("webnn")}}),Wl,en,tn,ct,Vl,Yr,rn,an,oi,nn,sn,on,Jc=P(()=>{um(),lm(),Z(),Lt(),Ui(),wd(),Wl=(e,t)=>{Ie()._OrtInit(e,t)!==0&&$e("Can't initialize onnxruntime.")},en=async e=>{Wl(e.wasm.numThreads,Lr(e.logLevel))},tn=async(e,t)=>{{let r=(Xm(),Vr(Xc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let a=e.webgpu.adapter;if(a){if(typeof a.limits!="object"||typeof a.features!="object"||typeof a.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(a=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:n}),!a)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ie(),e,a)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ie(),e)}}},ct=new Map,Vl=e=>{let t=Ie(),r=t.stackSave();try{let a=t.stackAlloc(8);return t._OrtGetInputOutputCount(e,a,a+4)!==0&&$e("Can't get session input/output count."),[t.HEAP32[a/4],t.HEAP32[a/4+1]]}finally{t.stackRestore(r)}},Yr=e=>{let t=Ie(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},rn=async(e,t)=>{let r,a,i=Ie();Array.isArray(e)?[r,a]=e:e.buffer===i.HEAPU8.buffer?[r,a]=[e.byteOffset,e.byteLength]:[r,a]=Yr(e);let n=0,s=0,l=0,d=[],p=[],h=[];try{if([s,d]=gd(t),t?.externalData&&i.mountExternalData){let b=[];for(let S of t.externalData){let k=typeof S=="string"?S:S.path;b.push(Hi(typeof S=="string"?S:S.data).then(I=>{i.mountExternalData(k,I)}))}await Promise.all(b)}for(let b of t?.executionProviders??[])if((typeof b=="string"?b:b.name)==="webnn"){if(i.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof b!="string"){let S=b,k=S?.context,I=S?.gpuDevice,A=S?.deviceType,C=S?.numThreads,R=S?.powerPreference;k?i.currentContext=k:I?i.currentContext=await navigator.ml.createContext(I):i.currentContext=await navigator.ml.createContext({deviceType:A,numThreads:C,powerPreference:R})}else i.currentContext=await navigator.ml.createContext();break}n=await i._OrtCreateSession(r,a,s),n===0&&$e("Can't create a session."),i.currentContext&&(i.currentContext=void 0);let[u,f]=Vl(n),w=!!t?.enableGraphCapture,g=[],y=[],x=[];for(let b=0;b<u;b++){let S=i._OrtGetInputName(n,b);S===0&&$e("Can't get an input name."),p.push(S),g.push(i.UTF8ToString(S))}for(let b=0;b<f;b++){let S=i._OrtGetOutputName(n,b);S===0&&$e("Can't get an output name."),h.push(S);let k=i.UTF8ToString(S);y.push(k);{if(w&&t?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let I=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[k]??"cpu";if(I!=="cpu"&&I!=="cpu-pinned"&&I!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${I}.`);if(w&&I!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${I}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(I)}}let _=null;return x.some(b=>b==="gpu-buffer")&&(l=i._OrtCreateBinding(n),l===0&&$e("Can't create IO binding."),_={handle:l,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map(b=>fi(b))}),ct.set(n,[n,p,h,_,w,!1]),[n,g,y]}catch(u){throw p.forEach(f=>i._OrtFree(f)),h.forEach(f=>i._OrtFree(f)),l!==0&&i._OrtReleaseBinding(l),n!==0&&i._OrtReleaseSession(n),u}finally{i._free(r),s!==0&&i._OrtReleaseSessionOptions(s),d.forEach(u=>i._free(u)),i.unmountExternalData?.()}},an=e=>{let t=Ie(),r=ct.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[a,i,n,s,l]=r;s&&(l&&t._OrtClearBoundOutputs(s.handle),t._OrtReleaseBinding(s.handle)),t.jsepOnReleaseSession?.(e),i.forEach(d=>t._OrtFree(d)),n.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(a),ct.delete(e)},oi=(e,t,r,a,i,n=!1)=>{if(!e){t.push(0);return}let s=Ie(),l=e[0],d=e[1],p=e[3],h,u;if(l==="string"&&p==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(n&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let g=e[2].gpuBuffer,y=nr(hi(l));u=d.reduce((_,b)=>_*b,1)*y;let x=s.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');h=x(a,i,g,u)}else{let g=e[2];if(Array.isArray(g)){u=4*g.length,h=s._malloc(u),r.push(h);let y=h/4;for(let x=0;x<g.length;x++){if(typeof g[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);s.HEAPU32[y++]=Ce(g[x],r)}}else u=g.byteLength,h=s._malloc(u),r.push(h),s.HEAPU8.set(new Uint8Array(g.buffer,g.byteOffset,u),h)}let f=s.stackSave(),w=s.stackAlloc(4*d.length);try{let g=w/4;d.forEach(x=>s.HEAP32[g++]=x);let y=s._OrtCreateTensor(hi(l),h,u,w,d.length,fi(p));y===0&&$e(`Can't create tensor for input/output. session=${a}, index=${i}.`),t.push(y)}finally{s.stackRestore(f)}},nn=async(e,t,r,a,i,n)=>{let s=Ie(),l=ct.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],p=l[1],h=l[2],u=l[3],f=l[4],w=l[5],g=t.length,y=a.length,x=0,_=[],b=[],S=[],k=[],I=s.stackSave(),A=s.stackAlloc(g*4),C=s.stackAlloc(g*4),R=s.stackAlloc(y*4),V=s.stackAlloc(y*4);try{[x,_]=md(n);for(let L=0;L<g;L++)oi(r[L],b,k,e,t[L],f);for(let L=0;L<y;L++)oi(i[L],S,k,e,g+a[L],f);let U=A/4,J=C/4,F=R/4,ie=V/4;for(let L=0;L<g;L++)s.HEAPU32[U++]=b[L],s.HEAPU32[J++]=p[t[L]];for(let L=0;L<y;L++)s.HEAPU32[F++]=S[L],s.HEAPU32[ie++]=h[a[L]];if(u&&!w){let{handle:L,outputPreferredLocations:de,outputPreferredLocationsEncoded:ne}=u;if(p.length!==g)throw new Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${p.length}).`);for(let j=0;j<g;j++){let re=t[j];await s._OrtBindInput(L,p[re],b[j])!==0&&$e(`Can't bind input[${j}] for session=${e}.`)}for(let j=0;j<y;j++){let re=a[j];i[j]?.[3]?s._OrtBindOutput(L,h[re],S[j],0)!==0&&$e(`Can't bind pre-allocated output[${j}] for session=${e}.`):s._OrtBindOutput(L,h[re],0,ne[re])!==0&&$e(`Can't bind output[${j}] to ${de[j]} for session=${e}.`)}ct.set(e,[d,p,h,u,f,!0])}s.jsepOnRunStart?.(d);let ee;u?ee=await s._OrtRunWithBinding(d,u.handle,y,R,x):ee=await s._OrtRun(d,C,A,g,V,y,R,x),ee!==0&&$e("failed to call OrtRun().");let te=[];for(let L=0;L<y;L++){let de=s.HEAPU32[R/4+L];if(de===S[L]){te.push(i[L]);continue}let ne=s.stackSave(),j=s.stackAlloc(4*4),re=!1,O,H=0;try{s._OrtGetTensorData(de,j,j+4,j+8,j+12)!==0&&$e(`Can't access output tensor data on index ${L}.`);let ae=j/4,we=s.HEAPU32[ae++];H=s.HEAPU32[ae++];let me=s.HEAPU32[ae++],Be=s.HEAPU32[ae++],Ve=[];for(let Te=0;Te<Be;Te++)Ve.push(s.HEAPU32[me/4+Te]);s._OrtFree(me);let ye=Ve.reduce((Te,Ee)=>Te*Ee,1);O=zt(we);let Re=u?.outputPreferredLocations[a[L]];if(O==="string"){if(Re==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let Te=[],Ee=H/4;for(let nt=0;nt<ye;nt++){let st=s.HEAPU32[Ee++],_t=nt===ye-1?void 0:s.HEAPU32[Ee]-st;Te.push(s.UTF8ToString(st,_t))}te.push([O,Ve,Te,"cpu"])}else if(Re==="gpu-buffer"&&ye>0){let Te=s.jsepGetBuffer;if(!Te)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Ee=Te(H),nt=nr(we);if(nt===void 0||!Vi(O))throw new Error(`Unsupported data type: ${O}`);re=!0,te.push([O,Ve,{gpuBuffer:Ee,download:s.jsepCreateDownloader(Ee,ye*nt,O),dispose:()=>{s._OrtReleaseTensor(de)}},"gpu-buffer"])}else{let Te=Wi(O),Ee=new Te(ye);new Uint8Array(Ee.buffer,Ee.byteOffset,Ee.byteLength).set(s.HEAPU8.subarray(H,H+Ee.byteLength)),te.push([O,Ve,Ee,"cpu"])}}finally{s.stackRestore(ne),O==="string"&&H&&s._free(H),re||s._OrtReleaseTensor(de)}}return u&&!f&&(s._OrtClearBoundOutputs(u.handle),ct.set(e,[d,p,h,u,f,!1])),te}finally{s.stackRestore(I),b.forEach(U=>s._OrtReleaseTensor(U)),S.forEach(U=>s._OrtReleaseTensor(U)),k.forEach(U=>s._free(U)),x!==0&&s._OrtReleaseRunOptions(x),_.forEach(U=>s._free(U))}},sn=e=>{let t=Ie(),r=ct.get(e);if(!r)throw new Error("invalid session id");let a=r[0],i=t._OrtEndProfiling(a);i===0&&$e("Can't get an profile file name."),t._OrtFree(i)},on=e=>{let t=[];for(let r of e){let a=r[2];!Array.isArray(a)&&"buffer"in a&&t.push(a.buffer)}return t}}),ht,Ne,Nt,Jt,er,Dr,ui,Br,It,Et,Hl,eh,th,rh,ah,ih,nh,sh,oh=P(()=>{Ye(),Jc(),Lt(),Jr(),ht=()=>!!he.wasm.proxy&&typeof document<"u",Nt=!1,Jt=!1,er=!1,Br=new Map,It=(e,t)=>{let r=Br.get(e);r?r.push(t):Br.set(e,[t])},Et=()=>{if(Nt||!Jt||er||!Ne)throw new Error("worker not ready")},Hl=e=>{switch(e.data.type){case"init-wasm":Nt=!1,e.data.err?(er=!0,ui[1](e.data.err)):(Jt=!0,ui[0]()),Dr&&(URL.revokeObjectURL(Dr),Dr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Br.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},eh=async()=>{if(!Jt){if(Nt)throw new Error("multiple calls to 'initWasm()' detected.");if(er)throw new Error("previous call to 'initWasm()' failed.");if(Nt=!0,ht())return new Promise((e,t)=>{Ne?.terminate(),hd().then(([r,a])=>{try{Ne=a,Ne.onerror=n=>t(n),Ne.onmessage=Hl,ui=[e,t];let i={type:"init-wasm",in:he};Ne.postMessage(i),Dr=r}catch(i){t(i)}},t)});try{await Ni(he.wasm),await en(he),Jt=!0}catch(e){throw er=!0,e}finally{Nt=!1}}},th=async e=>{if(ht())return Et(),new Promise((t,r)=>{It("init-ep",[t,r]);let a={type:"init-ep",in:{epName:e,env:he}};Ne.postMessage(a)});await tn(he,e)},rh=async e=>ht()?(Et(),new Promise((t,r)=>{It("copy-from",[t,r]);let a={type:"copy-from",in:{buffer:e}};Ne.postMessage(a,[e.buffer])})):Yr(e),ah=async(e,t)=>{if(ht()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Et(),new Promise((r,a)=>{It("create",[r,a]);let i={type:"create",in:{model:e,options:{...t}}},n=[];e instanceof Uint8Array&&n.push(e.buffer),Ne.postMessage(i,n)})}else return rn(e,t)},ih=async e=>{if(ht())return Et(),new Promise((t,r)=>{It("release",[t,r]);let a={type:"release",in:e};Ne.postMessage(a)});an(e)},nh=async(e,t,r,a,i,n)=>{if(ht()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Et(),new Promise((s,l)=>{It("run",[s,l]);let d=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:a,options:n}};Ne.postMessage(p,on(d))})}else return nn(e,t,r,a,i,n)},sh=async e=>{if(ht())return Et(),new Promise((t,r)=>{It("end-profiling",[t,r]);let a={type:"end-profiling",in:e};Ne.postMessage(a)});sn(e)}}),li,ql,uh,Zm=P(()=>{Ye(),oh(),Z(),Pi(),wd(),li=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ql=e=>{switch(e[3]){case"cpu":return new ve(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Vi(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:a,dispose:i}=e[2];return ve.fromGpuBuffer(r,{dataType:t,dims:e[1],download:a,dispose:i})}default:throw new Error(`invalid data location: ${e[3]}`)}},uh=class{async fetchModelAndCopyToWasmMemory(e){return rh(await Hi(e))}async loadModel(e,t){tt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames]=await ah(r,t),Ke()}async dispose(){return ih(this.sessionId)}async run(e,t,r){tt();let a=[],i=[];Object.entries(e).forEach(u=>{let f=u[0],w=u[1],g=this.inputNames.indexOf(f);if(g===-1)throw new Error(`invalid input '${f}'`);a.push(w),i.push(g)});let n=[],s=[];Object.entries(t).forEach(u=>{let f=u[0],w=u[1],g=this.outputNames.indexOf(f);if(g===-1)throw new Error(`invalid output '${f}'`);n.push(w),s.push(g)});let l=a.map((u,f)=>li(u,()=>`input "${this.inputNames[i[f]]}"`)),d=n.map((u,f)=>u?li(u,()=>`output "${this.outputNames[s[f]]}"`):null),p=await nh(this.sessionId,i,l,s,d,r),h={};for(let u=0;u<p.length;u++)h[this.outputNames[s[u]]]=n[u]??ql(p[u]);return Ke(),h}startProfiling(){}endProfiling(){sh(this.sessionId)}}}),Ll,lh,Qm=P(()=>{Ye(),oh(),Zm(),Jr(),Ll=()=>{if((typeof he.wasm.initTimeout!="number"||he.wasm.initTimeout<0)&&(he.wasm.initTimeout=0),he.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof he.wasm.proxy!="boolean"&&(he.wasm.proxy=!1),typeof he.wasm.trace!="boolean"&&(he.wasm.trace=!1),typeof he.wasm.numThreads!="number"||!Number.isInteger(he.wasm.numThreads)||he.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)he.wasm.numThreads=1;else{let e=typeof navigator>"u"?Hf("node:os").cpus().length:navigator.hardwareConcurrency;he.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},lh=class{async init(e){Ll(),await eh(),await th(e)}async createInferenceSessionHandler(e,t){let r=new uh;return await r.loadModel(e,t),Promise.resolve(r)}}}),dh={};pr(dh,{wasmBackend:()=>ph});var ph,Jm=P(()=>{Qm(),ph=new lh});Ye();Ye();Ye();var eg="1.19.2";{let e=(Jm(),Vr(dh)).wasmBackend;Wt("webgpu",e,5),Wt("webnn",e,5),Wt("cpu",e,10),Wt("wasm",e,10)}Object.defineProperty(he.versions,"web",{value:eg,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */he.wasm.wasmPaths=`${import.meta.env.BASE_URL}ort/`;he.wasm.numThreads=1;he.wasm.simd=!0;async function tg(){if(!("gpu"in navigator))return!1;try{return!!await navigator.gpu.requestAdapter()}catch{return!1}}async function ch(e,t){const r=await Mi.create(e,{executionProviders:t,graphOptimizationLevel:"all"});return r._backend=t[0],r}class rg{constructor(t,r){this.url=t,this.session=r}get inputNames(){return this.session.inputNames}get outputNames(){return this.session.outputNames}get _backend(){return this.session._backend}async run(t){try{return await this.session.run(t)}catch(r){if(this.session._backend==="webgpu")return console.warn(`[ort] inferência falhou em WebGPU para ${this.url}, tentando WASM:`,r),this.session=await ch(this.url,["wasm"]),await this.session.run(t);throw r}}}async function it(e,{preferWebgpu:t=!0}={}){const r=t?[["webgpu"],["wasm"]]:[["wasm"]];let a;for(const i of r)try{const n=await ch(e,i);return new rg(e,n)}catch(n){a=n,console.warn(`[ort] falha ao criar sessão com ${i[0]} para ${e}:`,n)}throw a}function vt(e,t){const r=document.createElement("canvas");return r.width=e,r.height=t,r}async function hh(e){const t=new Image,r=e instanceof Blob?URL.createObjectURL(e):e;await new Promise((i,n)=>{t.onload=i,t.onerror=n,t.src=r});const a=vt(t.naturalWidth,t.naturalHeight);return a.getContext("2d").drawImage(t,0,0),e instanceof Blob&&URL.revokeObjectURL(r),a}function ag(e){const t=vt(e.videoWidth,e.videoHeight);return t.getContext("2d").drawImage(e,0,0),t}function ig(e,t=1280,r=2){let{width:a,height:i}=e,n=e;if(t>0&&Math.max(i,a)>t){let d,p;i>a?(d=t,p=Math.round(a*t/i)):(p=t,d=Math.round(i*t/a)),n=Rt(n,p,d),a=p,i=d}const s=i-i%r,l=a-a%r;if(s!==i||l!==a){const d=vt(l,s);return d.getContext("2d").drawImage(n,0,0,l,s,0,0,l,s),d}return n}function Rt(e,t,r,a=!0){const i=vt(t,r),n=i.getContext("2d");return n.imageSmoothingEnabled=a,n.imageSmoothingQuality="high",n.drawImage(e,0,0,e.width,e.height,0,0,t,r),i}function ur(e,t,r,a){const i=vt(r,a),n=i.getContext("2d");return n.imageSmoothingEnabled=!0,n.imageSmoothingQuality="high",n.setTransform(t[0][0],t[1][0],t[0][1],t[1][1],t[0][2],t[1][2]),n.drawImage(e,0,0),n.setTransform(1,0,0,1,0,0),i}function ng(e){const[t,r,a]=e[0],[i,n,s]=e[1],l=t*n-r*i,d=n/l,p=-r/l,h=-i/l,u=t/l,f=-(d*a+p*s),w=-(h*a+u*s);return[[d,p,f],[h,u,w]]}function fh(e,t=256){const a=(e.width===t&&e.height===t?e:Rt(e,t,t)).getContext("2d"),{data:i}=a.getImageData(0,0,t,t),n=new Float32Array(3*t*t),s=t*t;for(let l=0;l<s;l++){const d=l*4;n[l]=i[d]/255,n[s+l]=i[d+1]/255,n[2*s+l]=i[d+2]/255}return n}function sg(e,t,r,a){const i=vt(a,r),n=i.getContext("2d"),s=n.createImageData(a,r),l=r*a;for(let d=0;d<l;d++){const p=d*4;s.data[p]=Wr(e[d]*255),s.data[p+1]=Wr(e[l+d]*255),s.data[p+2]=Wr(e[2*l+d]*255),s.data[p+3]=255}return n.putImageData(s,0,0),i}function Wr(e){return e<0?0:e>255?255:Math.round(e)}function mh(e,t,r,a,i){const s=(e.width===t&&e.height===r?e:Rt(e,t,r)).getContext("2d"),{data:l}=s.getImageData(0,0,t,r),d=t*r,p=new Float32Array(3*d);for(let h=0;h<d;h++){const u=h*4;p[h]=(l[u]-i)*a,p[d+h]=(l[u+1]-i)*a,p[2*d+h]=(l[u+2]-i)*a}return p}function og(e,t,r){const a=r.width,i=r.height,n=e.getContext("2d").getImageData(0,0,a,i).data,s=t.getContext("2d").getImageData(0,0,a,i).data,l=r.getContext("2d").getImageData(0,0,a,i).data,d=vt(a,i),p=d.getContext("2d"),h=p.createImageData(a,i);for(let u=0;u<a*i;u++){const f=u*4,w=s[f]/255;for(let g=0;g<3;g++)h.data[f+g]=Wr(w*n[f+g]+(1-w)*l[f+g]);h.data[f+3]=255}return p.putImageData(h,0,0),d}function ug(e,t){return e.map(([r,a],i)=>{const[n,s,l,d]=t[i];return[r-n,a-s,r+l,a+d]})}function lg(e,t){return e.map(([r,a],i)=>{const n=t[i],s=[];for(let l=0;l<n.length;l+=2)s.push(r+n[l],a+n[l+1]);return s})}function dg(e,t){const r=Math.max(e[0],t[0]),a=Math.max(e[1],t[1]),i=Math.min(e[2],t[2]),n=Math.min(e[3],t[3]),s=Math.max(0,i-r+1),l=Math.max(0,n-a+1),d=s*l,p=(e[2]-e[0]+1)*(e[3]-e[1]+1),h=(t[2]-t[0]+1)*(t[3]-t[1]+1);return d/(p+h-d)}function pg(e,t){const r=e.map((n,s)=>s).sort((n,s)=>e[s][4]-e[n][4]),a=[],i=new Set;for(let n=0;n<r.length;n++){const s=r[n];if(!i.has(s)){a.push(s);for(let l=n+1;l<r.length;l++){const d=r[l];i.has(d)||dg(e[s],e[d])>t&&i.add(d)}}}return a}class cg{constructor(){this.nmsThresh=.4,this.detThresh=.5,this.inputMean=127.5,this.inputStd=128,this.centerCache=new Map}async load(t){this.session=await it(t);const r=this.session.outputNames;this.outputNames=r;const a=r.length;this.useKps=a===9||a===15,a===6||a===9?(this.fmc=3,this.featStrideFpn=[8,16,32],this.numAnchors=2):(this.fmc=5,this.featStrideFpn=[8,16,32,64,128],this.numAnchors=1)}_anchorCenters(t,r,a){const i=`${t}_${r}_${a}`;if(this.centerCache.has(i))return this.centerCache.get(i);const n=[];for(let s=0;s<t;s++)for(let l=0;l<r;l++)for(let d=0;d<this.numAnchors;d++)n.push([l*a,s*a]);return this.centerCache.size<100&&this.centerCache.set(i,n),n}async _forward(t,r){const a=t.width,i=t.height,n=mh(t,a,i,1/this.inputStd,this.inputMean),s=new ve("float32",n,[1,3,i,a]),l={[this.session.inputNames[0]]:s},d=await this.session.run(l),p=this.outputNames.map(g=>d[g]),h=[],u=[],f=[],w=this.fmc;for(let g=0;g<this.featStrideFpn.length;g++){const y=this.featStrideFpn[g],x=p[g],_=p[g+w],b=this.useKps?p[g+w*2]:null,S=Math.floor(i/y),k=Math.floor(a/y),I=this._anchorCenters(S,k,y),A=Array.from(x.data),C=A.length,R=_.data.length/C,V=[];for(let F=0;F<C;F++){const ie=[];for(let ee=0;ee<R;ee++)ie.push(_.data[F*R+ee]*y);V.push(ie)}const U=ug(I,V);let J=null;if(this.useKps){const F=b.data.length/C,ie=[];for(let ee=0;ee<C;ee++){const te=[];for(let L=0;L<F;L++)te.push(b.data[ee*F+L]*y);ie.push(te)}J=lg(I,ie)}for(let F=0;F<C;F++)A[F]>=r&&(h.push(A[F]),u.push(U[F]),J&&f.push(J[F]))}return{scoresList:h,bboxesList:u,kpssList:f}}async detect(t,r=512,a=0){const i=t.height/t.width,n=1;let s,l;i>n?(l=r,s=Math.round(l/i)):(s=r,l=Math.round(s*i));const d=l/t.height,p=Rt(t,s,l),h=vt(r,r);h.getContext("2d").drawImage(p,0,0);const{scoresList:u,bboxesList:f}=await this._forward(h,this.detThresh);if(u.length===0)return[];let w=f.map((y,x)=>[y[0]/d,y[1]/d,y[2]/d,y[3]/d,u[x]]);return w=pg(w,this.nmsThresh).map(y=>w[y]),w.sort((y,x)=>x[4]-y[4]),a>0&&w.length>a&&(w=w.slice(0,a)),w}}function hg(e,t,r){const a=e[0]*r,i=e[1]*r;return[[r,0,t/2-a],[0,r,t/2-i]]}class fg{constructor(){this.inputMean=127.5,this.inputStd=128}async load(t){this.session=await it(t);const r=this.session.inputNames[0];this.inputName=r,this.inputSize=192}async get(t,r){const a=r[2]-r[0],i=r[3]-r[1],n=[(r[2]+r[0])/2,(r[3]+r[1])/2],s=this.inputSize/(Math.max(a,i)*1.5),l=hg(n,this.inputSize,s),d=ur(t,l,this.inputSize,this.inputSize),p=mh(d,this.inputSize,this.inputSize,1/this.inputStd,this.inputMean),h=new ve("float32",p,[1,3,this.inputSize,this.inputSize]),u=await this.session.run({[this.inputName]:h}),f=this.session.outputNames[0],w=Array.from(u[f].data),g=ng(l),y=[],x=Math.floor(this.inputSize/2);for(let _=0;_<w.length;_+=2){let b=(w[_]+1)*x,S=(w[_+1]+1)*x;const k=b*g[0][0]+S*g[0][1]+g[0][2],I=b*g[1][0]+S*g[1][1]+g[1][2];y.push([k,I])}return y}}function lr(e){const t=e.length,r=e.reduce((i,n)=>i+n[0],0),a=e.reduce((i,n)=>i+n[1],0);return[r/t,a/t]}function mg(e,t=!0){const r=lr([e[33],e[35],e[40],e[39]]),a=lr([e[87],e[89],e[94],e[93]]);if(t){const i=[(r[0]+a[0])/2,(r[1]+a[1])/2],n=[(e[52][0]+e[61][0])/2,(e[52][1]+e[61][1])/2];return[i,n]}return[r,a]}function gg(e,t=!0){const r=lr([e[0],e[6],e[12],e[18]]),a=lr([e[24],e[30],e[36],e[42]]);if(t){const i=[(r[0]+a[0])/2,(r[1]+a[1])/2],n=[(e[48][0]+e[66][0])/2,(e[48][1]+e[66][1])/2];return[i,n]}return[r,a]}function wg(e,t=!0){if(e.length===106)return mg(e,t);if(e.length===203)return gg(e,t);throw new Error(`Numero de pontos nao suportado: ${e.length}`)}function yg(e,{scale:t=1.5,needSquare:r=!0,vxRatio:a=0,vyRatio:i=0,useLip:n=!0}={}){const s=wg(e,n);let l=[s[1][0]-s[0][0],s[1][1]-s[0][1]];const d=Math.hypot(l[0],l[1]);d<=.001?l=[0,1]:l=[l[0]/d,l[1]/d];const p=[l[1],-l[0]];let h=Math.acos(p[0]);p[1]<0&&(h=-h);const u=lr(e);let f=1/0,w=1/0,g=-1/0,y=-1/0;for(const[S,k]of e){const I=S-u[0],A=k-u[1],C=I*p[0]+A*p[1],R=I*l[0]+A*l[1];C<f&&(f=C),R<w&&(w=R),C>g&&(g=C),R>y&&(y=R)}const x=[(f+g)/2,(w+y)/2];let _=[g-f,y-w];if(r){const S=Math.max(_[0],_[1]);_=[S,S]}_=[_[0]*t,_[1]*t];let b=[u[0]+p[0]*x[0]+l[0]*x[1],u[1]+p[1]*x[0]+l[1]*x[1]];return b=[b[0]+p[0]*(a*_[0])+l[0]*(i*_[1]),b[1]+p[1]*(a*_[0])+l[1]*(i*_[1])],{center:b,size:_,angle:h}}function $g(e){const[t,r,a]=e[0],[i,n,s]=e[1],l=t*n-r*i,d=n/l,p=-r/l,h=-i/l,u=t/l,f=-(d*a+p*s),w=-(h*a+u*s);return[[d,p,f],[h,u,w],[0,0,1]]}function bg(e,{dsize:t,scale:r=1.5,vxRatio:a=0,vyRatio:i=-.1,flagDoRot:n=!0,useLip:s=!0}={}){const{center:l,size:d,angle:p}=yg(e,{scale:r,vxRatio:a,vyRatio:i,useLip:s}),h=t/d[0],u=[t/2,t/2];let f;if(n){const y=Math.cos(p),x=Math.sin(p),[_,b]=l;f=[[h*y,h*x,u[0]-h*(y*_+x*b)],[-h*x,h*y,u[1]-h*(-x*_+y*b)]]}else f=[[h,0,u[0]-h*l[0]],[0,h,u[1]-h*l[1]]];const w=[f[0],f[1],[0,0,1]],g=$g(w);return{Mo2c:w,Mc2o:g}}function gh(e,t){return e.map(([r,a])=>[r*t[0][0]+a*t[0][1]+t[0][2],r*t[1][0]+a*t[1][1]+t[1][2]])}function Ii(e,{dsize:t=224,scale:r=1.5,vyRatio:a=-.1,flagDoRot:i=!0}={}){const{Mo2c:n,Mc2o:s}=bg(e,{dsize:t,scale:r,vyRatio:a,flagDoRot:i}),l=gh(e,n);return{Mo2c:n,Mc2o:s,ptCrop:l}}class vg{constructor(t=224){this.dsize=t}async load(t){this.session=await it(t),this.inputName=this.session.inputNames[0]}async run(t,r=null){let a,i;if(r){const{Mo2c:u,Mc2o:f}=Ii(r,{dsize:this.dsize,scale:1.5,vyRatio:-.1});a=ur(t,[u[0],u[1]],this.dsize,this.dsize),i=f}else{a=Rt(t,this.dsize,this.dsize);const u=Math.max(t.width,t.height)/this.dsize;i=[[u,0,0],[0,u,0],[0,0,1]]}const n=fh(a,this.dsize),s=new ve("float32",n,[1,3,this.dsize,this.dsize]),l=await this.session.run({[this.inputName]:s}),d=this.session.outputNames[2],p=Array.from(l[d].data),h=[];for(let u=0;u<p.length;u+=2)h.push([p[u]*this.dsize,p[u+1]*this.dsize]);return gh(h,i)}}class _g{constructor(){this.detector=new cg,this.landmark106=new fg,this.landmark203=new vg(224)}async load({detUrl:t,landmark106Url:r,landmark203Url:a}){await Promise.all([this.detector.load(t),this.landmark106.load(r),this.landmark203.load(a)])}_pickFace(t){let r=0,a=-1/0;return t.forEach((i,n)=>{const s=(i[2]-i[0])*(i[3]-i[1]);s>a&&(a=s,r=n)}),r}async cropSingleImage(t,{dsize:r=512,scale:a=2.3,vyRatio:i=-.15}={}){const n=await this.detector.detect(t,512,0);if(!n||n.length===0)throw new Error("Nenhum rosto detectado na imagem.");const s=this._pickFace(n),l=n[s].slice(0,4),d=await this.landmark106.get(t,l),{Mo2c:p}=Ii(d,{dsize:r,scale:a,vyRatio:i}),h=ur(t,[p[0],p[1]],r,r),u=Rt(h,256,256),{Mc2o:f,ptCrop:w}=Ii(d,{dsize:256,scale:a,vyRatio:i}),g=await this.landmark203.run(t,d);return{imgCrop256:u,Mc2o:f,ptCrop256:w,lmk203:g,bbox:l}}}const di=Math.PI;function xg(e){const t=Math.max(...e),r=e.map(i=>Math.exp(i-t)),a=r.reduce((i,n)=>i+n,0);return r.map(i=>i/a)}function pi(e){if(e.length===66){const t=xg(Array.from(e));let r=0;for(let a=0;a<66;a++)r+=t[a]*a;return r*3-97.5}return Array.isArray(e)||e.length!==void 0?e[0]:e}function Xr(e,t){const r=new Array(9).fill(0);for(let a=0;a<3;a++)for(let i=0;i<3;i++){let n=0;for(let s=0;s<3;s++)n+=e[a*3+s]*t[s*3+i];r[a*3+i]=n}return r}function wh(e){return[e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]}function Ei(e,t,r){const a=e/180*di,i=t/180*di,n=r/180*di,s=Math.cos(a),l=Math.sin(a),d=Math.cos(i),p=Math.sin(i),h=Math.cos(n),u=Math.sin(n),f=[1,0,0,0,s,-l,0,l,s],w=[d,0,p,0,1,0,-p,0,d],g=[h,-u,0,u,h,0,0,0,1],y=Xr(Xr(g,w),f);return wh(y)}function yh(e,t){return e.map(([r,a,i])=>[r*t[0]+a*t[3]+i*t[6],r*t[1]+a*t[4]+i*t[7],r*t[2]+a*t[5]+i*t[8]])}function Sg(e,t){return Xr(e,wh(t))}const Ci=21;function Mr(e){const t=new Float32Array(e.length*3);return e.forEach(([r,a,i],n)=>{t[n*3]=r,t[n*3+1]=a,t[n*3+2]=i}),t}function ci(e,t=Ci){const r=[];for(let a=0;a<t;a++)r.push([e[a*3],e[a*3+1],e[a*3+2]]);return r}class kg{async load({appearanceUrl:t,motionUrl:r,warpingUrl:a,stitchingUrl:i,eyeUrl:n,lipUrl:s}){const l=[it(t).then(d=>this.appearance=d),it(r).then(d=>this.motion=d),it(a).then(d=>this.warping=d)];i&&l.push(it(i).then(d=>this.stitching=d)),n&&l.push(it(n).then(d=>this.eye=d)),s&&l.push(it(s).then(d=>this.lip=d)),await Promise.all(l)}prepareImage(t){return fh(t,256)}parseOutput(t,r=256){return sg(t,3,r,r)}async extractFeature3d(t){const r=new ve("float32",t,[1,3,256,256]);return(await this.appearance.run({source_image:r})).feature_3d}async getKpInfo(t){const r=new ve("float32",t,[1,3,256,256]),a=await this.motion.run({x:r}),i=pi(a.pitch.data),n=pi(a.yaw.data),s=pi(a.roll.data),l=Array.from(a.t.data),d=a.scale.data[0],p=ci(a.kp.data),h=ci(a.exp.data);return{pitch:i,yaw:n,roll:s,t:l,scale:d,kp:p,exp:h}}transformKeypoint(t){const r=Ei(t.pitch,t.yaw,t.roll);return yh(t.kp,r).map(([n,s,l],d)=>{const[p,h,u]=t.exp[d];return[(n+p)*t.scale,(s+h)*t.scale,(l+u)*t.scale]}).map(([n,s,l])=>[n+t.t[0],s+t.t[1],l])}async stitchingStep(t,r){if(!this.stitching)return r;const a=new Float32Array(126);a.set(Mr(t),0),a.set(Mr(r),63);const i=new ve("float32",a,[1,126]),s=(await this.stitching.run({feat:i})).delta.data,l=ci(s.subarray(0,63)),d=s[63],p=s[64];return r.map(([h,u,f],w)=>[h+l[w][0]+d,u+l[w][1]+p,f+l[w][2]])}async warpDecode(t,r,a){const i=new ve("float32",Mr(r),[1,Ci,3]),n=new ve("float32",Mr(a),[1,Ci,3]);return(await this.warping.run({feature_3d:t,kp_source:i,kp_driving:n})).out}}class Ig{constructor(){this.wrapper=new kg,this.cropper=new _g}async load(t){await Promise.all([this.wrapper.load(t),this.cropper.load(t)]),this.maskTemplate=await hh(t.maskUrl)}async prepareSource(t){const r=ig(t,1280,2),a=await this.cropper.cropSingleImage(r),i=this.wrapper.prepareImage(a.imgCrop256),n=await this.wrapper.getKpInfo(i),s=Ei(n.pitch,n.yaw,n.roll),l=await this.wrapper.extractFeature3d(i),d=this.wrapper.transformKeypoint(n),p=ur(this.maskTemplate,[a.Mc2o[0],a.Mc2o[1]],r.width,r.height);return{imgRgb:r,cropInfo:a,xsInfo:n,Rs:s,fs:l,xs:d,maskWarped:p}}async animateFrame(t,r,a,i={}){const{flagRelative:n=!0,flagStitching:s=!0,flagPasteback:l=!0}=i,d=this.wrapper.prepareImage(r),p=await this.wrapper.getKpInfo(d),h=Ei(p.pitch,p.yaw,p.roll);a.R0||(a.R0=h,a.info0=p);let u,f,w,g;n?(u=Xr(Sg(h,a.R0),t.Rs),f=t.xsInfo.exp.map(([k,I,A],C)=>{const[R,V,U]=p.exp[C],[J,F,ie]=a.info0.exp[C];return[k+(R-J),I+(V-F),A+(U-ie)]}),w=t.xsInfo.scale*(p.scale/a.info0.scale),g=[t.xsInfo.t[0]+(p.t[0]-a.info0.t[0]),t.xsInfo.t[1]+(p.t[1]-a.info0.t[1]),0]):(u=h,f=p.exp,w=t.xsInfo.scale,g=[p.t[0],p.t[1],0]);let x=yh(t.xsInfo.kp,u).map(([k,I,A],C)=>{const[R,V,U]=f[C];return[(k+R)*w,(I+V)*w,(A+U)*w]}).map(([k,I,A])=>[k+g[0],I+g[1],A]);s&&(x=await this.wrapper.stitchingStep(t.xs,x));const _=await this.wrapper.warpDecode(t.fs,t.xs,x),b=this.wrapper.parseOutput(_.data,256);if(!l)return b;const S=ur(b,[t.cropInfo.Mc2o[0],t.cropInfo.Mc2o[1]],t.imgRgb.width,t.imgRgb.height);return og(S,t.maskWarped,t.imgRgb)}}const De=e=>document.getElementById(e),Eg=De("status"),dr=De("outputCanvas"),$h=dr.getContext("2d"),Cg=De("fps"),Fl=De("sourcePreview"),Zr=De("startBtn"),Tg=De("resetMotionBtn"),Ti=De("stopBtn"),ft=De("webcamVideo"),Ct=De("drivingVideo"),zg=document.getElementsByName("driveMode"),Ag=De("flagRelative"),Og=De("flagStitching"),Rg=De("flagPasteback"),un=new Ig;let At=null,ln={},Qr=!1,zi=null;function We(e){Eg.textContent=e,console.log("[liveportrait-web]",e)}function Dg(){for(const e of zg)if(e.checked)return e.value;return"webcam"}async function Bg(){const e=await tg();We(e?"WebGPU disponível — carregando modelos...":"WebGPU indisponível neste navegador, usando fallback WASM (mais lento) — carregando modelos...");const t=`${import.meta.env.BASE_URL}models`;try{await un.load({detUrl:t+"det_10g.onnx",landmark106Url:t+"2d106det.onnx",landmark203Url:t+"landmark.onnx",appearanceUrl:t+"appearance_feature_extractor.onnx",motionUrl:t+"motion_extractor.onnx",warpingUrl:t+"warping_spade.onnx",stitchingUrl:t+"stitching_stitching.onnx",eyeUrl:t+"stitching_eye.onnx",lipUrl:t+"stitching_lip.onnx",maskUrl:t+"mask_template.png"}),We("Modelos carregados. Escolha uma imagem-fonte pra começar."),Zr.disabled=!1}catch(r){console.error(r),We("Falha ao carregar os modelos .onnx — confira se estão em /public/models (veja o README).")}}De("sourceInput").addEventListener("change",async e=>{const t=e.target.files[0];if(t){We("Processando imagem-fonte (detecção de rosto + recorte)...");try{const r=await hh(t);At=await un.prepareSource(r),ln={},Fl.innerHTML="",Fl.appendChild(At.cropInfo.imgCrop256),We('Fonte pronta. Clique em "Iniciar".'),dr.width=At.imgRgb.width,dr.height=At.imgRgb.height,$h.drawImage(At.imgRgb,0,0)}catch(r){console.error(r),We(`Erro: ${r.message}`)}}});async function Mg(e){if(e==="webcam"){const r=await navigator.mediaDevices.getUserMedia({video:{width:512,height:512},audio:!1});return ft.srcObject=r,await ft.play(),ft.classList.remove("hidden"),Ct.classList.add("hidden"),ft}const t=De("drivingVideoInput").files[0];if(!t)throw new Error("Escolha um vídeo de direção primeiro.");return Ct.src=URL.createObjectURL(t),Ct.loop=!0,await Ct.play(),Ct.classList.remove("hidden"),ft.classList.add("hidden"),Ct}function Pg(){ft.srcObject&&(ft.srcObject.getTracks().forEach(e=>e.stop()),ft.srcObject=null),Ct.pause()}async function bh(e){if(!Qr)return;const t=performance.now();try{const a=ag(e),i=Rt(a,256,256),n=await un.animateFrame(At,i,ln,{flagRelative:Ag.checked,flagStitching:Og.checked,flagPasteback:Rg.checked});dr.width=n.width,dr.height=n.height,$h.drawImage(n,0,0)}catch(a){console.error(a),We(`Erro durante a animação: ${a.message}`),Qr=!1;return}const r=performance.now()-t;Cg.textContent=(1e3/r).toFixed(1),zi=requestAnimationFrame(()=>bh(e))}Zr.addEventListener("click",async()=>{if(!At){We("Escolha uma imagem-fonte primeiro.");return}const e=Dg();try{const t=await Mg(e);Qr=!0,Zr.disabled=!0,Ti.disabled=!1,We("Animando ao vivo..."),bh(t)}catch(t){console.error(t),We(`Erro: ${t.message}`)}});Tg.addEventListener("click",()=>{ln={},We('Referência de movimento reiniciada (o próximo frame vira o novo "neutro").')});Ti.addEventListener("click",()=>{Qr=!1,zi&&cancelAnimationFrame(zi),Pg(),Zr.disabled=!1,Ti.disabled=!0,We("Parado.")});Bg();
