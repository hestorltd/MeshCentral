var CreateAmtRedirect=function(e,o){var x={};function y(e){return String.fromCharCode.apply(null,e)}return((x.m=e).parent=x).authCookie=o,x.State=0,x.socket=null,x.host=null,x.port=0,x.user=null,x.pass=null,x.authuri="/RedirectionService",x.tlsv1only=0,x.inDataCount=0,x.connectstate=0,x.protocol=e.protocol,x.acc=null,x.amtsequence=1,x.amtkeepalivetimer=null,x.onStateChanged=null,x.Start=function(e,t,n,r,a){x.host=e,x.port=t,x.user=n,x.pass=r,x.connectstate=0,x.inDataCount=0;n=window.location.protocol.replace("http","ws")+"//"+window.location.host+window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/"))+"/webrelay.ashx?p=2&host="+e+"&port="+t+"&tls="+a+("*"==n?"&serverauth=1":"")+(void 0===r?"&serverauth=1&user="+n:"");null!=o&&""!=o&&(n+="&auth="+o),x.socket=new WebSocket(n),x.socket.binaryType="arraybuffer",x.socket.onopen=x.xxOnSocketConnected,x.socket.onmessage=x.xxOnMessage,x.socket.onclose=x.xxOnSocketClosed,x.xxStateChange(1)},x.xxOnSocketConnected=function(){x.xxStateChange(2),1==x.protocol&&x.directSend(new Uint8Array([16,0,0,0,83,79,76,32])),2==x.protocol&&x.directSend(new Uint8Array([16,1,0,0,75,86,77,82])),3==x.protocol&&x.directSend(new Uint8Array([16,0,0,0,73,68,69,82]))},x.xxOnMessage=function(e){if(e.data&&-1!=x.connectstate){if(x.inDataCount++,1==x.connectstate&&(2==x.protocol||3==x.protocol))return x.m.ProcessBinaryData?x.m.ProcessBinaryData(e.data):x.m.ProcessData(y(e.data));var t;for(null==x.acc?x.acc=e.data:((t=new Uint8Array(x.acc.byteLength+e.data.byteLength)).set(new Uint8Array(x.acc),0),t.set(new Uint8Array(e.data),x.acc.byteLength),x.acc=t.buffer);null!=x.acc&&1<=x.acc.byteLength;){var n=0,r=new Uint8Array(x.acc);switch(r[0]){case 17:if(r.byteLength<4)return;var a=r[1];if(0===a){if(r.byteLength<13)return;var o=r[12];if(r.byteLength<13+o)return;x.directSend(new Uint8Array([19,0,0,0,0,0,0,0,0])),n=13+o}else x.Stop(1);break;case 20:if(r.byteLength<9)return;var c=new DataView(x.acc).getUint32(5,!0);if(r.byteLength<9+c)return;var s=r[1],l=r[4],h=[];for(i=0;i<c;i++)h.push(r[9+i]);var u=new Uint8Array(x.acc.slice(9,9+c)),n=9+c;if(0==l)0<=h.indexOf(4)?x.xxSend(String.fromCharCode(19,0,0,0,4)+IntToStrX(x.user.length+x.authuri.length+8)+String.fromCharCode(x.user.length)+x.user+String.fromCharCode(0,0)+String.fromCharCode(x.authuri.length)+x.authuri+String.fromCharCode(0,0,0,0)):x.Stop(2);else if(3!=l&&4!=l||1!=s)if(0==s)switch(x.protocol){case 1:x.xxSend(String.fromCharCode(32,0,0,0)+IntToStrX(x.amtsequence++)+ShortToStrX(1e4)+ShortToStrX(100)+ShortToStrX(0)+ShortToStrX(1e4)+ShortToStrX(100)+ShortToStrX(0)+IntToStrX(0));break;case 2:x.directSend(new Uint8Array([64,0,0,0,0,0,0,0]));break;case 3:x.connectstate=1,x.xxStateChange(3)}else x.Stop(3);else{var S=0,d=u[0],f=y(new Uint8Array(u.buffer.slice(1,1+d))),g=u[S+=d+1],C=y(new Uint8Array(u.buffer.slice(S+1,S+1+g)));S+=g+1;o=null,s=function(e){for(var t="",n=0;n<e;n++)t+="abcdef0123456789".charAt(Math.floor(16*Math.random()));return t}(32),d="00000002",g="";4==l&&(a=u[S],o=y(new Uint8Array(u.buffer.slice(S+1,S+1+a))),S+=a+1,g=d+":"+s+":"+o+":");S=hex_md5(hex_md5(x.user+":"+f+":"+x.pass)+":"+C+":"+g+hex_md5("POST:"+x.authuri)),g=x.user.length+f.length+C.length+x.authuri.length+s.length+d.length+S.length+7;4==l&&(g+=o.length+1);S=String.fromCharCode(19,0,0,0,l)+IntToStrX(g)+String.fromCharCode(x.user.length)+x.user+String.fromCharCode(f.length)+f+String.fromCharCode(C.length)+C+String.fromCharCode(x.authuri.length)+x.authuri+String.fromCharCode(s.length)+s+String.fromCharCode(d.length)+d+String.fromCharCode(S.length)+S;4==l&&(S+=String.fromCharCode(o.length)+o),x.xxSend(S)}break;case 33:if(r.byteLength<23)break;n=23,x.xxSend(String.fromCharCode(39,0,0,0)+IntToStrX(x.amtsequence++)+String.fromCharCode(0,0,27,0,0,0)),1==x.protocol&&(x.amtkeepalivetimer=setInterval(x.xxSendAmtKeepAlive,2e3)),x.connectstate=1,x.xxStateChange(3);break;case 41:if(r.byteLength<10)break;n=10;break;case 42:if(r.byteLength<10)break;var m=10+(r[9]<<8)+r[8];if(r.byteLength<m)break;x.m.ProcessBinaryData?x.m.ProcessBinaryData(new Uint8Array(r.buffer.slice(10,m))):x.m.ProcessData(y(new Uint8Array(r.buffer.slice(10,m)))),n=m;break;case 43:if(r.byteLength<8)break;n=8;break;case 65:if(r.byteLength<8)break;x.connectstate=1,x.m.Start(),8<r.byteLength&&(x.m.ProcessBinaryData?x.m.ProcessBinaryData(new Uint8Array(r.buffer.slice(8))):x.m.ProcessData(y(new Uint8Array(r.buffer.slice(8))))),n=r.byteLength;break;case 240:x.serverIsRecording=!0,n=1;break;default:return console.log("Unknown Intel AMT command: "+r[0]+" acclen="+r.byteLength),void x.Stop(4)}if(0==n)return;n!=x.acc.byteLength?x.acc=x.acc.slice(n):x.acc=null}}},x.directSend=function(e){try{x.socket.send(e.buffer)}catch(e){}},x.xxSend=function(e){if(null!=x.socket&&x.socket.readyState==WebSocket.OPEN){for(var t=new Uint8Array(e.length),n=0;n<e.length;++n)t[n]=e.charCodeAt(n);try{x.socket.send(t.buffer)}catch(e){}}},x.Send=x.send=function(e){null!=x.socket&&1==x.connectstate&&(1==x.protocol?x.xxSend(String.fromCharCode(40,0,0,0)+IntToStrX(x.amtsequence++)+ShortToStrX(e.length)+e):x.xxSend(e))},x.xxSendAmtKeepAlive=function(){null!=x.socket&&x.xxSend(String.fromCharCode(43,0,0,0)+IntToStrX(x.amtsequence++))},x.xxOnSocketClosed=function(){0==x.inDataCount&&0==x.tlsv1only?(x.tlsv1only=1,x.socket=new WebSocket(window.location.protocol.replace("http","ws")+"//"+window.location.host+window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/"))+"/webrelay.ashx?p=2&host="+x.host+"&port="+x.port+"&tls="+x.tls+"&tls1only=1"+("*"==x.user?"&serverauth=1":"")+("undefined"==typeof pass?"&serverauth=1&user="+x.user:"")),x.socket.binaryType="arraybuffer",x.socket.onopen=x.xxOnSocketConnected,x.socket.onmessage=x.xxOnMessage,x.socket.onclose=x.xxOnSocketClosed):x.Stop(5)},x.xxStateChange=function(e){x.State!=e&&(x.State=e,x.m.xxStateChange(x.State),null!=x.onStateChanged&&x.onStateChanged(x,x.State))},x.Stop=function(e){x.xxStateChange(0),x.connectstate=-1,(x.acc=null)!=x.socket&&(x.socket.close(),x.socket=null),null!=x.amtkeepalivetimer&&(clearInterval(x.amtkeepalivetimer),x.amtkeepalivetimer=null)},x}