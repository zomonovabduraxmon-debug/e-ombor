const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {JSDOM, VirtualConsole} = require('jsdom');
const root = path.join(__dirname,'..');
const delay = ms => new Promise(resolve=>setTimeout(resolve,ms));

async function fixture(loggedIn=true) {
  const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError',error=>errors.push(error.message));
  const dom = new JSDOM(html,{url:'https://fixture.invalid/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const w = dom.window;
  const run = code => vm.runInContext(code, dom.getInternalVMContext());
  const data = {permits:[{id:'p1',number:'TEST-001',date:'2026-01-01',note:'Fixture customer',items:[{id:'i1',name:'Fixture textile',material:'Cotton',tnved:'5208',qty:100,weight:200,unit:'шт'}]}],shipments:[]};
  const writes = [];
  // In-memory test adapter. It cannot connect to the real database.
  w.OfflineSync = {authInfo:async()=>({loggedIn,email:'fixture@example.invalid'}),saveCollection:async(kind,items)=>writes.push({kind,items:JSON.parse(JSON.stringify(items))}),loadState:async()=>structuredClone(data)};
  w.alert = message=>{throw Error('Unexpected alert: '+message)};
  const inline = [...w.document.querySelectorAll('script:not([src])')].map(s=>s.textContent).join('\n');
  run(fs.readFileSync(path.join(root,'sync-core.js'),'utf8'));
  run(inline.slice(0,inline.indexOf('(async function init(){')));
  run(`state = ${JSON.stringify(data)}; render(); bindAuthButton();`);
  run(fs.readFileSync(path.join(root,'ui-v23.js'),'utf8'));
  await delay(100);
  return {dom,w,errors,writes};
}

test('all five sections navigate, reports survive language changes, data stays unchanged', async()=>{
  const {dom,w,errors,writes} = await fixture();
  try {
    for (const section of ['permits','shipment','export','reports','dashboard']) {
      w.document.querySelector(`[data-v23-tab="${section}"]`).click();
      await delay(35);
      assert.ok(w.document.querySelector('#app h1')?.textContent,section+' has a heading');
      assert.equal(w.document.querySelector('.v23-nav-btn.active')?.dataset.v23Tab,section);
    }
    w.document.querySelector('[data-v23-tab="reports"]').click();
    await delay(35);
    w.document.querySelector('[data-lang-v5="en"]').click();
    await delay(35);
    assert.equal(w.document.querySelector('#app h1').textContent,'Reports');
    assert.equal(w.document.querySelector('.v23-nav-btn.active')?.dataset.v23Tab,'reports');
    assert.equal(writes.length,0);
    assert.deepEqual(errors,[]);
  } finally {dom.window.close();}
});

test('UI settles after enhancement rather than continuously rebuilding',async()=>{
  const {dom,w,errors} = await fixture();
  try {
    let changes=0;
    const observer=new w.MutationObserver(records=>changes+=records.length);
    observer.observe(w.document.body,{childList:true,subtree:true,characterData:true});
    await delay(120);
    observer.disconnect();
    assert.ok(changes<10,`Unexpected idle mutations: ${changes}`);
    assert.deepEqual(errors,[]);
  } finally {dom.window.close();}
});

test('theme action works and dashboard search filters records',async()=>{
  const {dom,w} = await fixture();
  try {
    w.document.querySelector('[data-v23-action="settings"]').click();
    assert.equal(w.document.documentElement.dataset.theme,'dark');
    const search=w.document.getElementById('v23GlobalSearch');
    search.value='no-such-product';
    search.dispatchEvent(new w.Event('input',{bubbles:true}));
    await delay(40);
    assert.ok(!w.document.querySelector('#app tbody')?.textContent.includes('TEST-001'));
  } finally {dom.window.close();}
});

test('unauthenticated create action leaves stored data untouched',async()=>{
  const {dom,w,writes} = await fixture(false);
  try {
    w.document.getElementById('btnNewPermit').click();
    await delay(60);
    assert.equal(w.document.getElementById('fldNumber'),null);
    assert.equal(writes.length,0);
  } finally {dom.window.close();}
});

test('canceling permit edits preserves original item and customer fields',async()=>{
  const {dom,w,writes} = await fixture();
  try {
    w.openPermitModal('p1');
    await delay(30);
    const input=w.document.querySelector('[data-field="name"]');
    input.value='Unsaved change'; input.dispatchEvent(new w.Event('input'));
    w.document.querySelector('.modal [data-close]').click();
    w.openPermitModal('p1');
    await delay(30);
    assert.equal(w.document.querySelector('[data-field="name"]').value,'Fixture textile');
    assert.equal(w.document.getElementById('fldNote').value,'Fixture customer');
    assert.equal(writes.length,0);
  } finally {dom.window.close();}
});

test('manual shipment computes weight and saves only the shipment collection',async()=>{
  const {dom,w,writes,errors} = await fixture();
  try {
    w.document.querySelector('[data-v23-tab="shipment"]').click();
    await delay(30);
    const select=w.document.getElementById('shipPermit');
    select.value='p1'; select.dispatchEvent(new w.Event('change'));
    await delay(30);
    const qty=w.document.querySelector('[data-line-qty]');
    qty.value='5'; qty.dispatchEvent(new w.Event('input'));
    w.document.getElementById('btnAutoWeight').click();
    assert.equal(Number(w.document.querySelector('[data-line-weight]').value),10);
    w.document.getElementById('btnSaveShipment').click();
    await delay(40);
    assert.equal(writes.length,1);
    assert.equal(writes[0].kind,'shipment');
    assert.equal(writes[0].items[0].permitId,'p1');
    assert.deepEqual(writes[0].items[0].lines,[{itemId:'i1',qty:5,weight:10}]);
    assert.deepEqual(errors,[]);
  } finally {dom.window.close();}
});
