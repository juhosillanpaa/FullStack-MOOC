(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),o=t.n(u),c=t(2),l=t(3),i=t.n(l),m="/api/persons",s=function(){return i.a.get(m).then(function(e){return e.data})},f=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then(function(e){return e.data})},d=function(e){return i.a.post(m,e).then(function(e){return e.data})},h=function(e){return i.a.delete("".concat(m,"/").concat(e)).then(console.log("done"))},b=(t(37),function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"message"},n)}),E=function(e){var n=e.error;return null===n?null:r.a.createElement("div",{className:"error"},n)},v=function(e){var n=e.handler1;return r.a.createElement("button",{onClick:n},"delete")},w=function(e){var n=e.person,t=e.handler1;return r.a.createElement("li",null,n.name," ",n.number," ",r.a.createElement(v,{handler1:t})," ")},p=function(e){var n=e.filter,t=e.handler;return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{value:n,onChange:t}))},g=function(e){var n=e.onSubmit,t=e.name,a=e.handler1,u=e.number,o=e.handler2;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},j=function(e){var n=e.rows;return r.a.createElement(r.a.Fragment,null,n)},O=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),l=Object(c.a)(o,2),i=l[0],m=l[1],v=Object(a.useState)(""),O=Object(c.a)(v,2),y=O[0],C=O[1],S=Object(a.useState)(""),k=Object(c.a)(S,2),L=k[0],N=k[1],P=Object(a.useState)(null),D=Object(c.a)(P,2),F=D[0],J=D[1],T=Object(a.useState)(null),x=Object(c.a)(T,2),A=x[0],B=x[1],I=function(e){J(e),setTimeout(function(){J(null)},4e3)},q=function(e){B(e),setTimeout(function(){B(null)},4e3)},z=function(){s().then(function(e){return u(e)})};Object(a.useEffect)(z,[]);var G=L?t.filter(function(e){return e.name.toLowerCase().includes(L.toLowerCase())}):t;return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(b,{message:F}),r.a.createElement(E,{error:A}),r.a.createElement(p,{filter:L,handler:function(e){return N(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(g,{onSubmit:function(e){e.preventDefault();var n={name:i,number:y};if(!t.filter(function(e){return e.name.toLowerCase()===i.toLowerCase()}).length>0)n.number?d(n).then(function(e){I("Person ".concat(i," was added succesfully")),u(t.concat(e))}).catch(function(e){q("".concat(e.response.data.error)),console.log(e.response.data.error)}):alert("Number is missing");else if(window.confirm("".concat(i," is already added to phonebook. Do you want to update the number?"))){var a=t.find(function(e){return e.name.toLowerCase()===i.toLowerCase()});f(a.id,n).then(function(e){I("Number of ".concat(a.name," was updated succesfully")),z()}).catch(function(e){return console.log(e)})}m(""),C("")},name:i,handler1:function(e){return m(e.target.value)},number:y,handler2:function(e){return C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(j,{rows:G.map(function(e){return r.a.createElement(w,{key:e.name,person:e,handler1:function(){window.confirm("Do you really want to delete contact?")&&h(e.id).then(function(n){I("Person ".concat(e.name," was deleted succesfully")),z()}).catch(function(n){console.log(n),q("Person ".concat(e.name," was already deleted from server")),z()})}})})}))};o.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.4d01add5.chunk.js.map