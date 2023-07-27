<script>
	import { spring } from 'svelte/motion';
	// self = '';
	// import {global} from "svelte-check";
	// global = {};
	// console.log(global)
    import { onMount } from 'svelte'
	// import PouchDB from "pouchdb-browser";
	let local_db_status = 'not connected', remote_db_status = 'not connected';
	let change_text = '', doc_1_title = '';
    // Ensure execution only on the browser, after the pouchdb script has loaded.

	function catch_change(change){
		if (change.direction === 'pull'){
			console.log('catch', change.change.docs)
			let doc;
			for (const index in change.change.docs) {
				doc = change.change.docs[index]

				if (doc._id === '1'){
					doc_1_title = doc.product.title
				}
				console.log('doc', doc);
			}
		}
	}

    onMount(async function() {
		console.log('start')
		console.log(PouchDB)

        const local_db = new PouchDB('my_database');
		if (local_db) local_db_status = 'connected'

		const remote_db = new PouchDB('https://admin:butt@w1.solidsoft.app:2053/shop1')
		if (remote_db) remote_db_status = 'connected'
		console.log('remote_db', remote_db)

		local_db.sync(remote_db, {
			live: true
		}).on('complete', function () {
			console.log('sync completed');
			// yay, we're in sync!
		}).on('change', function (change) {
			// change_text = change.toString()
			console.log('change', change);
			catch_change(change)
			// yo, something changed!
		}).on('error', function (err) {
			console.log('sync error', err)
			// yo, we got an error! (maybe the user went offline?)
		});
		console.log('sync')
		try {
			let doc = await local_db.get('1');
			console.log(doc);
			doc_1_title = doc.product.title;
		} catch (error) {
			console.log('error', error);
		}
		console.log('done')

    });
	// import PouchDB from "pouchdb-browser";
	let some_text = spring();
	$: some_text.set(1)


	setTimeout(()=>{
		$: some_text.set(2)
		update()

	},3000)


	let other_text = 'hi';
	function update(){
		other_text = 'hiyo';
	}

</script>

<!--<script>-->
<!--	// import PouchDB from "pouchdb-browser";-->
<!--	// const db = PouchDB('test');-->
<!--	// console.log(`db: ${db}`)-->
<!--    // window.process = window.process || {env: {NODE_DEBUG:undefined, DEBUG:undefined}};-->
<!--    // window.global = window;-->
<!--	// console.log(window)-->
<!--</script>-->

<svelte:head>
	<title>PouchDB Test</title>
	<meta name="description" content="About this app" />
    <script src="//cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js"></script>
</svelte:head>

<div class="text-column">
<p>some text</p>
	<p>{$some_text}</p>
	<p>{other_text}</p>
	<p>local db status: {local_db_status}</p>
	<p>remote db status: {remote_db_status}</p>
	<p>doc_1_title: {doc_1_title}</p>
</div>
