(function () {
'use strict';
var CFG = {
brand: 'Wrap WETH',
brandIcon: 'weth.svg',
nav: [
{ label: 'Wrap', href: '#wrap' },
{ label: 'Unwrap', href: '#unwrap' },
{ label: 'Docs', href: 'INSERT_URL/' }
],
cta: { label: 'Open app', href: 'INSERT_URL' },
heroHeadline: 'Wrap ETH into WETH',
heroLead: 'One-click, 1:1 ERC-20 wrapper — turn native ETH into Wrapped Ether (WETH) for Uniswap, Aave and the rest of Ethereum DeFi.',
base: { sym: 'ETH', name: 'Ethereum', icon: 'eth.svg' },
quote: { sym: 'WETH', name: 'Wrapped Ether', icon: 'weth.svg' },
action: 'Wrap',        // verb on the buttons; toggles to actionAlt
actionAlt: 'Unwrap',
actionHref: 'INSERT_URL'
};
function esc(s) {
return String(s).replace(/[&<>"]/g, function (c) {
return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
});
}
function leg(side, t) {
return '<div class="leg">' +
'<img data-' + side + '-icon src="' + t.icon + '" width="28" height="28" alt="' + esc(t.name) + ' (' + esc(t.sym) + ')">' +
'<span class="sym" data-' + side + '-sym>' + esc(t.sym) + '</span>' +
'<input class="amt" data-' + side + '-amt type="text" inputmode="decimal" value="1.0"' + (side === 'to' ? ' readonly' : '') +
' aria-label="' + (side === 'from' ? 'Amount to wrap' : 'Amount received') + '">' +
'</div>';
}
function build() {
var navHtml = CFG.nav.map(function (n) {
return '<a href="' + n.href + '">' + esc(n.label) + '</a>';
}).join('');
return '' +
'<div class="app">' +
'<header class="topbar">' +
'<h1 class="brand"><img src="' + CFG.brandIcon + '" width="26" height="26" alt="' + esc(CFG.brand) + '">' + esc(CFG.brand) + '</h1>' +
'<nav class="nav">' + navHtml + '</nav>' +
'<span class="spacer"></span>' +
'<a class="btn-ghost" href="' + CFG.cta.href + '" rel="noopener noreferrer">' + esc(CFG.cta.label) + '</a>' +
'</header>' +
'<main class="main">' +
'<section class="hero">' +
'<h2>' + esc(CFG.heroHeadline) + '</h2>' +
'<p class="lead">' + esc(CFG.heroLead) + '</p>' +
'</section>' +
'<div class="trade">' +
'<div class="trade-row">' +
leg('from', CFG.base) +
'<button class="dir" type="button" data-switch aria-label="Switch direction">&#8594;</button>' +
leg('to', CFG.quote) +
'<a class="act" data-act href="' + CFG.actionHref + '" rel="noopener noreferrer">' + esc(CFG.action) + '</a>' +
'</div>' +
'<a class="go" data-go href="' + CFG.actionHref + '" rel="noopener noreferrer">Go to ' + esc(CFG.action) + ' <span class="chev" aria-hidden="true">&#8250;</span></a>' +
'</div>' +
'</main>' +
'<footer class="foot">Information on this page is for educational purposes only and is not financial advice.</footer>' +
'</div>';
}
var root = document.getElementById('root');
if (!root) return;
root.innerHTML = build();
var wrapped = false;
var q = function (s) { return root.querySelector(s); };
var fromIcon = q('[data-from-icon]'), fromSym = q('[data-from-sym]'), fromAmt = q('[data-from-amt]');
var toIcon = q('[data-to-icon]'), toSym = q('[data-to-sym]'), toAmt = q('[data-to-amt]');
var act = q('[data-act]'), go = q('[data-go]');
function setToken(icon, sym, t) {
icon.setAttribute('src', t.icon);
icon.setAttribute('alt', t.name + ' (' + t.sym + ')');
sym.textContent = t.sym;
}
function render() {
var base = wrapped ? CFG.quote : CFG.base;
var quote = wrapped ? CFG.base : CFG.quote;
var verb = wrapped ? CFG.actionAlt : CFG.action;
setToken(fromIcon, fromSym, base);
setToken(toIcon, toSym, quote);
act.textContent = verb;
go.innerHTML = 'Go to ' + esc(verb) + ' <span class="chev" aria-hidden="true">&#8250;</span>';
}
q('[data-switch]').addEventListener('click', function () {
wrapped = !wrapped;
render();
});
fromAmt.addEventListener('input', function () {
toAmt.value = (fromAmt.value || '').trim();
});
})();